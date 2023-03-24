import { useEffect, useRef } from 'react';
import Graphic from '@arcgis/core/Graphic';
import Home from '@arcgis/core/widgets/Home';
import MapView from '@arcgis/core/views/MapView';
import Query from '@arcgis/core/rest/support/Query';
import WebMap from '@arcgis/core/WebMap';
import { useHistory, useLocation } from 'react-router-dom';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { usePrevious } from '../../common/util/helperHooks';
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
  VIEW_DIV,
  viewConstraints,
  stateCodes,
  stAbbrs
} from './constants';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import { createMapView } from './mapUtils';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

interface IMapComponentProps {
  stateCode: string;
  CIG_PORTAL_ID: string;
  STATE_FEATURE_LAYER_URL: string;
}

const MapComponent = ({ stateCode, CIG_PORTAL_ID, STATE_FEATURE_LAYER_URL }: IMapComponentProps) => {
  const dispatch = useAppDispatch();
  const alaskaView = useRef({} as any);
  const caribbeanView = useRef({} as any);
  const hawaiiView = useRef({} as any);
  const mapRef = useRef({} as IMapProps);
  const homeBtn = useRef({} as Home);
  const history: any = useHistory();
  const location: any = useLocation();
  const usaFeatureLayer1 = new FeatureLayer({
    url: STATE_FEATURE_LAYER_URL,
    outFields: ['NAME', 'state_abbr'],
    layerId: 5,
  });
  const usaStateLayer = useRef(usaFeatureLayer1);
  const previousValues: any = usePrevious({
    stateCode,
  });

  

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
      mapRef.current.map = new WebMap({
        portalItem: {
          id: CIG_PORTAL_ID,
        },
      });

      const view: MapView = new MapView({
        center: CENTER_COORDINATES,
        container: VIEW_DIV,
        constraints: viewConstraints,
        map: mapRef.current.map,
        navigation: {
          momentumEnabled: false,
        },
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
 
      // Hawaii composite view
       hawaiiView.current = createMapView(
        'hiViewDiv',
        mapRef.current.map,
        hawaiiExtent,
        HAWAII_ZOOM,
        HAWAII_CENTER
      ); 

      // Caribbean composite view
      caribbeanView.current = createMapView(
        'cariViewDiv',
        mapRef.current.map,
        caribbeanExtent,
        CARIBBEAN_ZOOM,
        CARIBBEAN_CENTER
      ); 

      homeBtn.current = new Home({
        view,
      });

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui?.add(homeBtn.current, 'top-left');

      // Add composite views for Alaska, Hawaii, and Caribbean
      mapRef.current.view.ui?.add(
        ['akViewDiv', 'hiViewDiv', 'cariViewDiv'],
        'bottom-left'
      );
    }
  }, [mapRef]);

  useEffect(() => {
    if (
      previousValues &&
      previousValues.stateCode !== DEFAULT_NATIONAL_LOCATION &&
      stateCode === DEFAULT_NATIONAL_LOCATION
    ) {
      // Alaska composite view
       alaskaView.current = createMapView(
        'akViewDiv',
        mapRef.current.map,
        alaskaExtent,
        ALASKA_ZOOM,
        ALASKA_CENTER
      ); 

      // Hawaii composite view
       hawaiiView.current = createMapView(
        'hiViewDiv',
        mapRef.current.map,
        hawaiiExtent,
        HAWAII_ZOOM,
        HAWAII_CENTER
      ); 

      // Caribbean composite view
       caribbeanView.current = createMapView(
        'cariViewDiv',
        mapRef.current.map,
        caribbeanExtent,
        CARIBBEAN_ZOOM,
        CARIBBEAN_CENTER
      ); 

      mapRef.current.view.ui?.add(
        ['akViewDiv', 'hiViewDiv', 'cariViewDiv'],
        'bottom-left'
      );
    }
  }, [stateCode]);

  // Handle map interactions
  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.view.on('click', (event) => {
        mapRef.current.view.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const graphicList: any = response.results.filter((item: any) => {
              // check if the graphic belongs to the states layer
              if (item.graphic) {
                return item.graphic.layer?.id !== null;
              }
              return response.results;
            });

            if (graphicList.length) {
              const selectedState: Graphic = graphicList[0].graphic;
              const stateLayerQuery: Query =
                usaStateLayer.current.createQuery();
              stateLayerQuery.where = `OBJECTID = ${selectedState?.attributes.OBJECTID}`;
              stateLayerQuery.outFields = [
                'NAME',
                'OBJECTID',
                'state_abbr'
              ];
               usaStateLayer.current
                .queryFeatures(stateLayerQuery)
                .then((queryResults: any) => {
                  const { features } = queryResults;
                  if (features.length) {
                    const foundState = features[0];
                    const newStateCode = stateCodes[foundState?.attributes.state_abbr];
                    const updatedPathName = location.pathname.replace(
                      stateCode,
                      newStateCode
                    );

                    history.replace(updatedPathName);

                    const highlightedGraphic: Graphic = new Graphic({
                      geometry: selectedState?.geometry,
                      symbol: highlightSymbol,
                    });
                    mapRef.current.view.graphics.add(highlightedGraphic);
                    // Zoom to selected state
                    if (SMALL_STATES.includes(foundState?.attributes.state_abbr)) {
                      mapRef.current.view.extent = foundState?.geometry?.extent
                        .clone()
                        .expand(1.25);
                    } else if (foundState?.attributes.state_abbr === 'AK') {
                      mapRef.current.view.extent = foundState?.geometry?.extent
                        .clone()
                        .expand(2.65);
                    } else {
                      mapRef.current.view.extent = foundState?.geometry?.extent
                        .clone()
                        .expand(1.4);
                    }
                  }
                });
            }
          }
        });
      });
    });
  }, [mapRef]);

  // Pre-select the state given the stateCode
  useEffect(() => {
    mapRef.current.map.when(() => {
      if (stateCode && stateCode !== DEFAULT_NATIONAL_LOCATION) {
        const stateLayerQuery: Query = usaStateLayer.current.createQuery();
        stateLayerQuery.where = `state_abbr = '${stAbbrs[stateCode]}'`;
        stateLayerQuery.outFields = ['NAME', 'state_abbr'];
        usaStateLayer.current
          .queryFeatures(stateLayerQuery)
          .then((response: any) => {
            const { features } = response;
            if (features.length) {
              const foundGraphic: Graphic = features[0];
              const highlightedGraphic = new Graphic({
                geometry: foundGraphic?.geometry,
                symbol: highlightSymbol,
              });
              mapRef.current.view.graphics.add(highlightedGraphic);

              if (SMALL_STATES.includes(foundGraphic?.attributes.state_abbr)) {
                mapRef.current.view.extent = foundGraphic?.geometry?.extent
                  .clone()
                  .expand(1.25);
              } else if (foundGraphic?.attributes.state_abbr === 'AK') {
                mapRef.current.view.extent = foundGraphic?.geometry?.extent
                  .clone()
                  .expand(2.65);
              } else {
                mapRef.current.view.extent = foundGraphic?.geometry?.extent
                  .clone()
                  .expand(1.4);
              }
            }
          });
      }
    });
  }, []);

  // Handle alaska composite view interactions
  useEffect(() => {
    alaskaView.current.when(() => {
      alaskaView.current.on('click', (event) => {
        alaskaView.current.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const graphicsList = response.results;

            if (graphicsList.length) {
              const selectedState: Graphic = graphicsList[0].graphic;

              const objectId = selectedState.attributes.OBJECTID;
              const stateLayerQuery: Query =
                usaStateLayer.current.createQuery();
              stateLayerQuery.where = `OBJECTID = '${objectId}'`;
              stateLayerQuery.outFields = ['NAME', 'state_abbr'];
              usaStateLayer.current
                .queryFeatures(stateLayerQuery)
                .then((queryResults: any) => {
                  if (queryResults) {
                    const { features } = queryResults;
                    if (features.length) {
                      const foundGraphic: Graphic = features[0];
                      const newStateCode = stateCodes[foundGraphic?.attributes.state_abbr];
                      const updatedPathName = location.pathname.replace(
                        stateCode,
                        newStateCode
                      );
                      history.replace(updatedPathName);
                      const highlightedGraphic = new Graphic({
                        geometry: foundGraphic?.geometry,
                        symbol: highlightSymbol,
                      });
                      alaskaView.current.graphics.add(highlightedGraphic);
                    }
                  }
                });
            }
          }
        });
      });
    });
  }, [mapRef.current, alaskaView.current]);

  // Handle caribbean composite view interactions
  useEffect(() => {
    caribbeanView.current.when(() => {
      caribbeanView.current.on('click', (event) => {
        caribbeanView.current.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const graphicsList = response.results;

            if (graphicsList.length) {
              const selectedState: Graphic = graphicsList[0].graphic;

              const objectId = selectedState.attributes.OBJECTID;
              const stateLayerQuery: Query =
                usaStateLayer.current.createQuery();
                stateLayerQuery.where = `state_abbr = 'PR'`;
              stateLayerQuery.outFields = ['NAME', 'state_abbr'];
              usaStateLayer.current
                .queryFeatures(stateLayerQuery)
                .then((queryResults: any) => {
                  if (queryResults) {
                    const { features } = queryResults;
                    if (features.length) {
                      const foundGraphic: Graphic = features[0];
                      const newStateCode = stateCodes[foundGraphic?.attributes.state_abbr];
                      const updatedPathName = location.pathname.replace(
                        stateCode,
                        newStateCode
                      );
                      history.replace(updatedPathName);
                      const highlightedGraphic = new Graphic({
                        geometry: foundGraphic?.geometry,
                        symbol: highlightSymbol,
                      });
                      caribbeanView.current.graphics.add(highlightedGraphic);
                    }
                  }
                });
            }
          }
        });
      });
    });
  }, [mapRef.current, caribbeanView.current]);

  // Handle hawaii composite view interactions
  useEffect(() => {
    hawaiiView.current.when(() => {
      hawaiiView.current.on('click', (event) => {
        hawaiiView.current.hitTest(event).then((response) => {
          checkAndClearHighlightedGraphics();
          if (response.results.length) {
            const graphicsList = response.results;

            if (graphicsList.length) {
              const selectedState: Graphic = graphicsList[0].graphic;

              const objectId = selectedState.attributes.OBJECTID;
              const stateLayerQuery: Query =
                usaStateLayer.current.createQuery();
                stateLayerQuery.where = `state_abbr = 'HI'`;
              stateLayerQuery.outFields = ['NAME', 'state_abbr'];
              usaStateLayer.current
                .queryFeatures(stateLayerQuery)
                .then((queryResults: any) => {
                  if (queryResults) {
                    const { features } = queryResults;
                    if (features.length) {
                      const foundGraphic: Graphic = features[0];
                      const newStateCode = stateCodes[foundGraphic?.attributes.state_abbr];
                      const updatedPathName = location.pathname.replace(
                        stateCode,
                        newStateCode
                      );
                      history.replace(updatedPathName);
                      const highlightedGraphic = new Graphic({
                        geometry: foundGraphic?.geometry,
                        symbol: highlightSymbol,
                      });
                      hawaiiView.current.graphics.add(highlightedGraphic);
                    }
                  }
                });
            }
          }
        });
      });
    });
  }, [mapRef.current, hawaiiView.current]);

  // Handle interaction with 'Home' button
  useEffect(() => {
    homeBtn.current.when(() => {
      homeBtn.current.on('go', () => {
        checkAndClearHighlightedGraphics();
        const updatedPathName = location.pathname.replace(
          stateCode,
          DEFAULT_NATIONAL_LOCATION
        );
        history.replace(updatedPathName);
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
