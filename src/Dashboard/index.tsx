import React from 'react';
import Menu from 'components/Menu';
import Map from 'components/Map/index';
import { Button } from 'react-bootstrap';
import { HeaderWrapper, ButtonWrapper } from 'Dashboard/Dashboard.styles';

function Dashboard() {
  return (
    <div className="App">
      <Menu />
      <HeaderWrapper>Mark your desired Destinations on the map.</HeaderWrapper>
      <Map />
      <ButtonWrapper>
        <Button variant="outline-primary" size="lg">
          Mark Destination
        </Button>
      </ButtonWrapper>
      <HeaderWrapper>List of all your desired Destinations.</HeaderWrapper>
    </div>
  );
}

export default Dashboard;
