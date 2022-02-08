import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useAppSelector } from '../../Redux/hooks/hooks';
import MapContainer from '../MapContainer';
import ProjectListGroup from '../../components/ProjectListGroup';
import ProjectTypeSection from '../../components/ProjectTypeSection';
import { usePostLandscapeInitiativesQuery } from '../../Redux/services/api';
import './project-container.scss';
import { projectCards, projectListGroups, projectPurposes } from './constants';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';

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
  const history = useHistory();
  const { stateCode: stateC, category, individual }: any = useParams();
  const stateInfo = useAppSelector((state: any) => state?.stateSlice);
  const { t } = useTranslation();
  const [toggleProjectView, setToggleProjectView] = useState(false);
  const [selectedProjectCard, setSelectedProjectCard] = useState(-1);
  const [selectedLandscapeInitiative, setSelectedLandscapeInitiative] =
    useState(-1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const stateCode = useAppSelector((state) => state?.stateSlice?.stateCode);
  const searchInput = { state_county_code: selectedLocation || null };
  let searchLandscapeInitiatives = { state_county_code: stateCode || null };
  if (stateCode !== DEFAULT_NATIONAL_LOCATION) {
    searchLandscapeInitiatives = {
      ...searchInput,
      state_county_code: stateCode,
    };
  } else {
    searchLandscapeInitiatives = {
      ...searchInput,
      state_county_code: null,
    };
  }

  const landscapeInitiativesData = usePostLandscapeInitiativesQuery(
    searchLandscapeInitiatives
  );

  useEffect(() => {
    setSelectedLocation(stateC);
    setSelectedProjectCard(Number(category));
    if (individual) {
      setSelectedLandscapeInitiative(Number(individual));
    } else {
      setSelectedLandscapeInitiative(-1);
    }
    if (Number(category) > 0) {
      setToggleProjectView(true);
    } else {
      setToggleProjectView(false);
    }
  }, [category, individual, stateC]);

  const handleSelectLandscapeInitiative = (id: number) => {
    setSelectedLandscapeInitiative(id);
    history.push(
      `/${
        stateC || DEFAULT_NATIONAL_LOCATION
      }/ProjectsAndInitiatives/${category}/${id}`
    );
  };

  const handleSelectProjectCard = (id: number) => {
    setSelectedProjectCard(id);
    setToggleProjectView(!toggleProjectView);
    history.push(
      `/${stateC || DEFAULT_NATIONAL_LOCATION}/ProjectsAndInitiatives/${id}`
    );
  };

  const handleSelectProjectItem = (id: number) => {
    if (id === 0) {
      setToggleProjectView(false);
      setSelectedProjectCard(-1);
      history.push(
        `/${stateC || DEFAULT_NATIONAL_LOCATION}/ProjectsAndInitiatives`
      );
    } else {
      setSelectedProjectCard(id);
      history.push(
        `/${stateC || DEFAULT_NATIONAL_LOCATION}/ProjectsAndInitiatives/${id}`
      );
    }
    if (selectedLandscapeInitiative > 0) {
      setSelectedLandscapeInitiative(-1);
    }
  };

  const renderProjectSection = () => {
    const selectedProjectType = projectCards.find(
      (project: any) => selectedProjectCard === project.id
    );
    if (!selectedProjectType) return null;
    return (
      <ProjectTypeSection
        selectedLandscapeInitiative={selectedLandscapeInitiative}
        projectType={selectedProjectType}
        landscapeInitiativesData={landscapeInitiativesData}
      />
    );
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
                    tabindex={0}
                    key={listItem.id}
                    className={listGroupItemClassNames}
                    onClick={() => handleSelectProjectItem(listItem.id)}
                    onKeyPress={() => handleSelectProjectItem(listItem.id)}
                  >
                    {listItem.title === 'All U.S. Projects & Initiatives'
                      ? t(
                          `All ${stateInfo?.stateNameDisplay} Projects & Initiatives`
                        )
                      : listItem.title}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
            {selectedProjectCard === 2 ? (
              <ListGroup className='landscape-initiative-list'>
                {landscapeInitiativesData?.data?.map((initiative: any) => {
                  const listGroupItemClassNames = classNames(
                    'justify-content-between',
                    {
                      selected:
                        initiative.lci_id === selectedLandscapeInitiative,
                    }
                  );
                  return initiative.lci_parent_id === null ? (
                    <ListGroupItem
                      tabindex={0}
                      key={initiative.lci_id}
                      className={listGroupItemClassNames}
                      title={initiative.lci_page_link_text}
                      onClick={() =>
                        handleSelectLandscapeInitiative(initiative.lci_id)
                      }
                      onKeyPress={() =>
                        handleSelectLandscapeInitiative(initiative.lci_id)
                      }
                    >
                      {initiative.lci_name}
                    </ListGroupItem>
                  ) : null;
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
              <MapContainer
                stateCode={stateCode}
                setSelectedLocation={setSelectedLocation}
              />
            </div>

            <ProjectListGroup isMapDisplayed noListDots />
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
              onClick={() => handleSelectProjectCard(project.id)}
              onKeyPress={() => handleSelectProjectCard(project.id)}
              className='tablet:grid-col-4 usa-card usa-card--header-first'
              key={project.id}
            >
              <button className='card-button'>
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
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
