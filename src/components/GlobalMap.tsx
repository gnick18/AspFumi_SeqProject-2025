'use client';

import { useEffect, useState, useMemo, useRef } from 'react';

// --- TYPE DEFINITIONS ---
interface Lab {
  id: string;
  name: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  institution?: string;
}

interface GroupedLabs {
  [key: string]: Lab[];
}

// Augment the Window interface to help TypeScript understand that window.L will exist after we load it.
declare global {
  interface Window {
    L: any; 
  }
}

const GlobalMap = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Use two refs: one for the map container div, and one for the Leaflet map instance
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // --- EFFECT 1: Load Leaflet Library from CDN ---
  // This runs only once to inject the Leaflet script and stylesheet into the page.
  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => setLeafletLoaded(true);
    document.body.appendChild(script);

    return () => { // Cleanup function
      document.head.removeChild(cssLink);
      document.body.removeChild(script);
    };
  }, []);

  // --- EFFECT 2: Fetch Lab Data ---
  useEffect(() => {
    const loadLabs = async () => {
      try {
        const response = await fetch('/api/labs');
        if (response.ok) {
          const data = await response.json();
          setLabs(data.labs || []);
        }
      } catch (error) {
        console.error('Failed to load lab data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLabs();
  }, []);

  // --- DATA PROCESSING: Group labs by location ---
  const groupedLabs = useMemo(() => {
    return labs.reduce((acc, lab) => {
      const key = `${lab.lat},${lab.lng}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(lab);
      return acc;
    }, {} as GroupedLabs);
  }, [labs]);
  
  // --- EFFECT 3: Initialize and Update the Map ---
  useEffect(() => {
    // Wait until Leaflet is loaded, we're not loading data, and the container div exists.
    if (!leafletLoaded || !mapContainerRef.current || loading) return;

    const L = window.L;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([40, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }
    
    // Clear existing markers before adding new ones
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    const customIcon = L.divIcon({
      html: `<div style="background-color: #1b4d3e; border: 3px solid #52b788; border-radius: 50%; width: 22px; height: 22px; box-shadow: 0 2px 6px rgba(27, 77, 62, 0.4);"></div>`,
      className: 'custom-div-icon',
      iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -11]
    });

    // Add new markers from the fetched and grouped data
    Object.values(groupedLabs).forEach((labGroup) => {
      const firstLab = labGroup[0];
      const position: [number, number] = [firstLab.lat, firstLab.lng];
      const popupContent = `<div class="p-1 max-h-48 overflow-y-auto" style="font-family: Inter, sans-serif;">${labGroup.map(lab => `<div class="mb-3 border-l-2 border-green-300 pl-2"><h4 class="font-semibold text-sm mb-1" style="color: #333;">${lab.name}</h4><p class="text-xs opacity-75" style="color: #555;">${lab.institution || ''}${lab.institution && lab.country ? ', ' : ''}${lab.country}</p></div>`).join('')}</div>`;
      L.marker(position, { icon: customIcon }).addTo(mapInstanceRef.current!).bindPopup(popupContent);
    });

  }, [leafletLoaded, loading, groupedLabs]);

  if (loading) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  // Render the div that the map will attach to.
  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default GlobalMap;

