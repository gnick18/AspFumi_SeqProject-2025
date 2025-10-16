import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the shape of a single contact log entry
export type ContactStatus = "Not contacted" | "Contacted (x1)" | "Contacted (x2)" | "Responded (yes)" | "Responded (no)";
export interface ContactLogEntry {
  id: string;
  labName: string;
  institution: string;
  email: string;
  status: ContactStatus;
  contactedBy: string;
  comments: string;
}

const dataDir = path.join(process.cwd(), 'data');
const jsonFilePath = path.join(dataDir, 'contact_log.json');

// --- Helper Functions to Read/Write Data ---
async function readContacts(): Promise<ContactLogEntry[]> {
  try {
    await fs.access(jsonFilePath);
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    // If the file doesn't exist, return an empty array. It will be created on the first POST/PUT.
    return [];
  }
}

async function writeContacts(data: ContactLogEntry[]) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
}

// --- API Methods ---

// GET: Fetches all contact log entries
export async function GET() {
  const contacts = await readContacts();
  return NextResponse.json({ contacts });
}

// POST: Creates a new, blank contact log entry
export async function POST() {
  const contacts = await readContacts();
  const newEntry: ContactLogEntry = {
    id: `contact_${Date.now()}`,
    labName: '',
    institution: '',
    email: '',
    status: 'Not contacted',
    contactedBy: '',
	comments: '',
  };
  contacts.push(newEntry);
  await writeContacts(contacts);
  return NextResponse.json({ success: true, newEntry });
}

// PUT: Updates an existing contact log entry
export async function PUT(request: NextRequest) {
  const updatedEntry: ContactLogEntry = await request.json();
  const contacts = await readContacts();
  const index = contacts.findIndex(c => c.id === updatedEntry.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Contact entry not found' }, { status: 404 });
  }
  
  contacts[index] = updatedEntry;
  await writeContacts(contacts);
  return NextResponse.json({ success: true, updatedEntry });
}

// DELETE: Removes a contact log entry
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const contacts = await readContacts();
  const filteredContacts = contacts.filter(c => c.id !== id);
  
  if (contacts.length === filteredContacts.length) {
      return NextResponse.json({ error: 'Contact entry not found' }, { status: 404 });
  }

  await writeContacts(filteredContacts);
  return NextResponse.json({ success: true });
}