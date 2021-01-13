import { Dispatch } from 'redux';
import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';

export const getData = (cityName: string) => (dispatch: Dispatch<actionTypes.GetDataDispatchTypes>) => {
  dispatch({
    type: actionTypes.GET_DATA_START,
  });

  axios
    .get(`http://tour-pedia.org/api/getPlaces?location=${cityName}&category=restaurant`)
    .then((response: any) => {
      let newData: any = [];
      response.data.forEach((d: any) => {
        newData.push(
          JSON.parse('{"type": "Feature", "geometry": {"type": "Point", "coordinates": [' + d.lng + ',' + d.lat + ']}}')
        );
      });
      dispatch({
        type: actionTypes.GET_DATA_SUCCESS,
        payload: newData,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_DATA_FAILED,
      });
    });
};
