import { RootStore } from 'store';

export const getJsonData = (state: RootStore) => state.fetchData.data;
