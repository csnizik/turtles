import React, { useEffect, useState } from 'react';
import { IProject } from '../common/Types';

interface ISearchResultProps {
  resultsPaneFocus: IProject[],
  setResultsPaneFocus: Function
}

const SearchResults = ({ resultsPaneFocus, setResultsPaneFocus } : ISearchResultProps) => {
  const [results, setResult] = useState(resultsPaneFocus);
  console.log("Result Pane Focus",resultsPaneFocus)

  useEffect(() => {
    setResult(resultsPaneFocus);
    
  }, [resultsPaneFocus]);

  const renderResults = () => {
    if (results && results.length>0 ){ // resultsPaneFocus != []
      resultsPaneFocus && console.log("Results---->",resultsPaneFocus)
    return (
      <div id='results' className='search-results-header card border-primary'>
      {/* <h3 className="card-header" data-toggle="collapse" data-target="#wrap">Projects from {resultsPaneFocus && resultsPaneFocus[0].state}</h3> */}
      <div id="wrap" className='show'>
        { results.map(project => {
            return (
              <div className="card border-dark m-3">
                <div className="card-header"><h3>{project.title}</h3></div><br />
                <div className="card-body">{project.description}</div>
                <br /><br />
              </div>
            )}
          )
        }
      </div>
    </div>
      
    )
  } ;
  }

  //if (!results || !results.features.length) return null;

  return (
    <div className='search-results'>
      { renderResults() }
    </div>
  );
}

export default SearchResults;
