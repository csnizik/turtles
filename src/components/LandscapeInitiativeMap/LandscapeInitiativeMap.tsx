import { useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import Layer from '@arcgis/core/layers/Layer';
import '@arcgis/core/assets/esri/themes/light/main.css';
import {
  ALL_LANDSCAPE_INITIATIVES_PORTAL_URL,
  LANDSCAPE_VIEW_DIV,
} from './constants';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

const STATE_FEATURE_LAYER_URL =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/CIG_Project/MapServer';

const coloradoInits = [
  {
    lci_id: 2,
    lci_name: 'Joint Chiefs Landscape Restoration Partnership',
  },
  {
    lci_id: 7,
    lci_name: 'National Water Quality Initiative',
  },
  {
    lci_id: 9,
    lci_name: 'WaterSMART',
  },
  {
    lci_id: 10,
    lci_name: 'Working Lands for Wildlife',
  },
  {
    lci_id: 11,
    lci_name: 'Golden-Winged Warbler',
  },
  {
    lci_id: 12,
    lci_name: 'Gopher Tortoise',
  },
  {
    lci_id: 13,
    lci_name: 'Lesser Prairie-Chicken',
  },
  {
    lci_id: 14,
    lci_name: 'Monarch Butterfly',
  },
  {
    lci_id: 15,
    lci_name: 'Southwestern Willow Flycatcher',
  },
  {
    lci_id: 16,
    lci_name: 'Sage Grouse',
  },
];

const landscapeInitiativeToLegendMap = {
  1: 'Great_Lakes_Restoration_Initiative',
  2: 'Joint Chiefs Landscape Restoration Partnership',
  4: 'Longleaf_Pine',
  5: 'Mississippi_River_Basin_Initiative',
  7: 'National Water Quality Initiative',
  9: 'WaterSMART',
  10: 'Working Lands for Wildlife',
  11: 'Golden_Winged_Warbler',
  12: 'Gopher_Tortoise',
  13: 'Lesser_Prairie_Chicken_Initiative',
  14: 'Monarch_Butterfly_Project',
  15: 'Southwestern Willow Flycatcher',
  16: 'Sage_Grouse',
  17: 'Bog Turtle',
  18: 'New England Cottontail',
};

interface ILandscapeProps {
  selectedLocation: any;
}

const LandscapeInitiativeMap = ({
  selectedLocation = null,
}: ILandscapeProps) => {
  const mapRef = useRef({} as IMapProps);
  const stateFeatureLayer = useRef({} as FeatureLayer);
  const legendRef = useRef({} as Legend);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.map = new WebMap({
        portalItem: {
          id: ALL_LANDSCAPE_INITIATIVES_PORTAL_URL,
        },
      });
      const view: MapView = new MapView({
        center: [-96, 36],
        container: LANDSCAPE_VIEW_DIV,
        map: mapRef.current.map,
        zoom: 4,
      });

      mapRef.current.view = view;

      stateFeatureLayer.current = new FeatureLayer({
        layerId: 1,
        outFields: ['STATEFP', 'NAME', 'STUSPS'],
        url: STATE_FEATURE_LAYER_URL,
        visible: false,
      });

      mapRef.current.map.layers.add(stateFeatureLayer.current);
    }
  }, [mapRef]);

  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.map.when(() => {
        if (mapRef.current.map.allLayers.length) {
          const allFeatureLayers: Array<any> = (
            mapRef.current.map.allLayers as any
          ).items.filter((layer: Layer) => {
            return layer.type === 'feature';
          });

          let filteredLayers: Array<any> = [];
          const featureLayerInfos: Array<any> = [];
          if (selectedLocation) {
            const relatedLandscpaeInitiativesPerSelectedLocation =
              coloradoInits.map((init: any) => {
                return landscapeInitiativeToLegendMap[init.lci_id];
              });

            console.log(
              'relatedLandscpaeInitiativesPerSelectedLocation: ',
              relatedLandscpaeInitiativesPerSelectedLocation
            );

            filteredLayers = allFeatureLayers.filter((layer: Layer) => {
              console.log('layer: ', layer.title);
              return relatedLandscpaeInitiativesPerSelectedLocation.includes(
                layer.title
              );
            });

            console.log('Filtered layers: ', filteredLayers);
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

          legendRef.current = new Legend({
            style: 'classic',
            view: mapRef.current.view,
            layerInfos: featureLayerInfos,
          });

          mapRef.current.view.ui.add(legendRef.current, 'bottom-right');
        }
      });
    });
  }, [mapRef]);

  useEffect(() => {
    if (mapRef.current && legendRef.current && stateFeatureLayer.current) {
      mapRef.current.map.when(() => {
        stateFeatureLayer.current.when(() => {
          stateFeatureLayer.current.on('layerview-create', () => {
            stateFeatureLayer.current.queryFeatures().then((response) => {
              const { features } = response;
              const result: any = features.find((feat: any) => {
                return feat.attributes?.STATEFP === '08';
              });

              mapRef.current.view.extent = result?.geometry?.extent
                .clone()
                .expand(1.5);

              if (mapRef.current.map.allLayers.length) {
                const filteredLayers: Array<any> = (
                  mapRef.current.map.allLayers as any
                ).items.filter((layer: Layer) => {
                  return layer.title.includes('Sage_Grouse');
                });

                // if (filteredLayers.length) {
                //   const filteredLegendLayers: any = [];
                //   filteredLayers.forEach((layer: Layer) => {
                //     filteredLegendLayers.push({
                //       layer,
                //       title: layer.title,
                //     });
                //   });
                //setLegendLayerInfos(filteredLegendLayers);
                // if (legendRef.current) {
                //   legendRef.current.destroy();
                // }

                // console.log('legendLayerInfos: ', legendLayerInfos);
                // console.log('filteredLegendLayers: ', filteredLegendLayers);

                //mapRef.current.view.ui.add(legendRef.current, 'bottom-right');
                //}
              }
            });
          });
        });
      });
    }
  }, []);

  return null;
};

export default LandscapeInitiativeMap;
