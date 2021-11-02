import { useEffect, useRef } from 'react';
import Graphic from '@arcgis/core/Graphic';
import Home from '@arcgis/core/widgets/Home';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import {
  alaskaExtent,
  caribbeanExtent,
  CENTER_COORDINATES,
  hawaiiExtent,
  topoBaseMap,
  VIEW_DIV,
  viewConstraints,
} from './constants';
import {
  alaskaFeatureLayer0,
  alaskaFeatureLayer1,
  caribbeanFeatureLayer0,
  caribbeanFeatureLayer1,
  conusFeatureLayer0,
  conusFeatureLayer1,
  hawaiiFeatureLayer0,
  hawaiiFeatureLayer1,
} from './layers';
import { createMapView } from './mapUtils';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
}

const MapComponent = ({ setSelectedLocation }: any) => {
  const alaskaView = useRef({} as MapView);
  const caribbeanView = useRef({} as MapView);
  const hawaiiView = useRef({} as MapView);
  const mapRef = useRef({} as IMapProps);

  const alaskaFeatureToPointLayer = useRef(alaskaFeatureLayer0);
  const alaskaLayer = useRef(alaskaFeatureLayer1);
  const conusFeatureToPointLayer = useRef(conusFeatureLayer0);
  const conusStateLayer = useRef(conusFeatureLayer1);
  const caribbeanFeatureToPointLayer = useRef(caribbeanFeatureLayer0);
  const caribbeanLayer = useRef(caribbeanFeatureLayer1);
  const hawaiiFeatureToPointLayer = useRef(hawaiiFeatureLayer0);
  const hawaiiLayer = useRef(hawaiiFeatureLayer1);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map: Map = new Map({
        basemap: topoBaseMap,
      });

      const view: MapView = new MapView({
        center: CENTER_COORDINATES,
        container: VIEW_DIV,
        map,
        zoom: 4,
      });

      view.constraints = viewConstraints;

      // Alaska composite view
      alaskaView.current = createMapView(
        'akViewDiv',
        map,
        alaskaExtent,
        2,
        [-160, 65]
      );

      // Caribbean composite view
      caribbeanView.current = createMapView(
        'cariViewDiv',
        map,
        caribbeanExtent,
        6,
        [-66, 18]
      );

      // Hawaii composite view
      hawaiiView.current = createMapView(
        'hiViewDiv',
        map,
        hawaiiExtent,
        5,
        [-157, 20]
      );

      const homeBtn: Home = new Home({
        view,
      });

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui.add(homeBtn, 'top-left');

      // Add composite views for Alaska, Hawaii, and Caribbean
      mapRef.current.view.ui.add('akViewDiv', 'bottom-left');
      mapRef.current.view.ui.add('hiViewDiv', 'bottom-left');
      mapRef.current.view.ui.add('cariViewDiv', 'bottom-left');

      // Add Feature Layers
      map.layers.add(alaskaFeatureToPointLayer.current);
      map.layers.add(alaskaLayer.current);
      map.layers.add(conusFeatureToPointLayer.current);
      map.layers.add(conusStateLayer.current);
      map.layers.add(caribbeanFeatureToPointLayer.current);
      map.layers.add(caribbeanLayer.current);
      map.layers.add(hawaiiFeatureToPointLayer.current);
      map.layers.add(hawaiiLayer.current);
    }
  }, [mapRef]);

  // Handle map interactions
  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.view.on('pointer-up', (event) => {
        mapRef.current.view.hitTest(event).then((response) => {
          mapRef.current.view.graphics.removeAll();
          if (response.results.length) {
            const graphicList: any = response.results.filter((item: any) => {
              // check if the graphic belongs to the states layer
              if (conusStateLayer.current) {
                return item.graphic.layer === conusStateLayer.current;
              }
              return response.results;
            });

            if (graphicList.length) {
              const selectedState: Graphic = graphicList[0].graphic;
              setSelectedLocation(selectedState.attributes.STATEFP);

              // Zoom to selected state
              mapRef.current.view.goTo({ target: selectedState, zoom: 5 });
            }
          }
        });
      });
    });
  }, [mapRef]);

  // Handle alaska composite view interactions
  useEffect(() => {
    alaskaView.current.when(() => {
      alaskaView.current.on('pointer-up', (event) => {
        alaskaView.current.hitTest(event).then((response) => {
          alaskaView.current.graphics.removeAll();
          if (response.results.length) {
            const selectedState: Graphic = response.results[0]?.graphic;
            setSelectedLocation(selectedState.attributes.STATEFP);
          }
        });
      });
    });
  }, [alaskaView]);

  // Handle alaska composite view interactions
  useEffect(() => {
    caribbeanView.current.when(() => {
      caribbeanView.current.on('pointer-up', (event) => {
        caribbeanView.current.hitTest(event).then((response) => {
          caribbeanView.current.graphics.removeAll();
          if (response.results.length) {
            const selectedState: Graphic = response.results[0].graphic;
            setSelectedLocation(selectedState.attributes.STATEFP);
          }
        });
      });
    });
  }, [caribbeanView]);

  // Handle alaska composite view interactions
  useEffect(() => {
    hawaiiView.current.when(() => {
      hawaiiView.current.on('pointer-up', (event) => {
        hawaiiView.current.hitTest(event).then((response) => {
          hawaiiView.current.graphics.removeAll();
          if (response.results.length) {
            const selectedState: Graphic = response.results[0].graphic;
            setSelectedLocation(selectedState.attributes.STATEFP);
          }
        });
      });
    });
  }, [hawaiiView]);

  return null;
};

export default MapComponent;
