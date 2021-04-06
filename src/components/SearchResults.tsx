import React, { useEffect, useState } from 'react';
import { formatNumber } from '../common/util/formats';
import FeatureSet from 'esri/tasks/support/FeatureSet';

interface ISearchResultProps {
  queryResults: FeatureSet
}

const SearchResults = ({ queryResults } : ISearchResultProps) => {
  const [results, setResult] = useState(queryResults);

  useEffect(() => {
    setResult(queryResults);
  }, [queryResults]);

  const renderResultsHeader = () => {

    const stateName = (results.features && results.features.length === 1
      && results.features[0].attributes.state_name) || '';

    return (
      <div className='search-results-header'>
        <h3>Search results</h3>
        {stateName &&
          <span
            className="badge badge-light"
          >
            State:
            {' '}
            {stateName}
          </span>
        }
      </div>
    )
  }

  if (!results || !results.features.length) return null;

  return (
    <div className='search-results'>
      { renderResultsHeader() }
      <hr />
      {results && results.features.map((feature: any, index: number) => {
        return (
          <div key={feature.attributes.objectid_1}>
            <p>
              <strong>State Abbreviation: </strong>
              {feature.attributes.state_abbr}
            </p>
            <p>
              <strong>State Name: </strong>
              {feature.attributes.state_name}
            </p>
            <p>
              <strong>Number of farms: </strong>
              {formatNumber(feature.attributes.no_farms07)}
            </p>
            <hr />
          </div>
        )
      })}
    </div>
  );
}

export default SearchResults;
