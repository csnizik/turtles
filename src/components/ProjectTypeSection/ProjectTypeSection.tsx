import {
  NRCS_CONSERVATION_INITIATIVES_URL,
  nrcsLinkText,
  landscapeInitiativeMap,
} from './constants';
import { landscapeInitiativeTypes } from '../../containers/ProjectsContainer/constants';
import './project-type.scss';
import LandscapeMapContainer from '../LandscapeInitiativeMap/LandscapeMapContainer';

interface IProjectTypeProps {
  selectedLandscapeInitiative: number;
  projectType: any;
}

const ProjectTypeSection = ({
  selectedLandscapeInitiative,
  projectType,
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
    if (projectType.id === 2) {
      const baseConservationInitiative: any = Object.values(
        landscapeInitiativeMap
      ).find((initiative) => initiative.id === 0);
      const currentLandscapeInitiative: any = Object.values(
        landscapeInitiativeMap
      ).find((initiative) => initiative.id === selectedLandscapeInitiative);
      return (
        <div className='landscape-intiatives margin-top-2'>
          <LandscapeMapContainer />
          <a
            aria-label='Link to NRCS website for landscape initiatives'
            href={NRCS_CONSERVATION_INITIATIVES_URL}
            target='_blank'
            rel='noreferrer'
          >
            {nrcsLinkText}{' '}
          </a>
          <i className='fas fa-external-link-alt' />
          <hr className='margin-bottom-2' />
          <div className='landscape-details'>
            {selectedLandscapeInitiative > 0
              ? currentLandscapeInitiative?.descriptions.map(
                  (paragraphText) => {
                    return <p>{paragraphText}</p>;
                  }
                )
              : baseConservationInitiative?.descriptions.map(
                  (paragraphText) => {
                    return <p>{paragraphText}</p>;
                  }
                )}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderPageTitle = () => {
    if (selectedLandscapeInitiative > 0) {
      const foundInitiative = landscapeInitiativeTypes.find((initiative) => {
        return initiative.id === selectedLandscapeInitiative;
      });
      return <h3>{foundInitiative?.title}</h3>;
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
