'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Region } from '@/lib/types';

interface RegionFilterProps {
  onRegionChange: (region: Region | '') => void;
}

export function RegionFilter({ onRegionChange }: RegionFilterProps) {
  const regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <Select onValueChange={(value) => onRegionChange(value === 'all' ? '' : value as Region)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Regions</SelectItem>
        {regions.map((region) => (
          <SelectItem key={region} value={region}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}