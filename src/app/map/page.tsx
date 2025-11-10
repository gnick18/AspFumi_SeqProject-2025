'use client';

import GlobalMap from '@/components/GlobalMap';
import { useState, useEffect } from 'react';

interface Lab {
  id: string;
  name: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  institution?: string;
}

export default function MapPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
        Map
      </h2>

      <div className="popup-card p-6 rounded-lg mb-8">
        <p className="text-base leading-relaxed mb-4">
          This interactive map displays the locations of research laboratories participating in the
          <em> Aspergillus fumigatus</em> Af293/CEA10 Community Sequencing Initiative. Each marker
          represents a laboratory that has joined our collaborative effort.
        </p>
        <p className="text-sm" style={{ color: 'var(--dark-grey)' }}>
          Click on any marker to view more information about that laboratory.
        </p>
      </div>

      <div className="mb-8">
        <GlobalMap />
      </div>

      <ParticipatingLabsList />
    </div>
  );
}

function ParticipatingLabsList() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLabs = async () => {
      try {
        const response = await fetch('/api/labs');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setLabs(data.labs);
          }
        }
      } catch (error) {
        console.error('Failed to load lab data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLabs();
  }, []);

  return (
    <div className="popup-card p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold" style={{ color: 'var(--secondary)' }}>
        Current Participating Labs
      </h3>
      <p className="text-sm" style={{ color: 'var(--dark-grey)' }}>
        via Sample Submission or Admin Support.
      </p>
      <br />
      

      {loading ? (
        <p className="text-sm" style={{ color: 'var(--dark-grey)' }}>Loading participating labs...</p>
      ) : labs.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--dark-grey)' }}>No participating labs yet. Be the first to join!</p>
      ) : (
        <div className="space-y-4">
          {labs.map((lab) => (
            <div key={lab.id} className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--soft-green)' }}></div>
              <div>
                <p className="font-medium text-sm">
                  {lab.institution ? `${lab.name} at ${lab.institution}` : `Anonymous Lab at ${lab.name}`}
                </p>
                {lab.location && (
                  <p className="text-xs opacity-75">{lab.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--light-grey)' }}>
        <p className="text-sm mb-3" style={{ color: 'var(--dark-grey)' }}>
          The map automatically updates when new laboratories complete the metadata form and join our initiative.
        </p>
        <div className="text-center">
          <a
            href="/join"
            className="inline-block px-6 py-2 rounded text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--soft-green)',
              color: 'var(--dark-green)',
              border: '1px solid var(--dark-green)'
            }}
          >
            Learn How to Join
          </a>
        </div>
      </div>
    </div>
  );
}