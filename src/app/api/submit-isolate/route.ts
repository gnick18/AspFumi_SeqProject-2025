import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// This interface should match the PAYLOAD from your frontend
interface IsolateSubmissionPayload {
  submitting_lab: string;
  strain_name: string;
  genotype_details_json: string; // Now expecting a string
  other_genes_json: string;      // Now expecting a string
  other_mutations: string;
  strain_origin: string;
  strain_center_name: string;
  strain_center_location: string;
  strain_center_date: string;
  sharing_lab_name: string;
  sharing_lab_institute: string;
  sharing_lab_location: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: IsolateSubmissionPayload = await request.json();

    console.log('Received data on server:', data);

    // --- FIX 1: VALIDATE USING snake_case ---
    if (!data.submitting_lab || !data.strain_name) {
      return NextResponse.json(
        { error: 'Missing required fields: Submitting Lab and Strain Name.' },
        { status: 400 }
      );
    }

    // 2. CONNECT TO THE DATABASE
    const sql = neon(process.env.POSTGRES_URL!);
    
    // --- FIX 2: NO LONGER NEED TO STRINGIFY ---
    // The data is already coming in as a string from the frontend.

    // 3. INSERT DATA INTO THE DATABASE
    //    Using snake_case keys directly from the 'data' object
    await sql`
      INSERT INTO isolate_submissions (
        submitting_lab, strain_name, strain_origin,
        strain_center_name, strain_center_location, strain_center_date,
        sharing_lab_name, sharing_lab_institute, sharing_lab_location,
        genotype_details_json, other_genes_json, other_mutations
      ) VALUES (
        ${data.submitting_lab}, ${data.strain_name}, ${data.strain_origin},
        ${data.strain_center_name || null}, ${data.strain_center_location || null}, ${data.strain_center_date || null},
        ${data.sharing_lab_name || null}, ${data.sharing_lab_institute || null}, ${data.sharing_lab_location || null},
        ${data.genotype_details_json}, ${data.other_genes_json}, ${data.other_mutations || null}
      );
    `;

    return NextResponse.json({
      success: true,
      message: 'Isolate information submitted successfully!',
    });

  } catch (error) {
    console.error('Error processing isolate submission:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing isolate submission.' },
      { status: 500 }
    );
  }
}