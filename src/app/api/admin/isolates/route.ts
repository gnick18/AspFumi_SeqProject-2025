import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// The interface for a row in our table. Note: 'id' is now a number.
interface IsolateData {
  id: number;
  [key: string]: unknown; 
}

// --- API Methods ---
// GET: Fetches all lab submissions from the database
export async function GET() {
  const sql = neon(process.env.POSTGRES_URL!);
  try {
    const submissions = await sql`SELECT * FROM isolate_submissions ORDER BY timestamp DESC`;
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Database GET Error (isolates):", error);
    return NextResponse.json({ error: "Failed to fetch isolate data." }, { status: 500 });
  }
}

// ADDED POST FUNCTION
export async function POST(request: NextRequest) {
  const sql = neon(process.env.POSTGRES_URL!);
  try {
    const rawBodyText = await request.text();
    console.log('Received RAW TEXT body:', rawBodyText);
    //
    let body;
    try {
      body = JSON.parse(rawBodyText);
    } catch(parseError) {
      console.error("JSON PARSE FAILED:", parseError);
      return NextResponse.json(
          { error: "Malformed JSON request body." },
          { status: 400 } // This 400 is now explicitly reporting a bad JSON format
      );
    }
    
    // 1. Destructure all fields, providing default empty strings for optional fields
    const {
      submitting_lab,
      strain_name,
      genotype,
      other_genes,
      other_mutations = '', // Default to empty string
      strain_origin = '',    // Default to empty string
      strain_center_name = '',
      strain_center_location = '',
      strain_center_date = '',
      sharing_lab_name = '',
      sharing_lab_institute = '',
      sharing_lab_location = '',
    } = body;
    
    // 2. Use the destructured variables for required fields check
    if (!submitting_lab || !strain_name) {
      return NextResponse.json(
        { error: "Missing required fields: submitting_lab or strain_name" },
        { status: 400 }
      );
    }

    const genotypeDetailsJson = JSON.stringify(genotype);
    const otherGenesJson = JSON.stringify(other_genes);

    await sql`
      INSERT INTO isolate_submissions (
        submitting_lab, strain_name, strain_origin,
        strain_center_name, strain_center_location, strain_center_date,
        sharing_lab_name, sharing_lab_institute, sharing_lab_location,
        genotype_details_json, other_genes_json, other_mutations
      ) VALUES (
        ${submitting_lab}, ${strain_name}, ${strain_origin},
        ${strain_center_name}, ${strain_center_location}, ${strain_center_date},
        ${sharing_lab_name}, ${sharing_lab_institute}, ${sharing_lab_location},
        ${genotypeDetailsJson},
        ${otherGenesJson},
        ${other_mutations}
      );
    `;

    return NextResponse.json({ message: "Isolate information submitted successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Database POST Error (isolates):", error);
    return NextResponse.json({ error: "Failed to submit isolate data." }, { status: 500 });
  }
}

// PUT: For updating existing records from the admin panel
export async function PUT(request: NextRequest) {
  try {
    const updatedRow: IsolateData = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    await sql`
      UPDATE isolate_submissions
      SET
        submitting_lab = ${updatedRow.submitting_lab as string},
        strain_name = ${updatedRow.strain_name as string},
        strain_origin = ${updatedRow.strain_origin as string},
        strain_center_name = ${updatedRow.strain_center_name as string},
        strain_center_location = ${updatedRow.strain_center_location as string},
        strain_center_date = ${updatedRow.strain_center_date as string},
        sharing_lab_name = ${updatedRow.sharing_lab_name as string},
        sharing_lab_institute = ${updatedRow.sharing_lab_institute as string},
        sharing_lab_location = ${updatedRow.sharing_lab_location as string},
        genotype_details_json = ${updatedRow.genotype_details_json as string},
        other_genes_json = ${updatedRow.other_genes_json as string},
        other_mutations = ${updatedRow.other_mutations as string}
      WHERE id = ${updatedRow.id};
    `;
    return NextResponse.json({ success: true, updatedRow: updatedRow });
  } catch (error) {
    console.error("Database PUT Error (isolates):", error);
    return NextResponse.json({ error: "Failed to update isolate data." }, { status: 500 });
  }
}

// DELETE: For deleting records from the admin panel
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    await sql`DELETE FROM isolate_submissions WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch(error) {
    console.error("Database DELETE Error (isolates):", error);
    return NextResponse.json({ error: "Failed to delete isolate data." }, { status: 500 });
  }
}