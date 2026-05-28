import { flow, types, type Instance } from 'mobx-state-tree';
import { MeterModel } from './MeterModel';
import { AreaModel } from './AreaModel';
import { deleteMeter as apiDeleteMeter, fetchMeters } from '@/api/meters';
import { PAGE_SIZE } from '@/config';
import type { AreaResult, MeterResult, Paginated } from '@/types/api';
import { areaResultToModel, meterResultToModel } from './mappers';
import { fetchAreasByIds } from '@/api/areas';

export const RootStore = types
  .model('Root', {
    meters: types.array(MeterModel),
    areas: types.map(AreaModel),
    totalCount: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get hasMore(): boolean {
      return self.meters.length < self.totalCount;
    },
  }))
  .actions((self) => ({
    loadAreasForIds: flow(function* (ids: string[]) {
      const needed = ids.filter((id) => !self.areas.has(id));
      const unique = [...new Set(needed)];
      if (!unique.length) return;

      const data: Paginated<AreaResult> = yield fetchAreasByIds(unique);

      data.results.forEach((result) => {
        self.areas.put(areaResultToModel(result));
      });
    }),
  }))
  .actions((self) => ({
    loadMore: flow(function* () {
      if (self.isLoading) return;
      if (self.meters.length >= self.totalCount && self.totalCount > 0) return;

      self.isLoading = true;
      try {
        const data: Paginated<MeterResult> = yield fetchMeters(
          PAGE_SIZE,
          self.meters.length
        );

        self.totalCount = data.count;

        const newMeters = data.results.map(meterResultToModel);
        newMeters.forEach((meter) => self.meters.push(meter));

        self.loadAreasForIds(newMeters.map((meter) => meter.areaId));
      } finally {
        self.isLoading = false;
      }
    }),

    deleteMeter: flow(function* (id: string) {
      yield apiDeleteMeter(id);

      const index = self.meters.findIndex((meter) => meter.id === id);

      if (index === -1) return;

      self.meters.splice(index, 1);
      self.totalCount -= 1;

      if (self.meters.length < self.totalCount) {
        const data: Paginated<MeterResult> = yield fetchMeters(
          1,
          self.meters.length
        );

        if (data.results.length > 0) {
          const newMeter = meterResultToModel(data.results[0]);

          self.meters.push(newMeter);
          self.loadAreasForIds([newMeter.areaId]);
        }
      }
    }),
  }));

export type RootStoreInstance = Instance<typeof RootStore>;
