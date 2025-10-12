'use client';

import { useState, FormEvent } from 'react';
// FIX: The 'next/link' import is removed to prevent the build error.
// import Link from 'next/link';

const CORRECT_PASSWORD = 'af293';

// To keep the component clean, the list of countries is defined here.
const countryList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica",
    "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

interface FormData {
  labName: string;
  institution: string;
  city: string;
  state: string;
  country: string;
  contactName: string;
  contactEmail: string;
  researchUse: string;
  comments: string;
}

export default function MetadataForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    labName: '',
    institution: '',
    city: '',
    state: '',
    country: '',
    contactName: '',
    contactEmail: '',
    researchUse: '',
    comments: ''
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

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage(result.message || 'Form submitted successfully!');
        setFormData({
          labName: '', institution: '', city: '', state: '', country: '',
          contactName: '', contactEmail: '', researchUse: '', comments: ''
        });
      } else {
        setSubmitMessage('Error submitting form. Please try again or contact support.');
      }
    } catch {
      setSubmitMessage('Error submitting form. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>
          Metadata Form
        </h2>
        <div className="bg-white/50 p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--slate-gray)' }}>
              Access Required
            </h3>
            <p className="text-base mb-4">
              This form is password-protected and available only to laboratories that have
              been contacted by our organizing team. If you&apos;re interested in participating,
              please first reach out through our contact page.
            </p>
            <p className="text-sm" style={{ color: 'var(--slate-gray)' }}>
              The password will be provided to you via email after initial contact.
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password:
              </label>
              <input type="password" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} placeholder="Enter your password" required />
            </div>
            {passwordError && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>
                {passwordError}
              </div>
            )}
            <button type="submit" className="w-full py-3 px-6 rounded-lg font-medium transition-colors" style={{ backgroundColor: 'var(--citron)', color: 'var(--english-violet)' }}>
              Access Form
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&apos;t have access yet?{' '}
              {/* FIX: Replaced <Link> with <a> */}
              <a href="/join" className="underline font-medium" style={{ color: 'var(--slate-gray)' }}>
                Contact us to join
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--english-violet)' }}>
        Laboratory Metadata Form
      </h2>
      <div className="bg-white/50 p-6 rounded-lg shadow-md mb-8">
        <p className="text-base mb-4">
          Please provide the following information about your laboratory. This data will be used
          to create our global map of collaborating research labs and facilitate communication
          within our community.
        </p>
        <p className="text-sm" style={{ color: 'var(--slate-gray)' }}>
          All fields marked with * are required.
        </p>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div><label htmlFor="labName" className="block text-sm font-medium mb-2">Laboratory Name *</label><input type="text" id="labName" value={formData.labName} onChange={(e) => handleFormChange('labName', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} required /></div>
          <div><label htmlFor="institution" className="block text-sm font-medium mb-2">Institution *</label><input type="text" id="institution" value={formData.institution} onChange={(e) => handleFormChange('institution', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} required /></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div><label htmlFor="city" className="block text-sm font-medium mb-2">City *</label><input type="text" id="city" value={formData.city} onChange={(e) => handleFormChange('city', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} required /></div>
          <div><label htmlFor="state" className="block text-sm font-medium mb-2">State/Province</label><input type="text" id="state" value={formData.state} onChange={(e) => handleFormChange('state', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} /></div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">Country *</label>
            <select id="country" value={formData.country} onChange={(e) => handleFormChange('country', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} required>
              <option value="">Select a country</option>
              {/* The full list of countries is now mapped here */}
              {countryList.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label htmlFor="contactName" className="block text-sm font-medium mb-2">Contact Name *</label><input type="text" id="contactName" value={formData.contactName} onChange={(e) => handleFormChange('contactName', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} required /></div>
          <div><label htmlFor="contactEmail" className="block text-sm font-medium mb-2">Contact Email *</label><input type="email" id="contactEmail" value={formData.contactEmail} onChange={(e) => handleFormChange('contactEmail', e.target.value)} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} required /></div>
        </div>
        <div>
          <label htmlFor="researchUse" className="block text-sm font-medium mb-2">Research Use of A. fumigatus *</label>
          <textarea id="researchUse" value={formData.researchUse} onChange={(e) => handleFormChange('researchUse', e.target.value)} rows={4} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} placeholder="Please describe how your laboratory uses Aspergillus fumigatus in research" required />
        </div>
        <div>
          <label htmlFor="comments" className="block text-sm font-medium mb-2">Additional Comments</label>
          <textarea id="comments" value={formData.comments} onChange={(e) => handleFormChange('comments', e.target.value)} rows={3} className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron" style={{ borderColor: 'var(--silver)' }} placeholder="Any additional information you&apos;d like to share" />
        </div>
        {submitMessage && (<div className={`p-4 rounded-lg ${submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{submitMessage}</div>)}
        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit Form'}</button>
        </div>
      </form>
    </div>
  );
}
