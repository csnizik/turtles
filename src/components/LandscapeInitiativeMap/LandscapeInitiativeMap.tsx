import { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Home from '@arcgis/core/widgets/Home';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';
import Layer from '@arcgis/core/layers/Layer';
import Graphic from '@arcgis/core/Graphic';
import Query from '@arcgis/core/rest/support/Query';
import { currentState } from '../../Redux/Slice/stateSlice';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks/hooks';
import '@arcgis/core/assets/esri/themes/light/main.css';
import {
  LANDSCAPE_VIEW_DIV,
  landscapeInitiativeToLegendMap,
  landscapeViewConstraints,
  NATIONAL_WATER_QUALITY_INITIATIVE_ID,
  nrcsBaseLayers,
  WORKING_LANDS_FOR_WILDLIFE_ABBRV,
  WATER_SMART_INITIATIVE_ID,
} from './constants';
import {
  DEFAULT_NATIONAL_LOCATION,
  STATE_FEATURE_LAYER_URL,
  UNITED_STATES_ABBR,
} from '../../common/constants';
import { ILandscapeInitiative } from '../../common/types';
import { filterLandscapeInitiativeLayers } from './utils';
import { highlightSymbol } from '../../containers/MapContainer/constants.js';
import { usePrevious } from '../../common/util/helperHooks';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

interface ILandscapeProps {
  landscapeInitiativesData?: Array<ILandscapeInitiative>;
  selectedLocation?: any;
  selectedLandscapeInitiative?: number;
  portalId?: string;
}

const LandscapeInitiativeMap = ({
  landscapeInitiativesData = [],
  selectedLocation,
  selectedLandscapeInitiative = -1,
  portalId,
}: ILandscapeProps) => {
  const mapRef = useRef({} as IMapProps);
  const stateFeatureLayer = useRef({} as FeatureLayer);
  const legendRef = useRef({} as Expand);
  const [filteredOutLayers, setFilteredLayers]: any = useState([]);
  const dispatch = useAppDispatch();
  const previousValues: any = usePrevious({
    selectedLandscapeInitiative,
  });
  const stateCode =
    useAppSelector((state) => state.stateSlice?.stateCode) ||
    DEFAULT_NATIONAL_LOCATION;
  const history: any = useHistory();
  const location: any = useLocation();
  const homeBtn = useRef({} as Home);
  const [defaultExtent, setDefaultExtent]: any = useState();

  useEffect(() => {
    /*eslint consistent-return: 0 */

    if (mapRef && mapRef.current) {
      mapRef.current.map = new WebMap({
        portalItem: {
          id: portalId,
        },
      });
      const view: MapView = new MapView({
        center: [-96, 36],
        container: LANDSCAPE_VIEW_DIV,
        constraints: landscapeViewConstraints,
        map: mapRef.current.map,
        navigation: {
          momentumEnabled: false,
        },
        zoom: [
          WATER_SMART_INITIATIVE_ID,
          NATIONAL_WATER_QUALITY_INITIATIVE_ID,
        ].includes(selectedLandscapeInitiative)
          ? 4
          : 3,
      });

      homeBtn.current = new Home({
        view,
      });

      mapRef.current.view = view;

      setDefaultExtent(mapRef.current.view.extent);

      // Add the home button to the top left corner of the view
      mapRef.current.view.ui?.add(homeBtn.current, 'top-left');

      stateFeatureLayer.current = new FeatureLayer({
        layerId: 1,
        outFields: ['STATEFP', 'NAME', 'STUSPS'],
        url: STATE_FEATURE_LAYER_URL,
        visible: true,
      });

      mapRef.current.map.layers?.add(stateFeatureLayer.current);

      return () => {
        mapRef.current.view.destroy();
      };
    }
  }, [mapRef, portalId]);

  // Handle interaction with 'Home' button
  useEffect(() => {
    homeBtn.current.when(() => {
      homeBtn.current.on('go', () => {
        mapRef.current.view.graphics.removeAll();

        const updatedPathName = location.pathname.replace(
          stateCode,
          DEFAULT_NATIONAL_LOCATION
        );

        history.replace(updatedPathName);

        // Reset map extent to map's default center
        mapRef.current.view.extent = defaultExtent;
        // Refresh project list to U.S
        dispatch(
          currentState({
            stateNameDisplay: UNITED_STATES_ABBR,
            stateCode: DEFAULT_NATIONAL_LOCATION,
            stateAbbreviation: UNITED_STATES_ABBR,
          })
        );
      });
    });
  }, [mapRef, homeBtn]);

  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.map.when(() => {
        stateFeatureLayer.current.when(() => {
          if (mapRef.current.map.allLayers.length) {
            const allFeatureLayers: Array<any> = (
              mapRef.current.map.allLayers as any
            ).items.filter((layer: Layer) => {
              return layer.title !== 'CIG Project - States';
            });

            const featureLayerInfos: Array<any> = [];
            if (
              landscapeInitiativesData?.length &&
              selectedLocation &&
              selectedLandscapeInitiative !== 2
            ) {
              const relatedLandscpaeInitiativesPerSelectedLocation =
                landscapeInitiativesData.map((init: any) => {
                  return landscapeInitiativeToLegendMap[init.lciId];
                });

              let filteredLayers: Array<any> = [];
              filteredLayers = filterLandscapeInitiativeLayers(
                allFeatureLayers,
                relatedLandscpaeInitiativesPerSelectedLocation
              );

              filteredLayers.forEach((layer: Layer) => {
                featureLayerInfos.push({
                  layer,
                  title: layer.title,
                });
              });
            } else {
              allFeatureLayers.forEach((layer: Layer) => {
                featureLayerInfos.push({
                  layer,
                  title: layer.title,
                });
              });
            }
            // using layerList to allow for the use of checkboxes
            const layerList = new LayerList({
              view: mapRef.current.view,
              listItemCreatedFunction: (event) => {
                const { item } = event;
                if (item.layer.type !== 'group') {
                  // don't show legend twice
                  item.panel = {
                    content: 'legend',
                    open: true,
                  };
                }
              },
            });

            legendRef.current = new Expand({
              id: 'landscapeInitiativeLegend',
              content: layerList,
              expanded: true,
              view: mapRef.current.view,
            });

            if (!mapRef.current.view.ui.find('landscapeInitiativeLegend')) {
              mapRef.current.view.ui.add(legendRef.current, 'bottom-right');
            } else {
              mapRef.current.view.ui.remove('landscapeInitiativeLegend');
              mapRef.current.view.ui.add(legendRef.current, 'bottom-right');
            }
          }
        });
      });
    });
  }, [mapRef, selectedLandscapeInitiative, landscapeInitiativesData]);

  useEffect(() => {
    // Filter out layers depending on which landscape initiative is selected
    mapRef.current.view.when(() => {
      mapRef.current.map.when(() => {
        if (mapRef.current.map.allLayers.length) {
          const allFeatureLayers: Array<any> = (
            mapRef.current.map.allLayers as any
          ).items.filter((layer: Layer) => {
            return layer.title !== 'CIG Project - States';
          });

          if (
            previousValues &&
            previousValues.selectedLandscapeInitiative !==
              selectedLandscapeInitiative
          ) {
            allFeatureLayers.forEach((layer: any) => {
              layer.visible = true; // eslint-disable-line no-param-reassign
            });
          }

          // Working Lands for Wildlife
          if (selectedLandscapeInitiative === 10) {
            let filteredLayers: Array<any> = [];
            filteredLayers = allFeatureLayers.filter((layer: any) => {
              return (
                !layer.title.endsWith(WORKING_LANDS_FOR_WILDLIFE_ABBRV) &&
                !nrcsBaseLayers.includes(layer.id)
              );
            });
            setFilteredLayers(filteredLayers);
            filteredLayers.forEach((layer: any) => {
              layer.visible = false; // eslint-disable-line no-param-reassign
            });
          }
          // Defaualt 'Landscape Conservation Initiatives'
          if (selectedLandscapeInitiative === -1 && filteredOutLayers.length) {
            // Restore all layers
            allFeatureLayers.forEach((layer: any) => {
              layer.visible = true; // eslint-disable-line no-param-reassign
            });
          } else if (
            selectedLocation &&
            landscapeInitiativesData.length === 0
          ) {
            // Remove all layers if no landscape initiatives are found
            allFeatureLayers.forEach((layer: any) => {
              if (!nrcsBaseLayers.includes(layer.id)) {
                layer.visible = false; // eslint-disable-line no-param-reassign
              }
            });
          }
        }
      });
    });
  }, [mapRef, selectedLandscapeInitiative]);

  // Pre-select state and highlight if stateCode is provided (selectedLocation)
  useEffect(() => {
    if (
      selectedLocation &&
      mapRef.current &&
      legendRef.current &&
      stateFeatureLayer.current
    ) {
      mapRef.current.map.when(() => {
        stateFeatureLayer.current.when(() => {
          mapRef.current.view.graphics.removeAll();
          const stateLayerQuery: Query =
            stateFeatureLayer.current.createQuery();
          stateLayerQuery.where = `STATEFP = '${selectedLocation}'`;
          stateLayerQuery.outFields = ['NAME', 'STUSPS'];
          stateFeatureLayer.current
            .queryFeatures(stateLayerQuery)
            .then((response: any) => {
              const { features } = response;
              if (features.length) {
                const foundState = features[0];
                const highlightedGraphic = new Graphic({
                  geometry: foundState?.geometry,
                  symbol: highlightSymbol,
                });
                mapRef.current.view.graphics.add(highlightedGraphic);

                mapRef.current.view.extent = foundState?.geometry?.extent
                  .clone()
                  .expand(1.65);
              }
            });
        });
      });
    }
  }, [selectedLandscapeInitiative]);

  // Handle map interactions
  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.view.on('click', (event) => {
        mapRef.current.view.hitTest(event).then((response) => {
          mapRef.current.view.graphics.removeAll();
          if (response.results.length) {
            const graphicList: any = response.results.filter((item: any) => {
              // check if the graphic belongs to the states layer
              if (stateFeatureLayer.current) {
                return item.graphic.layer === stateFeatureLayer.current;
              }
              return response.results;
            });

            if (graphicList.length) {
              const selectedState: Graphic = graphicList[0].graphic;
              const { attributes } = selectedState;
              const highlightedGraphic = new Graphic({
                geometry: selectedState?.geometry,
                symbol: highlightSymbol,
              });
              mapRef.current.view.graphics.add(highlightedGraphic);

              const updatedPathName = location.pathname.replace(
                stateCode,
                attributes.STATEFP
              );

              history.replace(updatedPathName);

              // Set stateCode to the one selected on map
              dispatch(
                currentState({
                  stateNameDisplay: attributes.NAME,
                  stateCode: attributes.STATEFP,
                  stateAbbreviation: attributes.STUSPS,
                })
              );
              mapRef.current.view.extent = selectedState?.geometry?.extent
                .clone()
                .expand(1.25);
            }
          }
        });
      });
    });
  }, [mapRef]);

  return null;
};

export default LandscapeInitiativeMap;

LandscapeInitiativeMap.defaultProps = {
  landscapeInitiativesData: [],
  selectedLocation: '',
  selectedLandscapeInitiative: -1,
  portalId: '',
};
