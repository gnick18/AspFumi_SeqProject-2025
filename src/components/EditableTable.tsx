'use client';

import { useState } from 'react';

// --- TYPE DEFINITIONS ---
interface Column {
  key: string;
  header: string;
  type?: 'text' | 'textarea'; // Allows for different input types
}

interface EditableTableProps {
  columns: Column[];
  data: any[];
  onSave: (updatedRow: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
}

// --- ROW COMPONENT ---
// Manages the state for a single row (viewing vs. editing)
const EditableRow = ({ row, columns, onSave, onDelete }: { row: any, columns: Column[], onSave: (updatedRow: any) => Promise<boolean>, onDelete: (id: string) => Promise<void> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(row);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave(rowData);
    if (success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleChange = (key: string, value: string) => {
    setRowData({ ...rowData, [key]: value });
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      {columns.map(col => (
        <td key={col.key} className="p-2 text-sm">
          {isEditing ? (
            col.type === 'textarea' ? (
              <textarea
                value={rowData[col.key]}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full p-1 border rounded text-xs"
                rows={4}
              />
            ) : (
              <input
                type="text"
                value={rowData[col.key]}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full p-1 border rounded"
              />
            )
          ) : (
            <span className="line-clamp-2">{rowData[col.key]}</span>
          )}
        </td>
      ))}
      <td className="p-2 text-right">
        {isEditing ? (
          <>
            <button onClick={handleSave} disabled={isSaving} className="text-sm text-green-600 hover:text-green-800 font-semibold disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="ml-2 text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
              Edit
            </button>
             <button onClick={() => onDelete(row.id)} className="ml-2 text-sm text-red-600 hover:text-red-800">
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};


// --- MAIN TABLE COMPONENT ---
const EditableTable = ({ columns, data, onSave, onDelete }: EditableTableProps) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map(col => (
              <th key={col.key} className="p-2 font-semibold text-sm">{col.header}</th>
            ))}
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <EditableRow key={row.id} row={row} columns={columns} onSave={onSave} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
