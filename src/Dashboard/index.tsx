import React from 'react';
import Menu from 'components/Menu';
import List from 'components/List';
import MapContainer from 'components/Map/containers';
import { HeaderWrapper, ListWrapper } from 'Dashboard/Dashboard.styles';

function Dashboard(props: any) {
  return (
    <div className="App">
      <Menu />
      <HeaderWrapper>Mark your desired Destinations on the map.</HeaderWrapper>
      <MapContainer />
      <HeaderWrapper>List of all your desired Destinations.</HeaderWrapper>
      <ListWrapper>
        <List locations={props.locations} />
      </ListWrapper>
    </div>
  );
}

export default Dashboard;
