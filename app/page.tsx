'use client';

import { useEffect, useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { RegionFilter } from '@/components/RegionFilter';
import { CountryGrid } from '@/components/CountryGrid';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '@/lib/api';
import { Country, Region } from '@/lib/types';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

  async function loadCountries() {
    try {
      const data = await getAllCountries();
      setCountries(data);
      setError(null);
    } catch (err) {
      setError('Failed to load countries');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query: string) {
    if (!query.trim()) {
      loadCountries();
      return;
    }

    setLoading(true);
    try {
      const data = await getCountryByName(query);
      if (data) {
        setCountries(data);
        setError(null);
      } else {
        setCountries([]);
        setError('No countries found');
      }
    } catch (err) {
      setCountries([]);
      setError('No countries found');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegionChange(region: Region | '') {
    setLoading(true);
    try {
      const data = region
        ? await getCountriesByRegion(region)
        : await getAllCountries();
      setCountries(data);
      setError(null);
    } catch (err) {
      setError('Failed to load countries');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar onSearch={handleSearch} />
        <RegionFilter onRegionChange={handleRegionChange} />
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && <CountryGrid countries={countries} />}
    </main>
  );
}