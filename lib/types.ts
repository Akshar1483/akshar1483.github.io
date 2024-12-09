export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  borders?: string[];
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';