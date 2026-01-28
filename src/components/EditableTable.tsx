'use client';

import { useState, useEffect, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
export interface Column {
  key: string;
  header: string;
  type?: 'text' | 'textarea' | 'checkbox' | 'date';
  // If this exists, the cell will render as a dropdown.
  selectOptions?: readonly string[];
  // For checkbox type: the key of the associated date field
  dateField?: string;
  // For readonly fields (like unique_strain_id)
  readonly?: boolean;
}

interface EditableTableProps<T extends { id: string }> {
  columns: Column[];
  data: T[];
  onSave: (updatedRow: T) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
}

// --- MODAL COMPONENTS ---

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

const DatePickerModal = ({ isOpen, onClose, onConfirm }: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Default to today's date
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Sample Received</h3>
        <p className="text-sm text-gray-600 mb-4">Please select the date the sample was received:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-500 focus:outline-none"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedDate)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            No, Keep It
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
};

// --- EDITABLE ROW COMPONENT ---

const EditableRow = <T extends { id: string }>({ 
  row, 
  columns, 
  onSave, 
  onDelete,
  onCheckboxClick
}: { 
  row: T, 
  columns: Column[], 
  onSave: (updatedRow: T) => Promise<boolean>, 
  onDelete: (id: string) => Promise<void>,
  onCheckboxClick: (row: T, col: Column, currentValue: boolean) => void
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(row);
  const [isSaving, setIsSaving] = useState(false);

  // Update rowData when row changes (for checkbox updates)
  useEffect(() => {
    setRowData(row);
  }, [row]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave(rowData);
    if (success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleChange = (key: string, value: string | boolean) => {
    setRowData({ ...rowData, [key]: value });
  };

  // Render cell based on column type
  const renderCell = (col: Column) => {
    const value = rowData[col.key as keyof T];

    // Handle checkbox type (always interactive, not dependent on edit mode)
    if (col.type === 'checkbox') {
      const isChecked = value === true || value === 'true';
      const dateCol = col.dateField ? columns.find(c => c.key === col.dateField) : null;
      const dateValue = col.dateField ? rowData[col.dateField as keyof T] as string : null;
      
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheckboxClick(rowData, col, isChecked)}
            className="w-5 h-5 cursor-pointer accent-green-600"
            disabled={isSaving}
          />
          {isChecked && dateValue && dateCol && (
            <span className="text-xs text-gray-500">{dateValue}</span>
          )}
        </div>
      );
    }

    // Non-edit mode display
    if (!isEditing) {
      if (col.type === 'date' && col.key.includes('received_date')) {
        // Hide date column in display - it's shown next to checkbox
        return null;
      }
      return <span className="line-clamp-2">{(value as string) ?? ''}</span>;
    }

    // Edit mode - handle readonly fields
    if (col.readonly) {
      return <span className="text-gray-500">{(value as string) ?? ''}</span>;
    }

    // Edit mode - render appropriate input type
    if (col.selectOptions) {
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => handleChange(col.key, e.target.value)}
          className="w-full p-1 border rounded text-xs"
        >
          {col.selectOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    if (col.type === 'textarea') {
      return (
        <textarea
          value={(value as string) ?? ''}
          onChange={(e) => handleChange(col.key, e.target.value)}
          className="w-full p-1 border rounded text-xs"
          rows={4}
        />
      );
    }

    if (col.type === 'date') {
      return (
        <input
          type="date"
          value={(value as string) ?? ''}
          onChange={(e) => handleChange(col.key, e.target.value)}
          className="w-full p-1 border rounded"
        />
      );
    }

    // Default: text input
    return (
      <input
        type="text"
        value={(value as string) ?? ''}
        onChange={(e) => handleChange(col.key, e.target.value)}
        className="w-full p-1 border rounded"
      />
    );
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      {columns.map(col => {
        // Skip rendering date column if it's associated with a checkbox (shown inline)
        if (col.type === 'date' && col.key.includes('received_date') && !isEditing) {
          return null;
        }
        return (
          <td key={col.key} className="p-2 text-sm align-top">
            {renderCell(col)}
          </td>
        );
      })}
      <td className="p-2 text-right align-top">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="text-sm text-green-600 hover:text-green-800 font-semibold disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="ml-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(row.id)} 
              className="ml-2 text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

// --- MAIN TABLE COMPONENT ---

const EditableTable = <T extends { id: string }>({ columns, data, onSave, onDelete }: EditableTableProps<T>) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUncheckConfirm, setShowUncheckConfirm] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{row: T, col: Column, value: boolean} | null>(null);

  // Handle checkbox click - triggers modal
  const handleCheckboxClick = useCallback((row: T, col: Column, currentValue: boolean) => {
    setPendingUpdate({ row, col, value: !currentValue });
    if (!currentValue) {
      // Currently unchecked -> trying to check -> show date picker
      setShowDatePicker(true);
    } else {
      // Currently checked -> trying to uncheck -> show confirmation
      setShowUncheckConfirm(true);
    }
  }, []);

  // Handle date confirmation from modal
  const handleDateConfirm = async (date: string) => {
    if (pendingUpdate) {
      const { row, col } = pendingUpdate;
      const updatedRow = {
        ...row,
        [col.key]: true,
        ...(col.dateField ? { [col.dateField]: date } : {})
      };
      
      // Save the change
      await onSave(updatedRow);
    }
    setShowDatePicker(false);
    setPendingUpdate(null);
  };

  // Handle uncheck confirmation
  const handleUncheckConfirm = async () => {
    if (pendingUpdate) {
      const { row, col } = pendingUpdate;
      const updatedRow = {
        ...row,
        [col.key]: false,
        ...(col.dateField ? { [col.dateField]: null } : {})
      };
      
      // Save the change
      await onSave(updatedRow);
    }
    setShowUncheckConfirm(false);
    setPendingUpdate(null);
  };

  const handleUncheckCancel = () => {
    setShowUncheckConfirm(false);
    setPendingUpdate(null);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
    setPendingUpdate(null);
  };

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available for this category.</p>;
  }

  // Filter out hidden columns (date columns that are shown inline with checkboxes)
  const visibleColumns = columns.filter(col => {
    if (col.type === 'date' && col.key.includes('received_date')) {
      return false; // Hide from header as it's shown inline
    }
    return true;
  });

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              {visibleColumns.map(col => (
                <th key={col.key} className="p-2 font-semibold text-sm">{col.header}</th>
              ))}
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <EditableRow 
                key={row.id} 
                row={row} 
                columns={columns} 
                onSave={onSave} 
                onDelete={onDelete}
                onCheckboxClick={handleCheckboxClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals rendered outside of table */}
      <DatePickerModal
        isOpen={showDatePicker}
        onClose={handleDatePickerClose}
        onConfirm={handleDateConfirm}
      />

      <ConfirmationModal
        isOpen={showUncheckConfirm}
        title="Mark as Not Received?"
        message="Are you sure you want to mark this sample as not received? This will clear the received date."
        onConfirm={handleUncheckConfirm}
        onCancel={handleUncheckCancel}
      />
    </>
  );
};

export default EditableTable;
