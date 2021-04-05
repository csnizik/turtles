import React, { useEffect, useState } from 'react';

interface IListProps {
  stateList: any,
  searchText: string
}

interface IStateProps {
  attributes: any
}

const ListGroup = ({stateList, searchText}: IListProps) => {

  const [filteredStates, setFilteredState] = useState([]);

  const getSortedState = (stateList: any) => {
    return stateList.sort(function(a: any, b: any) {
      const stateA = a.attributes.state_abbr
      const stateB = b.attributes.state_abbr
      if (stateA < stateB) {
        return -1;
      }
      if (stateA > stateB) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    if (stateList.length) {
      setFilteredState(getSortedState(stateList));
    }
    if (searchText) {
      const filteredList = stateList.filter((state: any) => {
        return state.attributes.state_name.includes(searchText)
      });
      setFilteredState(filteredList);
    }
  }, [searchText, stateList])

  return (
    <ul className="list-group" id="myGroup">
      {filteredStates.map((state: IStateProps, index: number) => {
        return (
            <li
              key={index}
              className='list-group-item'
              data-parent="#myGroup" data-toggle='collapse' data-target={`#collapseExample${index}`} aria-expanded="false" aria-controls={`#collapseExample${index}`}
            >
              {state.attributes.state_name}
              <div className={`collapse`} id={`collapseExample${index}`}>
                <div className="card card-body">
                  <p>State Abbreviation: {state.attributes.state_abbr}</p>
                  <p>Number of Farms: {state.attributes.no_farms07}</p>
                </div>
              </div>
          </li>
        )
      })}
    </ul>
  );
}

export default ListGroup;
