import { useAppSelector } from '../../Redux/hooks/hooks';
import LandscapeInitiativeMap from './LandscapeInitiativeMap';
import { ILandscapeInitiative } from '../../common/types';
import './landscape-init-map.scss';

interface ILandscapeContainerProps {
  landscapeInitiativesData: Array<ILandscapeInitiative>;
  selectedLandscapeInitiative: number;
}

const LandscapeMapContainer = ({
  landscapeInitiativesData,
  selectedLandscapeInitiative,
}: ILandscapeContainerProps) => {
  const stateCode = useAppSelector((state) => state?.stateSlice?.stateCode);
  return (
    <>
      <LandscapeInitiativeMap
        landscapeInitiativesData={landscapeInitiativesData}
        selectedLocation={
          stateCode !== '00' && stateCode.length ? stateCode : null
        }
        selectedLandscapeInitiative={selectedLandscapeInitiative}
      />
      <div className='webmap' id='landscapeViewDiv' />
    </>
  );
};

export default LandscapeMapContainer;
