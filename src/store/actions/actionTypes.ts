// ActionTypes for Add Location
export const ADD_LOCATION_START = 'ADD_LOCATION_START';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_FAILED = 'ADD_LOCATION_FAILED';

export interface AddLocationStart {
  type: typeof ADD_LOCATION_START;
}

export interface AddLocationSuccess {
  type: typeof ADD_LOCATION_SUCCESS;
  payload: any;
}

export interface AddLocationFailed {
  type: typeof ADD_LOCATION_FAILED;
}

export type AddLocationDispatchTypes = AddLocationStart | AddLocationSuccess | AddLocationFailed;
