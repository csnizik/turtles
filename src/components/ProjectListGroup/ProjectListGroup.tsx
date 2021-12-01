import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import ProjectListItem from './ProjectListItem';
import { projectTabs } from './constants';
import './project-list-group.scss';
import Pagination from '../Pagination';
import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '../../Redux/hooks/hooks';
import {
  usePostLandscapeInitiativesQuery,
  usePostProjectSearchDataQuery,
} from '../../Redux/services/api';

interface IProjectListProps {
  isMapDisplayed: boolean;
  selectedStateName?: string;
  testData?: any;
}

const ProjectListGroup = ({
  isMapDisplayed,
  selectedStateName,
  testData,
}: IProjectListProps) => {
  let searchInputData;
  if (testData) {
    searchInputData = testData;
  } else {
    searchInputData = useAppSelector(
      (state) => state.practiceSlice?.searchInput
    );
  }
  if (
    searchInputData.state_county_code === '00' ||
    searchInputData.state_county_code === '00000'
  ) {
    searchInputData = { ...searchInputData };
    delete searchInputData.state_county_code;
  }
  const {
    data: projectsList,
    error: perror,
    isLoading: pisLoading,
    isSuccess: pisSuccess,
    isError: pisError,
  } = usePostProjectSearchDataQuery(searchInputData);

  const {
    data: initiativesList,
    error: lerror,
    isLoading: lisLoading,
    isSuccess: lisSuccess,
    isError: lisError,
  } = usePostLandscapeInitiativesQuery(searchInputData);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [currentIPage, setCurrentIPage] = useState(1);

  const grantsLength = projectsList?.length;
  const initiativesLength = initiativesList?.length;

  const toggleProjectsTab = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = projectsList?.slice(indexOfFirstCard, indexOfLastCard);
  let indexOfLastPage = -1;
  if (projectsList) {
    indexOfLastPage = Math.ceil(projectsList.length / cardsPerPage);
  }

  const indexOfLastICard = currentIPage * cardsPerPage;
  const indexOfFirstICard = indexOfLastICard - cardsPerPage;
  const currentICards = initiativesList?.slice(
    indexOfFirstICard,
    indexOfLastICard
  );
  let indexOfLastIPage = -1;
  if (initiativesList) {
    indexOfLastIPage = Math.ceil(initiativesList.length / cardsPerPage);
  }
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= indexOfLastPage)
      setCurrentPage(pageNumber);
  };
  const iPaginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= indexOfLastPage)
      setCurrentIPage(pageNumber);
  };
  const renderProjectTypeTabs = () => {
    const getTitle = (tab: any) => {
      if (tab.id === 1) {
        return `${tab.tabTitle} (${grantsLength})`;
      }
      if (tab.id === 2) {
        return `${tab.tabTitle} (${initiativesLength})`;
      }
      return tab.tabTitle;
    };

    return (
      <Nav className='nav-fpac' data-testid='project-and-initiative-tabs'>
        {projectTabs.map((tab: any) => {
          const tabID = tab.id;
          return (
            <div key={tabID}>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === tab.id })}
                  onClick={() => {
                    toggleProjectsTab(tab.id);
                  }}
                >
                  {getTitle(tab)}
                </NavLink>
              </NavItem>
            </div>
          );
        })}
      </Nav>
    );
  };
  return (
    <div
      className='projects-list-group'
      data-testid='projects-list-group'
      id='ProjectsInitiatives'
    >
      {!isMapDisplayed && renderProjectTypeTabs()}
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          {isMapDisplayed ? (
            <>
              <p className='intro-desc'>
                {t('projects-initiatives.innovation-tab')}
              </p>
              <Pagination
                cards={grantsLength}
                cardsPerPage={cardsPerPage}
                paginate={paginate}
                currentPage={currentPage}
                indexOfLastPage={indexOfLastPage}
                indexOfFirstCard={indexOfFirstCard}
                indexOfLastCard={indexOfLastCard}
                selectedStateName={selectedStateName}
                mapComponent={true}
              />
            </>
          ) : (
            <Pagination
              cards={grantsLength}
              cardsPerPage={cardsPerPage}
              paginate={paginate}
              currentPage={currentPage}
              indexOfLastPage={indexOfLastPage}
              indexOfFirstCard={indexOfFirstCard}
              indexOfLastCard={indexOfLastCard}
            />
          )}

          <Row>
            <Col sm='12' className='p-3'>
              {pisLoading && <Spinner />}
              {pisError && perror}
              {pisSuccess && grantsLength ? (
                <ul className='list-group projects-data'>
                  {currentCards?.map((project: any) => {
                    return (
                      <ProjectListItem
                        key={project.projectId}
                        id={project.projectId}
                        description={project.projectDescription}
                        title={project.projectTitle}
                        owner={project.projectOwner}
                        statesInvolved={project.statesInvolved}
                        year={project.awardeeYear}
                        link={project.projectLink}
                      />
                    );
                  })}
                </ul>
              ) : null}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={2}>
          {!isMapDisplayed && (
            <p className='intro-desc'>
              {t('projects-initiatives.landscape-tab')}
            </p>
          )}
          <Pagination
            cards={initiativesLength}
            cardsPerPage={cardsPerPage}
            paginate={iPaginate}
            currentPage={currentIPage}
            indexOfLastPage={indexOfLastIPage}
            indexOfFirstCard={indexOfFirstICard}
            indexOfLastCard={indexOfLastICard}
            selectedStateName={selectedStateName}
          />
          <Row>
            <Col sm='12' className='p-3'>
              <ul className='list-group projects-data'>
                {currentICards?.map((initiative: any) => {
                  const initiativeID = initiative.initiativeId;
                  return (
                    <div key={initiativeID}>
                      <ProjectListItem
                        id={initiative.lci_id}
                        description={initiative.lci_description}
                        title={initiative.lci_name}
                        owner={initiative.initiativeOwner}
                        statesInvolved={initiative.statesInvolved}
                        year={initiative.initiativeYear}
                      />
                    </div>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProjectListGroup;

ProjectListGroup.defaultProps = {
  selectedStateName: '',
  testData: {},
};
