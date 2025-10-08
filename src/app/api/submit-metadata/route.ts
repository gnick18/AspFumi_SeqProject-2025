import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface SubmissionData {
  labName: string;
  institution: string;
  city: string;
  state: string;
  country: string;
  contactName: string;
  contactEmail: string;
  researchUse: string;
  comments: string;
}

// --- HELPER FUNCTION TO PREVENT TSV CORRUPTION ---
// This function sanitizes text to ensure it doesn't break the TSV format.
const sanitizeForTsv = (text: string | null | undefined): string => {
  if (!text) return '';
  // Replace tabs with spaces and remove newline characters
  return text.replace(/\t/g, ' ').replace(/[\r\n]/g, '');
};


// --- DYNAMIC GEOCODING FUNCTION ---
async function getCoordinates(city: string, state: string, country: string): Promise<{ lat: number; lng: number; matchLevel: 'city' | 'state' | 'country' } | null> {
  const queries = [
    `${city}, ${state}, ${country}`,
    `${city}, ${country}`,
    `${state}, ${country}`,
    country
  ].filter(q => q.trim() !== ',' && q.trim().length > 1);

  for (const query of queries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=en&limit=1`;
      
      const response = await fetch(url, {
        headers: { 
          'User-Agent': 'Aspergillus Community Sequencing Project' 
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const result = data[0];
          console.log(`Geocoding success for "${query}":`, result.display_name);
          
          // IMPROVEMENT: Use the 'type' field from Nominatim for more reliable match level.
          let matchLevel: 'city' | 'state' | 'country' = 'country';
          const type = result.type;
          if (['city', 'town', 'village'].includes(type)) {
            matchLevel = 'city';
          } else if (['state', 'province', 'region'].includes(type)) {
            matchLevel = 'state';
          }

          return {
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            matchLevel: matchLevel,
          };
        }
      }
    } catch (error) {
      console.error(`Geocoding error for query "${query}":`, error);
    }
  }

  console.log(`Geocoding FAILED for: City="${city}", State="${state}", Country="${country}"`);
  return null;
}


export async function POST(request: NextRequest) {
  try {
    const data: SubmissionData = await request.json();

    const requiredFields = ['labName', 'institution', 'city', 'country', 'contactName', 'contactEmail', 'researchUse'];
    for (const field of requiredFields) {
      if (!data[field as keyof SubmissionData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const timestamp = new Date().toISOString();
    const coordinates = await getCoordinates(data.city, data.state, data.country);

    // BUG FIX: Use the sanitize function on all user-provided text fields for the TSV.
    const tsvRow = [
      timestamp,
      sanitizeForTsv(data.labName),
      sanitizeForTsv(data.institution),
      sanitizeForTsv(data.city),
      sanitizeForTsv(data.state),
      sanitizeForTsv(data.country),
      sanitizeForTsv(data.contactName),
      sanitizeForTsv(data.contactEmail),
      sanitizeForTsv(data.researchUse),
      sanitizeForTsv(data.comments),
      coordinates?.lat?.toString() || '',
      coordinates?.lng?.toString() || '',
      coordinates?.matchLevel || 'none'
    ].join('\t');

    const dataDir = path.join(process.cwd(), 'data');
    const tsvFilePath = path.join(dataDir, 'lab_submissions.tsv');

    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(tsvFilePath);
    } catch {
      const headers = [
        'timestamp', 'lab_name', 'institution', 'city', 'state', 'country',
        'contact_name', 'contact_email', 'research_use', 'comments',
        'latitude', 'longitude', 'match_level'
      ].join('\t');
      await fs.writeFile(tsvFilePath, headers + '\n');
    }

    await fs.appendFile(tsvFilePath, tsvRow + '\n');

    let successMessage = 'Metadata submitted successfully';

    if (coordinates) {
      const jsonFilePath = path.join(dataDir, 'labs.json');
      let labs = [];
      try {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        labs = JSON.parse(jsonData);
      } catch {}

      const newLab = {
        id: `lab_${Date.now()}`,
        name: data.labName,
        institution: data.institution,
        location: `${data.city}${data.state ? ', ' + data.state : ''}, ${data.country}`,
        country: data.country,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      labs.push(newLab);

      await fs.writeFile(jsonFilePath, JSON.stringify(labs, null, 2));
      successMessage += ` Your laboratory will now appear on our global map (matched at ${coordinates.matchLevel} level).`;
    } else {
      successMessage += '. Note: Your location could not be automatically mapped and will be reviewed manually.';
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

