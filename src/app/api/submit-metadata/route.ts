import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';
// Importing the geocoding function
import { getCoordinates } from '@/lib/geocoding';

// This interface defines the data we expect from the form
interface SubmissionData {
  labName: string; institution: string; city: string; state: string; country: string;
  contactName: string; contactEmail: string; researchUse: string; comments: string;
  mapVisibility: 'full' | 'institution_only' | 'hidden';
}
//
export async function POST(request: NextRequest) {
  try {
    const data: SubmissionData = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    
    // We now call the imported function. The logic from here down is the same as before.
    const coordinates = await getCoordinates(data.city, data.state, data.country);

    await sql`
      INSERT INTO lab_submissions (
        lab_name, institution, city, state, country,
        contact_name, contact_email, research_use, comments,
        latitude, longitude, match_level, map_visibility
      ) VALUES (
        ${data.labName}, ${data.institution}, ${data.city}, ${data.state}, ${data.country},
        ${data.contactName}, ${data.contactEmail}, ${data.researchUse}, ${data.comments},
        ${coordinates?.lat || null}, ${coordinates?.lng || null}, ${coordinates?.matchLevel || 'none'},
        ${data.mapVisibility || 'full'}
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
    return NextResponse.json({ error: 'Internal server error while processing submission.' }, { status: 500 });
  }
}

