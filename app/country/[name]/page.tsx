import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCountries, getCountryByName } from '@/lib/api';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const countries = await getAllCountries();
  return countries.map((country) => ({
    name: country.name.common.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CountryPage({
  params,
}: {
  params: { name: string };
}) {
  const countries = await getCountryByName(params.name);

  if (!countries || countries.length === 0) {
    // Return a fallback UI if the country is not found
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold">Country not found</h1>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const country = countries[0];

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative h-[300px] lg:h-[400px]">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="mb-6 text-3xl font-bold">{country.name.common}</h1>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Official Name:</span>{' '}
                {country.name.official}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {country.capital?.[0] || 'N/A'}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {Object.values(country.languages || {}).join(', ')}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {Object.values(country.currencies || {})
                  .map((currency) => currency.name)
                  .join(', ')}
              </p>
            </div>
          </div>

          {country.borders && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <span
                    key={border}
                    className="rounded-md bg-background px-4 py-1 shadow-sm"
                  >
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
