'use client';

import { useState, FormEvent } from 'react';

// You can use the same password or a different one for this form
const CORRECT_PASSWORD = 'fumi'; 

// 1. Updated interface with the new field
interface IsolateFormData {
  submittingLab: string;
  strainName: string;
  genotype: string;
  mutationCreationMethod: string; // New field
}

export default function IsolateForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // 2. State initialized with the updated interface
  const [formData, setFormData] = useState<IsolateFormData>({
    submittingLab: '',
    strainName: '',
    genotype: '',
    mutationCreationMethod: ''
  });

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please contact the organizing team for the correct password.');
    }
  };

  const handleFormChange = (field: keyof IsolateFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 3. Form submission logic points to a new API endpoint
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-isolate', { // <-- New API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage(result.message || 'Isolate information submitted successfully! You can now submit another.');
        // Clear the form to allow for multiple submissions
        setFormData({
            submittingLab: formData.submittingLab, // Keep the lab name for convenience
            strainName: '',
            genotype: '',
            mutationCreationMethod: ''
        });
      } else {
        setSubmitMessage('Error submitting form. Please try again or contact support.');
      }
    } catch (error) {
      setSubmitMessage('Error submitting form. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // The password screen remains largely the same
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>
          Isolate Information Form
        </h2>
        <div className="bg-white/50 p-8 rounded-lg shadow-md">
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--slate-gray)' }}>
                    Access Required
                </h3>
                <p className="text-base mb-4">
                    Please enter the password to access the submission form for isolate information.
                    Each strain you send should have its own submission.
                </p>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
                        style={{ borderColor: 'var(--silver)' }}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {passwordError && (
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>
                    {passwordError}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg font-medium transition-colors"
                    style={{
                        backgroundColor: 'var(--citron)',
                        color: 'var(--english-violet)',
                    }}
                >
                    Access Form
                </button>
            </form>
        </div>
      </div>
    );
  }

  // 4. The main form with new fields for isolate data
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>
        Isolate Information Submission
      </h2>

      <div className="bg-white/50 p-6 rounded-lg shadow-md mb-8">
        <p className="text-base mb-4">
          Please fill out this form for <strong>each individual isolate</strong> you are sending. After submitting, the form will clear, allowing you to enter the next isolate.
        </p>
        <p className="text-sm" style={{ color: 'var(--slate-gray)' }}>
          All fields marked with * are required.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6 bg-white/50 p-8 rounded-lg shadow-md">
        
        <div>
            <label htmlFor="submittingLab" className="block text-sm font-medium mb-2">
            Submitting Laboratory Name *
            </label>
            <input
            type="text"
            id="submittingLab"
            value={formData.submittingLab}
            onChange={(e) => handleFormChange('submittingLab', e.target.value)}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
            style={{ borderColor: 'var(--silver)' }}
            placeholder="Enter this exactly as you did in the Metadata form. --> e.g., Smith Lab, University of Science"
            required
            />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="strainName" className="block text-sm font-medium mb-2">
                Strain Name/ID *
                </label>
                <input
                type="text"
                id="strainName"
                value={formData.strainName}
                onChange={(e) => handleFormChange('strainName', e.target.value)}
                className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
                style={{ borderColor: 'var(--silver)' }}
                placeholder="e.g., Af293-Parental, Clinical Isolate X"
                required
                />
            </div>
            <div>
                <label htmlFor="genotype" className="block text-sm font-medium mb-2">
                Genotype *
                </label>
                <input
                type="text"
                id="genotype"
                value={formData.genotype}
                onChange={(e) => handleFormChange('genotype', e.target.value)}
                className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
                style={{ borderColor: 'var(--silver)' }}
                placeholder="e.g., Δku80::pyrG+, wild-type"
                required
                />
            </div>
        </div>
        
        <div>
          <label htmlFor="mutationCreationMethod" className="block text-sm font-medium mb-2">
            How each mutation was made (to the best of your ability):
          </label>
          <textarea
            id="mutationCreationMethod"
            value={formData.mutationCreationMethod}
            onChange={(e) => handleFormChange('mutationCreationMethod', e.target.value)}
            rows={4}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
            style={{ borderColor: 'var(--silver)' }}
            placeholder="For example, Δku80::pyrG+ was created using homologous recombination, or Δku80 was generated using a mutagen (please specify the mutagen used in this case)."
          />
        </div>

        {submitMessage && (
          <div className={`p-4 rounded-lg text-center ${submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {submitMessage}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Isolate'}
          </button>
        </div>
      </form>
    </div>
  );
}