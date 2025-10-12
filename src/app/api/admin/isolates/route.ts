import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

interface IsolateData {
  id: string;
  [key: string]: string;
}

const dataDir = path.join(process.cwd(), 'data');
const tsvFilePath = path.join(dataDir, 'isolate_submissions.tsv');
const jsonFilePath = path.join(dataDir, 'isolates.json');

// --- Helper function to read and parse the TSV file ---
async function readTsv(): Promise<IsolateData[]> {
  try {
    await fs.access(tsvFilePath);
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

// --- Helper function to write data back to TSV and JSON ---
async function writeData(data: IsolateData[]) {
    // Write to TSV
    if (data.length > 0) {
        const dataToWrite = data.map(({ id, ...rest }) => rest);
        const tsvString = stringify(dataToWrite, { header: true, delimiter: '\t' });
        await fs.writeFile(tsvFilePath, tsvString);
    } else {
         await fs.unlink(tsvFilePath).catch(() => {});
    }

    // Write to JSON
    // FIX 2: Simplified the map function to remove the 'id defined but never used' warning.
    const dataToWriteJson = data.map(item => ({...item}));
    await fs.writeFile(jsonFilePath, JSON.stringify(dataToWriteJson, null, 2));
}

// --- API Methods ---

export async function GET() {
  const submissions = await readTsv();
  return NextResponse.json({ submissions });
}

export async function PUT(request: NextRequest) {
  const updatedRow: IsolateData = await request.json();
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
