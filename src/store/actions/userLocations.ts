import { Dispatch } from 'redux';
import * as actionTypes from 'store/actions/actionTypes';

export const addLocation = (name: string, lat: number, lng: number) => (
  dispatch: Dispatch<actionTypes.AddLocationDispatchTypes>
) => {
  try {
    dispatch({
      type: actionTypes.ADD_LOCATION_START,
    });

    const locationData = {
      name: name,
      lat: lat,
      lng: lng,
    };

    dispatch({
      type: actionTypes.ADD_LOCATION_SUCCESS,
      payload: locationData,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.ADD_LOCATION_FAILED,
    });
  }
};
