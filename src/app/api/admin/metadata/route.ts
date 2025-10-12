import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

interface LabMetadata {
  id: string;
  [key: string]: string;
}

const dataDir = path.join(process.cwd(), 'data');
const tsvFilePath = path.join(dataDir, 'lab_submissions.tsv');
const jsonFilePath = path.join(dataDir, 'labs.json');
const headers = [
    'timestamp', 'lab_name', 'institution', 'city', 'state', 'country',
    'contact_name', 'contact_email', 'research_use', 'comments',
    'latitude', 'longitude', 'match_level'
];

// --- NEW: Function to create the initial data files with admin labs ---
async function seedInitialData() {
  const adminLabs = [
    {
      timestamp: new Date('2025-10-01T10:00:00.000Z').toISOString(),
      lab_name: 'Keller Lab',
      institution: 'University of Wisconsin-Madison',
      city: 'Madison',
      state: 'WI',
      country: 'United States',
      contact_name: 'Nancy Keller',
      contact_email: 'npkeller@wisc.com',
      research_use: 'Medical microbiology',
      comments: 'This is a pre-seeded admin lab entry.',
      latitude: '43.0731',
      longitude: '-89.4012',
      match_level: 'city'
    },
    {
      timestamp: new Date('2025-10-01T10:01:00.000Z').toISOString(),
      lab_name: 'Rokas Lab',
      institution: 'Vanderbilt University',
      city: 'Nashville',
      state: 'TN',
      country: 'United States',
      contact_name: 'Antonis Rokas',
      contact_email: 'admin@example.com',
      research_use: 'Fungal evolution and pathogenesis.',
      comments: 'This is a pre-seeded admin lab entry.',
      latitude: '36.1627',
      longitude: '-86.7816',
      match_level: 'city'
    },
    {
      timestamp: new Date('2025-10-01T10:02:00.000Z').toISOString(),
      lab_name: 'Barber Lab',
      institution: 'Friedrich Schiller University Jena',
      city: 'Jena',
      state: '',
      country: 'Germany',
      contact_name: 'Amelia Barber',
      contact_email: 'amelia.barber@uni-jena.de',
      research_use: 'Fungal genetics and pathogenesis.',
      comments: 'This is a pre-seeded admin lab entry.',
      latitude: '50.9271',
      longitude: '11.5892',
      match_level: 'city'
    },
    {
      timestamp: new Date('2025-10-01T10:00:00.000Z').toISOString(),
      lab_name: 'Gluck-Thaler Lab',
      institution: 'University of Wisconsin-Madison',
      city: 'Madison',
      state: 'WI',
      country: 'United States',
      contact_name: 'Emile Gluck-Thaler',
      contact_email: 'gluckthaler@wisc.edu',
      research_use: 'Plant pathology fungal genomics',
      comments: 'This is a pre-seeded admin lab entry.',
      latitude: '43.0731',
      longitude: '-89.4012',
      match_level: 'city'
    }
  ];

  const tsvString = stringify(adminLabs, { header: true, columns: headers, delimiter: '\t' });
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(tsvFilePath, tsvString);

  const jsonData = adminLabs.map((lab, index) => ({
      id: lab.timestamp || `seeded-${index}`,
      name: lab.lab_name,
      institution: lab.institution,
      location: `${lab.city}${lab.state ? ', ' + lab.state : ''}, ${lab.country}`,
      country: lab.country,
      lat: parseFloat(lab.latitude),
      lng: parseFloat(lab.longitude),
      matchLevel: lab.match_level
  }));
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
}


async function readTsv(): Promise<LabMetadata[]> {
  try {
    const fileContent = await fs.readFile(tsvFilePath, 'utf-8');
    // FIX 1: Replaced 'any' with a more specific type
    const records: Record<string, string>[] = parse(fileContent, {
      delimiter: '\t',
      columns: true,
      skip_empty_lines: true,
    });
    return records.map((rec) => ({ id: rec.timestamp, ...rec }));
  } catch {
    return [];
  }
}

async function writeData(data: LabMetadata[]) {
    if (data.length > 0) {
        // FIX 2: Added underscore to 'id' to signal it's intentionally unused.
        const dataToWrite = data.map(({ id: _id, ...rest }) => rest);
        const tsvString = stringify(dataToWrite, { header: true, delimiter: '\t', columns: headers });
        await fs.writeFile(tsvFilePath, tsvString);
    } else {
        await fs.unlink(tsvFilePath).catch(() => {});
    }

    const jsonData = data.map(({ id, lab_name, institution, city, state, country, latitude, longitude, match_level }) => ({
        id,
        name: lab_name,
        institution,
        location: `${city}${state ? ', ' + state : ''}, ${country}`,
        country,
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        matchLevel: match_level
    }));
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
}

// --- API Methods ---

export async function GET() {
  try {
    await fs.access(tsvFilePath);
  } catch {
    await seedInitialData();
  }
  
  const submissions = await readTsv();
  return NextResponse.json({ submissions });
}

export async function PUT(request: NextRequest) {
  const updatedRow: LabMetadata = await request.json();
  // FIX 3: Changed 'let' to 'const'
  const submissions = await readTsv();
  const index = submissions.findIndex(s => s.id === updatedRow.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }
  
  submissions[index] = { ...submissions[index], ...updatedRow };
  await writeData(submissions);

  return NextResponse.json({ success: true, updatedRow });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  // FIX 4: Changed 'let' to 'const'
  const submissions = await readTsv();
  const filteredSubmissions = submissions.filter(s => s.id !== id);
  
  if (submissions.length === filteredSubmissions.length) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }

  await writeData(filteredSubmissions);

  return NextResponse.json({ success: true });
}
