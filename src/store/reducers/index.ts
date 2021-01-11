import { combineReducers } from 'redux';
import userLocationsReducer from 'store/reducers/userLocations';

const rootReducer = combineReducers({
  userLocations: userLocationsReducer,
});

export default rootReducer;
