import { types, type Instance } from 'mobx-state-tree';

export const AreaModel = types
  .model('Area', {
    id: types.identifier,
    strNumberFull: types.string,
    address: types.string,
  })
  .views((self) => ({
    get fullAddress(): string {
      return `${self.address}, ${self.strNumberFull}`;
    },
  }));

export type AreaInstance = Instance<typeof AreaModel>;
