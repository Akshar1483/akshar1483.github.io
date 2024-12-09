import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from './ui/card';
import { Country } from '@/lib/types';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const countryUrlName = country.name.common.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link href={`/country/${countryUrlName}`}>
      <Card className="h-full transition-transform hover:scale-105">
        <div className="relative h-40 w-full">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            className="rounded-t-lg object-cover"
            priority
          />
        </div>
        <CardHeader>
          <h2 className="text-xl font-bold">{country.name.common}</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
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
        </CardContent>
      </Card>
    </Link>
  );
}