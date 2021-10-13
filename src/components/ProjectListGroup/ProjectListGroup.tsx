import { useTranslation } from 'react-i18next';
import projectsList from './constants';
import './project-list-group.scss';

const ProjectListGroup = () => {
  const { t } = useTranslation();

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

  return (
    <div className='projects-list-group'>
      <div className='top-title'>
        <h4>{t('search-results-page.project-initiatives')}</h4>
      </div>
      <ul className='list-group projects-data'>
        {projectsList.map((project: any) => {
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
              <p className='lead project-type float-right'>
                {project.projectType}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectListGroup;
