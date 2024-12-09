import axios from 'axios';
import { Country } from './types';

const BASE_URL = 'https://restcountries.com/v3.1';

export async function getAllCountries(): Promise<Country[]> {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
}

export async function getCountryByName(name: string): Promise<Country[] | null> {
  try {
    const decodedName = decodeURIComponent(name).replace(/-/g, ' ');
    const response = await axios.get(`${BASE_URL}/name/${decodedName}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.error(`Country not found: ${name}`);
      return null; // Return null if the country is not found
    }
    throw error; // Re-throw other errors
  }
}


export async function getCountriesByRegion(region: string): Promise<Country[]> {
  const response = await axios.get(`${BASE_URL}/region/${region}`);
  return response.data;
}