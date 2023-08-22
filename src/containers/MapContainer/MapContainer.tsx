import classNames from 'classnames';
import { Spinner } from 'reactstrap';
import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import './map-container.scss';
import { useGetConfigurationSettingsQuery } from '../../Redux/services/api';

import { baseURL } from '../../common/util/AxiosUtil';

/* eslint-disable react/no-unused-prop-types */
interface IMapProps {
  setSelectedLocation: Function;
  stateCode: string;
}
/* eslint-disable no-unused-vars */
const MapContainer = ({ stateCode, setSelectedLocation }: IMapProps) => {
  // Exclude Alaska, Caribbean and Hawaii
  const exclusiveStateCodes: string[] = ['02', '15', '72'];
  const compositeViewClassNames = classNames('esri-widget', {
    hiddenView:
      stateCode !== DEFAULT_NATIONAL_LOCATION &&
      !exclusiveStateCodes.includes(stateCode),
  });
  // find environment
  const periodindex = baseURL?.search('.');
  const environment = baseURL?.slice(8,periodindex);
  const slashindex = environment?.search('-');
  const firstString = environment?.slice(0, slashindex);
  const secondString = environment?.slice(slashindex);
  var env = '';
  if (firstString === 'cpdiapi') {
  if (secondString === 'dev') {env = 'DEV'}
  if (secondString === 'stage') {env = 'STAGE'};
  if (secondString === 'test') {env = 'TEST'};
  if (secondString === 'uat') {env = 'UAT'};
  }else {env = 'PROD'};

  const results = useGetConfigurationSettingsQuery(`${env}_AGOLWebMap`);
    
  const error2 = results.error;
  const isLoading2 = results.isLoading;
  const isSuccess2 = results.isSuccess;
  const isError2 = results.isError;
  const iDdata = results.data || [];
  const CIG_PORTAL_ID: any = iDdata[0]?.configurationValue || '';

  const results2 = useGetConfigurationSettingsQuery(`${env}_AGOLViewFeatureLayer`);

  const uFLerror2 = results2.error;
  const uFLisLoading2 = results2.isLoading;
  const uFLisSuccess2 = results2.isSuccess;
  const uFLisError2 = results2.isError;
  const uFLiDdata = results2.data || [];
  const STATE_FEATURE_LAYER_URL: any = uFLiDdata[0]?.configurationValue || '';
  return (
    <>
          {isLoading2 && uFLisLoading2 && <Spinner />}
          {isError2 && uFLisError2 && error2 && uFLerror2}
          {isSuccess2 && uFLisSuccess2 && <MapComponent stateCode={stateCode} CIG_PORTAL_ID={CIG_PORTAL_ID} STATE_FEATURE_LAYER_URL={STATE_FEATURE_LAYER_URL}/>}

      <div className='webmap' id={VIEW_DIV} data-testid='cig-map' />
      <div id='akViewDiv' className={compositeViewClassNames} />
      <div id='hiViewDiv' className={compositeViewClassNames} />
      <div id='cariViewDiv' className={compositeViewClassNames} />
    </>
  );
};

export default MapContainer;
