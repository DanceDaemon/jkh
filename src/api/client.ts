import { API_BASE_URL } from '@/config';

type QueryParams = Record<string, string | number | undefined>;

const buildUrl = (path: string, params?: QueryParams): string => {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  // На случай, если Delete вернет пустое тело
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
};

export const apiClient = {
  get<T>(path: string, params?: QueryParams): Promise<T> {
    return request<T>(buildUrl(path, params));
  },
  delete<T = void>(path: string): Promise<T> {
    return request<T>(buildUrl(path), { method: 'DELETE' });
  },
};
