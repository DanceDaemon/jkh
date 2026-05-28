import type { MeterKind } from '@/types/meter';

export interface MetersRowProps {
  index: number;
  kind: MeterKind;
  installationDate: string;
  isAuto: boolean;
  values: string;
  address: string;
  description: string;
  onDelete: () => void;
}
