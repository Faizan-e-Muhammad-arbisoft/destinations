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

// ActionTypes for Get Data
export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export interface GetDataStart {
  type: typeof GET_DATA_START;
}

export interface GetDataSuccess {
  type: typeof GET_DATA_SUCCESS;
  payload: any;
}

export interface GetDataFailed {
  type: typeof GET_DATA_FAILED;
}

export type GetDataDispatchTypes = GetDataStart | GetDataSuccess | GetDataFailed;
