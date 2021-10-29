import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

// Feature layer urls
const alaskaFeatureLayerURL =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_Alaska/MapServer';

const caribbeanFeatureLayerURL =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_Caribbean/MapServer';

const conusFeatureLayerURL =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_CONUS/MapServer';

const hawaiiFeatureLayerURL =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/Project_Hawaii/MapServer';

// Project count layer
export const alaskaFeatureLayer0 = new FeatureLayer({
  url: alaskaFeatureLayerURL,
  layerId: 0,
});

// State boundary layer
export const alaskaFeatureLayer1 = new FeatureLayer({
  url: alaskaFeatureLayerURL,
  layerId: 1,
});

// Project count layer
export const conusFeatureLayer0 = new FeatureLayer({
  url: conusFeatureLayerURL,
  layerId: 0,
});

// State boundary layer
export const conusFeatureLayer1 = new FeatureLayer({
  url: conusFeatureLayerURL,
  outFields: ['STATEFP', 'NAME', 'STUSPS'],
  layerId: 1,
});

// Project count layer
export const caribbeanFeatureLayer0 = new FeatureLayer({
  url: caribbeanFeatureLayerURL,
  layerId: 0,
});

// State boundary layer
export const caribbeanFeatureLayer1 = new FeatureLayer({
  url: caribbeanFeatureLayerURL,
  layerId: 1,
});

// Project count layer
export const hawaiiFeatureLayer0 = new FeatureLayer({
  url: hawaiiFeatureLayerURL,
  layerId: 0,
});

// State boundary layer
export const hawaiiFeatureLayer1 = new FeatureLayer({
  url: hawaiiFeatureLayerURL,
  layerId: 1,
});
