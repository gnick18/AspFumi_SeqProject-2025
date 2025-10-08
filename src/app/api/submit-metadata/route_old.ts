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

// Enhanced geocoding function with fallback logic
async function getCoordinates(city: string, state: string, country: string): Promise<{ lat: number; lng: number; matchLevel: 'city' | 'state' | 'country' | 'none' } | null> {
  // Normalize inputs
  const normalizeString = (str: string) => str.toLowerCase().trim().replace(/[^\w\s]/g, '');

  const cityNorm = normalizeString(city);
  const stateNorm = normalizeString(state || '');
  const countryNorm = normalizeString(country);

  // Expanded location database with cities, states/provinces, and countries
  const locationDatabase: { [key: string]: { lat: number; lng: number; type: 'city' | 'state' | 'country' } } = {
    // Major cities
    'madison': { lat: 43.0731, lng: -89.4012, type: 'city' },
    'nashville': { lat: 36.1627, lng: -86.7816, type: 'city' },
    'jena': { lat: 50.9276, lng: 11.5865, type: 'city' },
    'new york': { lat: 40.7128, lng: -74.0060, type: 'city' },
    'new york city': { lat: 40.7128, lng: -74.0060, type: 'city' },
    'nyc': { lat: 40.7128, lng: -74.0060, type: 'city' },
    'los angeles': { lat: 34.0522, lng: -118.2437, type: 'city' },
    'chicago': { lat: 41.8781, lng: -87.6298, type: 'city' },
    'london': { lat: 51.5074, lng: -0.1278, type: 'city' },
    'paris': { lat: 48.8566, lng: 2.3522, type: 'city' },
    'berlin': { lat: 52.5200, lng: 13.4050, type: 'city' },
    'tokyo': { lat: 35.6762, lng: 139.6503, type: 'city' },
    'sydney': { lat: -33.8688, lng: 151.2093, type: 'city' },
    'toronto': { lat: 43.6532, lng: -79.3832, type: 'city' },
    'vancouver': { lat: 49.2827, lng: -123.1207, type: 'city' },
    'montreal': { lat: 45.5017, lng: -73.5673, type: 'city' },
    'boston': { lat: 42.3601, lng: -71.0589, type: 'city' },
    'atlanta': { lat: 33.7490, lng: -84.3880, type: 'city' },
    'miami': { lat: 25.7617, lng: -80.1918, type: 'city' },
    'seattle': { lat: 47.6062, lng: -122.3321, type: 'city' },
    'san francisco': { lat: 37.7749, lng: -122.4194, type: 'city' },
    'denver': { lat: 39.7392, lng: -104.9903, type: 'city' },
    'phoenix': { lat: 33.4484, lng: -112.0740, type: 'city' },
    'philadelphia': { lat: 39.9526, lng: -75.1652, type: 'city' },
    'houston': { lat: 29.7604, lng: -95.3698, type: 'city' },
    'dallas': { lat: 32.7767, lng: -96.7970, type: 'city' },
    'munich': { lat: 48.1351, lng: 11.5820, type: 'city' },
    'hamburg': { lat: 53.5511, lng: 9.9937, type: 'city' },
    'cologne': { lat: 50.9375, lng: 6.9603, type: 'city' },
    'frankfurt': { lat: 50.1109, lng: 8.6821, type: 'city' },

    // US States
    'wisconsin': { lat: 44.2619, lng: -89.6165, type: 'state' },
    'wi': { lat: 44.2619, lng: -89.6165, type: 'state' },
    'tennessee': { lat: 35.7478, lng: -86.6923, type: 'state' },
    'tn': { lat: 35.7478, lng: -86.6923, type: 'state' },
    'california': { lat: 36.1162, lng: -119.6816, type: 'state' },
    'new york state': { lat: 42.1657, lng: -74.9481, type: 'state' },
    'ny': { lat: 42.1657, lng: -74.9481, type: 'state' },
    'texas': { lat: 31.0545, lng: -97.5635, type: 'state' },
    'tx': { lat: 31.0545, lng: -97.5635, type: 'state' },
    'florida': { lat: 27.7663, lng: -82.6404, type: 'state' },
    'fl': { lat: 27.7663, lng: -82.6404, type: 'state' },
    'illinois': { lat: 40.3363, lng: -89.0022, type: 'state' },
    'il': { lat: 40.3363, lng: -89.0022, type: 'state' },
    'washington': { lat: 47.7511, lng: -120.7401, type: 'state' },
    'wa': { lat: 47.7511, lng: -120.7401, type: 'state' },
    'colorado': { lat: 39.0598, lng: -105.3111, type: 'state' },
    'co': { lat: 39.0598, lng: -105.3111, type: 'state' },
    'arizona': { lat: 33.7712, lng: -111.3877, type: 'state' },
    'az': { lat: 33.7712, lng: -111.3877, type: 'state' },
    'massachusetts': { lat: 42.2352, lng: -71.0275, type: 'state' },
    'ma': { lat: 42.2352, lng: -71.0275, type: 'state' },
    'pennsylvania': { lat: 40.5908, lng: -77.2098, type: 'state' },
    'pa': { lat: 40.5908, lng: -77.2098, type: 'state' },
    'georgia': { lat: 33.0406, lng: -83.6431, type: 'state' },
    'ga': { lat: 33.0406, lng: -83.6431, type: 'state' },

    // Canadian Provinces
    'ontario': { lat: 51.2538, lng: -85.3232, type: 'state' },
    'on': { lat: 51.2538, lng: -85.3232, type: 'state' },
    'quebec': { lat: 53.9109, lng: -68.6118, type: 'state' },
    'qc': { lat: 53.9109, lng: -68.6118, type: 'state' },
    'british columbia': { lat: 53.7267, lng: -127.6476, type: 'state' },
    'bc': { lat: 53.7267, lng: -127.6476, type: 'state' },

    // German States
    'bavaria': { lat: 49.0134, lng: 11.4215, type: 'state' },
    'bayern': { lat: 49.0134, lng: 11.4215, type: 'state' },
    'thuringia': { lat: 50.9276, lng: 11.5865, type: 'state' },
    'thüringen': { lat: 50.9276, lng: 11.5865, type: 'state' },
    'north rhine-westphalia': { lat: 51.4332, lng: 7.6616, type: 'state' },
    'nordrhein-westfalen': { lat: 51.4332, lng: 7.6616, type: 'state' },
    'baden-württemberg': { lat: 48.6616, lng: 9.3501, type: 'state' },

    // Countries
    'usa': { lat: 39.8283, lng: -98.5795, type: 'country' },
    'united states': { lat: 39.8283, lng: -98.5795, type: 'country' },
    'united states of america': { lat: 39.8283, lng: -98.5795, type: 'country' },
    'us': { lat: 39.8283, lng: -98.5795, type: 'country' },
    'canada': { lat: 56.1304, lng: -106.3468, type: 'country' },
    'germany': { lat: 51.1657, lng: 10.4515, type: 'country' },
    'deutschland': { lat: 51.1657, lng: 10.4515, type: 'country' },
    'de': { lat: 51.1657, lng: 10.4515, type: 'country' },
    'uk': { lat: 55.3781, lng: -3.4360, type: 'country' },
    'united kingdom': { lat: 55.3781, lng: -3.4360, type: 'country' },
    'great britain': { lat: 55.3781, lng: -3.4360, type: 'country' },
    'england': { lat: 52.3555, lng: -1.1743, type: 'country' },
    'france': { lat: 46.6034, lng: 1.8883, type: 'country' },
    'fr': { lat: 46.6034, lng: 1.8883, type: 'country' },
    'japan': { lat: 36.2048, lng: 138.2529, type: 'country' },
    'jp': { lat: 36.2048, lng: 138.2529, type: 'country' },
    'australia': { lat: -25.2744, lng: 133.7751, type: 'country' },
    'au': { lat: -25.2744, lng: 133.7751, type: 'country' },
    'italy': { lat: 41.8719, lng: 12.5674, type: 'country' },
    'it': { lat: 41.8719, lng: 12.5674, type: 'country' },
    'spain': { lat: 40.4637, lng: -3.7492, type: 'country' },
    'es': { lat: 40.4637, lng: -3.7492, type: 'country' },
    'netherlands': { lat: 52.1326, lng: 5.2913, type: 'country' },
    'nl': { lat: 52.1326, lng: 5.2913, type: 'country' },
    'belgium': { lat: 50.5039, lng: 4.4699, type: 'country' },
    'be': { lat: 50.5039, lng: 4.4699, type: 'country' },
    'switzerland': { lat: 46.8182, lng: 8.2275, type: 'country' },
    'ch': { lat: 46.8182, lng: 8.2275, type: 'country' },
    'austria': { lat: 47.5162, lng: 14.5501, type: 'country' },
    'at': { lat: 47.5162, lng: 14.5501, type: 'country' },
    'sweden': { lat: 60.1282, lng: 18.6435, type: 'country' },
    'se': { lat: 60.1282, lng: 18.6435, type: 'country' },
    'norway': { lat: 60.4720, lng: 8.4689, type: 'country' },
    'no': { lat: 60.4720, lng: 8.4689, type: 'country' },
    'denmark': { lat: 56.2639, lng: 9.5018, type: 'country' },
    'dk': { lat: 56.2639, lng: 9.5018, type: 'country' },
  };

  // Try city first
  if (cityNorm && locationDatabase[cityNorm] && locationDatabase[cityNorm].type === 'city') {
    return {
      lat: locationDatabase[cityNorm].lat,
      lng: locationDatabase[cityNorm].lng,
      matchLevel: 'city'
    };
  }

  // Try state/province second
  if (stateNorm && locationDatabase[stateNorm] && locationDatabase[stateNorm].type === 'state') {
    return {
      lat: locationDatabase[stateNorm].lat,
      lng: locationDatabase[stateNorm].lng,
      matchLevel: 'state'
    };
  }

  // Try country third
  if (countryNorm && locationDatabase[countryNorm] && locationDatabase[countryNorm].type === 'country') {
    return {
      lat: locationDatabase[countryNorm].lat,
      lng: locationDatabase[countryNorm].lng,
      matchLevel: 'country'
    };
  }

  // No match found - return null to flag for manual editing
  console.log(`Geocoding failed for: City="${city}", State="${state}", Country="${country}"`);
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const data: SubmissionData = await request.json();

    // Validate required fields
    const requiredFields = ['labName', 'institution', 'city', 'country', 'contactName', 'contactEmail', 'researchUse'];
    for (const field of requiredFields) {
      if (!data[field as keyof SubmissionData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create timestamp
    const timestamp = new Date().toISOString();

    // Get coordinates for the location
    const coordinates = await getCoordinates(data.city, data.state, data.country);

    // Prepare TSV data
    const tsvRow = [
      timestamp,
      data.labName,
      data.institution,
      data.city,
      data.state,
      data.country,
      data.contactName,
      data.contactEmail,
      data.researchUse,
      data.comments,
      coordinates?.lat?.toString() || '',
      coordinates?.lng?.toString() || '',
      coordinates?.matchLevel || 'none'
    ].join('\t');

    // Define the path to the TSV file
    const dataDir = path.join(process.cwd(), 'data');
    const tsvFilePath = path.join(dataDir, 'lab_submissions.tsv');

    // Ensure the data directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, that's okay
    }

    // Check if file exists, if not create with headers
    let fileExists = false;
    try {
      await fs.access(tsvFilePath);
      fileExists = true;
    } catch (error) {
      // File doesn't exist, we'll create it with headers
    }

    if (!fileExists) {
      const headers = [
        'timestamp',
        'lab_name',
        'institution',
        'city',
        'state',
        'country',
        'contact_name',
        'contact_email',
        'research_use',
        'comments',
        'latitude',
        'longitude',
        'match_level'
      ].join('\t');

      await fs.writeFile(tsvFilePath, headers + '\n');
    }

    // Append the new row to the TSV file
    await fs.appendFile(tsvFilePath, tsvRow + '\n');

    // Only add to map if geocoding was successful
    let successMessage = 'Metadata submitted successfully';

    if (coordinates) {
      // Also create/update a JSON file for easier reading by the map component
      const jsonFilePath = path.join(dataDir, 'labs.json');
      let labs = [];

      try {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        labs = JSON.parse(jsonData);
      } catch (error) {
        // File doesn't exist or is invalid, start with empty array
      }

      // Add new lab to the JSON data
      const newLab = {
        id: Date.now().toString(),
        name: data.labName,
        institution: data.institution,
        location: `${data.city}${data.state ? ', ' + data.state : ''}, ${data.country}`,
        country: data.country,
        lat: coordinates.lat,
        lng: coordinates.lng,
        contactEmail: data.contactEmail,
        researchUse: data.researchUse,
        timestamp: timestamp,
        matchLevel: coordinates.matchLevel
      };

      labs.push(newLab);

      // Write updated JSON file
      await fs.writeFile(jsonFilePath, JSON.stringify(labs, null, 2));

      successMessage += ` Your laboratory will appear on our global map shortly (matched at ${coordinates.matchLevel} level).`;
    } else {
      successMessage += '. Note: Your location could not be automatically mapped and will be reviewed manually by our team.';
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
      coordinates: coordinates,
      geocoded: !!coordinates
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}