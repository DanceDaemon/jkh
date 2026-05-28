import type { MeterKind } from '@/types/meter';
import styles from './MeterKindCell.module.css';
import type { MeterKindCellProps } from './types';

const DropIcon = ({ color }: { color: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={color}
    aria-hidden="true"
  >
    <path d="M12 2s7 7.58 7 12a7 7 0 0 1-14 0c0-4.42 7-12 7-12z" />
  </svg>
);

const KIND_CONFIG: Record<MeterKind, { label: string; color: string }> = {
  cold: { label: 'ХВС', color: '#3698FA' },
  hot: { label: 'ГВС', color: '#F46B4D' },
  unknown: { label: '—', color: '#9aa0a6' },
};

export const MeterKindCell = ({ kind }: MeterKindCellProps) => {
  const { label, color } = KIND_CONFIG[kind];
  return (
    <span className={styles.kindCell}>
      {kind !== 'unknown' && <DropIcon color={color} />}
      {label}
    </span>
  );
};
