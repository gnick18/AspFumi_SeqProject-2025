// This is a reusable, server-side function to get coordinates for a given location.

export async function getCoordinates(city: string, state: string, country: string): Promise<{ lat: number; lng: number; matchLevel: string } | null> {
    const queries = [`${city}, ${state}, ${country}`, `${city}, ${country}`, `${state}, ${country}`, country].filter(q => q.trim() !== ',' && q.trim().length > 1);
    for (const query of queries) {
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=en&limit=1`;
            const response = await fetch(url, { headers: { 'User-Agent': 'Aspergillus Community Sequencing Project' } });
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    const result = data[0];
                    let matchLevel = 'country';
                    const addressType = result.addresstype;
                    if (['city', 'town', 'village', 'hamlet'].includes(addressType)) {
                        matchLevel = 'city';
                    } else if (['state', 'province', 'region', 'county'].includes(addressType)) {
                        matchLevel = 'state';
                    }
                    return { lat: parseFloat(result.lat), lng: parseFloat(result.lon), matchLevel };
                }
            }
        } catch (error) { console.error(`Geocoding error for query "${query}":`, error); }
    }
    return null;
}
