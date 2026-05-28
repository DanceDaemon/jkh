import type { AreaResult, MeterResult } from '@/types/api';

export const meterResultToModel = (result: MeterResult) => {
  return {
    id: result.id,
    _type: result._type,
    areaId: result.area.id,
    isAutomatic: result.is_automatic ?? false,
    installationDate: result.installation_date,
    description: result.description,
    initialValues: result.initial_values,
  };
};

export const areaResultToModel = (result: AreaResult) => ({
  id: result.id,
  strNumberFull: result.str_number_full,
  address: result.house.address,
});
