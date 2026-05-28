import { createContext, type ReactNode } from 'react';
import { type RootStoreInstance } from './RootStore';
import { store } from './store';

type Props = {
  children: ReactNode;
};

export const StoreContext = createContext<RootStoreInstance | null>(null);

export const StoreProvider = ({ children }: Props) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
