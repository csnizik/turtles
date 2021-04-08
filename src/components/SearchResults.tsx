import React, { useEffect, useState } from 'react';
import { IProject } from '../common/Types';

interface ISearchResultProps {
  relatedTableResults : IProject[]
}

const SearchResults = ({ relatedTableResults } : ISearchResultProps) => {
  const [results, setResult] = useState(relatedTableResults);

  useEffect(() => {
    setResult(relatedTableResults);
  }, [relatedTableResults]);

  const renderResults = () => {
    if (!relatedTableResults || !relatedTableResults.length) return null;

    return (
      <div id='results' className='search-results-header card border-primary'>
        <h3 className="card-header" data-toggle="collapse" data-target="#wrap">Projects from {relatedTableResults[0].state}</h3>
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
  }

  //if (!results || !results.features.length) return null;

  return (
    <div className='search-results'>
      { renderResults() }
    </div>
  );
}

export default SearchResults;
