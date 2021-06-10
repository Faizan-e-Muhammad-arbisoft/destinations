import React from 'react';
import { ListGroup } from 'react-bootstrap';

const List = (props: any) => {
  let listItems = null;

  if (props.locations) {
    listItems = props.locations.map((location: any) => (
      <ListGroup.Item key={location.name}>{location.name}</ListGroup.Item>
    ));
  }

  return <ListGroup> {listItems} </ListGroup>;
};

export default List;
