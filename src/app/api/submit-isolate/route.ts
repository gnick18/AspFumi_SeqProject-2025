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
  uv_mutagenesis: string;
  uv_exposure_details: string;
  strain_origin: string;
  strain_center_name: string;
  strain_center_location: string;
  strain_center_date: string;
  sharing_lab_name: string;
  sharing_lab_institute: string;
  sharing_lab_location: string;
  sharing_lab_date: string;
  inhouse_generation_date: string;
  // New fields - optional for backward compatibility
  unique_strain_id?: string;
  existing_id?: string; // If updating an existing record
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
    
    // Generate unique_strain_id: format is "strain_name__lab_name"
    const uniqueStrainId = `${data.strain_name}__${data.submitting_lab}`;
    
    // 3. CHECK IF THIS IS AN UPDATE OR NEW ENTRY
    // Check if a record with this unique_strain_id already exists
    const existingRecords = await sql`
      SELECT id FROM isolate_submissions 
      WHERE unique_strain_id = ${uniqueStrainId}
    `;
    
    if (existingRecords.length > 0) {
      // UPDATE EXISTING RECORD
      const existingId = existingRecords[0].id;
      
      await sql`
        UPDATE isolate_submissions
        SET
          submitting_lab = ${data.submitting_lab},
          strain_name = ${data.strain_name},
          strain_origin = ${data.strain_origin},
          strain_center_name = ${data.strain_center_name || null},
          strain_center_location = ${data.strain_center_location || null},
          strain_center_date = ${data.strain_center_date || null},
          sharing_lab_name = ${data.sharing_lab_name || null},
          sharing_lab_institute = ${data.sharing_lab_institute || null},
          sharing_lab_location = ${data.sharing_lab_location || null},
          sharing_lab_date = ${data.sharing_lab_date || null},
          inhouse_generation_date = ${data.inhouse_generation_date || null},
          genotype_details_json = ${data.genotype_details_json},
          other_genes_json = ${data.other_genes_json},
          other_mutations = ${data.other_mutations || null},
          uv_mutagenesis = ${data.uv_mutagenesis || null},
          uv_exposure_details = ${data.uv_exposure_details || null},
          unique_strain_id = ${uniqueStrainId}
        WHERE id = ${existingId}
      `;
      
      return NextResponse.json({
        success: true,
        message: `Isolate "${data.strain_name}" updated successfully!`,
        updated: true,
        unique_strain_id: uniqueStrainId
      });
      
    } else {
      // INSERT NEW RECORD
      await sql`
        INSERT INTO isolate_submissions (
          submitting_lab, strain_name, strain_origin,
          strain_center_name, strain_center_location, strain_center_date,
          sharing_lab_name, sharing_lab_institute, sharing_lab_location, sharing_lab_date,
          inhouse_generation_date,
          genotype_details_json, other_genes_json, other_mutations,
          uv_mutagenesis, uv_exposure_details,
          unique_strain_id, sample_received
        ) VALUES (
          ${data.submitting_lab}, ${data.strain_name}, ${data.strain_origin},
          ${data.strain_center_name || null}, ${data.strain_center_location || null}, ${data.strain_center_date || null},
          ${data.sharing_lab_name || null}, ${data.sharing_lab_institute || null}, ${data.sharing_lab_location || null}, ${data.sharing_lab_date || null},
          ${data.inhouse_generation_date || null},
          ${data.genotype_details_json}, ${data.other_genes_json}, ${data.other_mutations || null},
          ${data.uv_mutagenesis || null}, ${data.uv_exposure_details || null},
          ${uniqueStrainId}, ${false}
        );
      `;

      return NextResponse.json({
        success: true,
        message: 'Isolate information submitted successfully!',
        updated: false,
        unique_strain_id: uniqueStrainId
      });
    }

  } catch (error) {
    console.error('Error processing isolate submission:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing isolate submission.' },
      { status: 500 }
    );
  }
}
