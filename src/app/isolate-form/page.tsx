'use client';

import { useState, FormEvent, useEffect } from 'react';

const CORRECT_PASSWORD = 'fumi';

// --- STATE INTERFACES ---

interface MutationInfo {
  present: 'Yes' | 'No' | '';
  complemented: 'Yes' | 'No' | '';
  method: string;
  markerGene: string;
  chemicalName: string;
  otherMethod: string;
  mutationDate: string;
}

interface KuMutationInfo extends MutationInfo {
    kuType: 'ku70' | 'ku80' | '';
}

interface OtherGeneInfo extends MutationInfo {
    geneName: string;
}

interface GenotypeInfo {
  ku: KuMutationInfo;
  pyrG: MutationInfo;
  argB: MutationInfo;
}

interface IsolateFormData {
  submitting_lab: string;
  strain_name: string;
  genotype: GenotypeInfo;
  other_genes: OtherGeneInfo[];
  other_mutations: string;
  strain_origin: string;
  strain_center_name: string;
  strain_center_location: string;
  strain_center_date: string;
  sharing_lab_name: string;
  sharing_lab_institute: string;
  sharing_lab_location: string;
}

// Type for our new errors state
type FormErrors = {
    [key in keyof IsolateFormData]?: string;
};


// --- COMPONENT ---

export default function IsolateForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [labNames, setLabNames] = useState<string[]>([]);
  const [loadingLabs, setLoadingLabs] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const [formData, setFormData] = useState<IsolateFormData>({
    submitting_lab: '',
    strain_name: '',
    genotype: {
      ku: { present: '', complemented: '', kuType: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
      pyrG: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
      argB: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
    },
    other_genes: [],
    other_mutations: '',
    strain_origin: '',
    strain_center_name: '',
    strain_center_location: '',
    strain_center_date: '',
    sharing_lab_name: '',
    sharing_lab_institute: '',
    sharing_lab_location: '',
  });

  // --- NEW: State to hold validation errors ---
  const [errors, setErrors] = useState<FormErrors>({});

  //Adding in the hook
  useEffect(() => {
    setHasMounted(true);
  }, []); // The empty array [] ensures this runs only once on the client

  useEffect(() => {
    const fetchLabNames = async () => {
      try {
        setLoadingLabs(true);
        const response = await fetch('/api/labs');
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.labs)) {
            const validNames = data.labs
              .map((lab: { name: string }) => lab.name)
              .filter((name: string): name is string => typeof name === 'string' && name.length > 0);
            
            // FIX: Changed to Array.from() to preserve the string[] type.
            const uniqueNames = [...new Set(validNames)];
            const string_uniqueNames: string[] = uniqueNames as string[]
            setLabNames(string_uniqueNames.sort((a, b) => a.localeCompare(b)));
          }
        }
      } catch (error) {
        console.error("Failed to fetch lab names:", error);
      } finally {
        setLoadingLabs(false);
      }
    };
    
    if (isAuthenticated) {
        fetchLabNames();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please contact the organizing team for the correct password.');
    }
  };
  
  const handleFormChange = (field: string, value: string) => {
    // --- NEW: Clear error when user starts typing ---
    if (errors[field as keyof FormErrors]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field as keyof FormErrors];
            return newErrors;
        });
    }

    setFormData(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        if (field.startsWith('genotype.')) {
            const [, mutation, key] = field.split('.');
            const mutationState = newState.genotype[mutation as keyof GenotypeInfo];
            (mutationState as any)[key] = value;
        } else if (field.startsWith('other_genes.')) {
            const [, indexStr, key] = field.split('.');
            const index = parseInt(indexStr, 10);
            const geneState = newState.other_genes[index];
            (geneState as any)[key] = value;
        } else {
            (newState as any)[field] = value;
        }
        return newState;
    });
  };

  const addOtherGene = () => {
    setFormData(prev => ({ ...prev, other_genes: [ ...prev.other_genes, { geneName: '', present: 'Yes', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' } ] }));
  };

  const removeOtherGene = (indexToRemove: number) => {
    setFormData(prev => ({ ...prev, other_genes: prev.other_genes.filter((_, index) => index !== indexToRemove) }));
  };

  // --- NEW: Validation function ---
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.submitting_lab) {
        newErrors.submitting_lab = 'Submitting Laboratory Name is required.';
    }
    if (!formData.strain_name.trim()) {
        newErrors.strain_name = 'Strain Name/ID is required.';
    }
    return newErrors;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');

    // --- NEW: Validate form before submitting ---
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSubmitMessage('Please fill out all required fields marked with *');
        return; // Stop the submission
    }

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
        setFormData(prev => ({ 
            ...prev,
            submitting_lab: prev.submitting_lab,
            strain_name: '', 
            genotype: { ku: { present: '', complemented: '', kuType: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' }, pyrG: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' }, argB: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' }}, 
            other_genes: [], 
            other_mutations: '', 
            strain_origin: '', strain_center_name: '', strain_center_location: '', strain_center_date: '', 
            sharing_lab_name: '', sharing_lab_institute: '', sharing_lab_location: '' 
        }));
        setErrors({}); // Clear errors on successful submission
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

  if (!hasMounted) {
    return null;
  }
  if (!isAuthenticated) {
    return (
        <div className="max-w-2xl mx-auto"><h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>Isolate Information Form</h2><div className="bg-white/50 p-8 rounded-lg shadow-md"><div className="mb-6"><h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--slate-gray)' }}>Access Required</h3><p className="text-base mb-4">Please enter the password to access the submission form for isolate information. Each strain you send should have its own submission.</p></div><form onSubmit={handlePasswordSubmit} className="space-y-4"><div><label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label><input type="password" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Enter your password" required /></div>{passwordError && (<div className="p-3 rounded-lg" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>{passwordError}</div>)}<button type="submit" className="w-full py-3 px-6 rounded-lg font-medium transition-colors" style={{ backgroundColor: 'var(--citron)', color: 'var(--english-violet)' }}>Access Form</button></form></div></div>
    );
  }

  const MutationRow = ({ mutationName, mutationKey, isKu = false }: { mutationName: string, mutationKey: keyof GenotypeInfo, isKu?: boolean}) => {
    const data = formData.genotype[mutationKey] as KuMutationInfo;
    return (
        <div className="grid md:grid-cols-3 gap-4 items-start py-2 border-b"><label className="font-medium text-sm pt-2">{mutationName}<br/><span className="font-normal text-xs text-gray-500">(say Yes even if it was complemented back in)</span></label><div className="md:col-span-2 space-y-3"><select value={data.present} onChange={(e) => handleFormChange(`genotype.${mutationKey}.present`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option></select>
                {data.present === 'Yes' && (<div className="space-y-3 pl-4 border-l-2">
                         {isKu && (<div className="grid grid-cols-3 gap-4 items-center"><label className="text-sm italic">Type:</label><select value={data.kuType} onChange={(e) => handleFormChange(`genotype.${mutationKey}.kuType`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select Ku Type...</option><option value="ku70">ku70</option><option value="ku80">ku80</option></select></div>)}
                        <div className="grid grid-cols-3 gap-4 items-center"><label className="text-sm italic">Complemented?</label><select value={data.complemented} onChange={(e) => handleFormChange(`genotype.${mutationKey}.complemented`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                        <div className="grid grid-cols-3 gap-4 items-start"><label className="text-sm italic pt-2">Method:</label><div className="col-span-2 space-y-2"><select value={data.method} onChange={(e) => handleFormChange(`genotype.${mutationKey}.method`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select Method...</option><option value="Homologous Recombination">Homologous Recombination</option><option value="UV Mutagenesis">UV Mutagenesis</option><option value="Chemical Mutagenesis">Chemical Mutagenesis</option><option value="CRISPR">CRISPR</option><option value="Other">Other (Please specify)</option><option value="Unknown">Unknown</option></select>
                                {data.method === 'Homologous Recombination' && <input type="text" value={data.markerGene} onChange={(e) => handleFormChange(`genotype.${mutationKey}.markerGene`, e.target.value)} className="w-full p-2 border-2 rounded-lg" placeholder="Specify marker gene" />}
                                {data.method === 'Chemical Mutagenesis' && <input type="text" value={data.chemicalName} onChange={(e) => handleFormChange(`genotype.${mutationKey}.chemicalName`, e.target.value)} className="w-full p-2 border-2 rounded-lg" placeholder="Specify chemical" />}
                                {data.method === 'Other' && <input type="text" value={data.otherMethod} onChange={(e) => handleFormChange(`genotype.${mutationKey}.otherMethod`, e.target.value)} className="w-full p-2 border-2 rounded-lg" placeholder="Specify other method" />}
                           </div></div>
                         <div className="grid grid-cols-3 gap-4 items-center"><label className="text-sm italic">Mutation Date (Optional):</label><input type="date" value={data.mutationDate} onChange={(e) => handleFormChange(`genotype.${mutationKey}.mutationDate`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} /></div>
                    </div>)}
            </div></div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>Isolate Information Submission</h2>
      <div className="bg-white/50 p-6 rounded-lg shadow-md mb-8"><p className="text-base mb-4">Please fill out this form for <strong>each individual isolate</strong> you are sending. After submitting, the form will clear.</p><p className="text-sm" style={{ color: 'var(--slate-gray)' }}>Fields marked with <span className="text-red-500 font-bold">*</span> are required.</p></div>
      <form onSubmit={handleFormSubmit} className="space-y-6 bg-white/50 p-8 rounded-lg shadow-md" noValidate>
        <div>
          {/* --- NEW: Added red asterisk and error message display --- */}
          <label htmlFor="submitting_lab" className="block text-sm font-medium mb-2">Submitting Laboratory Name <span className="text-red-500 font-bold">*</span></label>
          <select id="submitting_lab" value={formData.submitting_lab} onChange={(e) => handleFormChange('submitting_lab', e.target.value)} className={`w-full p-3 border-2 rounded-lg ${errors.submitting_lab ? 'border-red-500' : 'border-[var(--silver)]'}`} required disabled={loadingLabs}>
            <option value="">{loadingLabs ? 'Loading labs...' : 'Select your laboratory'}</option>
            {labNames.map(name => (<option key={name} value={name}>{name}</option>))}
          </select>
          {errors.submitting_lab && <p className="text-red-500 text-xs mt-1">{errors.submitting_lab}</p>}
        </div>
        <div>
            {/* --- NEW: Added red asterisk and error message display --- */}
            <label htmlFor="strain_name" className="block text-sm font-medium mb-2">Strain Name/ID <span className="text-red-500 font-bold">*</span></label>
            <input type="text" id="strain_name" value={formData.strain_name} onChange={(e) => handleFormChange('strain_name', e.target.value)} className={`w-full p-3 border-2 rounded-lg ${errors.strain_name ? 'border-red-500' : 'border-[var(--silver)]'}`} placeholder="e.g., Af293-Parental, Clinical Isolate X" required />
            {errors.strain_name && <p className="text-red-500 text-xs mt-1">{errors.strain_name}</p>}
        </div>
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--slate-gray)' }}>Genotype Information</h3><MutationRow mutationName="Δku Mutation?" mutationKey="ku" isKu /><MutationRow mutationName="ΔpyrG Mutation?" mutationKey="pyrG" /><MutationRow mutationName="ΔargB Mutation?" mutationKey="argB" /></div>
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><h3 className="text-lg font-semibold bg-gray-700 text-white p-2 rounded-md">Add Additional Gene Mutation Information</h3>{formData.other_genes.map((gene, index) => (<div key={index} className="p-3 border rounded-md bg-gray-50 relative"><button type="button" onClick={() => removeOtherGene(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button><div className="grid md:grid-cols-3 gap-4 items-center"><label className="font-medium text-sm">Gene Name:</label><input type="text" value={gene.geneName} onChange={(e) => handleFormChange(`other_genes.${index}.geneName`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" placeholder="e.g., ΔabcA"/></div><div className="grid md:grid-cols-3 gap-4 items-start pt-2 mt-2 border-t"><label className="font-medium text-sm pt-2">Details for {gene.geneName || 'this gene'}:</label><div className="md:col-span-2 space-y-3"><div className="grid grid-cols-3 gap-4 items-center"><label className="text-sm italic">Complemented?</label><select value={gene.complemented} onChange={(e) => handleFormChange(`other_genes.${index}.complemented`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option></select></div><div className="grid grid-cols-3 gap-4 items-start"><label className="text-sm italic pt-2">Method:</label><div className="col-span-2 space-y-2"><select value={gene.method} onChange={(e) => handleFormChange(`other_genes.${index}.method`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select Method...</option><option value="Homologous Recombination">Homologous Recombination</option><option value="UV Mutagenesis">UV Mutagenesis</option><option value="Chemical Mutagenesis">Chemical Mutagenesis</option><option value="CRISPR">CRISPR</option><option value="Other">Other (Please specify)</option><option value="Unknown">Unknown</option></select>{gene.method === 'Homologous Recombination' && <input type="text" value={gene.markerGene} onChange={(e) => handleFormChange(`other_genes.${index}.markerGene`, e.target.value)} className="w-full p-2 border-2 rounded-lg" placeholder="Specify marker gene" />}{gene.method === 'Chemical Mutagenesis' && <input type="text" value={gene.chemicalName} onChange={(e) => handleFormChange(`other_genes.${index}.chemicalName`, e.target.value)} className="w-full p-2 border-2 rounded-lg" placeholder="Specify chemical" />}{gene.method === 'Other' && <input type="text" value={gene.otherMethod} onChange={(e) => handleFormChange(`other_genes.${index}.otherMethod`, e.target.value)} className="w-full p-2 border-2 rounded-lg" placeholder="Specify other method" />}</div></div><div className="grid grid-cols-3 gap-4 items-center"><label className="text-sm italic">Mutation Date (Optional):</label><input type="date" value={gene.mutationDate} onChange={(e) => handleFormChange(`other_genes.${index}.mutationDate`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} /></div></div></div></div>))}<button type="button" onClick={addOtherGene} className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add Another Gene</button></div>
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--slate-gray)' }}>Strain Origin</h3><select id="strain_origin" value={formData.strain_origin} onChange={(e) => handleFormChange('strain_origin', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select origin...</option><option value="Strain Center">From a Strain Center</option><option value="Shared by Lab">Shared by Another Lab</option><option value="In-house">Generated In-house</option></select>{formData.strain_origin === 'Strain Center' && (<div className="grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded"><input type="text" value={formData.strain_center_name} onChange={(e) => handleFormChange('strain_center_name', e.target.value)} className="p-2 border rounded" placeholder="Name of Center" /><input type="text" value={formData.strain_center_location} onChange={(e) => handleFormChange('strain_center_location', e.target.value)} className="p-2 border rounded" placeholder="Location of Center" /><input type="date" value={formData.strain_center_date} onChange={(e) => handleFormChange('strain_center_date', e.target.value)} className="p-2 border rounded" placeholder="Date Sent" /></div>)}{formData.strain_origin === 'Shared by Lab' && (<div className="grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded"><input type="text" value={formData.sharing_lab_name} onChange={(e) => handleFormChange('sharing_lab_name', e.target.value)} className="p-2 border rounded" placeholder="Name of Lab" /><input type="text" value={formData.sharing_lab_institute} onChange={(e) => handleFormChange('sharing_lab_institute', e.target.value)} className="p-2 border rounded" placeholder="Institute of Lab" /><input type="text" value={formData.sharing_lab_location} onChange={(e) => handleFormChange('sharing_lab_location', e.target.value)} className="p-2 border rounded" placeholder="Location of Lab" /></div>)}</div>
        <div><label htmlFor="other_mutations" className="block text-sm font-medium mb-2">Other General Genotype Info</label><textarea id="other_mutations" value={formData.other_mutations} onChange={(e) => handleFormChange('other_mutations', e.target.value)} rows={3} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., Reporter::GFP, general strain background notes, etc." /></div>
        {submitMessage && (<div className={`p-4 rounded-lg text-center ${submitMessage.includes('Error') || submitMessage.includes('Please fill') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{submitMessage}</div>)}
        <div className="flex justify-end"><button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit Isolate'}</button></div>
      </form>
    </div>
  );
}

