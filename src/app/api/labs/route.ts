import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// This is a public-facing API route. Its only job is to read the
// labs.json file and provide it to the frontend components like the map.
export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const jsonFilePath = path.join(dataDir, 'labs.json');

    let labs = [];

    try {
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
      labs = JSON.parse(jsonData);
    } catch (error) {
      // If the file doesn't exist, it's not an error for the public map.
      // It just means no labs have been submitted yet. We'll return an empty array.
      console.log('labs.json not found, returning empty array to the map.');
    }

    return NextResponse.json({
      success: true,
      labs: labs,
    });

  } catch (error) {
    console.error('Error fetching labs for map:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}