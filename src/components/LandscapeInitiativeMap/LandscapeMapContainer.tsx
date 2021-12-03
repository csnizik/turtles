import LandscapeInitiativeMap from './LandscapeInitiativeMap';
import './landscape-init-map.scss';

const LandscapeMapContainer = () => {
  return (
    <>
      <LandscapeInitiativeMap selectedLocation='08' />
      <div className='webmap' id='landscapeViewDiv' />
    </>
  );
};

export default LandscapeMapContainer;
