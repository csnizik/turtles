import { useEffect, useRef } from 'react';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Graphic from '@arcgis/core/Graphic';
import Home from '@arcgis/core/widgets/Home';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { usePostProjectSearchQuery } from '../../Redux/services/api';
import {
  alaskaFeatureLayerURL,
  alaskaExtent,
  caribbeanFeatureLayerURL,
  caribbeanExtent,
  CENTER_COORDINATES,
  conusFeatureLayerURL,
  fillBorderColor,
  hawaiiFeatureLayerURL,
  hawaiiExtent,
  MIN_ZOOM,
  MAX_ZOOM,
  simpleFillColor,
  topoBaseMap,
  VIEW_DIV,
} from './constants';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
}

const MapComponent = ({ selectedLocation, setSelectedLocation }: any) => {
  const mapRef = useRef({} as IMapProps);
  let hiView;
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
      outFields: ['STATEFP'],
      layerId: 1,
    })
  );
  const caribbeanFeatureToPointLayer = useRef(
    new FeatureLayer({
      url: caribbeanFeatureLayerURL,
      layerId: 0,
    })
  );
  const caribbeanLayer = useRef(
    new FeatureLayer({
      url: caribbeanFeatureLayerURL,
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
  // Use post practice search to retrieve list of practiecs per selected state
  const { data, isSuccess } = usePostProjectSearchQuery({
    state_county_code: selectedLocation,
  });

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
        extent: alaskaExtent,
        spatialReference: {
          wkid: 102009,
        },
        ui: {
          components: [],
        },
      });

      // Caribbean composite view
      const caribbeanView = new MapView({
        container: 'cariViewDiv',
        map,
        extent: caribbeanExtent,
        spatialReference: {
          wkid: 102965,
        },
        ui: {
          components: [],
        },
      });

      // Hawaii composite view
      hiView = new MapView({
        container: 'hiViewDiv',
        map,
        extent: hawaiiExtent,
        spatialReference: {
          wkid: 102965,
        },
        ui: {
          components: [],
        },
        //center: [154.9921875, 85.546875],
      });

      const homeBtn = new Home({
        view,
      });

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui.add(homeBtn, 'top-left');

      // Add the alaska view container as an inset view
      mapRef.current.view.ui.add('akViewDiv', 'bottom-left');
      // Add the hawaii view container as an inset view
      mapRef.current.view.ui.add('hiViewDiv', 'bottom-left');

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
            console.log('response: ', response);
            const graphicList: any = response.results.filter((item: any) => {
              // check if the graphic belongs to the states layer
              if (conusStateLayer.current) {
                return item.graphic.layer === conusStateLayer.current;
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
              setSelectedLocation(selectedState.attributes.STATEFP);
              mapRef.current.view.graphics.add(selectedGraphic);

              // Zoom to selected state
              mapRef.current.view.goTo({ target: selectedState, zoom: 5 });
            }
          }
        });
      });
    });
  }, [mapRef]);

  // useEffect(() => {
  //   hiView.when(() => {
  //     hiView.on('pointer-up', (event) => {
  //       console.log('Event: ', event);
  //     });
  //   });
  // }, [hiView]);

  return null;
};

export default MapComponent;
