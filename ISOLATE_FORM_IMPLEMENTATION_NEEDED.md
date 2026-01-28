# Isolate Form Edit Functionality Implementation Guide

## Status: Partial Implementation Complete

### ✅ Completed:
1. Database migration SQL (`database-migration-sample-tracking.sql`)
2. EditableTable component with checkbox support
3. Admin page interface updates
4. Admin API route updates for new fields
5. New API endpoint: `/api/labs/[labName]/isolates/route.ts`
6. Updated `/api/submit-isolate/route.ts` to handle INSERT vs UPDATE

### 🚧 Remaining: Isolate Form Page Modifications

The isolate form at [`src/app/isolate-form/page.tsx`](src/app/isolate-form/page.tsx:1) needs the following additions:

#### 1. New State Variables (Add after line 156)

```typescript
// New state for edit functionality
const [existingIsolates, setExistingIsolates] = useState<any[]>([]);
const [loadingExistingIsolates, setLoadingExistingIsolates] = useState(false);
const [selectedExistingId, setSelectedExistingId] = useState<string>('new');
const [isEditMode, setIsEditMode] = useState(false);
const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
```

#### 2. New Interfaces (Add after line 61)

```typescript
// Interface for existing isolate from database
interface ExistingIsolate {
  id: string;
  strain_name: string;
  unique_strain_id: string;
  genotype_details_json: string;
  other_genes_json: string;
  // ... all other isolate fields
}
```

#### 3. Fetch Existing Isolates Effect (Add after line 236)

```typescript
// Fetch existing isolates when lab is selected
useEffect(() => {
  const fetchExistingIsolates = async () => {
    if (!formData.submitting_lab) {
      setExistingIsolates([]);
      return;
    }
    
    try {
      setLoadingExistingIsolates(true);
      const encodedLabName = encodeURIComponent(formData.submitting_lab);
      const response = await fetch(`/api/labs/${encodedLabName}/isolates`);
      
      if (response.ok) {
        const data = await response.json();
        setExistingIsolates(data.isolates || []);
      }
    } catch (error) {
      console.error('Failed to fetch existing isolates:', error);
    } finally {
      setLoadingExistingIsolates(false);
    }
  };
  
  if (isAuthenticated) {
    fetchExistingIsolates();
  }
}, [formData.submitting_lab, isAuthenticated]);
```

#### 4. Handle Strain Selection Function (Add before handleFormSubmit)

```typescript
const handleStrainSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedExistingId(value);
  
  if (value === 'new') {
    // Clear form for new entry
    setIsEditMode(false);
    setFormData(prev => ({
      ...prev,
      strain_name: '',
      genotype: {
        ku: { present: '', kuType: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' },
        pyrG: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' },
        argB: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' },
      },
      other_genes: [],
      other_mutations: '',
      uv_mutagenesis: '',
      uv_exposure_details: '',
      strain_origin: '', strain_center_name: '', strain_center_location: '', strain_center_date: '',
      sharing_lab_name: '', sharing_lab_institute: '', sharing_lab_location: '', sharing_lab_date: '',
      inhouse_generation_date: ''
    }));
  } else {
    // Populate form with existing data
    const existing = existingIsolates.find(iso => iso.unique_strain_id === value);
    if (existing) {
      setIsEditMode(true);
      
      // Parse JSON fields
      const genotype = JSON.parse(existing.genotype_details_json || '{}');
      const other_genes = existing.other_genes_json !== "No other reported mutations in isolate" 
        ? JSON.parse(existing.other_genes_json || '[]') 
        : [];
      
      setFormData(prev => ({
        ...prev,
        strain_name: existing.strain_name,
        genotype: genotype,
        other_genes: other_genes,
        other_mutations: existing.other_mutations || '',
        uv_mutagenesis: existing.uv_mutagenesis || '',
        uv_exposure_details: existing.uv_exposure_details || '',
        strain_origin: existing.strain_origin || '',
        strain_center_name: existing.strain_center_name || '',
        strain_center_location: existing.strain_center_location || '',
        strain_center_date: existing.strain_center_date || '',
        sharing_lab_name: existing.sharing_lab_name || '',
        sharing_lab_institute: existing.sharing_lab_institute || '',
        sharing_lab_location: existing.sharing_lab_location || '',
        sharing_lab_date: existing.sharing_lab_date || '',
        inhouse_generation_date: existing.inhouse_generation_date || ''
      }));
    }
  }
};
```

#### 5. Update handleFormSubmit (Modify existing function around line 461)

Add confirmation modal check before submission:

```typescript
const handleFormSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setSubmitMessage('');

  // Validate form before submitting
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setSubmitMessage('Please fill out all required fields marked with *');
    return;
  }

  // If editing existing isolate, show confirmation
  if (isEditMode && selectedExistingId !== 'new') {
    setShowUpdateConfirmation(true);
    return; // Wait for confirmation
  }

  // Proceed with submission
  await submitForm();
};

// New function to handle actual submission
const submitForm = async () => {
  setIsSubmitting(true);
  
  const { genotype, other_genes, ...rest } = formData;
  const payload = {
    ...rest,
    genotype_details_json: JSON.stringify(genotype, null, 2),
    other_genes_json: other_genes.length > 0 
      ? JSON.stringify(other_genes, null, 2) 
      : "No other reported mutations in isolate",
  };

  try {
    const response = await fetch('/api/submit-isolate', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      setSubmitMessage(result.message || 'Isolate information submitted successfully!');
      
      // Reset form but keep lab selection
      setFormData(prev => ({
        ...prev,
        submitting_lab: prev.submitting_lab,
        strain_name: '',
        genotype: { ku: { present: '', kuType: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' }, pyrG: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' }, argB: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' }},
        other_genes: [],
        other_mutations: '',
        uv_mutagenesis: '',
        uv_exposure_details: '',
        strain_origin: '', strain_center_name: '', strain_center_location: '', strain_center_date: '',
        sharing_lab_name: '', sharing_lab_institute: '', sharing_lab_location: '', sharing_lab_date: '',
        inhouse_generation_date: ''
      }));
      
      setSelectedExistingId('new');
      setIsEditMode(false);
      setErrors({});
      
      // Refresh existing isolates list
      if (formData.submitting_lab) {
        const encodedLabName = encodeURIComponent(formData.submitting_lab);
        const response = await fetch(`/api/labs/${encodedLabName}/isolates`);
        if (response.ok) {
          const data = await response.json();
          setExistingIsolates(data.isolates || []);
        }
      }
    } else { 
      const errorText = await response.text();
      console.error("Server responded with an error:", errorText);
      setSubmitMessage(`Error: Failed to submit. The server responded: ${errorText}`);
    }
  } catch (error) {
    console.error("Fetch failed in handleFormSubmit:", error); 
    setSubmitMessage('An error occurred. Please check the developer console for details.');
  } finally { 
    setIsSubmitting(false); 
  }
};
```

#### 6. Confirmation Modal Component (Add before return statement)

```tsx
// Confirmation Modal
const UpdateConfirmationModal = () => {
  if (!showUpdateConfirmation) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Existing Isolate?</h3>
        <p className="text-sm text-gray-600 mb-6">
          You are about to update the data for strain <strong>{formData.strain_name}</strong>. 
          This will overwrite the existing record. Are you sure you want to continue?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowUpdateConfirmation(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowUpdateConfirmation(false);
              submitForm();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Yes, Update
          </button>
        </div>
      </div>
    </div>
  );
};
```

#### 7. Update Form UI (Modify around line 610)

Replace the strain_name input section with:

```tsx
<div>
  <label htmlFor="strain_selection" className="block text-sm font-medium mb-2">
    Strain Name/ID <span className="text-red-500 font-bold">*</span>
  </label>
  
  {/* Show dropdown if lab is selected and has existing isolates */}
  {formData.submitting_lab && existingIsolates.length > 0 ? (
    <>
      <select 
        id="strain_selection"
        value={selectedExistingId}
        onChange={handleStrainSelection}
        className={`w-full p-3 border-2 rounded-lg mb-2 ${errors.strain_name ? 'border-red-500' : 'border-[var(--silver)]'}`}
        disabled={loadingExistingIsolates}
      >
        <option value="new">-- Enter New Strain --</option>
        {existingIsolates.map((isolate) => (
          <option key={isolate.unique_strain_id} value={isolate.unique_strain_id}>
            {isolate.strain_name} (existing)
          </option>
        ))}
      </select>
      
      {/* Show text input only if "new" is selected */}
      {selectedExistingId === 'new' && (
        <input 
          type="text" 
          id="strain_name" 
          value={formData.strain_name} 
          onChange={(e) => handleFormChange('strain_name', e.target.value)} 
          className={`w-full p-3 border-2 rounded-lg ${errors.strain_name ? 'border-red-500' : 'border-[var(--silver)]'}`} 
          placeholder="e.g., A1163, CEA17" 
          required 
        />
      )}
      
      {isEditMode && (
        <p className="text-sm text-blue-600 mt-1">
          ℹ️ Editing existing isolate. Changes will update the record.
        </p>
      )}
    </>
  ) : (
    /* Show regular text input if no lab selected or no existing isolates */
    <input 
      type="text" 
      id="strain_name" 
      value={formData.strain_name} 
      onChange={(e) => handleFormChange('strain_name', e.target.value)} 
      className={`w-full p-3 border-2 rounded-lg ${errors.strain_name ? 'border-red-500' : 'border-[var(--silver)]'}`} 
      placeholder="e.g., A1163, CEA17" 
      required 
    />
  )}
  
  {errors.strain_name && <p className="text-red-500 text-xs mt-1">{errors.strain_name}</p>}
</div>
```

#### 8. Add Modal to Render (Before closing </div> in return statement)

Add this line:
```tsx
<UpdateConfirmationModal />
```

## Testing Checklist

Once implemented, test:

1. ✅ Select a lab from dropdown
2. ✅ Verify existing isolates appear in strain dropdown
3. ✅ Select "New Entry" - form should be empty
4. ✅ Select existing isolate - form should populate with data
5. ✅ Edit existing isolate and submit - should show confirmation modal
6. ✅ Confirm update - should update the record
7. ✅ Submit new isolate - should create new record with unique_strain_id
8. ✅ Verify unique_strain_id format: "StrainName__LabName"

## Database Reminder

Don't forget to run [`database-migration-sample-tracking.sql`](database-migration-sample-tracking.sql:1) on your Neon database before testing!
