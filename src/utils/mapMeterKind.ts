import type { MeterKind } from '@/types/meter';

export const mapMeterKind = (types: string[]): MeterKind => {
  const specific = types.find((t) => t !== 'AreaMeter');

  if (specific === 'HotWaterAreaMeter') return 'hot';
  if (specific === 'ColdWaterAreaMeter') return 'cold';
  return 'unknown';
};
