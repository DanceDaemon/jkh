import type { MeterResult, Paginated } from '@/types/api';
import { apiClient } from './client';

export function fetchMeters(limit: number, offset: number) {
  return apiClient.get<Paginated<MeterResult>>('/meters/', { limit, offset });
}

export function deleteMeter(id: string) {
  return apiClient.delete(`/meters/${id}/`);
}
