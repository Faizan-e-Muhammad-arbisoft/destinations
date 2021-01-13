import { connect } from 'react-redux';
import { getUserLocations } from 'store/selectors/userLocations';
import { RootStore } from 'store';
import Dashboard from 'Dashboard';

const mapStateToProps = (state: RootStore) => {
  return {
    locations: getUserLocations(state),
  };
};

export default connect(mapStateToProps)(Dashboard);
