import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// This interface should match the IsolateFormData from your frontend component
interface IsolateFormData {
  submittingLab: string;
  strainName: string;
  genotype: object; // Keep as a generic object for serialization
  otherGenes: object[]; // Keep as a generic array for serialization
  otherMutations: string;
  strainOrigin: string;
  strainCenterName: string;
  strainCenterLocation: string;
  strainCenterDate: string;
  sharingLabName: string;
  sharingLabInstitute: string;
  sharingLabLocation: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: IsolateFormData = await request.json();

    // Basic validation remains the same
    if (!data.submittingLab || !data.strainName) {
      return NextResponse.json(
        { error: 'Missing required fields: Submitting Lab and Strain Name.' },
        { status: 400 }
      );
    }

    // 2. CONNECT TO THE DATABASE
    const sql = neon(process.env.POSTGRES_URL!);

    // As before, we convert the complex objects into JSON strings to store them.
    const genotypeString = JSON.stringify(data.genotype);
    const otherGenesString = JSON.stringify(data.otherGenes);
    
    // 3. INSERT DATA INTO THE DATABASE
    // This replaces all the old file-writing logic.
    await sql`
      INSERT INTO isolate_submissions (
        submitting_lab, strain_name, strain_origin,
        strain_center_name, strain_center_location, strain_center_date,
        sharing_lab_name, sharing_lab_institute, sharing_lab_location,
        genotype_details_json, other_genes_json, other_mutations
      ) VALUES (
        ${data.submittingLab}, ${data.strainName}, ${data.strainOrigin},
        ${data.strainCenterName || null}, ${data.strainCenterLocation || null}, ${data.strainCenterDate || null},
        ${data.sharingLabName || null}, ${data.sharingLabInstitute || null}, ${data.sharingLabLocation || null},
        ${genotypeString}, ${otherGenesString}, ${data.otherMutations || null}
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