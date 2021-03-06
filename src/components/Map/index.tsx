import React, { useRef, useState, useCallback } from 'react';
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { clusterLayer, clusterCountLayer, restaurantLayer, accommodationLayer } from 'components/Map/layers';
import { Button, Form, Spinner } from 'react-bootstrap';
import { MapContainerWrapper, ContainerWrapper, ButtonWrapper, CheckboxWrapper } from 'components/Map/Map.styles';
import image from 'media/images/pin.png';

const Map = (props: any) => {
  console.log('Data: ', props.data);
  console.log('Locations: ', props.locations);
  console.log('Loading: ', props.loading);

  // Handling geojosn data getting as prop and making different layer for different categories
  const geojson: any = {
    type: 'FeatureCollection',
    features: props.data,
  };

  const mapRef = useRef<null | any>(null);

  // Component States
  const [locationMarker, setLocationMarker] = useState(null);
  const [checkedRestaurant, setCheckedRestaurant] = useState(true);
  const [checkedAccommodation, setCheckedAccommodation] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  // Map function handlers
  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 2000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const handleGeocoderResult = useCallback((result) => {
    console.log(result);
    setLocationMarker(result);
    setBtnDisable(false);
  }, []);

  // Button function handlers
  const addToListClickHandler = (marker: any) => {
    const location = {
      name: marker.result.place_name,
      lng: marker.result.center[1],
      lat: marker.result.center[0],
    };

    const isInArray =
      props.locations.find((el: any) => {
        return el.name === location.name;
      }) !== undefined;

    if (!isInArray) props.addLocationHandler(location.name, location.lng, location.lat);
  };

  const fetchDataClickHandler = (marker: any) => {
    const cityName = marker.result.place_name.split(',')[0];
    props.fetchDataHandler(cityName);
  };

  const toggleLayerHandler = (e: any, layer: any) => {
    if (layer.id === 'accommodation-point') setCheckedAccommodation(!checkedAccommodation);
    else if (layer.id === 'restaurant-point') setCheckedRestaurant(!checkedRestaurant);

    if (e.target.checked) mapRef.current.getMap().setLayoutProperty(layer.id, 'visibility', 'visible');
    else mapRef.current.getMap().setLayoutProperty(layer.id, 'visibility', 'none');
  };

  // Dynamic React elements
  let toggleElement: null | any = null;
  if (props.data.length === 0 && props.loading === false) {
    toggleElement = (
      <ContainerWrapper>
        <p>No nearby places to show...</p>
      </ContainerWrapper>
    );
  } else if (props.loading === true) {
    toggleElement = (
      <ContainerWrapper>
        <p>Loading...</p>
      </ContainerWrapper>
    );
  } else {
    toggleElement = (
      <ContainerWrapper>
        <CheckboxWrapper>
          <Form.Check
            label="Toggle Restaurants"
            checked={checkedRestaurant}
            onChange={(e: any) => toggleLayerHandler(e, restaurantLayer)}
          />
        </CheckboxWrapper>
        <CheckboxWrapper>
          <Form.Check
            label="Toggle Accommodations"
            checked={checkedAccommodation}
            onChange={(e: any) => toggleLayerHandler(e, accommodationLayer)}
          />
        </CheckboxWrapper>
      </ContainerWrapper>
    );
  }

  let buttonElement: null | any = null;
  if (props.loading) {
    buttonElement = (
      <ButtonWrapper>
        <Button variant="primary" size="lg" disabled>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          Fetching Data ...
        </Button>
      </ButtonWrapper>
    );
  } else {
    buttonElement = (
      <ButtonWrapper>
        <Button variant="primary" size="lg" disabled={btnDisable} onClick={() => fetchDataClickHandler(locationMarker)}>
          Show Nearby Places
        </Button>
      </ButtonWrapper>
    );
  }

  let mapMarkers: null | any = null;
  if (props.locations.length !== 0) {
    mapMarkers = props.locations.map((location: any, index: number) => (
      <Marker key={`marker-${index}`} longitude={location.lng} latitude={location.lat} offsetLeft={-15} offsetTop={-30}>
        <img src={image} alt="marker" />
      </Marker>
    ));
  } else {
    mapMarkers = null;
  }

  return (
    <div>
      <MapContainerWrapper>
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/basic-v9"
        >
          <Source id="my-data" type="geojson" data={geojson} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
            {/* @ts-ignore */}
            <Layer {...clusterLayer} />
            {/* @ts-ignore */}
            <Layer {...clusterCountLayer} />
            <Layer {...restaurantLayer} />
            <Layer {...accommodationLayer} />
            {mapMarkers}
          </Source>
        </ReactMapGL>
      </MapContainerWrapper>

      <Geocoder
        mapRef={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={handleGeocoderViewportChange}
        onResult={handleGeocoderResult}
        position="top-left"
      />
      {toggleElement}

      <ContainerWrapper>
        <ButtonWrapper>
          <Button
            variant="primary"
            size="lg"
            disabled={btnDisable}
            onClick={() => addToListClickHandler(locationMarker)}
          >
            Add Destination to List
          </Button>
        </ButtonWrapper>
        {buttonElement}
      </ContainerWrapper>
    </div>
  );
};

export default Map;
