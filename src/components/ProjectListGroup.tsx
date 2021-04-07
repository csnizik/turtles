import React from 'react';
import Extent from '@arcgis/core/geometry/Extent';
import { IProject } from '../common/Types';

interface IListProps {
  relatedTableResults: IProject[],
  setStateExtent: Function
}

const ProjectListGroup = ({
  relatedTableResults,
  setStateExtent
}: IListProps) => {

  const handleProjectSelection = (stateExtent: Extent) => {
    setStateExtent(stateExtent);
  }

  const getListItemText = (project: IProject) => {
    return (
      <p>
        <strong>Project Title: </strong>
        <small>{project.title}</small>
        <br />
        <br />
        <strong>Location: </strong>
        <small>{project.state}</small>
      </p>
    )
  }

  if (!relatedTableResults) return null;

  return (
    <ul className="list-group projects-data">
      {relatedTableResults.map((project: IProject, index: number) => {
        return (
            <li
              key={index}
              className='list-group-item'
              onClick={() => handleProjectSelection(project.stateExtent)}
            >
              { getListItemText(project) }
          </li>
        )
      })}
    </ul>
  );
}

export default ProjectListGroup;
