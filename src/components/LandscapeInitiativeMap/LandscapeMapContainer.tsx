import { useAppSelector } from '../../Redux/hooks/hooks';
import LandscapeInitiativeMap from './LandscapeInitiativeMap';
import './landscape-init-map.scss';

/*eslint camelcase: 0*/
interface ILandscapeInitiative {
  lci_id: number;
  lci_name: string;
  lci_resource: string;
  lci_image_link: string;
  lci_page_link: string;
  lci_page_link_text: string;
  lci_description: Array<string>;
  lci_parent_id: number;
}

interface ILandscapeContainerProps {
  landscapeInitiativesData: Array<ILandscapeInitiative>;
}

const LandscapeMapContainer = ({
  landscapeInitiativesData,
}: ILandscapeContainerProps) => {
  const stateCode = useAppSelector((state) => state?.stateSlice?.stateCode);
  return (
    <>
      <LandscapeInitiativeMap
        selectedLocation={
          stateCode !== '00' && stateCode.length ? stateCode : null
        }
        landscapeInitiativesData={landscapeInitiativesData}
      />
      <div className='webmap' id='landscapeViewDiv' />
    </>
  );
};

export default LandscapeMapContainer;
