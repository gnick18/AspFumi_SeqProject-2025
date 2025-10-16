import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// The interface for a row in our table. Note: 'id' is now a number.
interface IsolateData {
  id: number;
  timestamp: string;
  [key: string]: unknown; 
}

function dbToFrontend(dbRow: Record<string, any>): Record<string, any> {
  const newRow = { ...dbRow };
  // Convert 'id' from a number to a string
  newRow.id = dbRow.id.toString(); 
  // Convert 'timestamp' from a Date object to a standardized string
  newRow.timestamp = new Date(dbRow.timestamp).toISOString();
  return newRow;
}

// --- API Methods ---
// GET: Fetches all isolate submissions and transforms them
export async function GET() {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    const dbResult = await sql`SELECT * FROM isolate_submissions ORDER BY timestamp DESC`;
    
    // Use the helper to transform each row before sending it to the frontend.
    const submissions = dbResult.map(dbToFrontend); 

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Database GET Error (isolates):", error);
    return NextResponse.json({ error: "Failed to fetch isolate data." }, { status: 500 });
  }
}

// PUT: Updates an existing isolate submission
export async function PUT(request: NextRequest) {
  try {
    const updatedRow: IsolateData = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);

    // The frontend sends snake_case keys, so no camelCase translation is needed here.
    await sql`
      UPDATE isolate_submissions
      SET
        submitting_lab = ${updatedRow.submitting_lab},
        strain_name = ${updatedRow.strain_name},
        strain_origin = ${updatedRow.strain_origin},
        strain_center_name = ${updatedRow.strain_center_name},
        strain_center_location = ${updatedRow.strain_center_location},
        strain_center_date = ${updatedRow.strain_center_date},
        sharing_lab_name = ${updatedRow.sharing_lab_name},
        sharing_lab_institute = ${updatedRow.sharing_lab_institute},
        sharing_lab_location = ${updatedRow.sharing_lab_location},
        genotype_details_json = ${updatedRow.genotype_details_json},
        other_genes_json = ${updatedRow.other_genes_json},
        other_mutations = ${updatedRow.other_mutations}
      WHERE id = ${updatedRow.id};
    `;

    return NextResponse.json({ success: true, updatedRow });
  } catch (error) {
    console.error("Database PUT Error (isolates):", error);
    return NextResponse.json({ error: "Failed to update isolate data." }, { status: 500 });
  }
}

// DELETE: Removes an isolate submission
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    await sql`DELETE FROM isolate_submissions WHERE id = ${parseInt(id, 10)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database DELETE Error (isolates):", error);
    return NextResponse.json({ error: "Failed to delete isolate data." }, { status: 500 });
  }
}

