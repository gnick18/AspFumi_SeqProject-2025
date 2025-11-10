import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// This endpoint is for internal/authenticated use only (isolate form, admin panel)
// It returns actual lab names regardless of map_visibility settings

interface Lab {
  id: string;
  name: string;
  institution: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
}

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
    const sql = neon(process.env.POSTGRES_URL!);

    // Fetch all labs with actual names (no privacy filtering)
    const dbResult = await sql`
      SELECT id, lab_name, institution, city, state, country, latitude, longitude
      FROM lab_submissions
      WHERE latitude IS NOT NULL
        AND longitude IS NOT NULL;
    `;

    const labs = dbResult.map(dbRowToLab);

    return NextResponse.json({
      success: true,
      labs: labs,
    });

  } catch (error) {
    console.error('Error fetching labs for internal use:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching lab data.' },
      { status: 500 }
    );
  }
}