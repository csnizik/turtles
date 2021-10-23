import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import {
  CENTER_COORDINATES,
  topoBaseMap,
  MIN_ZOOM,
  MAX_ZOOM,
  VIEW_DIV,
} from './constants';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
}

const conusFeatureLayerURL: string =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_CONUS/MapServer';

const alaskaFeatureLayerURL: string =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_Alaska/MapServer';

const hawaiiFeatureLayerURL: string =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_Hawaii/MapServer';

const MapComponent = () => {
  const mapRef = useRef({} as IMapProps);
  // Project count layer
  const conusFeatureToPointLayer = useRef(
    new FeatureLayer({
      url: conusFeatureLayerURL,
      layerId: 0,
    })
  );
  // State layout / boundaries
  const conusStateLayer = useRef(
    new FeatureLayer({
      url: conusFeatureLayerURL,
      layerId: 1,
    })
  );
  const alaskaFeatureToPointLayer = useRef(
    new FeatureLayer({
      url: alaskaFeatureLayerURL,
      layerId: 0,
    })
  );
  const alaskaLayer = useRef(
    new FeatureLayer({
      url: alaskaFeatureLayerURL,
      layerId: 1,
    })
  );
  const hawaiiFeatureToPointLayer = useRef(
    new FeatureLayer({
      url: hawaiiFeatureLayerURL,
      layerId: 0,
    })
  );
  const hawaiiLayer = useRef(
    new FeatureLayer({
      url: hawaiiFeatureLayerURL,
      layerId: 1,
    })
  );

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = new Map({
        basemap: topoBaseMap,
      });

      const view = new MapView({
        center: CENTER_COORDINATES,
        container: VIEW_DIV,
        map,
        zoom: 4,
      });

      view.constraints = {
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
      };

      // Alaska composite view
      const akView = new MapView({
        container: 'akViewDiv',
        map,
        extent: {
          xmin: -4847539.802087865,
          ymin: 1848924.3741533272,
          xmax: -1623658.5396487257,
          ymax: 5200118.145045477,
          spatialReference: {
            wkid: 102009,
          },
        },
        spatialReference: {
          wkid: 102009,
        },
        ui: {
          components: [],
        },
      });

      const homeBtn = new Home({
        view,
      });

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui.add(homeBtn, 'top-left');

      // Add the alaska view container as an inset view
      mapRef.current.view.ui.add('akViewDiv', 'bottom-left');

      // Add Feature Layers
      map.layers.add(conusFeatureToPointLayer.current);
      map.layers.add(conusStateLayer.current);
      map.layers.add(alaskaFeatureToPointLayer.current);
      map.layers.add(alaskaLayer.current);
      map.layers.add(hawaiiFeatureToPointLayer.current);
      map.layers.add(hawaiiLayer.current);
    }
  }, [mapRef]);

  return null;
};

export default MapComponent;
