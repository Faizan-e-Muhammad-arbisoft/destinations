import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import DashboardContainer from 'Dashboard/containers';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DashboardContainer />
      </div>
    </Provider>
  );
}

export default App;
