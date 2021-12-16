import { useAppSelector } from '../../Redux/hooks/hooks';
import LandscapeInitiativeMap from './LandscapeInitiativeMap';
import { ILandscapeInitiative } from '../../common/types';
import { ALL_LANDSCAPE_INITIATIVES_PORTAL_URL } from './constants';
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
  const initiativesWithWebMaps =
    landscapeInitiativesData.filter((initiative: ILandscapeInitiative) => {
      return initiative.lci_resource;
    }) || [];

  return (
    <>
      <LandscapeInitiativeMap
        landscapeInitiativesData={landscapeInitiativesData}
        selectedLocation={
          stateCode !== '00' && stateCode.length ? stateCode : null
        }
        selectedLandscapeInitiative={selectedLandscapeInitiative}
        portalId={
          (initiativesWithWebMaps.length &&
            selectedLandscapeInitiative >= 0 &&
            initiativesWithWebMaps.find(
              (initiative: any) =>
                initiative.lci_id === selectedLandscapeInitiative
            )?.lci_resource) ||
          ALL_LANDSCAPE_INITIATIVES_PORTAL_URL
        }
      />
      <div className='webmap' id='landscapeViewDiv' />
    </>
  );
};

export default LandscapeMapContainer;
