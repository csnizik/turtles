import React from 'react';

interface IListProps {
  stateList: any
}

interface IStateProps {
  attributes: any
}

const ListGroup = ({stateList}: IListProps) => {

  const sortedState: any = stateList.sort(function(a: any, b: any) {
  var nameA = a.attributes.state_abbr
  var nameB = b.attributes.state_abbr
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
  return (
    <ul className="list-group" id="myGroup">
      {sortedState.map((state: IStateProps, index: number) => {
        return (
          <li
            className="list-group-item"
            key={index}
          >
          {
            /**<li
              className={selectedCounty === county.id ? "list-group-item active-item" : "list-group-item"}
              key={county.id}
              onClick={() => handleSelectCounty(county)}
              data-parent="#myGroup" data-toggle='collapse' data-target={`#collapseExample${index}`} aria-expanded="false" aria-controls={`#collapseExample${index}`}
            > **/
          }
            {state.attributes.state_name}
            {
              /**
              <div className={`collapse`} id={`collapseExample${index}`}>
                <div className="card card-body">
                  {county.description}
                </div>
              </div>
              **/
            }
          </li>
        )
      })}
    </ul>
  );
}

export default ListGroup;
