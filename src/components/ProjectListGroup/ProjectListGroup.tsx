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
import { projectTabs, grantsList, initiativesList } from './constants';
import './project-list-group.scss';
import Pagination from '../Pagination';

const ProjectListGroup = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(1);

  const grantsLength = grantsList.length;

  const toggleProjectsTab = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = grantsList.slice(indexOfFirstCard, indexOfLastCard);
  const indexOfLastPage = Math.ceil(grantsList.length / cardsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= indexOfLastPage)
      setCurrentPage(pageNumber);
  };
  const renderProjectTypeTabs = () => {
    const getTitle = (tab: any) => {
      if (tab.id === 1) {
        return `${tab.tabTitle} (${grantsList.length})`;
      }
      if (tab.id === 2) {
        return `${tab.tabTitle} (${initiativesList.length})`;
      }
      return tab.tabTitle;
    };

    return (
      <Nav className='nav-fpac' data-testid='project-and-initiative-tabs'>
        {projectTabs.map((tab: any) => {
          return (
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
          );
        })}
      </Nav>
    );
  };
  return (
    <div className='projects-list-group'>
      <div className='top-title'>
        <h4 className='title'>
          {t('search-results-page.project-initiatives')}
        </h4>
      </div>

      <Pagination
        cards={grantsLength}
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        indexOfLastPage={indexOfLastPage}
      />
      {/*renderProjectTypeTabs()*/}
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <Row>
            <Col sm='12' className='p-3'>
              <ul className='list-group projects-data'>
                {currentCards.map((project: any) => {
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
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={2}>
          <Row>
            <Col sm='12' className='p-3'>
              <ul className='list-group projects-data'>
                {initiativesList.map((initiative: any) => {
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
