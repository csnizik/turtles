import React, { useEffect, useState } from 'react';
import Extent from '@arcgis/core/geometry/Extent';
import { IProject } from '../common/Types';

interface IListProps {
  relatedTableResults: IProject[],
  setStateExtent: Function
}

interface IStateProps {
  attributes: any
}

const ProjectListGroup = ({ relatedTableResults, setStateExtent }: IListProps) => {

  const handleProjectSelection = (stateExtent: Extent) => {
    setStateExtent(stateExtent);
  }

  if (!relatedTableResults) return null;

  return (
    <ul className="list-group projects-data">
      {relatedTableResults.map((project: any, index: number) => {
        return (
            <li
              key={index}
              className='list-group-item'
              onClick={() => handleProjectSelection(project.stateExtent)}
            >
              {project.awardeeName}
          </li>
        )
      })}
    </ul>
  );
}

export default ProjectListGroup;
