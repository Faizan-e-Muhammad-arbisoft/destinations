import React, { useRef, useState, useCallback } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { Button } from 'react-bootstrap';
import { MapContainerWrapper, ButtonWrapper } from 'components/Map/Map.styles';

const Map = (props: any) => {
  console.log(props.data);

  // Handling geojosn data getting as prop and making different layer for different categories
  const geojson: any = {
    type: 'FeatureCollection',
    features: props.data,
  };
  const restaurantLayer = {
    id: 'restaurant-point',
    type: 'symbol',
    paint: {},
    layout: {
      'icon-image': 'restaurant-15',
      'icon-allow-overlap': true,
    },
    filter: ['==', 'icon', 'restaurant'],
  };
  const accommodationLayer = {
    id: 'accommodation-point',
    type: 'symbol',
    paint: {},
    layout: {
      'icon-image': 'lodging-15',
      'icon-allow-overlap': true,
    },
    filter: ['==', 'icon', 'lodging'],
  };

  const mapRef = useRef(null);

  // Component States
  const [locationMarker, setLocationMarker] = useState(null);
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
      lng: marker.result.center[0],
      lat: marker.result.center[1],
    };
    props.addLocationHandler(location.name, location.lng, location.lat);
  };

  const fetchDataClickHandler = (marker: any) => {
    const cityName = marker.result.place_name.split(',')[0];
    console.log(cityName);
    props.fetchDataHandler(cityName);
  };

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
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...restaurantLayer} />
            <Layer {...accommodationLayer} />
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
      <ButtonWrapper>
        <Button
          variant="outline-primary"
          size="lg"
          disabled={btnDisable}
          onClick={() => addToListClickHandler(locationMarker)}
        >
          Add Destination to List
        </Button>
        <Button
          variant="outline-primary"
          size="lg"
          disabled={btnDisable}
          onClick={() => fetchDataClickHandler(locationMarker)}
        >
          Show Nearby Places
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default Map;
