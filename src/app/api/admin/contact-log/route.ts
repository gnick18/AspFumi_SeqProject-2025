import { NextRequest, NextResponse } from 'next/server';
// IMPORT THE DATABASE DRIVER
import { neon } from '@neondatabase/serverless';

// This interface matches the frontend component (camelCase)
export interface ContactLogEntry {
  id: number;
  labName: string;
  institution: string;
  email: string;
  status: string;
  contactedBy: string;
  comments: string;
}

// Helper to convert database results (snake_case) to our frontend format (camelCase)
const dbToFrontend = (dbRow: Record<string, any>): ContactLogEntry => ({
  id: dbRow.id,
  labName: dbRow.lab_name,
  institution: dbRow.institution,
  email: dbRow.email,
  status: dbRow.status,
  contactedBy: dbRow.contacted_by,
  comments: dbRow.comments,
});

// --- API Methods ---

// GET: Fetches all contact log entries
export async function GET() {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    const dbResult = await sql`SELECT * FROM contact_log ORDER BY id`;
    const contacts = dbResult.map(dbToFrontend); // Convert to camelCase
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Database GET Error (contact-log):", error);
    return NextResponse.json({ error: "Failed to fetch contact log." }, { status: 500 });
  }
}

// POST: Creates a new, blank contact log entry
export async function POST() {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    const newDbEntry = await sql`
      INSERT INTO contact_log (lab_name, institution, email, status, contacted_by, comments) 
      VALUES ('', '', '', 'Not contacted', '', '') 
      RETURNING *;
    `;
    const newEntry = dbToFrontend(newDbEntry[0]); // Convert to camelCase
    return NextResponse.json({ success: true, newEntry });
  } catch (error) {
    console.error("Database POST Error (contact-log):", error);
    return NextResponse.json({ error: "Failed to create contact log entry." }, { status: 500 });
  }
}

// PUT: Updates an existing contact log entry
export async function PUT(request: NextRequest) {
  try {
    const updatedEntry: ContactLogEntry = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);

    await sql`
      UPDATE contact_log
      SET
        lab_name = ${updatedEntry.labName},
        institution = ${updatedEntry.institution},
        email = ${updatedEntry.email},
        status = ${updatedEntry.status},
        contacted_by = ${updatedEntry.contactedBy},
        comments = ${updatedEntry.comments}
      WHERE id = ${updatedEntry.id};
    `;
    return NextResponse.json({ success: true, updatedEntry });
  } catch (error) {
    console.error("Database PUT Error (contact-log):", error);
    return NextResponse.json({ error: "Failed to update contact log entry." }, { status: 500 });
  }
}

// DELETE: Removes a contact log entry
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const sql = neon(process.env.POSTGRES_URL!);
    await sql`DELETE FROM contact_log WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database DELETE Error (contact-log):", error);
    return NextResponse.json({ error: "Failed to delete contact log entry." }, { status: 500 });
  }
}

