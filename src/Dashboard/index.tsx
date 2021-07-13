import React from 'react';
import Menu from 'components/Menu';
import List from 'components/List';
import MapContainer from 'components/Map/containers';
import { ListWrapper } from 'Dashboard/Dashboard.styles';

function Dashboard(props: any) {
  return (
    <div className="App">
      <Menu />
      <MapContainer />
      <ListWrapper>
        <List locations={props.locations} />
      </ListWrapper>
    </div>
  );
}

export default Dashboard;
