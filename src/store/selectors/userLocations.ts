import { RootStore } from 'store';

export const getUserLocations = (state: RootStore) => state.userLocations.locations;
