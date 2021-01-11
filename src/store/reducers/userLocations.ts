import * as actionTypes from 'store/actions/actionTypes';
import { ILocation } from 'types';
import { initialState } from 'store/reducers/initialState';

const reducer = (state = initialState, action: actionTypes.AddLocationDispatchTypes) => {
  switch (action.type) {
    case actionTypes.ADD_LOCATION_SUCCESS:
      const newLocation: ILocation = {
        name: action.payload.name,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
      return {
        ...state,
        locations: state.locations.concat(newLocation),
        loading: false,
      };
    case actionTypes.ADD_LOCATION_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
