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
import ExceptionMessage from '../ExceptionMessage/ExceptionMessage';

interface IProjectListProps {
  isMapDisplayed: boolean;
  selectedStateName?: string;
  selectedPracticeName?: string;
}

const ProjectListGroup = ({
  isMapDisplayed,
  selectedStateName,
  selectedPracticeName,
}: IProjectListProps) => {
  let searchInputData = useAppSelector(
    (state) => state?.practiceSlice?.searchInput
  );

  if (
    searchInputData &&
    (searchInputData?.state_county_code === '00' ||
      searchInputData?.state_county_code === '00000')
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

  const { data: initiativesList } =
    usePostLandscapeInitiativesQuery(searchInputData);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [currentIPage, setCurrentIPage] = useState(1);

  const grantsLength = projectsList?.length;
  const initiativesLength = initiativesList?.length;
  let exceptionStateName =
    selectedStateName === null || selectedStateName?.length === 0
      ? useAppSelector((state) => state?.stateSlice?.stateNameDisplay)
      : selectedStateName;
  if (exceptionStateName === null || exceptionStateName === undefined)
    exceptionStateName = 'The U.S.';
  const exceptionTitle = `${exceptionStateName} has no ${selectedPracticeName} projects or initiatives`;
  const exceptionMessage = `The projects below represent ${selectedPracticeName} projects across the United States.`;

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
      {(grantsLength === 0 || grantsLength === undefined) && (
        <div className='margin-top-30'>
          <ExceptionMessage
            exceptionTitle={exceptionTitle}
            exceptionMessage={exceptionMessage}
          />
        </div>
      )}
      {!isMapDisplayed && renderProjectTypeTabs()}
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          {isMapDisplayed ? (
            <>
              {grantsLength !== 0 ? (
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
              ) : (
                <p className='centered-text'>
                  No Conservation Innovation Grants found for this search.
                </p>
              )}
            </>
          ) : (
            <>
              {grantsLength !== 0 ? (
                <>
                  <Pagination
                    cards={grantsLength}
                    cardsPerPage={cardsPerPage}
                    paginate={paginate}
                    currentPage={currentPage}
                    indexOfLastPage={indexOfLastPage}
                    indexOfFirstCard={indexOfFirstCard}
                    indexOfLastCard={indexOfLastCard}
                  />
                </>
              ) : (
                <p className='centered-text'>
                  No Conservation Innovation Grants found for this search.
                </p>
              )}
            </>
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
            <>
              {initiativesLength !== 0 ? (
                <>
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
                </>
              ) : (
                <p className='centered-text'>
                  No Landscape Conservation Initiatives found for this search.
                </p>
              )}
            </>
          )}
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
                        link={initiative.lci_page_link}
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
  selectedPracticeName: '',
};
