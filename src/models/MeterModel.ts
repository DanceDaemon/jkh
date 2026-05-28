import type { MeterKind } from '@/types/meter';
import { formatDate } from '@/utils/formatDate';
import { mapMeterKind } from '@/utils/mapMeterKind';
import { types, type Instance } from 'mobx-state-tree';

export const MeterModel = types
  .model('Meter', {
    id: types.identifier,
    _type: types.array(types.string),
    areaId: types.string,
    isAutomatic: types.boolean,
    installationDate: types.string,
    description: types.string,
    initialValues: types.array(types.number),
  })
  .views((self) => ({
    get kind(): MeterKind {
      return mapMeterKind(self._type);
    },
    get formattedDate(): string {
      return formatDate(self.installationDate);
    },
    get formattedValues(): string {
      return self.initialValues.join(', ');
    },
  }));

export type AreaInstance = Instance<typeof MeterModel>;
