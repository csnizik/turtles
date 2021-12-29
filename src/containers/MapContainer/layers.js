import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { STATE_FEATURE_LAYER_URL } from '../../common/constants';

// State boundary layer
export const usaFeatureLayer1 = new FeatureLayer({
  url: STATE_FEATURE_LAYER_URL,
  outFields: ['STATEFP', 'NAME', 'STUSPS'],
  layerId: 1,
});

export default { usaFeatureLayer1 };
