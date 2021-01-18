import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getUserLocations } from 'store/selectors/userLocations';
import { getJsonData } from 'store/selectors/fetchData';
import { addLocation } from 'store/actions/userLocations';
import { getData } from 'store/actions/fetchData';
import { RootStore } from 'store';
import Map from 'components/Map';

const mapStateToProps = (state: RootStore) => {
  return {
    data: getJsonData(state),
    loading: state.fetchData.loading,
    error: state.fetchData.error,
    locations: getUserLocations(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addLocationHandler: (name: string, lng: number, lat: number) => dispatch<any>(addLocation(name, lng, lat)),
    fetchDataHandler: (cityName: string) => dispatch<any>(getData(cityName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
