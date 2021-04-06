import React, { useEffect, useState } from 'react';

const SearchResults = ({queryResults} : any) => {
  let result: any;
  const [results, setResult] = useState(queryResults);

  useEffect(() => {
    console.log("Query results: ", queryResults)
    if (queryResults) {
          setResult(queryResults);
    }
  }, [queryResults])

  if (!results || !results.features) return null;

  return (
    <div>
      <h3>Search results</h3>
      <hr />
      {result && result.features.map((feature: any) => {
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
