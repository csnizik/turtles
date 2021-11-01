import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MapContainer from '../MapContainer';
import ProjectListGroup from '../../components/ProjectListGroup';
import { usePostProjectSearchDataQuery } from '../../Redux/services/api';
import './project-container.scss';

import { projectCards, projectListGroups, projectPurposes } from './constants';

interface IProjectTypeCard {
  id: number;
  title: string;
  paragraphText: string;
  paragraphDescription: string;
  imgSrc: string;
  imgAlt: string;
}

interface IProjectListGroup {
  id: number;
  title: string;
}

const ProjectsContainer = () => {
  const { t } = useTranslation();
  const [toggleProjectView, setToggleProjectView] = useState(false);
  const [selectedProjectCard, setSelectedProjectCard] = useState(-1);
  const [selectedLocation, setSelectedLocation] = useState('');

  const { data, error, isLoading, isSuccess, isError } =
    usePostProjectSearchDataQuery({
      state_county_code: selectedLocation,
    });

  const handleSelectProjectCard = (id: number) => {
    setSelectedProjectCard(id);
    setToggleProjectView(!toggleProjectView);
  };

  const handleSelectProjectItem = (id: number) => {
    if (id === 0) {
      setToggleProjectView(false);
      setSelectedProjectCard(-1);
    }
    setSelectedProjectCard(id);
  };

  const renderProjectSection = () => {
    const selectedProjectType = projectCards.find(
      (project: any) => selectedProjectCard === project.id
    );
    if (!selectedProjectType) return null;
    return (
      <div className='project-type-section'>
        <h3>{selectedProjectType.title}</h3>
        <p className='margin-top-3'>
          {selectedProjectType.paragraphDescription}
        </p>
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
  };

  if (toggleProjectView) {
    return (
      <div className='projects-tab'>
        <div className='projects-grid'>
          <ListGroup>
            {projectListGroups.map((listItem: IProjectListGroup) => {
              const listGroupItemClassNames = classNames(
                'justify-content-between',
                {
                  selected: listItem.id === selectedProjectCard,
                }
              );
              return (
                <ListGroupItem
                  key={listItem.id}
                  className={listGroupItemClassNames}
                  role='presentation'
                  onClick={() => handleSelectProjectItem(listItem.id)}
                >
                  {listItem.title}
                </ListGroupItem>
              );
            })}
          </ListGroup>
          {renderProjectSection()}
        </div>
        <div className='projets-map-section'>
          <hr />
          <h3>{t('projects-page.map-instructions')}</h3>
          <MapContainer setSelectedLocation={setSelectedLocation} />
        </div>

        <ProjectListGroup
          error={error}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isMapDisplayed
          projectsList={data}
        />
      </div>
    );
  }

  return (
    <div className='projects-tab' data-testid='projects-container'>
      <div className='project-tab-header'>
        <p>{t('projects-page.page-header-01')}</p>
        <p>{t('projects-page.page-header-02')}</p>
        <ul className='margin-bottom-5'>
          {projectPurposes.map((purpose: any) => {
            return <li key={purpose.id}>{purpose.purpose}</li>;
          })}
        </ul>
      </div>
      <ul className='usa-card-group'>
        {projectCards.map((project: IProjectTypeCard) => {
          return (
            <li
              className='tablet:grid-col-4 usa-card usa-card--header-first'
              key={project.id}
              role='presentation'
              onClick={() => handleSelectProjectCard(project.id)}
            >
              <div className='usa-card__container'>
                <header className='usa-card__header'>
                  <h2 className='usa-card__heading'>{project.title}</h2>
                </header>
                <div className='usa-card__body'>
                  <p className='lead'>{project.paragraphText}</p>
                </div>
                <div className='usa-card__footer'>
                  <div className='usa-card__media'>
                    <div className='usa-card__img'>
                      <img src={project.imgSrc} alt={project.imgAlt} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
