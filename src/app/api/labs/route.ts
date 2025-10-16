import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// This is the shape of the data that the frontend map/list components expect.
interface Lab {
  id: string;
  name: string;
  institution: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
}

// Helper function to convert a database row (snake_case) to the frontend format (camelCase)
function dbRowToLab(dbRow: Record<string, any>): Lab {
  return {
      id: dbRow.id.toString(),
      name: dbRow.lab_name,
      institution: dbRow.institution,
      location: `${dbRow.city}${dbRow.state ? ', ' + dbRow.state : ''}, ${dbRow.country}`,
      country: dbRow.country,
      lat: parseFloat(dbRow.latitude),
      lng: parseFloat(dbRow.longitude),
  };
}


export async function GET() {
  try {
    // 1. Connect to the database
    const sql = neon(process.env.POSTGRES_URL!);

    // 2. Fetch all lab submissions from the database
    // We select only the columns needed for the public map to avoid sending extra data.
    const dbResult = await sql`
      SELECT id, lab_name, institution, city, state, country, latitude, longitude 
      FROM lab_submissions 
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
    `;

    // 3. Transform the data into the format the frontend expects
    const labs = dbResult.map(dbRowToLab);

    return NextResponse.json({
      success: true,
      labs: labs,
    });

  } catch (error) {
    console.error('Error fetching labs for map:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching map data.' },
      { status: 500 }
    );
  }
}