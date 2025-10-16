'use client';

import { useState } from 'react';

// --- TYPE DEFINITIONS ---
export interface Column {
  key: string;
  header: string;
  type?: 'text' | 'textarea';
  // FIX 1: Added an optional 'selectOptions' property.
  // If this exists, the cell will render as a dropdown.
  selectOptions?: readonly string[]; 
}

interface EditableTableProps<T extends { id: string }> {
  columns: Column[];
  data: T[];
  onSave: (updatedRow: T) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
}

const EditableRow = <T extends { id: string }>({ row, columns, onSave, onDelete }: { row: T, columns: Column[], onSave: (updatedRow: T) => Promise<boolean>, onDelete: (id: string) => Promise<void> }) => {
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
        <td key={col.key} className="p-2 text-sm align-top">
          {isEditing ? (
            // FIX 2: Added new logic to render a <select> dropdown if 'selectOptions' are provided.
            col.selectOptions ? (
              <select
                value={rowData[col.key as keyof T] as string}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full p-1 border rounded text-xs"
              >
                {col.selectOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : col.type === 'textarea' ? (
              <textarea
                value={rowData[col.key as keyof T] as string}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full p-1 border rounded text-xs"
                rows={4}
              />
            ) : (
              <input
                type="text"
                value={rowData[col.key as keyof T] as string}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full p-1 border rounded"
              />
            )
          ) : (
            <span className="line-clamp-2">{rowData[col.key as keyof T] as string}</span>
          )}
        </td>
      ))}
      <td className="p-2 text-right align-top">
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

const EditableTable = <T extends { id: string }>({ columns, data, onSave, onDelete }: EditableTableProps<T>) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available for this category.</p>;
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
