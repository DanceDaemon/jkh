export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type MeterResult = {
  id: string;
  _type: string[];
  area: { id: string };
  is_automatic: boolean;
  installation_date: string;
  description: string;
  initial_values: number[];
};

export type AreaResult = {
  id: string;
  str_number_full: string;
  house: {
    address: string;
  };
};
