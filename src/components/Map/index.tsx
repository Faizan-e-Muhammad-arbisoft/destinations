import React, { useRef, useState, useCallback } from 'react';
import ReactMapGL, { Source, Layer, LayerProps } from 'react-map-gl';
import { MapContainerWrapper } from 'components/Map/Map.styles';

const getColors = () => {
  const colors: any = [];
  const c = ['#C2DFFF', '#3bb9ff', '#1F45FC', '#0000A0']; // color pallete for ev_count density
  const cuts = [5, 10, 30, 50]; //defining cuts or threshold to control color pallete density based on ev_counts in specific region i-e polygon
  c.forEach((c, index) => {
    colors.push(cuts[index]);
    colors.push(['to-color', c]);
  });
  return colors;
};

const HeatmapLayer: LayerProps = {
  type: 'fill',
  paint: {
    'fill-color': [
      'let',
      'ev_count',
      ['get', 'ev_count'], // using mapbox 'data expressions' to access feature-data from properties object, documentation:https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#data-expressions
      ['interpolate', ['linear'], ['zoom'], 8, ['interpolate', ['linear'], ['get', 'ev_count'], ...getColors()]], //using mapbox interpolate feature for controlling styling of layer, documentation:https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#interpolate
    ],
    'fill-opacity': 0.5,
  },
};

const heatmap = {
  url: 'mapbox://ahmadfaraz629.7wkwypep', //source url provided by mapbox against our dataset upload documentation:https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector/
  source: 'heatmapSource',
  sourceLayer: 'EVAdoptionHeatmap',
  layer: 'heatmapLayer',
  queryLayer: 'heatmapLayer',
};

const Map = (props: any) => {
  const mapRef = useRef<null | any>(null);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 39.83,
    longitude: -98.58,
    zoom: 3.4,
  });

  // function for updating mapview on zooming in and out
  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

  return (
    <div>
      <MapContainerWrapper>
        <ReactMapGL //A wrapper for mapbox in react , we are using this library in our project for developing mapbox related features
          ref={mapRef}
          {...viewport}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle={process.env.REACT_APP_MAPBOX_STYLE_URL} //style url associated with out api key
          onHover={(e) => console.log(e.features)} // getting our tilset data of layer that we uploaded to mapbox.
        >
          <Source id={heatmap.source} type="vector" url={heatmap.url}>
            <Layer
              id={heatmap.layer}
              layout={{ visibility: 'visible' }}
              source-layer={heatmap.sourceLayer}
              {...HeatmapLayer}
            />
          </Source>
        </ReactMapGL>
      </MapContainerWrapper>
    </div>
  );
};

export default Map;
