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

  if (!results || !results.features.length) return null;

  return (
    <div>
      <h3>Search results</h3>
      <hr />
      {results && results.features.map((feature: any, index: number) => {
        return (
          <div key={feature.attributes.objectid_1}>
            <p>State Abbreviation: {feature.attributes.state_abbr}</p>
            <p>State Name: {feature.attributes.state_name}</p>
            <p>Number of farms: {formatNumber(feature.attributes.no_farms07)}</p>
            <hr />
          </div>
        )
      })}
    </div>
  );
}

export default SearchResults;
