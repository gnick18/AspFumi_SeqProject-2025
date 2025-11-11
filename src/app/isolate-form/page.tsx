'use client';

import { useState, FormEvent, useEffect, useMemo, useCallback } from 'react';

const CORRECT_PASSWORD = 'fumi';

// --- STATE INTERFACES ---

interface MutationInfo {
  present: 'Yes' | 'No' | '';
  markerGene: string;
  hasMarkerReplacement: 'Yes' | 'No' | '';
  wasUVMutagenesis: 'Yes' | 'No' | '';
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
  uv_mutagenesis: 'Yes' | 'No' | '';
  uv_exposure_details: string;
  strain_origin: string;
  strain_center_name: string;
  strain_center_location: string;
  strain_center_date: string;
  sharing_lab_name: string;
  sharing_lab_institute: string;
  sharing_lab_location: string;
  sharing_lab_date: string;
  inhouse_generation_date: string;
}

// Type for our new errors state
type FormErrors = {
    [key in keyof IsolateFormData]?: string;
};

// Type for genotype components that can be reordered
interface GenotypeComponent {
  id: string;
  text: string;
  date: string;
}


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
      ku: { present: '', kuType: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' },
      pyrG: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' },
      argB: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' },
    },
    other_genes: [],
    other_mutations: '',
    uv_mutagenesis: '',
    uv_exposure_details: '',
    strain_origin: '',
    strain_center_name: '',
    strain_center_location: '',
    strain_center_date: '',
    sharing_lab_name: '',
    sharing_lab_institute: '',
    sharing_lab_location: '',
    sharing_lab_date: '',
    inhouse_generation_date: '',
  });

  // --- NEW: State to hold validation errors ---
  const [errors, setErrors] = useState<FormErrors>({});

  // State for drag-and-drop reordering
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [genotypeOrder, setGenotypeOrder] = useState<string[]>([]);

  //Adding in the hook
  useEffect(() => {
    setHasMounted(true);
  }, []); // The empty array [] ensures this runs only once on the client

  useEffect(() => {
    const fetchLabNames = async () => {
      try {
        setLoadingLabs(true);
        // Use admin/labs endpoint to get actual lab names (not filtered by privacy settings)
        const response = await fetch('/api/admin/labs');
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

  // Auto-set UV mutagenesis to Yes if any mutation was made via point mutation methods
  useEffect(() => {
    const hasAnyPointMutation =
      formData.genotype.ku.wasUVMutagenesis === 'Yes' ||
      formData.genotype.pyrG.wasUVMutagenesis === 'Yes' ||
      formData.genotype.argB.wasUVMutagenesis === 'Yes' ||
      formData.other_genes.some(gene => gene.wasUVMutagenesis === 'Yes');
    
    if (hasAnyPointMutation && formData.uv_mutagenesis !== 'Yes') {
      setFormData(prev => ({ ...prev, uv_mutagenesis: 'Yes' }));
    }
  }, [formData.genotype.ku.wasUVMutagenesis, formData.genotype.pyrG.wasUVMutagenesis, formData.genotype.argB.wasUVMutagenesis, formData.other_genes, formData.uv_mutagenesis]);

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
          // Use Record to satisfy the index signature requirement for dynamic keys
          (mutationState as Record<string, string>)[key] = value;
        } else if (field.startsWith('other_genes.')) {
          const [, indexStr, key] = field.split('.');
          const index = parseInt(indexStr, 10);
          const geneState = newState.other_genes[index];
          // Use Record here as well
          (geneState as Record<string, string>)[key] = value;
        } else {
          // And here for top-level properties
          (newState as Record<string, unknown>)[field] = value;
        }
        return newState;
    });
  };

  // Build genotype components from form data
  const buildGenotypeComponents = useCallback((): GenotypeComponent[] => {
    const components: GenotypeComponent[] = [];

    // Add ku mutation
    if (formData.genotype.ku.present === 'Yes') {
      const kuType = formData.genotype.ku.kuType || 'ku';
      const isPointMutation = formData.genotype.ku.wasUVMutagenesis === 'Yes';
      let text = isPointMutation ? `${kuType}-` : `Δ${kuType}`;
      if (formData.genotype.ku.hasMarkerReplacement === 'Yes' && formData.genotype.ku.markerGene) {
        text = isPointMutation ? `${kuType}-::${formData.genotype.ku.markerGene}` : `Δ${kuType}::${formData.genotype.ku.markerGene}`;
      }
      components.push({
        id: 'ku',
        text,
        date: formData.genotype.ku.mutationDate || ''
      });
    }

    // Add pyrG mutation
    if (formData.genotype.pyrG.present === 'Yes') {
      const isPointMutation = formData.genotype.pyrG.wasUVMutagenesis === 'Yes';
      let text = isPointMutation ? 'pyrG-' : 'ΔpyrG';
      if (formData.genotype.pyrG.hasMarkerReplacement === 'Yes' && formData.genotype.pyrG.markerGene) {
        text = isPointMutation ? `pyrG-::${formData.genotype.pyrG.markerGene}` : `ΔpyrG::${formData.genotype.pyrG.markerGene}`;
      }
      components.push({
        id: 'pyrG',
        text,
        date: formData.genotype.pyrG.mutationDate || ''
      });
    }

    // Add argB mutation
    if (formData.genotype.argB.present === 'Yes') {
      const isPointMutation = formData.genotype.argB.wasUVMutagenesis === 'Yes';
      let text = isPointMutation ? 'argB-' : 'ΔargB';
      if (formData.genotype.argB.hasMarkerReplacement === 'Yes' && formData.genotype.argB.markerGene) {
        text = isPointMutation ? `argB-::${formData.genotype.argB.markerGene}` : `ΔargB::${formData.genotype.argB.markerGene}`;
      }
      components.push({
        id: 'argB',
        text,
        date: formData.genotype.argB.mutationDate || ''
      });
    }

    // Add other genes
    formData.other_genes.forEach((gene, index) => {
      if (gene.geneName) {
        const isPointMutation = gene.wasUVMutagenesis === 'Yes';
        let text = isPointMutation ? `${gene.geneName}-` : `Δ${gene.geneName}`;
        if (gene.hasMarkerReplacement === 'Yes' && gene.markerGene) {
          text = isPointMutation ? `${gene.geneName}-::${gene.markerGene}` : `Δ${gene.geneName}::${gene.markerGene}`;
        }
        components.push({
          id: `other_${index}`,
          text,
          date: gene.mutationDate || ''
        });
      }
    });

    return components;
  }, [formData.genotype, formData.other_genes]);

  // Build components whenever form data changes
  const components = useMemo(() => buildGenotypeComponents(), [buildGenotypeComponents]);
  
  // Initialize order when components change
  useEffect(() => {
    const componentIds = components.map(c => c.id).sort().join(',');
    const currentOrderIds = [...genotypeOrder].sort().join(',');
    
    // Only update if the set of component IDs has actually changed
    if (components.length > 0 && componentIds !== currentOrderIds) {
      // Sort by date (oldest first, which will be leftmost)
      const sorted = [...components].sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return -1;
        if (!b.date) return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setGenotypeOrder(sorted.map(c => c.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components]);
  
  // Get ordered genotype components
  const orderedComponents = useMemo(() => {
    if (genotypeOrder.length === 0) return components;
    
    // Return components in the custom order
    return genotypeOrder
      .map(id => components.find(c => c.id === id))
      .filter((c): c is GenotypeComponent => c !== undefined);
  }, [components, genotypeOrder]);

  // Format genotype string for display
  const genotypeString = orderedComponents.map(c => c.text).join(', ');

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newOrder = [...genotypeOrder];
    const draggedId = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedId);
    
    setGenotypeOrder(newOrder);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const addOtherGene = () => {
    setFormData(prev => ({ ...prev, other_genes: [ ...prev.other_genes, { geneName: '', present: 'Yes', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' } ] }));
  };

  const removeOtherGene = (indexToRemove: number) => {
    setFormData(prev => ({ ...prev, other_genes: prev.other_genes.filter((_, index) => index !== indexToRemove) }));
  };

  // Validation function --
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

    // Validate form before submitting ---
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
            genotype: { ku: { present: '', kuType: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' }, pyrG: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' }, argB: { present: '', markerGene: '', hasMarkerReplacement: '', wasUVMutagenesis: '', mutationDate: '' }},
            other_genes: [],
            other_mutations: '',
            uv_mutagenesis: '',
            uv_exposure_details: '',
            strain_origin: '', strain_center_name: '', strain_center_location: '', strain_center_date: '',
            sharing_lab_name: '', sharing_lab_institute: '', sharing_lab_location: '', sharing_lab_date: '',
            inhouse_generation_date: ''
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

  const MutationRow = ({ mutationName, mutationKey, isKu = false }: { mutationName: React.ReactNode, mutationKey: keyof GenotypeInfo, isKu?: boolean}) => {
    const data = formData.genotype[mutationKey] as KuMutationInfo;
    return (
        <div className="grid md:grid-cols-3 gap-4 items-start py-2 border-b">
          <label className="font-medium text-sm pt-2">{mutationName}</label>
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
                  <label className="text-sm italic">Was this mutation made via point mutation (5-FOA, chemical mutagen, UV, etc.)?</label>
                  <select value={data.wasUVMutagenesis} onChange={(e) => handleFormChange(`genotype.${mutationKey}.wasUVMutagenesis`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm italic">Was this gene replaced with a marker gene?</label>
                  <select value={data.hasMarkerReplacement} onChange={(e) => handleFormChange(`genotype.${mutationKey}.hasMarkerReplacement`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {data.hasMarkerReplacement === 'Yes' && (
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm italic">Marker gene name:</label>
                    <input type="text" value={data.markerGene} onChange={(e) => handleFormChange(`genotype.${mutationKey}.markerGene`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., hygB, pyrG" />
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm italic">Mutation Date (Optional):</label>
                  <input type="date" value={data.mutationDate} onChange={(e) => handleFormChange(`genotype.${mutationKey}.mutationDate`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} />
                </div>
              </div>
            )}
          </div>
        </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>Isolate Information Submission</h2>
      <div className="bg-white/50 p-6 rounded-lg shadow-md mb-8">
        <p className="text-base mb-4">Please fill out this form for <strong>each individual isolate</strong> you are sending. After submitting, the form will clear.</p>
        <p className="text-sm" style={{ color: 'var(--slate-gray)' }}>Fields marked with <span className="text-red-500 font-bold">*</span> are required.</p>
      </div>
      
      {/* Genotype Convention Instructions */}
      <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-3 text-blue-900">Genotype Notation Guidelines</h3>
        <div className="space-y-2 text-sm text-blue-900">
          <p><strong>Important Convention:</strong> In <em>Aspergillus fumigatus</em>, genotypes are written with the <strong>newest mutations on the right</strong>.</p>
          <p><strong>Notation Rules:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Genes are written in <em>italicized lowercase</em> (e.g., <em>ku70</em>, <em>pyrG</em>)</li>
            <li>Δ (delta) indicates a targeted deletion</li>
            <li>- (hyphen) indicates a point mutation deletion (5-FOA, chemical mutagen, UV, etc.) (e.g., <em>pyrG-</em>)</li>
            <li>:: (double colon) indicates a replacement/complementation</li>
          </ul>
          <p className="mt-3 text-xs italic">After filling out the form, you can drag and drop the genotype components below to reorder them according to your lab&apos;s convention.</p>
        </div>
      </div>

      {/* Real-time Genotype Display */}
      {genotypeString && (
        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-3 text-green-900">How Genotype Will be Submitted</h3>
          <div className="bg-white p-4 rounded-lg border border-green-300">
            <p className="text-sm text-gray-600 mb-2">Drag components to reorder (newest should be rightmost):</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {orderedComponents.map((component, index) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`px-3 py-2 bg-blue-100 border-2 border-blue-300 rounded-lg cursor-move hover:bg-blue-200 transition-colors ${
                    draggedIndex === index ? 'opacity-50' : ''
                  }`}
                  title={component.date ? `Mutation date: ${component.date}` : 'No date specified'}
                >
                  <span className="font-mono text-sm">{component.text}</span>
                  {component.date && (
                    <span className="ml-2 text-xs text-gray-500">({component.date})</span>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-green-200">
              <p className="text-xs text-gray-500 mb-1">Formatted genotype string:</p>
              <p className="text-lg font-semibold text-gray-800">
                {orderedComponents.map((component, index) => (
                  <span key={component.id}>
                    {index > 0 && ', '}
                    <span dangerouslySetInnerHTML={{
                      __html: component.text
                        .replace(/Δ(\w+)/g, 'Δ<em>$1</em>')
                        .replace(/(\w+)-/g, '<em>$1</em>-')
                        .replace(/::(\w+)/g, '::<em>$1</em>')
                    }} />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}
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
            <input type="text" id="strain_name" value={formData.strain_name} onChange={(e) => handleFormChange('strain_name', e.target.value)} className={`w-full p-3 border-2 rounded-lg ${errors.strain_name ? 'border-red-500' : 'border-[var(--silver)]'}`} placeholder="e.g., A1163, CEA17" required />
            {errors.strain_name && <p className="text-red-500 text-xs mt-1">{errors.strain_name}</p>}
        </div>
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--slate-gray)' }}>Genotype Information</h3>
          
          {/* UV Mutagenesis Section */}
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200 mb-4">
            <div className="grid md:grid-cols-3 gap-4 items-start">
              <label className="font-medium text-sm pt-2">Has UV or chemical mutagenesis ever been performed on this strain?</label>
              <div className="md:col-span-2 space-y-3">
                <select value={formData.uv_mutagenesis} onChange={(e) => handleFormChange('uv_mutagenesis', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {formData.uv_mutagenesis === 'Yes' && (
                  <div>
                    <label className="block text-sm italic mb-2">UV exposure details (length of time, amount of UV) or chemical mutagen details:</label>
                    <textarea value={formData.uv_exposure_details} onChange={(e) => handleFormChange('uv_exposure_details', e.target.value)} rows={2} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., 30 seconds at 254nm, 100 J/m²." />
                  </div>
                )}
              </div>
            </div>
          </div>

          <MutationRow mutationName={<>Δ<em>ku</em> Mutation?</>} mutationKey="ku" isKu />
          <MutationRow mutationName={<>Δ<em>pyrG</em> Mutation?</>} mutationKey="pyrG" />
          <MutationRow mutationName={<>Δ<em>argB</em> Mutation?</>} mutationKey="argB" />
        </div>
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
          <h3 className="text-lg font-semibold bg-gray-700 text-white p-2 rounded-md">Add Additional Gene Mutation Information</h3>
          {formData.other_genes.map((gene, index) => (
            <div key={index} className="p-3 border rounded-md bg-gray-50 relative">
              <button type="button" onClick={() => removeOtherGene(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <label className="font-medium text-sm">Gene Name:</label>
                <input type="text" value={gene.geneName} onChange={(e) => handleFormChange(`other_genes.${index}.geneName`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" placeholder="e.g., abcA"/>
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-start pt-2 mt-2 border-t">
                <label className="font-medium text-sm pt-2">Details for {gene.geneName || 'this gene'}:</label>
                <div className="md:col-span-2 space-y-3">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm italic">Was this mutation made via point mutation (5-FOA, chemical mutagen, UV, etc.)?</label>
                    <select value={gene.wasUVMutagenesis} onChange={(e) => handleFormChange(`other_genes.${index}.wasUVMutagenesis`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm italic">Was this gene replaced with a marker gene?</label>
                    <select value={gene.hasMarkerReplacement} onChange={(e) => handleFormChange(`other_genes.${index}.hasMarkerReplacement`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}>
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {gene.hasMarkerReplacement === 'Yes' && (
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <label className="text-sm italic">Marker gene name:</label>
                      <input type="text" value={gene.markerGene} onChange={(e) => handleFormChange(`other_genes.${index}.markerGene`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., hygB, pyrG" />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm italic">Mutation Date (Optional):</label>
                    <input type="date" value={gene.mutationDate} onChange={(e) => handleFormChange(`other_genes.${index}.mutationDate`, e.target.value)} className="col-span-2 w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addOtherGene} className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add Another Gene</button>
        </div>
        <div className="space-y-2 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--slate-gray)' }}>Strain Origin</h3><select id="strain_origin" value={formData.strain_origin} onChange={(e) => handleFormChange('strain_origin', e.target.value)} className="w-full p-2 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }}><option value="">Select origin...</option><option value="Strain Center">From a Strain Center</option><option value="Shared by Lab">Shared by Another Lab</option><option value="In-house">Generated In-house</option></select>{formData.strain_origin === 'Strain Center' && (<div className="grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded"><input type="text" value={formData.strain_center_name} onChange={(e) => handleFormChange('strain_center_name', e.target.value)} className="p-2 border rounded" placeholder="Name of Center" /><input type="text" value={formData.strain_center_location} onChange={(e) => handleFormChange('strain_center_location', e.target.value)} className="p-2 border rounded" placeholder="Location of Center" /><input type="date" value={formData.strain_center_date} onChange={(e) => handleFormChange('strain_center_date', e.target.value)} className="p-2 border rounded" placeholder="Date Sent" /></div>)}{formData.strain_origin === 'Shared by Lab' && (<div className="grid md:grid-cols-2 gap-4 mt-2 p-2 bg-gray-50 rounded"><input type="text" value={formData.sharing_lab_name} onChange={(e) => handleFormChange('sharing_lab_name', e.target.value)} className="p-2 border rounded" placeholder="Name of Lab" /><input type="text" value={formData.sharing_lab_institute} onChange={(e) => handleFormChange('sharing_lab_institute', e.target.value)} className="p-2 border rounded" placeholder="Institute of Lab" /><input type="text" value={formData.sharing_lab_location} onChange={(e) => handleFormChange('sharing_lab_location', e.target.value)} className="p-2 border rounded" placeholder="Location of Lab" /><input type="date" value={formData.sharing_lab_date} onChange={(e) => handleFormChange('sharing_lab_date', e.target.value)} className="p-2 border rounded" placeholder="Date Received" /></div>)}{formData.strain_origin === 'In-house' && (<div className="mt-2 p-2 bg-gray-50 rounded"><input type="date" value={formData.inhouse_generation_date} onChange={(e) => handleFormChange('inhouse_generation_date', e.target.value)} className="w-full p-2 border rounded" placeholder="Date Generated" /></div>)}</div>
        <div><label htmlFor="other_mutations" className="block text-sm font-medium mb-2">Other General Genotype Info</label><textarea id="other_mutations" value={formData.other_mutations} onChange={(e) => handleFormChange('other_mutations', e.target.value)} rows={3} className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--silver)' }} placeholder="e.g., Reporter::GFP, general strain background notes, etc." /></div>
        {submitMessage && (<div className={`p-4 rounded-lg text-center ${submitMessage.includes('Error') || submitMessage.includes('Please fill') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{submitMessage}</div>)}
        <div className="flex justify-end"><button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit Isolate'}</button></div>
      </form>
    </div>
  );
}

