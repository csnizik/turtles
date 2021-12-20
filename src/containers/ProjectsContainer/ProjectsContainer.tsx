import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks/hooks';
import MapContainer from '../MapContainer';
import ProjectListGroup from '../../components/ProjectListGroup';
import ProjectTypeSection from '../../components/ProjectTypeSection';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import {
  useGetStateListQuery,
  usePostLandscapeInitiativesQuery,
} from '../../Redux/services/api';
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [toggleProjectView, setToggleProjectView] = useState(false);
  const [selectedProjectCard, setSelectedProjectCard] = useState(-1);
  const [selectedLandscapeInitiative, setSelectedLandscapeInitiative] =
    useState(-1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const stateStatus: any = useGetStateListQuery();
  const stateCode = useAppSelector((state) => state?.stateSlice?.stateCode);
  const searchInput = { state_county_code: selectedLocation || null };
  let searchLandscapeInitiatives = { state_county_code: stateCode || null };

  // const landscapeInitiativesData = usePostLandscapeInitiativesQuery(
  //   searchLandscapeInitiatives
  // );
  const selectedState: any = { selectedState: { stateNameDisplay: '' } };
  const selectedStateName: any = selectedState?.stateNameDisplay;

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

  useEffect(() => {
    let searchInputData;
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
    if (selectedState) {
      searchInputData = {
        state_county_code: selectedState?.stateCode,
      };
    } else {
      searchInputData = {
        state_county_code: DEFAULT_NATIONAL_LOCATION,
      };
    }
    dispatch(setSearch(searchInputData));
  }, []);

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
                      key={initiative.lci_id}
                      className={listGroupItemClassNames}
                      role='presentation'
                      title={initiative.lci_page_link_text}
                      onClick={() =>
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
              <MapContainer setSelectedLocation={setSelectedLocation} />
            </div>

            <ProjectListGroup
              isMapDisplayed
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
