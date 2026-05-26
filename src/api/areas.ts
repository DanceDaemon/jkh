import type { AreaResult, Paginated } from '@/types/api';
import { apiClient } from './client';

export async function fetchAreasByIds(
  ids: string[]
): Promise<Paginated<AreaResult>> {
  if (!ids.length) {
    return { count: 0, next: null, previous: null, results: [] };
  }

  return apiClient.get<Paginated<AreaResult>>('/areas/', {
    id__in: ids.join(','),
  });
}
