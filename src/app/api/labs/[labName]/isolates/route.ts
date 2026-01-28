import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// This endpoint returns all isolates submitted by a specific lab
// Used by the isolate form to allow labs to edit existing submissions

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ labName: string }> }
) {
  try {
    const { labName } = await params;
    const decodedLabName = decodeURIComponent(labName);
    
    const sql = neon(process.env.POSTGRES_URL!);
    
    const isolates = await sql`
      SELECT 
        id,
        timestamp,
        submitting_lab,
        strain_name,
        strain_origin,
        strain_center_name,
        strain_center_location,
        strain_center_date,
        sharing_lab_name,
        sharing_lab_institute,
        sharing_lab_location,
        sharing_lab_date,
        inhouse_generation_date,
        genotype_details_json,
        other_genes_json,
        other_mutations,
        uv_mutagenesis,
        uv_exposure_details,
        sample_received,
        sample_received_date,
        unique_strain_id
      FROM isolate_submissions 
      WHERE submitting_lab = ${decodedLabName}
      ORDER BY timestamp DESC
    `;
    
    return NextResponse.json({ 
      success: true, 
      isolates,
      count: isolates.length 
    });
    
  } catch (error) {
    console.error("Database GET Error (lab isolates):", error);
    return NextResponse.json(
      { error: "Failed to fetch isolates for this lab.", success: false }, 
      { status: 500 }
    );
  }
}
