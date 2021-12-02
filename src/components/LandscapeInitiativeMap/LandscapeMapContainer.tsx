import LandscapeInitiativeMap from './LandscapeInitiativeMap';
import './landscape-init-map.scss';

const LandscapeMapContainer = () => {
  return (
    <>
      <LandscapeInitiativeMap />
      <div className='webmap' id='landscapeViewDiv' />
    </>
  );
};

export default LandscapeMapContainer;
