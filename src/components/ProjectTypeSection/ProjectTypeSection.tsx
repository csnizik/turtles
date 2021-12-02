import LandscapeInitiativesCard from '../LandscapeInitiativesCard';
import {
  NRCS_CONSERVATION_INITIATIVES_URL,
  nrcsLinkText,
  landscapeInitiativeMap,
} from './constants';
import './project-type.scss';

interface IProjectTypeProps {
  selectedLandscapeInitiative: number;
  projectType: any;
  landscapeInitiativesData: any;
}

const ProjectTypeSection = ({
  selectedLandscapeInitiative,
  projectType,
  landscapeInitiativesData,
}: IProjectTypeProps) => {
  const renderProjectDetails = () => {
    // Conservation Grants
    if (projectType.id === 1) {
      return (
        <div className='project-type-details'>
          <p className='margin-top-3'>{projectType.paragraphDescription}</p>
          <p>
            Visit the{' '}
            <a
              aria-label='Conservation Innovation Grants link opens a new tab'
              href='https://usda.gov'
              target='_blank'
              rel='noreferrer'
            >
              CIG website
            </a>{' '}
            for more information. Use
            <a
              aria-label='Conservation Innovation Grants link opens a new tab'
              href='/search'
              target='_blank'
              rel='noreferrer'
            >
              &nbsp;advanced filters to search projects.
            </a>
          </p>
        </div>
      );
    }
    // Landscape Conservation Initiatives
    if (projectType.id === 2) {
      const baseConservationInitiative: any = Object.values(
        landscapeInitiativeMap
      ).find((initiative) => initiative.id === 0);
      if (projectType.id === 2 || selectedLandscapeInitiative > 0) {
        const foundInitiative = landscapeInitiativesData.data.find(
          (initiative) => {
            return initiative.lci_id === selectedLandscapeInitiative;
          }
        );
        const subInitiative = landscapeInitiativesData?.data.filter(
          (parentId: any) => {
            return parentId.lci_parent_id !== null;
          }
        );
        return (
          <div className='landscape-intiatives margin-top-2'>
            <div className='landscape-img-placeholder margin-bottom-3'>
              <h3 className='padding-3'>Placeholder for webmap or image</h3>
            </div>
            <a
              aria-label='Link to NRCS website for landscape initiatives'
              href={
                foundInitiative?.lci_page_link ||
                NRCS_CONSERVATION_INITIATIVES_URL
              }
              target='_blank'
              rel='noreferrer'
            >
              {foundInitiative?.lci_page_link_text || nrcsLinkText}{' '}
            </a>
            <i className='fas fa-external-link-alt' />
            <hr className='margin-bottom-2' />
            <div className='landscape-details'>
              {selectedLandscapeInitiative > 0
                ? foundInitiative?.lci_description.map((paragraphText) => {
                    return <p>{paragraphText}</p>;
                  })
                : baseConservationInitiative?.descriptions.map(
                    (paragraphText) => {
                      return <p>{paragraphText}</p>;
                    }
                  )}
              {foundInitiative?.lci_id === 10 && selectedLandscapeInitiative > 0
                ? subInitiative?.map((item) => (
                    /* eslint-disable */
                    <LandscapeInitiativesCard
                      title={item.lci_name}
                      description={item.lci_description}
                    />
                  ))
                : null}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const renderPageTitle = () => {
    if (selectedLandscapeInitiative > 0) {
      const foundInitiative = landscapeInitiativesData.data.find(
        (initiative) => {
          return initiative.lci_id === selectedLandscapeInitiative;
        }
      );
      return <h3>{foundInitiative?.lci_name}</h3>;
    }
    return <h3>{projectType.title}</h3>;
  };

  return (
    <div className='project-type-section'>
      {renderPageTitle()}
      {renderProjectDetails()}
    </div>
  );
};

export default ProjectTypeSection;
