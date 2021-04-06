import React, { useEffect, useState } from 'react';

const SearchResults = ({queryResults} : any) => {
  let result: any;
  const [results, setResult] = useState(queryResults);

  useEffect(() => {
    if (queryResults) {
      setResult(queryResults);
    }
  }, [queryResults])

  console.log("Results ", results)

  if (!results || !results.features.length) return null;

  return (
    <div>
      <h3>Search results</h3>
      <hr />
      {results && results.features.map((feature: any) => {
        return (
          <div key={feature.attributes.objectid_1}>
            <p>State Abbreviation: {feature.attributes.state_abbr}</p>
            <p>State Name: {feature.attributes.state_name}</p>
          </div>
        )
      })}
    </div>
  );
}

export default SearchResults;
