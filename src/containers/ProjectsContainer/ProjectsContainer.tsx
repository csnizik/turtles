import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './project-container.scss';

import { projectCards, projectListGroups } from './constants';

const ProjectsContainer = () => {
  const { t } = useTranslation();
  const [toggleProjectView, setToggleProjectView] = useState(false);
  const [selectedProjectCard, setSelectedProjectCard] = useState(-1);

  const handleSelectProjectCard = (id: number) => {
    setSelectedProjectCard(id);
    setToggleProjectView(!toggleProjectView);
  };

  const handleSelectProjectItem = (id: number) => {
    if (id === 0) {
      setToggleProjectView(false);
      setSelectedProjectCard(-1);
    }
  };

  if (toggleProjectView) {
    return (
      <div className='projects-tab'>
        <ListGroup className='margin-2'>
          {projectListGroups.map((listItem: any) => {
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
      </div>
    );
  }

  return (
    <div className='projects-tab' data-testid='projects-container'>
      <p className='lead margin-3'>{t('projects-page.page-header')}</p>
      <div className='project-cards margin-2'>
        <ul className='usa-card-group'>
          {projectCards.map((project: any) => {
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
                  <div className='usa-card__footer margin-top-2'>
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
    </div>
  );
};

export default ProjectsContainer;
