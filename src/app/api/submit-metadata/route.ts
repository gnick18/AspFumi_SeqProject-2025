import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// This interface defines the data we expect from the form
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

// Geocoding function remains the same as it's still needed
async function getCoordinates(city: string, state: string, country: string): Promise<{ lat: number; lng: number; matchLevel: string } | null> {
    const queries = [`${city}, ${state}, ${country}`, `${city}, ${country}`, `${state}, ${country}`, country].filter(q => q.trim() !== ',' && q.trim().length > 1);
    for (const query of queries) {
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=en&limit=1`;
            const response = await fetch(url, { headers: { 'User-Agent': 'Aspergillus Community Sequencing Project' } });
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    const result = data[0];
                    let matchLevel = 'country';
                    if (['city', 'town', 'village'].includes(result.type)) {
                      matchLevel = 'city';
                    } else if (['state', 'province', 'region'].includes(result.type)) {
                      matchLevel = 'state';
                    }
                    return { lat: parseFloat(result.lat), lng: parseFloat(result.lon), matchLevel };
                }
            }
        } catch (error) { console.error(`Geocoding error for query "${query}":`, error); }
    }
    return null;
}

export async function POST(request: NextRequest) {
  try {
    const data: SubmissionData = await request.json();

    // 2. CONNECT TO THE DATABASE
    // The connection string is automatically and securely read from the .env.local file
    // that Vercel created for you. You don't need to change this line.
    const sql = neon(process.env.POSTGRES_URL!);

    // Get coordinates for the location
    const coordinates = await getCoordinates(data.city, data.state, data.country);

    // 3. INSERT DATA INTO THE DATABASE
    // This replaces all the old 'fs.writeFile' logic.
    // It's a parameterized query, which is a secure way to prevent SQL injection attacks.
    await sql`
      INSERT INTO lab_submissions (
        lab_name, institution, city, state, country, 
        contact_name, contact_email, research_use, comments, 
        latitude, longitude, match_level
      ) VALUES (
        ${data.labName}, ${data.institution}, ${data.city}, ${data.state}, ${data.country},
        ${data.contactName}, ${data.contactEmail}, ${data.researchUse}, ${data.comments},
        ${coordinates?.lat || null}, ${coordinates?.lng || null}, ${coordinates?.matchLevel || 'none'}
      );
    `;

    let successMessage = 'Metadata submitted successfully';
    if (coordinates) {
        successMessage += ` Your laboratory will appear on our global map shortly (matched at ${coordinates.matchLevel} level).`;
    } else {
        successMessage += '. Note: Your location could not be automatically mapped and will be reviewed manually.';
    }

    return NextResponse.json({ success: true, message: successMessage });

  } catch (error) {
    console.error('Error processing submission:', error);
    // Provide a generic error message to the user for security
    return NextResponse.json({ error: 'Internal server error while processing submission.' }, { status: 500 });
  }
}