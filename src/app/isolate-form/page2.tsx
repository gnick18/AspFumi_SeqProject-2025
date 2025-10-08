'use client';

import { useState, FormEvent } from 'react';

const CORRECT_PASSWORD = 'fumi';

// --- STATE INTERFACES ---

// Reusable structure for most mutation details
interface MutationInfo {
  present: 'Yes' | 'No' | '';
  complemented: 'Yes' | 'No' | '';
  method: string;
  markerGene: string;
  chemicalName: string;
  otherMethod: string;
  mutationDate: string; // New field
}

// Special interface for Ku that includes the type (ku70/ku80)
interface KuMutationInfo extends MutationInfo {
    kuType: 'ku70' | 'ku80' | '';
}

// Interface for dynamically added genes
interface OtherGeneInfo extends MutationInfo {
    geneName: string;
}

// The complete genotype structure for the form state
interface GenotypeInfo {
  ku: KuMutationInfo;
  pyrG: MutationInfo;
  argB: MutationInfo;
}

// Main form data interface, now with strain origin fields
interface IsolateFormData {
  submittingLab: string;
  strainName: string;
  genotype: GenotypeInfo;
  otherGenes: OtherGeneInfo[];
  otherMutations: string;
  // New fields for strain origin
  strainOrigin: 'Strain Center' | 'Shared by another lab' | '';
  strainCenterName: string;
  strainCenterLocation: string;
  strainCenterDate: string;
  sharingLabName: string;
  sharingLabInstitute: string;
  sharingLabLocation: string;
}

// --- COMPONENT ---

export default function IsolateForm() {
  // --- STATE HOOKS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // The single source of truth for all form data
  const [formData, setFormData] = useState<IsolateFormData>({
    submittingLab: '',
    strainName: '',
    genotype: {
      ku: { present: '', complemented: '', kuType: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
      pyrG: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
      argB: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
    },
    otherGenes: [],
    otherMutations: '',
    strainOrigin: '',
    strainCenterName: '',
    strainCenterLocation: '',
    strainCenterDate: '',
    sharingLabName: '',
    sharingLabInstitute: '',
    sharingLabLocation: '',
  });

  // --- EVENT HANDLERS ---

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please contact the organizing team for the correct password.');
    }
  };
  
  // Universal handler for form input changes
  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => {
        let newState = { ...prev, genotype: { ...prev.genotype }, otherGenes: [...prev.otherGenes] };

        // Handle nested genotype fields (e.g., 'genotype.ku.present')
        if (field.startsWith('genotype.')) {
            const [, mutation, key] = field.split('.') as [string, keyof GenotypeInfo, keyof (MutationInfo | KuMutationInfo)];
            const mutationState = { ...newState.genotype[mutation] };
            (mutationState as any)[key] = value;

            // --- Smart Reset Logic ---
            if (key === 'present' && value !== 'Yes') {
                Object.keys(mutationState).forEach(k => { if (k !== 'present') (mutationState as any)[k] = ''; });
            }
            if (key === 'method') {
                if (value !== 'Homologous Recombination') mutationState.markerGene = '';
                if (value !== 'Chemical Mutagenesis') mutationState.chemicalName = '';
                if (value !== 'Other') mutationState.otherMethod = '';
            }
            newState.genotype[mutation] = mutationState as any;
        } 
        // Handle changes in the dynamic "other genes" array
        else if (field.startsWith('otherGenes.')) {
            const [, indexStr, key] = field.split('.') as [string, string, keyof OtherGeneInfo];
            const index = parseInt(indexStr, 10);
            const geneState = { ...newState.otherGenes[index] };
            (geneState as any)[key] = value;

            if (key === 'present' && value !== 'Yes') {
                Object.keys(geneState).forEach(k => { if (k !== 'present' && k !== 'geneName') (geneState as any)[k] = ''; });
            }
            if (key === 'method') {
                if (value !== 'Homologous Recombination') geneState.markerGene = '';
                if (value !== 'Chemical Mutagenesis') geneState.chemicalName = '';
                if (value !== 'Other') geneState.otherMethod = '';
            }
            if (key === 'geneName' && value === '') {
                newState.otherGenes.splice(index, 1);
            } else {
                newState.otherGenes[index] = geneState;
            }
        }
        // Handle top-level fields
        else {
            (newState as any)[field] = value;
            // Reset dependent fields when origin changes
            if (field === 'strainOrigin') {
                newState.strainCenterName = '';
                newState.strainCenterLocation = '';
                newState.strainCenterDate = '';
                newState.sharingLabName = '';
                newState.sharingLabInstitute = '';
                newState.sharingLabLocation = '';
            }
        }
        return newState;
    });
  };

  // Handler to add a new blank gene to the dynamic list
  const addOtherGene = () => {
    setFormData(prev => ({
        ...prev,
        otherGenes: [
            ...prev.otherGenes,
            { geneName: '', present: 'Yes', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' }
        ]
    }));
  };

  // Handler to remove a gene from the dynamic list
  const removeOtherGene = (index: number) => {
    setFormData(prev => ({
      ...prev,
      otherGenes: prev.otherGenes.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-isolate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage(result.message || 'Isolate information submitted successfully!');
        setFormData({
            submittingLab: formData.submittingLab,
            strainName: '',
            genotype: {
                ku: { present: '', complemented: '', kuType: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
                pyrG: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
                argB: { present: '', complemented: '', method: '', markerGene: '', chemicalName: '', otherMethod: '', mutationDate: '' },
            },
            otherGenes: [],
            otherMutations: '',
            strainOrigin: '',
            strainCenterName: '',
            strainCenterLocation: '',
            strainCenterDate: '',
            sharingLabName: '',
            sharingLabInstitute: '',
            sharingLabLocation: '',
        });
      } else {
        setSubmitMessage('Error submitting form. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER LOGIC ---

  if (!isAuthenticated) {
    // Password screen JSX
    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>Isolate Information Form</h2>
            <div className="bg-white/50 p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--slate-gray)' }}>Access Required</h3>
                    <p className="text-base mb-4">
                        Please enter the password to access the submission form for isolate information.
                        Each strain you send should have its own submission.
                    </p>
                </div>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
                        <input type="password" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} placeholder="Enter your password" required />
                    </div>
                    {passwordError && (<div className="p-3 rounded-lg" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>{passwordError}</div>)}
                    <button type="submit" className="w-full py-3 px-6 rounded-lg font-medium transition-colors" style={{ backgroundColor: 'var(--citron)', color: 'var(--english-violet)' }}>Access Form</button>
                </form>
            </div>
        </div>
    );
  }

  // Helper component for rendering a single mutation row
  const MutationRow = ({ mutationName, mutationKey, isKu = false }: { mutationName: string, mutationKey: keyof GenotypeInfo, isKu?: boolean}) => {
    const data = formData.genotype[mutationKey] as KuMutationInfo;
    return (
        <div className="grid md:grid-cols-3 gap-4 items-start py-2 border-b">
            <label className="font-medium text-sm pt-2">{mutationName}<br/><span className="font-normal text-xs text-gray-500">(say Yes even if it was complemented back in)</span></label>
            <div className="md:col-span-2 space-y-3">
                <select value={data.present} onChange={(e) => handleFormChange(`genotype.${mutationKey}.present`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                {data.present === 'Yes' && (
                    <div className="space-y-3 pl-4 border-l-2">
                         {isKu && (
                             <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm italic">Type:</label>
                                <select value={data.kuType} onChange={(e) => handleFormChange(`genotype.${mutationKey}.kuType`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                                    <option value="">Select Ku Type...</option>
                                    <option value="ku70">ku70</option>
                                    <option value="ku80">ku80</option>
                                </select>
                            </div>
                         )}
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <label className="text-sm italic">Complemented?</label>
                            <select value={data.complemented} onChange={(e) => handleFormChange(`genotype.${mutationKey}.complemented`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                                <option value="">Select...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-start">
                           <label className="text-sm italic pt-2">Method:</label>
                           <div className="col-span-2 space-y-2">
                                <select value={data.method} onChange={(e) => handleFormChange(`genotype.${mutationKey}.method`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                                   <option value="">Select Method...</option>
                                   <option value="Homologous Recombination">Homologous Recombination</option>
                                   <option value="UV Mutagenesis">UV Mutagenesis</option>
                                   <option value="Chemical Mutagenesis">Chemical Mutagenesis</option>
                                   <option value="CRISPR">CRISPR</option>
                                   <option value="Other">Other (Please specify)</option>
                                   <option value="Unknown">Unknown</option>
                                </select>
                                {data.method === 'Homologous Recombination' && <input type="text" value={data.markerGene} onChange={(e) => handleFormChange(`genotype.${mutationKey}.markerGene`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Specify marker gene" />}
                                {data.method === 'Chemical Mutagenesis' && <input type="text" value={data.chemicalName} onChange={(e) => handleFormChange(`genotype.${mutationKey}.chemicalName`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Specify chemical" />}
                                {data.method === 'Other' && <input type="text" value={data.otherMethod} onChange={(e) => handleFormChange(`genotype.${mutationKey}.otherMethod`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Specify other method" />}
                           </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <label className="text-sm italic">Mutation Date (Optional):</label>
                            <input type="text" value={data.mutationDate} onChange={(e) => handleFormChange(`genotype.${mutationKey}.mutationDate`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., 2023-10-26 or 'Unsure'" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  }

  // Main form JSX
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>Isolate Information Submission</h2>
      <div className="bg-white/50 p-6 rounded-lg shadow-md mb-8">
        <p className="text-base mb-4">Please fill out this form for <strong>each individual isolate</strong> you are sending. After submitting, the form will clear.</p>
        <p className="text-sm" style={{ color: 'var(--slate-gray)' }}>All fields marked with * are required.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6 bg-white/50 p-8 rounded-lg shadow-md">
        {/* Basic Info */}
        <div>
          <label htmlFor="submittingLab" className="block text-sm font-medium mb-2">Submitting Laboratory Name *</label>
          <input type="text" id="submittingLab" value={formData.submittingLab} onChange={(e) => handleFormChange('submittingLab', e.target.value)} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., Smith Lab, University of Science" required />
        </div>
        <div>
            <label htmlFor="strainName" className="block text-sm font-medium mb-2">Strain Name/ID *</label>
            <input type="text" id="strainName" value={formData.strainName} onChange={(e) => handleFormChange('strainName', e.target.value)} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., Af293-Parental, Clinical Isolate X" required />
        </div>

        {/* Strain Origin Section */}
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--slate-gray)' }}>Strain Origin</h3>
            <div>
                <label className="block text-sm font-medium mb-2">Where did you get this strain?</label>
                <select value={formData.strainOrigin} onChange={(e) => handleFormChange('strainOrigin', e.target.value)} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                    <option value="">Select an origin...</option>
                    <option value="Strain Center">From a Strain Center</option>
                    <option value="Shared by another lab">Shared by another lab</option>
                </select>
            </div>
            {formData.strainOrigin === 'Strain Center' && (
                <div className="space-y-3 pt-3 mt-3 border-t">
                    <input type="text" value={formData.strainCenterName} onChange={(e) => handleFormChange('strainCenterName', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Name of the center" />
                    <input type="text" value={formData.strainCenterLocation} onChange={(e) => handleFormChange('strainCenterLocation', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Location of the center (e.g., Athens, GA, USA)" />
                    <input type="text" value={formData.strainCenterDate} onChange={(e) => handleFormChange('strainCenterDate', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Date it was sent" />
                </div>
            )}
            {formData.strainOrigin === 'Shared by another lab' && (
                 <div className="space-y-3 pt-3 mt-3 border-t">
                    <input type="text" value={formData.sharingLabName} onChange={(e) => handleFormChange('sharingLabName', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Name of the lab that shared it" />
                    <input type="text" value={formData.sharingLabInstitute} onChange={(e) => handleFormChange('sharingLabInstitute', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Name of their school/institute" />
                    <input type="text" value={formData.sharingLabLocation} onChange={(e) => handleFormChange('sharingLabLocation', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Location of that lab" />
                    <input type="text" value={formData.strainCenterDate} onChange={(e) => handleFormChange('strainCenterDate', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Date it was sent" />
                </div>
            )}
        </div>

        {/* Genotype Section */}
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--slate-gray)' }}>Genotype Information</h3>
            <MutationRow mutationName="Δku Mutation?" mutationKey="ku" isKu />
            <MutationRow mutationName="ΔpyrG Mutation?" mutationKey="pyrG" />
            <MutationRow mutationName="ΔargB Mutation?" mutationKey="argB" />
        </div>
        
        {/* Dynamic Other Genes Section */}
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
            <h3 className="text-lg font-semibold" style={{ backgroundColor: '#333', color: 'white', padding: '8px', borderRadius: '4px' }}>Add Additional Gene Mutation Information</h3>
            {formData.otherGenes.map((gene, index) => (
                <div key={index} className="p-3 border rounded-md bg-gray-50 relative">
                    <button type="button" onClick={() => removeOtherGene(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl leading-none p-1" title="Remove this gene">&times;</button>
                    <div className="grid md:grid-cols-3 gap-4 items-center pr-8">
                       <label className="font-medium text-sm">Gene Name:</label>
                       <input type="text" value={gene.geneName} onChange={(e) => handleFormChange(`otherGenes.${index}.geneName`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" placeholder="e.g., ΔabcA" />
                    </div>
                     <div className="grid md:grid-cols-3 gap-4 items-start pt-2 mt-2 border-t">
                        <label className="font-medium text-sm pt-2">Details for {gene.geneName || 'this gene'}:</label>
                        <div className="md:col-span-2 space-y-3">
                             <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm italic">Complemented?</label>
                                <select value={gene.complemented} onChange={(e) => handleFormChange(`otherGenes.${index}.complemented`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                                    <option value="">Select...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-start">
                               <label className="text-sm italic pt-2">Method:</label>
                               <div className="col-span-2 space-y-2">
                                    <select value={gene.method} onChange={(e) => handleFormChange(`otherGenes.${index}.method`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                                       <option value="">Select Method...</option>
                                       <option value="Homologous Recombination">Homologous Recombination</option>
                                       <option value="UV Mutagenesis">UV Mutagenesis</option>
                                       <option value="Chemical Mutagenesis">Chemical Mutagenesis</option>
                                       <option value="CRISPR">CRISPR</option>
                                       <option value="Other">Other (Please specify)</option>
                                       <option value="Unknown">Unknown</option>
                                    </select>
                                    {gene.method === 'Homologous Recombination' && <input type="text" value={gene.markerGene} onChange={(e) => handleFormChange(`otherGenes.${index}.markerGene`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Specify marker gene" />}
                                    {gene.method === 'Chemical Mutagenesis' && <input type="text" value={gene.chemicalName} onChange={(e) => handleFormChange(`otherGenes.${index}.chemicalName`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Specify chemical" />}
                                    {gene.method === 'Other' && <input type="text" value={gene.otherMethod} onChange={(e) => handleFormChange(`otherGenes.${index}.otherMethod`, e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="Specify other method" />}
                               </div>
                            </div>
                             <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm italic">Mutation Date (Optional):</label>
                                <input type="text" value={gene.mutationDate} onChange={(e) => handleFormChange(`otherGenes.${index}.mutationDate`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., 2023-10-26 or 'Unsure'" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={addOtherGene} className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add Another Gene</button>
        </div>

        <div>
          <label htmlFor="otherMutations" className="block text-sm font-medium mb-2">Other General Genotype Info</label>
          <textarea id="otherMutations" value={formData.otherMutations} onChange={(e) => handleFormChange('otherMutations', e.target.value)} rows={3} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., Reporter::GFP, general strain background notes, etc." />
        </div>

        {submitMessage && (<div className={`p-4 rounded-lg text-center ${submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{submitMessage}</div>)}

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit Isolate'}</button>
        </div>
      </form>
    </div>
  );
}