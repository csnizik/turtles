import { useTranslation } from 'react-i18next';
import LandscapeInitiativesCard from '../LandscapeInitiativesCard';
import {
  NRCS_CONSERVATION_INITIATIVES_URL,
  nrcsLinkText,
  landscapeInitiativeMap,
} from './constants';
import './project-type.scss';
import LandscapeMapContainer from '../LandscapeInitiativeMap/LandscapeMapContainer';

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
  const { t } = useTranslation();
  const initiativesWithWebMaps =
    (landscapeInitiativesData &&
      landscapeInitiativesData.data &&
      landscapeInitiativesData.data.filter((initiative: any) => {
        return initiative.lci_resource;
      })) ||
    [];
  const renderProjectDetails = () => {
    // Conservation Grants
    if (projectType.id === 1) {
      return (
        <div
          className='project-type-details'
          data-testid='project-type-details'
        >
          <p className='margin-top-3'>{projectType.paragraphDescription}</p>
          <p>
            Visit the{' '}
            <a
              aria-label='Conservation Innovation Grants link opens a new tab'
              href='https://cig.sc.egov.usda.gov/'
              target='_blank'
              rel='noreferrer'
            >
              CIG website
            </a>{' '}
            for more information. Use
            <a
              aria-label='Conservation Innovation Grants link opens in a new tab'
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
        const foundInitiative =
          landscapeInitiativesData?.data &&
          landscapeInitiativesData.data.find((initiative) => {
            return initiative.lci_id === selectedLandscapeInitiative;
          });
        const subInitiative =
          landscapeInitiativesData?.data &&
          landscapeInitiativesData.data.filter((parentId: any) => {
            return parentId.lci_parent_id !== null;
          });
        return (
          <div
            className='landscape-intiatives margin-top-2'
            data-testid='landscape-intiatives-details'
          >
            {/* Webmap only available for 'Landscape Conservation Initiatives',
            'Watersmart' and 'Working Lands for Wildlife' */}
            {selectedLandscapeInitiative === -1 ||
            initiativesWithWebMaps.some(
              (initiative: any) =>
                initiative.lci_id === selectedLandscapeInitiative
            ) ? (
              <LandscapeMapContainer
                landscapeInitiativesData={landscapeInitiativesData.data || []}
                selectedLandscapeInitiative={selectedLandscapeInitiative}
              />
            ) : (
              <div className='landscape-img'>
                <img
                  src={foundInitiative?.lci_image_link}
                  alt={foundInitiative?.lci_name}
                />
              </div>
            )}
            <a
              aria-label='Link to NRCS website for landscape initiatives'
              href={
                foundInitiative?.lci_page_link ||
                NRCS_CONSERVATION_INITIATIVES_URL
              }
              target='_blank'
              title={foundInitiative?.lci_page_link_text || nrcsLinkText}
              rel='noreferrer'
            >
              {foundInitiative?.lci_page_link_text || nrcsLinkText}{' '}
            </a>
            <i className='fas fa-external-link-alt' />
            <hr className='margin-bottom-2' />
            <div className='landscape-details'>
              {
                /*eslint react/no-array-index-key: 0 */
                selectedLandscapeInitiative > 0
                  ? foundInitiative?.lci_description.map(
                      (paragraphText: any, id: number) => {
                        return <p key={id}>{paragraphText}</p>;
                      }
                    )
                  : baseConservationInitiative?.descriptions.map(
                      (paragraphText) => {
                        return <p>{paragraphText}</p>;
                      }
                    )
              }

              {foundInitiative?.lci_id === 10 &&
              selectedLandscapeInitiative > 0 ? (
                <>
                  <h3 className='wlfw-header'>
                    {t('projects-page.wlfw-header')}
                  </h3>
                  {subInitiative?.map((item: any) => (
                    /* eslint-disable */
                    <LandscapeInitiativesCard
                      link={item.lci_page_link}
                      title={item.lci_name}
                      description={item.lci_description}
                    />
                  ))}
                </>
              ) : null}
            </div>
          </div>
        );
      }
    }
    return null;
  };
  const renderPageTitle = () => {
    if (selectedLandscapeInitiative > 0) {
      const foundInitiative = landscapeInitiativesData?.data?.find(
        (initiative) => {
          return initiative.lci_id === selectedLandscapeInitiative;
        }
      );
      return (
        <h2 data-testid='initiative-title'>{foundInitiative?.lci_name}</h2>
      );
    }
    return <h2 data-testid='project-type-title'>{projectType.title}</h2>;
  };

  return (
    <div className='project-type-section' data-testid='project-type-overview'>
      {renderPageTitle()}
      {renderProjectDetails()}
    </div>
  );
};

export default ProjectTypeSection;
