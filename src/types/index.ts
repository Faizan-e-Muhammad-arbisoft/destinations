export interface ILocation {
  name: string;
  lat: number;
  lng: number;
}

export type LocationType = {
  locations: ILocation[];
};
