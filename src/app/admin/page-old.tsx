'use client';

import { useEffect, useState } from 'react';

interface SubmissionData {
  timestamp: string;
  lab_name: string;
  institution: string;
  city: string;
  state: string;
  country: string;
  contact_name: string;
  contact_email: string;
  research_use: string;
  comments: string;
  latitude: string;
  longitude: string;
  match_level: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you'd have proper authentication here
    const loadSubmissions = async () => {
      try {
        const response = await fetch('/api/admin/submissions');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data.submissions || []);
        }
      } catch (error) {
        console.error('Failed to load submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  const unmappedSubmissions = submissions.filter(sub => sub.match_level === 'none' || !sub.latitude || !sub.longitude);
  const mappedSubmissions = submissions.filter(sub => sub.match_level !== 'none' && sub.latitude && sub.longitude);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--russian-violet)' }}>
          Admin Dashboard
        </h1>
        <div className="bg-african-violet/20 p-6 rounded-lg">
          <p>Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--russian-violet)' }}>
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Submissions needing manual geocoding */}
        <div className="bg-pink-lavender/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--russian-violet)' }}>
            Submissions Needing Manual Geocoding ({unmappedSubmissions.length})
          </h2>

          {unmappedSubmissions.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--ultra-violet)' }}>
              No submissions need manual geocoding at this time.
            </p>
          ) : (
            <div className="space-y-4">
              {unmappedSubmissions.map((submission, index) => (
                <div key={index} className="bg-white/50 p-4 rounded border">
                  <h3 className="font-semibold text-sm mb-2">{submission.lab_name}</h3>
                  <p className="text-xs mb-1"><strong>Institution:</strong> {submission.institution}</p>
                  <p className="text-xs mb-1"><strong>Location:</strong> {submission.city}{submission.state ? ', ' + submission.state : ''}, {submission.country}</p>
                  <p className="text-xs mb-1"><strong>Contact:</strong> {submission.contact_email}</p>
                  <p className="text-xs"><strong>Submitted:</strong> {new Date(submission.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Successfully mapped submissions */}
        <div className="bg-lilac/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--russian-violet)' }}>
            Successfully Mapped Submissions ({mappedSubmissions.length})
          </h2>

          <div className="space-y-4">
            {mappedSubmissions.slice(0, 5).map((submission, index) => (
              <div key={index} className="bg-white/50 p-4 rounded border">
                <h3 className="font-semibold text-sm mb-2">{submission.lab_name}</h3>
                <p className="text-xs mb-1"><strong>Institution:</strong> {submission.institution}</p>
                <p className="text-xs mb-1"><strong>Location:</strong> {submission.city}{submission.state ? ', ' + submission.state : ''}, {submission.country}</p>
                <p className="text-xs mb-1">
                  <strong>Match Level:</strong>
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    submission.match_level === 'city' ? 'bg-green-200 text-green-800' :
                    submission.match_level === 'state' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {submission.match_level}
                  </span>
                </p>
                <p className="text-xs"><strong>Coordinates:</strong> {submission.latitude}, {submission.longitude}</p>
              </div>
            ))}

            {mappedSubmissions.length > 5 && (
              <p className="text-xs text-center" style={{ color: 'var(--ultra-violet)' }}>
                ...and {mappedSubmissions.length - 5} more
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-russian-violet/10 rounded-lg">
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--russian-violet)' }}>
          Summary Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--ultra-violet)' }}>{submissions.length}</p>
            <p className="text-xs">Total Submissions</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--ultra-violet)' }}>{mappedSubmissions.length}</p>
            <p className="text-xs">Successfully Mapped</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--ultra-violet)' }}>{unmappedSubmissions.length}</p>
            <p className="text-xs">Need Manual Review</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--ultra-violet)' }}>
              {submissions.length > 0 ? Math.round((mappedSubmissions.length / submissions.length) * 100) : 0}%
            </p>
            <p className="text-xs">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}