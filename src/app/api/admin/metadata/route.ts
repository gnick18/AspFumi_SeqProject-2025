import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { getCoordinates } from '@/lib/geocoding';

// The interface for a row in our table. Note: 'id' is now a number.
interface LabMetadata {
  id: number;
  [key: string]: unknown; 
}

// --- NEW: Database-powered seeding function ---
// This function will only run if the database table is empty.
async function seedInitialData(sql: NeonQueryFunction<false, false>) {
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
// --- THIS IS THE FUNCTION WE ARE FIXING ---
export async function PUT(request: NextRequest) {
  try {
    const updatedRow: LabMetadata = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    
    // 2. RE-GEOCODE THE LOCATION
    // Before we update, we call our shared function to get fresh coordinates for the new address.
    const coordinates = await getCoordinates(
        updatedRow.city as string, 
        updatedRow.state as string, 
        updatedRow.country as string
    );

    // 3. UPDATE THE DATABASE WITH THE NEW COORDINATES
    // The SQL query now uses the newly fetched coordinates, not the old ones from the form.
    await sql`
      UPDATE lab_submissions
      SET 
        lab_name = ${updatedRow.lab_name as string}, institution = ${updatedRow.institution as string}, city = ${updatedRow.city as string},
        state = ${updatedRow.state as string}, country = ${updatedRow.country as string}, contact_name = ${updatedRow.contact_name as string},
        contact_email = ${updatedRow.contact_email as string}, research_use = ${updatedRow.research_use as string},
        comments = ${updatedRow.comments as string}, 
        latitude = ${coordinates?.lat || null},      -- Use the new latitude
        longitude = ${coordinates?.lng || null},     -- Use the new longitude
        match_level = ${coordinates?.matchLevel || 'none'} -- Use the new match level
      WHERE id = ${updatedRow.id};
    `;
    
    // We create a final version of the row to send back to the admin page,
    // ensuring it has the newly calculated coordinates so the UI updates instantly.
    const finalUpdatedRow = {
        ...updatedRow,
        latitude: coordinates?.lat || null,
        longitude: coordinates?.lng || null,
        match_level: coordinates?.matchLevel || 'none',
    };

    return NextResponse.json({ success: true, updatedRow: finalUpdatedRow });
  } catch(error) {
    console.error("Database PUT Error:", error);
    return NextResponse.json({ error: "Failed to update data in database." }, { status: 500 });
  }
}

// The DELETE function remains the same.
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