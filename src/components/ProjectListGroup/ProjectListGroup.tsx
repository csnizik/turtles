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
import { projectTabs, grantsList, initiativesList } from './constants';
import './project-list-group.scss';

const ProjectListGroup = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);

  const toggleProjectsTab = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const renderProjectDetails = (
    projectOwner: string,
    states: any,
    projectYear: string
  ) => {
    return (
      <div className='project-details'>
        <span>{projectOwner}</span>
        <span>{states}</span>
        <span>{projectYear}</span>
      </div>
    );
  };

  const renderProjectTypeTabs = () => {
    return (
      <Nav className='nav-fpac'>
        {projectTabs.map((tab: any) => {
          return (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === tab.id })}
                onClick={() => {
                  toggleProjectsTab(tab.id);
                }}
              >
                {tab.tabTitle}
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
        <h4>{t('search-results-page.project-initiatives')}</h4>
      </div>
      {renderProjectTypeTabs()}
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <Row>
            <Col sm='12' className='p-3'>
              <ul className='list-group projects-data'>
                {grantsList.map((project: any) => {
                  return (
                    <li key={project.projectId} className='list-group-item'>
                      <p>{project.projectTitle}</p>
                      {project.projectOwner &&
                        renderProjectDetails(
                          project.projectOwner,
                          project.statesInvolved,
                          project.projectYear
                        )}
                      <p>{project.projectDescription}</p>
                    </li>
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
                    <li
                      key={initiative.initiativeId}
                      className='list-group-item'
                    >
                      <p>{initiative.initiativeTitle}</p>
                      {initiative.initiativeOwner &&
                        renderProjectDetails(
                          initiative.initiativeOwner,
                          initiative.statesInvolved,
                          initiative.projectYear
                        )}
                      <p>{initiative.initiativeDescription}</p>
                    </li>
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
