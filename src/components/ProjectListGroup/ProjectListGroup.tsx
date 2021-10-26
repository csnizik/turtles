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
import { projectTabs, initiativesList } from './constants';
import './project-list-group.scss';
import Pagination from '../Pagination';
import Spinner from '../Spinner/Spinner';

interface IProjectListProps {
  isMapDisplayed: boolean;
  projectsList: any;
  error: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

//Initiatives constant to be replaced by backend data
const ProjectListGroup = ({
  error,
  isLoading,
  isError,
  isMapDisplayed,
  isSuccess,
  projectsList,
}: IProjectListProps) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [currentIPage, setCurrentIPage] = useState(1);

  const grantsLength = projectsList?.length;
  const initiativesLength = initiativesList.length;

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
  const currentICards = initiativesList.slice(
    indexOfFirstICard,
    indexOfLastICard
  );
  const indexOfLastIPage = Math.ceil(initiativesList.length / cardsPerPage);
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
        return `${tab.tabTitle} (${initiativesList.length})`;
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
    <div className='projects-list-group' data-testid='projects-list-group'>
      {!isMapDisplayed && (
        <div className='top-title'>
          <h4 className='title'>
            {t('search-results-page.project-initiatives')}
          </h4>
        </div>
      )}
      {!isMapDisplayed && renderProjectTypeTabs()}
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <Pagination
            cards={grantsLength}
            cardsPerPage={cardsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            indexOfLastPage={indexOfLastIPage}
            indexOfFirstCard={indexOfFirstICard}
            indexOfLastCard={indexOfLastICard}
          />
          <Row>
            <Col sm='12' className='p-3'>
              {isLoading && <Spinner />}
              {isError && error}
              {isSuccess && projectsList.length ? (
                <ul className='list-group projects-data'>
                  {currentCards?.map((project: any) => {
                    return (
                      <ProjectListItem
                        id={project.projectId}
                        description={project.projectDescription}
                        title={project.projectTitle}
                        owner={project.projectOwner}
                        statesInvolved={project.statesInvolved}
                        year={project.awardeeYear}
                      />
                    );
                  })}
                </ul>
              ) : null}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={2}>
          <Pagination
            cards={initiativesLength}
            cardsPerPage={cardsPerPage}
            paginate={iPaginate}
            currentPage={currentIPage}
            indexOfLastPage={indexOfLastIPage}
            indexOfFirstCard={indexOfFirstICard}
            indexOfLastCard={indexOfLastICard}
          />
          <Row>
            <Col sm='12' className='p-3'>
              <ul className='list-group projects-data'>
                {currentICards.map((initiative: any) => {
                  return (
                    <ProjectListItem
                      id={initiative.initiativeId}
                      description={initiative.initiativeDescription}
                      title={initiative.initiativeTitle}
                      owner={initiative.initiativeOwner}
                      statesInvolved={initiative.statesInvolved}
                      year={initiative.initiativeYear}
                    />
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
