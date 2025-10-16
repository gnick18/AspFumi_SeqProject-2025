'use client';

import { useEffect, useState, FormEvent } from 'react';
// FIX: Changed from path alias to a direct relative path
import EditableTable from '../../components/EditableTable';
import type { Column } from '../../components/EditableTable';

// --- Interfaces for our data ---
export interface LabMetadata {
  id: string; timestamp: string; lab_name: string; institution: string; city: string;
  state: string; country: string; contact_name: string; contact_email: string;
  research_use: string; comments: string; latitude: string; longitude: string; match_level: string;
}

export interface IsolateData {
  id: string; timestamp: string; submitting_lab: string; strain_name: string; strain_origin: string;
  strain_center_name?: string; strain_center_location?: string; strain_center_date?: string;
  sharing_lab_name?: string; sharing_lab_institute?: string; sharing_lab_location?: string;
  genotype_details_json: string; other_genes_json: string; other_mutations: string;
}

export interface ContactLogEntry {
  id: string;
  labName: string;
  institution: string;
  email: string;
  status: "Not contacted" | "Contacted (x1)" | "Contacted (x2)" | "Responded (yes)" | "Responded (no)";
  contactedBy: string;
  comments: string;
}

const CORRECT_PASSWORD = 'toxins';

export default function AdminPage() {
  // --- STATE FOR AUTHENTICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // --- STATE FOR DATA ---
  const [labSubmissions, setLabSubmissions] = useState<LabMetadata[]>([]);
  const [isolateSubmissions, setIsolateSubmissions] = useState<IsolateData[]>([]);
  const [contactLog, setContactLog] = useState<ContactLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'metadata' | 'isolates'>('metadata');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only load data if the user is authenticated
    if (!isAuthenticated) return;

    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [labRes, isolateRes, contactRes] = await Promise.all([
          fetch('/api/admin/metadata'),
          fetch('/api/admin/isolates'),
          fetch('/api/admin/contact-log')
        ]);

        if (!labRes.ok || !isolateRes.ok || !contactRes.ok) {
          throw new Error('Failed to fetch one or more data sources.');
        }

        const labData = await labRes.json();
        const isolateData = await isolateRes.json();
        const contactData = await contactRes.json();

        setLabSubmissions(labData.submissions || []);
        setIsolateSubmissions(isolateData.submissions || []);
        setContactLog(contactData.contacts || []);

      } catch (err: unknown) {
        console.error(err);
        // Add a check to safely handle the error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while loading data.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, [isAuthenticated]); // Rerun this effect when authentication status changes

  // --- HANDLERS ---

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password.');
    }
  };

  const handleSave = async (updatedRow: LabMetadata | IsolateData, endpoint: 'metadata' | 'isolates') => {
    try {
        const response = await fetch(`/api/admin/${endpoint}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedRow), });
        if (!response.ok) throw new Error('Failed to save data.');
        if (endpoint === 'metadata') {
            setLabSubmissions(labs => labs.map(lab => lab.id === updatedRow.id ? (updatedRow as LabMetadata) : lab));
        } else {
            setIsolateSubmissions(isos => isos.map(iso => iso.id === updatedRow.id ? (updatedRow as IsolateData) : iso));
        }
        return true;
    } catch (saveError) {
        console.error('Save failed:', saveError);
        alert('Error saving data. Please check the console.');
        return false;
    }
  };

  const handleDelete = async (id: string, endpoint: 'metadata' | 'isolates') => {
    if (!confirm('Are you sure you want to delete this row? This action cannot be undone.')) return;
    try {
        const response = await fetch(`/api/admin/${endpoint}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }), });
        if (!response.ok) throw new Error('Failed to delete data.');
        if (endpoint === 'metadata') { setLabSubmissions(labs => labs.filter(lab => lab.id !== id));
        } else { setIsolateSubmissions(isolates => isolates.filter(iso => iso.id !== id)); }
    } catch (deleteError) {
        console.error('Delete failed:', deleteError);
        alert('Error deleting data. Please check the console.');
    }
  };

  const handleSaveContact = async (updatedRow: ContactLogEntry) => {
    try {
      const response = await fetch('/api/admin/contact-log', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedRow) });
      if (!response.ok) throw new Error('Failed to save contact.');
      setContactLog(contacts => contacts.map(c => c.id === updatedRow.id ? updatedRow : c));
      return true;
    } catch (e) { console.error(e); alert('Failed to save contact.'); return false; }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact log entry?')) return;
    try {
      await fetch('/api/admin/contact-log', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      setContactLog(contacts => contacts.filter(c => c.id !== id));
    } catch (e) { console.error(e); alert('Failed to delete contact.'); }
  };
  
  const handleAddNewContact = async () => {
      try {
        const response = await fetch('/api/admin/contact-log', { method: 'POST' });
        const { newEntry } = await response.json();
        if (newEntry) {
            setContactLog(currentContacts => [...currentContacts, newEntry]);
        }
      } catch(e) { console.error(e); alert('Failed to add new row.'); }
  };

  const labColumns: Column[] = [
    { key: 'lab_name', header: 'Lab Name' }, { key: 'institution', header: 'Institution' }, { key: 'city', header: 'City' },
    { key: 'country', header: 'Country' }, { key: 'contact_email', header: 'Contact' }, { key: 'latitude', header: 'Lat' },
    { key: 'longitude', header: 'Lng' }, { key: 'match_level', header: 'Match' },
  ];
  const isolateColumns: Column[] = [
    { key: 'submitting_lab', header: 'Submitting Lab' }, { key: 'strain_name', header: 'Strain Name' }, { key: 'strain_origin', header: 'Origin' },
    { key: 'genotype_details_json', header: 'Genotype (JSON)', type: 'textarea' }, { key: 'other_genes_json', header: 'Other Genes (JSON)', type: 'textarea' },
  ];
  const contactColumns: Column[] = [
    { key: 'labName', header: 'Lab Name' }, { key: 'institution', header: 'Institution' }, { key: 'email', header: 'Email' },
    { key: 'status', header: 'Contacted?', selectOptions: ["Not contacted", "Contacted (x1)", "Contacted (x2)", "Responded (yes)", "Responded (no)"] },
    { key: 'contactedBy', header: 'Contacted By' },
    { key: 'comments', header: "Comments", type: 'textarea'}
  ];

  // --- RENDER LOGIC ---

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Admin Access</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
              <input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-600 text-center">{passwordError}</p>
            )}
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading Admin Dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-8 p-4 border rounded-lg bg-white shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lab Outreach Tracker</h2>
            <button onClick={handleAddNewContact} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                + Add New Row
            </button>
          </div>
          <EditableTable columns={contactColumns} data={contactLog} onSave={handleSaveContact} onDelete={handleDeleteContact} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded-lg shadow"><p className="text-3xl font-bold text-blue-800">{labSubmissions.length}</p><p className="text-sm text-blue-600">Total Labs Submitted</p></div>
        <div className="p-4 bg-green-100 rounded-lg shadow"><p className="text-3xl font-bold text-green-800">{isolateSubmissions.length}</p><p className="text-sm text-green-600">Total Isolates Submitted</p></div>
        <div className="p-4 bg-purple-100 rounded-lg shadow"><p className="text-3xl font-bold text-purple-800">{labSubmissions.length > 0 ? (isolateSubmissions.length / labSubmissions.length).toFixed(1) : 0}</p><p className="text-sm text-purple-600">Avg. Isolates per Lab</p></div>
      </div>
      <div className="flex border-b mb-4">
        <button onClick={() => setActiveTab('metadata')} className={`py-2 px-4 ${activeTab === 'metadata' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}>Lab Metadata ({labSubmissions.length})</button>
        <button onClick={() => setActiveTab('isolates')} className={`py-2 px-4 ${activeTab === 'isolates' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}>Isolate Submissions ({isolateSubmissions.length})</button>
      </div>
      {activeTab === 'metadata' ? (
        <EditableTable columns={labColumns} data={labSubmissions} onSave={(row) => handleSave(row, 'metadata')} onDelete={(id) => handleDelete(id, 'metadata')} />
      ) : (
        <EditableTable columns={isolateColumns} data={isolateSubmissions} onSave={(row) => handleSave(row, 'isolates')} onDelete={(id) => handleDelete(id, 'isolates')} />
      )}
    </div>
  );
}
