import { useEffect, useRef } from 'react';
import Graphic from '@arcgis/core/Graphic';
import Home from '@arcgis/core/widgets/Home';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import {
  alaskaExtent,
  ALASKA_CENTER,
  ALASKA_ZOOM,
  caribbeanExtent,
  CARIBBEAN_CENTER,
  CARIBBEAN_ZOOM,
  CENTER_COORDINATES,
  hawaiiExtent,
  HAWAII_CENTER,
  HAWAII_ZOOM,
  highlightSymbol,
  topoBaseMap,
  VIEW_DIV,
  viewConstraints,
} from './constants';
import { usaFeatureLayer0, usaFeatureLayer1 } from './layers';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import { createMapView } from './mapUtils';
import { useAppSelector } from '../../Redux/hooks/hooks';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
  map: Map;
}

const MapComponent = ({ setSelectedLocation }: any) => {
  const stateCode = useAppSelector((state) => state.stateSlice?.stateCode);
  const alaskaView = useRef({} as MapView);
  const caribbeanView = useRef({} as MapView);
  const hawaiiView = useRef({} as MapView);
  const mapRef = useRef({} as IMapProps);
  const homeBtn = useRef({} as Home);

  const usaFeatureToPointLayer = useRef(usaFeatureLayer0);
  const usaStateLayer = useRef(usaFeatureLayer1);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.map = new Map({
        basemap: topoBaseMap,
      });

      const view: MapView = new MapView({
        center: CENTER_COORDINATES,
        container: VIEW_DIV,
        map: mapRef.current.map,
        zoom: 4,
      });

      view.constraints = viewConstraints;

      // Alaska composite view
      alaskaView.current = createMapView(
        'akViewDiv',
        mapRef.current.map,
        alaskaExtent,
        ALASKA_ZOOM,
        ALASKA_CENTER
      );

      // Caribbean composite view
      caribbeanView.current = createMapView(
        'cariViewDiv',
        mapRef.current.map,
        caribbeanExtent,
        CARIBBEAN_ZOOM,
        CARIBBEAN_CENTER
      );

      // Hawaii composite view
      hawaiiView.current = createMapView(
        'hiViewDiv',
        mapRef.current.map,
        hawaiiExtent,
        HAWAII_ZOOM,
        HAWAII_CENTER
      );

      homeBtn.current = new Home({
        view,
      });

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui.add(homeBtn.current, 'top-left');

      // Add composite views for Alaska, Hawaii, and Caribbean
      mapRef.current.view.ui.add('akViewDiv', 'bottom-left');
      mapRef.current.view.ui.add('hiViewDiv', 'bottom-left');
      mapRef.current.view.ui.add('cariViewDiv', 'bottom-left');

      // Add Feature Layers
      mapRef.current.map.layers.add(usaFeatureToPointLayer.current);
      mapRef.current.map.layers.add(usaStateLayer.current);
    }
  }, [mapRef]);

  // Handle map interactions
  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.view.on('pointer-up', (event) => {
        mapRef.current.view.hitTest(event).then((response) => {
          if (alaskaView.current.graphics.length) {
            alaskaView.current.graphics.removeAll();
          } else if (caribbeanView.current.graphics.length) {
            caribbeanView.current.graphics.removeAll();
          } else if (hawaiiView.current.graphics.length) {
            hawaiiView.current.graphics.removeAll();
          } else if (mapRef.current.view.graphics.length) {
            mapRef.current.view.graphics.removeAll();
          }
          if (response.results.length) {
            const graphicList: any = response.results.filter((item: any) => {
              // check if the graphic belongs to the states layer
              if (usaStateLayer.current) {
                return item.graphic.layer === usaStateLayer.current;
              }
              return response.results;
            });

            if (graphicList.length) {
              const selectedState: Graphic = graphicList[0].graphic;
              const highlightedGraphic = new Graphic({
                geometry: selectedState?.geometry,
                symbol: highlightSymbol,
              });
              mapRef.current.view.graphics.add(highlightedGraphic);
              // Refresh project lists
              setSelectedLocation(selectedState.attributes.STATEFP);
              // Zoom to selected state
              mapRef.current.view.goTo({ target: selectedState, zoom: 9 });
            }
          }
        });
      });
    });
  }, [mapRef]);

  // Pre-select the state given the stateCode
  useEffect(() => {
    usaStateLayer.current.when(() => {
      usaStateLayer.current.on('layerview-create', () => {
        if (stateCode && stateCode !== DEFAULT_NATIONAL_LOCATION) {
          usaStateLayer.current.queryFeatures().then((response) => {
            const { features } = response;
            const foundGraphic = features.find(
              (graphic) => graphic.attributes?.STATEFP === stateCode
            );
            const highlightedGraphic = new Graphic({
              geometry: foundGraphic?.geometry,
              symbol: highlightSymbol,
            });
            mapRef.current.view.graphics.add(highlightedGraphic);
            setSelectedLocation(foundGraphic?.attributes.STATEFP);
            mapRef.current.view.goTo({ target: foundGraphic, zoom: 9 });
          });
        }
      });
    });
  }, []);

  // Handle alaska composite view interactions
  useEffect(() => {
    alaskaView.current.when(() => {
      alaskaView.current.on('pointer-up', (event) => {
        alaskaView.current.hitTest(event).then((response) => {
          if (caribbeanView.current.graphics.length) {
            caribbeanView.current.graphics.removeAll();
          } else if (hawaiiView.current.graphics.length) {
            hawaiiView.current.graphics.removeAll();
          } else if (mapRef.current.view.graphics.length) {
            mapRef.current.view.graphics.removeAll();
          }
          if (response.results.length) {
            const selectedState: Graphic = response.results[0]?.graphic;
            const highlightedGraphic = new Graphic({
              geometry: selectedState?.geometry,
              symbol: highlightSymbol,
            });
            alaskaView.current.graphics.add(highlightedGraphic);
            setSelectedLocation(selectedState.attributes.STATEFP);
          }
        });
      });
    });
  }, [alaskaView]);

  // Handle caribbean composite view interactions
  useEffect(() => {
    caribbeanView.current.when(() => {
      caribbeanView.current.on('pointer-up', (event) => {
        caribbeanView.current.hitTest(event).then((response) => {
          if (alaskaView.current.graphics.length) {
            alaskaView.current.graphics.removeAll();
          } else if (hawaiiView.current.graphics.length) {
            hawaiiView.current.graphics.removeAll();
          } else if (mapRef.current.view.graphics.length) {
            mapRef.current.view.graphics.removeAll();
          }
          if (response.results.length) {
            const selectedState: Graphic = response.results[0].graphic;
            const highlightedGraphic = new Graphic({
              geometry: selectedState?.geometry,
              symbol: highlightSymbol,
            });
            caribbeanView.current.graphics.add(highlightedGraphic);
            setSelectedLocation(selectedState.attributes.STATEFP);
          }
        });
      });
    });
  }, [caribbeanView]);

  // Handle hawaii composite view interactions
  useEffect(() => {
    hawaiiView.current.when(() => {
      hawaiiView.current.on('pointer-up', (event) => {
        hawaiiView.current.hitTest(event).then((response) => {
          if (alaskaView.current.graphics.length) {
            alaskaView.current.graphics.removeAll();
          } else if (caribbeanView.current.graphics.length) {
            caribbeanView.current.graphics.removeAll();
          } else if (mapRef.current.view.graphics.length) {
            mapRef.current.view.graphics.removeAll();
          }
          if (response.results.length) {
            const selectedState: Graphic = response.results[0].graphic;
            const highlightedGraphic = new Graphic({
              geometry: selectedState?.geometry,
              symbol: highlightSymbol,
            });
            hawaiiView.current.graphics.add(highlightedGraphic);
            setSelectedLocation(selectedState.attributes.STATEFP);
          }
        });
      });
    });
  }, [hawaiiView]);

  // Handle interaction with 'Home' button
  useEffect(() => {
    homeBtn.current.when(() => {
      homeBtn.current.on('go', () => {
        // Refresh project list to U.S
        setSelectedLocation(null);
        // Reset composite views to default position
        alaskaView.current.goTo({ center: ALASKA_CENTER, zoom: ALASKA_ZOOM });
        caribbeanView.current.goTo({
          center: CARIBBEAN_CENTER,
          zoom: CARIBBEAN_ZOOM,
        });
        hawaiiView.current.goTo({ center: HAWAII_CENTER, zoom: HAWAII_ZOOM });
      });
    });
  }, [homeBtn]);

  return null;
};

export default MapComponent;
