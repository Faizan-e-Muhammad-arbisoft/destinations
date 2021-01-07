import React from 'react';
import Menu from 'components/Menu';
import Map from 'components/Map/index';
import { HeaderWrapper } from 'Dashboard/Dashboard.styles';

function Dashboard() {
  return (
    <div className="App">
      <Menu />
      <HeaderWrapper>Mark your desired Destinations on the map.</HeaderWrapper>
      <Map />
      <HeaderWrapper>List of all your desired Destinations.</HeaderWrapper>
    </div>
  );
}

export default Dashboard;
