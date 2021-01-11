import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addLocation } from 'store/actions/userLocations';

import Map from 'components/Map';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addLocationHandler: (name: string, lat: number, lng: number) => dispatch<any>(addLocation(name, lat, lng)),
  };
};

export default connect(null, mapDispatchToProps)(Map);
