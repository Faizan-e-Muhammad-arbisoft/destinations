export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
};

export const restaurantLayer = {
  id: 'restaurant-point',
  type: 'symbol',
  paint: {},
  layout: {
    'icon-image': 'restaurant-15',
    'icon-allow-overlap': true,
  },
  filter: ['==', 'icon', 'restaurant'],
};

export const accommodationLayer = {
  id: 'accommodation-point',
  type: 'symbol',
  paint: {},
  layout: {
    'icon-image': 'lodging-15',
    'icon-allow-overlap': true,
  },
  filter: ['==', 'icon', 'lodging'],
};
