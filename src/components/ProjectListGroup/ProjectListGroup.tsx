import { useState } from 'react';
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
}

const ProjectListGroup = ({
  isMapDisplayed,
  selectedStateName,
}: IProjectListProps) => {
  const stateInfo = useAppSelector((state) => state?.stateSlice);
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

  let { data: initiativesList } =
    usePostLandscapeInitiativesQuery(searchInputData);
  initiativesList = initiativesList?.filter((initiative: any) => {
    return !initiative.lci_parent_id;
  });

  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [currentIPage, setCurrentIPage] = useState(1);

  const grantsLength = projectsList?.length;
  const initiativesLength = initiativesList?.length;
  let exceptionStateName = stateInfo?.stateNameDisplay || selectedStateName;
  if (exceptionStateName === null || exceptionStateName === undefined)
    exceptionStateName = 'The U.S.';

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
              {grantsLength !== 0 ? (
                <Pagination
                  cards={grantsLength}
                  cardsPerPage={cardsPerPage}
                  paginate={paginate}
                  currentPage={currentPage}
                  indexOfLastPage={indexOfLastPage}
                  indexOfFirstCard={indexOfFirstCard}
                  indexOfLastCard={indexOfLastCard}
                  selectedStateName={stateInfo?.stateNameDisplay}
                  mapComponent={true}
                />
              ) : (
                <div className='margin-top-30'>
                  <ExceptionMessage
                    exceptionTitle={`${exceptionStateName} has no Conservation Innovation Grant data avaliable at this time.`}
                    exceptionMessage=''
                  />
                </div>
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
                <div className='margin-top-30 padding-top-3'>
                  <ExceptionMessage
                    exceptionTitle='No related Conservation Innovation Grant data is avaliable at this time.'
                    exceptionMessage=''
                  />
                </div>
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
                    selectedStateName={stateInfo?.stateNameDisplay}
                  />
                </>
              ) : (
                <div className='margin-top-30 padding-top-3'>
                  <ExceptionMessage
                    exceptionTitle='No related Landscape Conservation Initiative data is avaliable at this time.'
                    exceptionMessage=''
                  />
                </div>
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
};
