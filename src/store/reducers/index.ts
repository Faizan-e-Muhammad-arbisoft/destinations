import { combineReducers } from 'redux';
import userLocationsReducer from 'store/reducers/userLocations';
import fetchDataReducer from 'store/reducers/fetchData';

const rootReducer = combineReducers({
  userLocations: userLocationsReducer,
  fetchData: fetchDataReducer,
});

export default rootReducer;
