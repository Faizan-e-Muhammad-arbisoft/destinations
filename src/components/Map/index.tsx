import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Button } from 'react-bootstrap';
import { MapContainerWrapper, ButtonWrapper } from 'components/Map/Map.styles';

const Map = (props: any) => {
  const mapContainerRef = useRef(null);

  const [locationMarker, setLocationMarker] = useState(null);
  const [btnDisable, setBtnDisable] = useState(true);

  const clickHandler = (marker: any) => {
    const location = {
      name: marker.result.place_name,
      lat: marker.result.center[0],
      lng: marker.result.center[1],
    };
    props.addLocationHandler(location.name, location.lat, location.lng);
  };

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [5, 34],
      zoom: 1.5,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
    });

    geocoder.on('result', function (result: any) {
      setLocationMarker(result);
      setBtnDisable(false);
    });

    // Add Geocoding control (the search input)
    map.addControl(geocoder);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <MapContainerWrapper ref={mapContainerRef} />
      <ButtonWrapper>
        <Button variant="outline-primary" size="lg" disabled={btnDisable} onClick={() => clickHandler(locationMarker)}>
          Add Destination to List
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default Map;
