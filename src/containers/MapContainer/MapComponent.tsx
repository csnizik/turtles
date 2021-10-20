import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import Graphic from '@arcgis/core/Graphic';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import {
  MIN_ZOOM,
  MAX_ZOOM,
  VIEW_DIV,
  simpleFillColor,
  fillBorderColor,
} from './constants';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
}

const statesFeatureLayerURL: any =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/ALBERS_States/MapServer';

const MapComponent = () => {
  const mapRef = useRef({} as IMapProps);
  const statesLayer = useRef(
    new FeatureLayer({
      url: statesFeatureLayerURL,
      layerId: 1,
    })
  );
  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = new Map();

      const view = new MapView({
        container: VIEW_DIV,
        map,
      });

      const homeBtn = new Home({
        view,
      });

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui.add(homeBtn, 'top-left');

      const akView = new MapView({
        container: 'akViewDiv',
        map: map,
        extent: {
          // autocasts as new Extent()
          xmin: -5439870.428998005,
          ymin: 3933143.727441013,
          xmax: -2211170.354233005,
          ymax: 6203017.719397005,
          spatialReference: {
            wkid: 102965,
          },
        },
        spatialReference: {
          // WGS 1984 Alaska Polar Stereographic
          // projected coordinate system
          wkid: 102965,
        },
        ui: {
          // clears all default widgets from the
          // inset view
          components: [],
        },
      });
      // Add the alaska view container as an inset view
      mapRef.current.view.ui.add('akViewDiv', 'bottom-left');

      // Add Feature Layer
      map.layers.add(statesLayer.current);
    }
  }, [mapRef]);

  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.view.on('pointer-up', (event) => {
        mapRef.current.view.hitTest(event).then((response) => {
          mapRef.current.view.graphics.removeAll();
          if (response.results.length) {
            console.log('response: ', response);
            const graphicList: any = response.results.filter((item: any) => {
              // check if the graphic belongs to the states layer
              if (statesLayer.current) {
                return item.graphic.layer === statesLayer.current;
              }
              return response.results;
            });

            if (graphicList.length) {
              const selectedState: Graphic = graphicList[0].graphic;
              // Highlight selected state
              mapRef.current.view.graphics.removeAll();

              const highlightSymbol = {
                type: 'simple-fill',
                color: simpleFillColor,
                style: 'solid',
                outline: {
                  color: fillBorderColor,
                  width: 1,
                },
              };

              const selectedGraphic = new Graphic({
                geometry: selectedState.geometry,
                symbol: highlightSymbol,
              });
              mapRef.current.view.graphics.add(selectedGraphic);

              // Zoom to selected state
              mapRef.current.view.goTo({ target: selectedState, zoom: 5 });
            }
          }
        });
      });
    });
  }, [mapRef]);

  return null;
};

export default MapComponent;
