import { Dispatch } from 'redux';
import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';

export const getData = (cityName: string) => (dispatch: Dispatch<actionTypes.GetDataDispatchTypes>) => {
  dispatch({
    type: actionTypes.GET_DATA_START,
  });

  axios
    .get(`http://tour-pedia.org/api/getPlaces?location=${cityName}`)
    .then((response: any) => {
      let newData: any = [];
      response.data.forEach((d: any) => {
        if (d.category === 'restaurant') {
          newData.push(
            JSON.parse(
              '{"type": "Feature", "properties": {"icon": "restaurant"},"geometry": {"type": "Point", "coordinates": [' +
                d.lng +
                ',' +
                d.lat +
                ']}}'
            )
          );
        } else if (d.category === 'accommodation') {
          newData.push(
            JSON.parse(
              '{"type": "Feature", "properties": {"icon": "lodging"},"geometry": {"type": "Point", "coordinates": [' +
                d.lng +
                ',' +
                d.lat +
                ']}}'
            )
          );
        }
      });
      dispatch({
        type: actionTypes.GET_DATA_SUCCESS,
        payload: newData,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: actionTypes.GET_DATA_FAILED,
      });
    });
};
