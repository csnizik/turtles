import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MapContainer from '../MapContainer';
import ProjectListGroup from '../../components/ProjectListGroup';
import ProjectTypeSection from '../../components/ProjectTypeSection';
import {
  useGetStateListQuery,
  usePostProjectSearchDataQuery,
} from '../../Redux/services/api';
import './project-container.scss';

import {
  landscapeInitiativeTypes,
  projectCards,
  projectListGroups,
  projectPurposes,
} from './constants';

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
  const stateStatus: any = useGetStateListQuery();
  let searchInput = { state_county_code: selectedLocation || null };

  if (
    !selectedLocation ||
    selectedLocation === '00' ||
    selectedLocation === '00000'
  ) {
    searchInput = { ...searchInput, state_county_code: null };
  }

  const { data, error, isLoading, isSuccess, isError } =
    usePostProjectSearchDataQuery(searchInput);

  const selectedState =
    selectedLocation &&
    stateStatus.isSuccess &&
    stateStatus.data &&
    stateStatus.data.find((state: any) => {
      return state.stateCode === selectedLocation;
    });

  const selectedStateName = selectedState?.stateNameDisplay;

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
    return <ProjectTypeSection projectType={selectedProjectType} />;
  };

  if (toggleProjectView) {
    return (
      <div className='projects-tab'>
        <div className='projects-grid'>
          <div>
            <ListGroup className='project-types-list'>
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
            {selectedProjectCard === 2 ? (
              <ListGroup className='landscape-initiative-list'>
                {landscapeInitiativeTypes.map((initiative: any) => {
                  const listGroupItemClassNames = classNames(
                    'justify-content-between',
                    {
                      selected: initiative.id === 10,
                    }
                  );
                  return (
                    <ListGroupItem
                      key={initiative.id}
                      className={listGroupItemClassNames}
                      role='presentation'
                    >
                      {initiative.title}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            ) : null}
          </div>
          {renderProjectSection()}
        </div>
        {selectedProjectCard === 1 ? (
          <>
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
              selectedStateName={selectedStateName}
            />
          </>
        ) : null}
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
