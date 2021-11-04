import MapView from '@arcgis/core/views/MapView';

export function createMapView(
  container,
  map,
  stateExtent,
  zoom = 5,
  center = []
) {
  return new MapView({
    container,
    map,
    extent: stateExtent,
    ui: {
      components: [],
    },
    zoom,
    center,
  });
}

export default createMapView;
