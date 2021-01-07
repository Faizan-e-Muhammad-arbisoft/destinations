import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapContainerWrapper } from 'components/Map/Map.styles';

const Map = () => {
  const mapContainerRef = useRef(null);

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

    // Add Geocoding control (the search input)
    map.addControl(geocoder);

    geocoder.on('results', function (results: any) {
      console.log(results);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <MapContainerWrapper ref={mapContainerRef} />
    </div>
  );
};

export default Map;
