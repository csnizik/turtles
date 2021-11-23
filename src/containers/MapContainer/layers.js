import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

// Feature layer urls
const usaFeatureLayerURL =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/CIG_Project/MapServer';

// Project count layer
export const usaFeatureLayer0 = new FeatureLayer({
  url: usaFeatureLayerURL,
  layerId: 0,
});

// State boundary layer
export const usaFeatureLayer1 = new FeatureLayer({
  url: usaFeatureLayerURL,
  outFields: ['STATEFP', 'NAME', 'STUSPS'],
  layerId: 1,
});
