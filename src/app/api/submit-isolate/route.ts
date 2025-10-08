import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

    // Basic validation
    if (!data.submittingLab || !data.strainName) {
      return NextResponse.json(
        { error: 'Missing required fields: Submitting Lab and Strain Name.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // --- 1. Save to TSV File (with flattened/serialized data) ---

    // For the TSV, we will convert complex objects into JSON strings to fit them in a single cell.
    const genotypeString = JSON.stringify(data.genotype);
    const otherGenesString = JSON.stringify(data.otherGenes);
    
    const tsvRow = [
      timestamp,
      data.submittingLab,
      data.strainName,
      data.strainOrigin,
      data.strainCenterName,
      data.strainCenterLocation,
      data.strainCenterDate,
      data.sharingLabName,
      data.sharingLabInstitute,
      data.sharingLabLocation,
      genotypeString, // The entire genotype object as a string
      otherGenesString, // The entire 'other genes' array as a string
      data.otherMutations,
    ].join('\t');

    const dataDir = path.join(process.cwd(), 'data');
    const tsvFilePath = path.join(dataDir, 'isolate_submissions.tsv');

    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(tsvFilePath);
    } catch {
      // File doesn't exist, create it with headers
      const headers = [
        'timestamp',
        'submitting_lab',
        'strain_name',
        'strain_origin',
        'strain_center_name',
        'strain_center_location',
        'strain_center_date',
        'sharing_lab_name',
        'sharing_lab_institute',
        'sharing_lab_location',
        'genotype_details_json', // Column for the genotype JSON
        'other_genes_json',      // Column for the other genes JSON
        'other_mutations',
      ].join('\t');
      await fs.writeFile(tsvFilePath, headers + '\n');
    }

    await fs.appendFile(tsvFilePath, tsvRow + '\n');

    // --- 2. Save to JSON File (with full structure) ---

    const jsonFilePath = path.join(dataDir, 'isolates.json');
    let allIsolates = [];

    try {
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
      allIsolates = JSON.parse(jsonData);
    } catch {
      // File doesn't exist or is empty, we'll create a new one
    }

    // Add a unique ID to the new submission
    const newIsolateEntry = {
        id: `isolate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...data
    };

    allIsolates.push(newIsolateEntry);

    await fs.writeFile(jsonFilePath, JSON.stringify(allIsolates, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Isolate information submitted successfully!',
    });

  } catch (error) {
    console.error('Error processing isolate submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

