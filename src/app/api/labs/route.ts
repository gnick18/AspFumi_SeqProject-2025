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
function dbRowToLab(dbRow: Record<string, string | number | null>): Lab {
  return {
    id: String(dbRow.id ?? ''),
    name: String(dbRow.lab_name ?? ''),
    institution: String(dbRow.institution ?? ''),
    location: `${String(dbRow.city ?? '')}${dbRow.state ? ', ' + String(dbRow.state) : ''}, ${String(dbRow.country ?? '')}`,
    country: String(dbRow.country ?? ''),
    lat: parseFloat(String(dbRow.latitude ?? '0')),
    lng: parseFloat(String(dbRow.longitude ?? '0')),
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