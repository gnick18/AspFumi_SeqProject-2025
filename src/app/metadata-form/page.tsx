'use client';

import { useState, FormEvent } from 'react';

const CORRECT_PASSWORD = 'af293';

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
      } else {
        setSubmitMessage('Error submitting form. Please try again or contact support.');
      }
    } catch (error) {
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

          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&apos;t have access yet?{' '}
              <a
                href="/join"
                className="underline font-medium"
                style={{ color: 'var(--slate-gray)' }}
              >
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
          <div>
            <label htmlFor="labName" className="block text-sm font-medium mb-2">
              Laboratory Name *
            </label>
            <input
              type="text"
              id="labName"
              value={formData.labName}
              onChange={(e) => handleFormChange('labName', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
              required
            />
          </div>

          <div>
            <label htmlFor="institution" className="block text-sm font-medium mb-2">
              Institution *
            </label>
            <input
              type="text"
              id="institution"
              value={formData.institution}
              onChange={(e) => handleFormChange('institution', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => handleFormChange('city', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-2">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) => handleFormChange('state', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country *
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => handleFormChange('country', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
              required
            >
              <option value="">Select a country</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cabo Verde">Cabo Verde</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Central African Republic">Central African Republic</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
              <option value="Congo, Republic of the">Congo, Republic of the</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote d'Ivoire">Cote d'Ivoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar (Burma)">Myanmar (Burma)</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="North Korea">North Korea</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestine State">Palestine State</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Korea">South Korea</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-Leste">Timor-Leste</option>
              <option value="Togo">Togo</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium mb-2">
              Contact Name *
            </label>
            <input
              type="text"
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleFormChange('contactName', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
              required
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              id="contactEmail"
              value={formData.contactEmail}
              onChange={(e) => handleFormChange('contactEmail', e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
              style={{ borderColor: 'var(--silver)' }}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="researchUse" className="block text-sm font-medium mb-2">
            Research Use of A. fumigatus *
          </label>
          <textarea
            id="researchUse"
            value={formData.researchUse}
            onChange={(e) => handleFormChange('researchUse', e.target.value)}
            rows={4}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
            style={{ borderColor: 'var(--silver)' }}
            placeholder="Please describe how your laboratory uses Aspergillus fumigatus in research"
            required
          />
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium mb-2">
            Additional Comments
          </label>
          <textarea
            id="comments"
            value={formData.comments}
            onChange={(e) => handleFormChange('comments', e.target.value)}
            rows={3}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-citron"
            style={{ borderColor: 'var(--silver)' }}
            placeholder="Any additional information you'd like to share"
          />
        </div>

        {submitMessage && (
          <div className={`p-4 rounded-lg ${submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {submitMessage}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </form>
    </div>
  );
}