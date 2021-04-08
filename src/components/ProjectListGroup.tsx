import React from 'react';
import Extent from '@arcgis/core/geometry/Extent';
import { IProject } from '../common/Types';
import '../stylesheets/map.css'

interface IListProps {
  setRelatedTableResults: Function,
  relatedTableResults: IProject[],
  setStateExtent: Function,
  resultsPaneFocus: IProject[],
  setResultsPaneFocus: Function
}

const ProjectListGroup = ({
  setRelatedTableResults,
  relatedTableResults,
  setStateExtent,
  resultsPaneFocus, 
  setResultsPaneFocus
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
    <>
    {/* <h4 style={{margin:"auto"}}>Search Result</h4> */}
    <ul className="list-group projects-data ">
      {resultsPaneFocus.map((project: IProject, index: number) => {
        return (
            <li
              key={index}
              className='list-group-item'
              onClick={() => {
                handleProjectSelection(project.stateExtent);
                setRelatedTableResults([project]);
                setResultsPaneFocus([project]);
                
                
                
                
              }}

            >
              { getListItemText(project) }
          </li>
        )
      })}
    </ul>
    </>
  );
}

export default ProjectListGroup;
