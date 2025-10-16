import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// The interface for a row in our table. Note: 'id' is now a number.
interface LabMetadata {
  id: number;
  [key: string]: any; 
}

// --- NEW: Database-powered seeding function ---
// This function will only run if the database table is empty.
async function seedInitialData(sql: any) {
  const adminLabs = [
    { lab_name: 'Keller Lab', institution: 'University of Wisconsin-Madison', city: 'Madison', state: 'WI', country: 'United States', contact_name: 'Nancy Keller', contact_email: 'npkeller@wisc.com', research_use: 'Medical microbiology', comments: 'This is a pre-seeded admin lab entry.', latitude: 43.0731, longitude: -89.4012, match_level: 'city' },
    { lab_name: 'Rokas Lab', institution: 'Vanderbilt University', city: 'Nashville', state: 'TN', country: 'United States', contact_name: 'Antonis Rokas', contact_email: 'admin@example.com', research_use: 'Fungal evolution and pathogenesis.', comments: 'This is a pre-seeded admin lab entry.', latitude: 36.1627, longitude: -86.7816, match_level: 'city' },
    { lab_name: 'Barber Lab', institution: 'Friedrich Schiller University Jena', city: 'Jena', state: '', country: 'Germany', contact_name: 'Amelia Barber', contact_email: 'amelia.barber@uni-jena.de', research_use: 'Fungal genetics and pathogenesis.', comments: 'This is a pre-seeded admin lab entry.', latitude: 50.9271, longitude: 11.5892, match_level: 'city' },
    { lab_name: 'Gluck-Thaler Lab', institution: 'University of Wisconsin-Madison', city: 'Madison', state: 'WI', country: 'United States', contact_name: 'Emile Gluck-Thaler', contact_email: 'gluckthaler@wisc.edu', research_use: 'Plant pathology fungal genomics', comments: 'This is a pre-seeded admin lab entry.', latitude: 43.0731, longitude: -89.4012, match_level: 'city' }
  ];

  // Insert each admin lab into the database table
  for (const lab of adminLabs) {
    await sql`
      INSERT INTO lab_submissions (
        lab_name, institution, city, state, country, contact_name, contact_email, 
        research_use, comments, latitude, longitude, match_level
      ) VALUES (
        ${lab.lab_name}, ${lab.institution}, ${lab.city}, ${lab.state}, ${lab.country}, 
        ${lab.contact_name}, ${lab.contact_email}, ${lab.research_use}, ${lab.comments},
        ${lab.latitude}, ${lab.longitude}, ${lab.match_level}
      );
    `;
  }
}

// --- API Methods ---

// GET: Fetches all lab submissions from the database
export async function GET() {
  const sql = neon(process.env.POSTGRES_URL!);
  
  try {
    // Check if the table is empty
    const countResult = await sql`SELECT COUNT(*) FROM lab_submissions`;
    const rowCount = parseInt(countResult[0].count as string, 10);
    
    // If it's empty, seed it with the initial admin labs
    if (rowCount === 0) {
      await seedInitialData(sql);
    }

    // Fetch and return all submissions
    const submissions = await sql`SELECT * FROM lab_submissions ORDER BY timestamp DESC`;
    return NextResponse.json({ submissions });

  } catch (error) {
      console.error("Database GET Error:", error);
      return NextResponse.json({ error: "Failed to fetch data from database." }, { status: 500 });
  }
}

// PUT: Updates an existing lab submission in the database
export async function PUT(request: NextRequest) {
  try {
    const updatedRow: LabMetadata = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    
    await sql`
      UPDATE lab_submissions
      SET 
        lab_name = ${updatedRow.lab_name}, institution = ${updatedRow.institution}, city = ${updatedRow.city},
        state = ${updatedRow.state}, country = ${updatedRow.country}, contact_name = ${updatedRow.contact_name},
        contact_email = ${updatedRow.contact_email}, research_use = ${updatedRow.research_use},
        comments = ${updatedRow.comments}, latitude = ${updatedRow.latitude}, longitude = ${updatedRow.longitude},
        match_level = ${updatedRow.match_level}
      WHERE id = ${updatedRow.id};
    `;
    return NextResponse.json({ success: true, updatedRow });
  } catch(error) {
    console.error("Database PUT Error:", error);
    return NextResponse.json({ error: "Failed to update data in database." }, { status: 500 });
  }
}

// DELETE: Removes a lab submission from the database
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        const sql = neon(process.env.POSTGRES_URL!);
        await sql`DELETE FROM lab_submissions WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch(error) {
        console.error("Database DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete data from database." }, { status: 500 });
    }
}

