import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { STATE_FEATURE_LAYER_URL } from '../../common/constants';

// Feature layer urls

// Project count layer
export const usaFeatureLayer0 = new FeatureLayer({
  url: STATE_FEATURE_LAYER_URL,
  layerId: 0,
});

// State boundary layer
export const usaFeatureLayer1 = new FeatureLayer({
  url: STATE_FEATURE_LAYER_URL,
  outFields: ['STATEFP', 'NAME', 'STUSPS'],
  layerId: 1,
});
