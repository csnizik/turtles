import MapView from '@arcgis/core/views/MapView';

export function createMapView(container, map, stateExtent, spatialReference) {
  return new MapView({
    container,
    map,
    extent: stateExtent,
    spatialReference,
    ui: {
      components: [],
    },
  });
}

export default createMapView;
