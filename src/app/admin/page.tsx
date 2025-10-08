'use client';

import { useEffect, useState } from 'react';
import EditableTable from '@/components/EditableTable'; // Corrected the import path
import type { Column } from '@/components/EditableTable';

// --- Interfaces for our data ---
export interface LabMetadata {
  id: string; // A unique ID is crucial for editing/deleting
  timestamp: string;
  lab_name: string;
  institution: string;
  city: string;
  state: string;
  country: string;
  contact_name: string;
  contact_email: string;
  research_use: string;
  comments: string;
  latitude: string;
  longitude: string;
  match_level: string;
}

export interface IsolateData {
  id: string; // A unique ID
  timestamp: string;
  submitting_lab: string;
  strain_name: string;
  strain_origin: string;
  strain_center_name?: string;
  strain_center_location?: string;
  strain_center_date?: string;
  sharing_lab_name?: string;
  sharing_lab_institute?: string;
  sharing_lab_location?: string;
  genotype_details_json: string;
  other_genes_json: string;
  other_mutations: string;
}

export default function AdminPage() {
  const [labSubmissions, setLabSubmissions] = useState<LabMetadata[]>([]);
  const [isolateSubmissions, setIsolateSubmissions] = useState<IsolateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'metadata' | 'isolates'>('metadata');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [labRes, isolateRes] = await Promise.all([
          fetch('/api/admin/metadata'),
          fetch('/api/admin/isolates')
        ]);

        if (!labRes.ok || !isolateRes.ok) {
          throw new Error('Failed to fetch one or more data sources.');
        }

        const labData = await labRes.json();
        const isolateData = await isolateRes.json();

        setLabSubmissions(labData.submissions || []);
        setIsolateSubmissions(isolateData.submissions || []);

      } catch (err) {
        console.error(err);
        setError('Failed to load submission data. Please check the server logs.');
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  const handleSave = async (updatedRow: LabMetadata | IsolateData, endpoint: 'metadata' | 'isolates') => {
    try {
      const response = await fetch(`/api/admin/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRow),
      });
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
      const response = await fetch(`/api/admin/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
       if (!response.ok) throw new Error('Failed to delete data.');
       
       if (endpoint === 'metadata') {
         setLabSubmissions(labs => labs.filter(lab => lab.id !== id));
       } else {
         setIsolateSubmissions(isolates => isolates.filter(iso => iso.id !== id));
       }
    } catch (deleteError) {
       console.error('Delete failed:', deleteError);
       alert('Error deleting data. Please check the console.');
    }
  };

  const labColumns: Column[] = [
    { key: 'lab_name', header: 'Lab Name' }, { key: 'institution', header: 'Institution' },
    { key: 'city', header: 'City' }, { key: 'country', header: 'Country' },
    { key: 'contact_email', header: 'Contact' }, { key: 'latitude', header: 'Lat' },
    { key: 'longitude', header: 'Lng' }, { key: 'match_level', header: 'Match' },
  ];

  const isolateColumns: Column[] = [
    { key: 'submitting_lab', header: 'Submitting Lab' }, { key: 'strain_name', header: 'Strain Name' },
    { key: 'strain_origin', header: 'Origin' },
    { key: 'genotype_details_json', header: 'Genotype (JSON)', type: 'textarea' },
    { key: 'other_genes_json', header: 'Other Genes (JSON)', type: 'textarea' },
  ];

  if (loading) return <div>Loading Admin Dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
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
