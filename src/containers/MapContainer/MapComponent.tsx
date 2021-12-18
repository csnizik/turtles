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
  SMALL_STATES,
  topoBaseMap,
  VIEW_DIV,
  viewConstraints,
} from './constants';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks/hooks';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import { usaFeatureLayer0, usaFeatureLayer1 } from './layers';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import { createMapView } from './mapUtils';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
  map: Map;
}

const MapComponent = () => {
  const dispatch = useAppDispatch();
  const stateCode = useAppSelector((state) => state.stateSlice?.stateCode);
  const alaskaView = useRef({} as MapView);
  const caribbeanView = useRef({} as MapView);
  const hawaiiView = useRef({} as MapView);
  const mapRef = useRef({} as IMapProps);
  const homeBtn = useRef({} as Home);

  const usaFeatureToPointLayer = useRef(usaFeatureLayer0);
  const usaStateLayer = useRef(usaFeatureLayer1);

  const checkAndClearHighlightedGraphics = () => {
    if (alaskaView.current.graphics.length) {
      alaskaView.current.graphics.removeAll();
    } else if (caribbeanView.current.graphics.length) {
      caribbeanView.current.graphics.removeAll();
    } else if (hawaiiView.current.graphics.length) {
      hawaiiView.current.graphics.removeAll();
    } else if (mapRef.current.view.graphics.length) {
      mapRef.current.view.graphics.removeAll();
    }
  };

  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.map = new Map({
        basemap: topoBaseMap,
      });

      const view: MapView = new MapView({
        center: CENTER_COORDINATES,
        container: VIEW_DIV,
        constraints: viewConstraints,
        map: mapRef.current.map,
        zoom: 4,
      });

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
      mapRef.current.view.on('click', (event) => {
        mapRef.current.view.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
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
              const searchInput = {
                state_county_code: selectedState.attributes.STATEFP || null,
              };
              // Zoom to selected state
              if (SMALL_STATES.includes(selectedState.attributes.STUSPS)) {
                mapRef.current.view.goTo({ target: selectedState, zoom: 7 });
              } else if (selectedState?.attributes.STUSPS === 'AK') {
                mapRef.current.view.goTo({ target: selectedState, zoom: 4 });
              } else {
                mapRef.current.view.goTo({ target: selectedState, zoom: 6 });
              }

              dispatch(setSearch(searchInput));
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
            if (foundGraphic) {
              const searchInput = {
                state_county_code: stateCode || null,
              };
              const highlightedGraphic = new Graphic({
                geometry: foundGraphic?.geometry,
                symbol: highlightSymbol,
              });
              mapRef.current.view.graphics.add(highlightedGraphic);
              if (SMALL_STATES.includes(foundGraphic?.attributes.STUSPS)) {
                mapRef.current.view.goTo({ target: foundGraphic, zoom: 7 });
              } else if (foundGraphic?.attributes.STUSPS === 'AK') {
                mapRef.current.view.goTo({ target: foundGraphic, zoom: 4 });
              } else {
                mapRef.current.view.goTo({ target: foundGraphic, zoom: 6 });
              }
              dispatch(setSearch(searchInput));
            }
          });
        }
      });
    });
  }, []);

  // Handle alaska composite view interactions
  useEffect(() => {
    alaskaView.current.when(() => {
      alaskaView.current.on('click', (event) => {
        alaskaView.current.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const selectedState: Graphic = response.results[0]?.graphic;
            const highlightedGraphic = new Graphic({
              geometry: selectedState?.geometry,
              symbol: highlightSymbol,
            });
            alaskaView.current.graphics.add(highlightedGraphic);
            const searchInput = {
              state_county_code: selectedState.attributes.STATEFP,
            };
            dispatch(setSearch(searchInput));
          }
        });
      });
    });
  }, [alaskaView]);

  // Handle caribbean composite view interactions
  useEffect(() => {
    caribbeanView.current.when(() => {
      caribbeanView.current.on('click', (event) => {
        caribbeanView.current.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const selectedState: Graphic = response.results[0].graphic;
            const highlightedGraphic = new Graphic({
              geometry: selectedState?.geometry,
              symbol: highlightSymbol,
            });
            caribbeanView.current.graphics.add(highlightedGraphic);
            const searchInput = {
              state_county_code: selectedState.attributes.STATEFP,
            };
            dispatch(setSearch(searchInput));
          }
        });
      });
    });
  }, [caribbeanView]);

  // Handle hawaii composite view interactions
  useEffect(() => {
    hawaiiView.current.when(() => {
      hawaiiView.current.on('click', (event) => {
        hawaiiView.current.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const selectedState: Graphic = response.results[0].graphic;
            const highlightedGraphic = new Graphic({
              geometry: selectedState?.geometry,
              symbol: highlightSymbol,
            });
            hawaiiView.current.graphics.add(highlightedGraphic);
            const searchInput = {
              state_county_code: selectedState.attributes.STATEFP,
            };
            dispatch(setSearch(searchInput));
          }
        });
      });
    });
  }, [hawaiiView]);

  // Handle interaction with 'Home' button
  useEffect(() => {
    homeBtn.current.when(() => {
      homeBtn.current.on('go', () => {
        checkAndClearHighlightedGraphics();
        // Refresh project list to U.S
        dispatch(
          setSearch({
            state_county_code: null,
          })
        );
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
