import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import FeatureSet from 'esri/tasks/support/FeatureSet';
import {
  VIEW_DIV
} from '../common/constants.js';

const MapContainer = () => {
  const [searchText, setSearchText] = useState('');
  const [stateList, setStateList] = useState([]);
  const [currentStateOption, setStateDropdownOption] = useState<string>('');
  const [queryResults, setQueryResults] = useState<FeatureSet>();

  useEffect(() => {
    fetch('https://age.spatialfrontgis.com/host/rest/services/Hosted/US_States_with_CIG_Projects_View/FeatureServer/0/query?where=objectid_1+%3E+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=objectid_1%2C+state_name%2C+state_fips%2C+sub_region%2C+state_abbr%2C+no_farms07%2C+avg_size07%2C+avg_size07%2C+shape_leng%2C+globalid%2C+SHAPE__Length%2C+SHAPE__Area%2C+no_projects&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&sqlFormat=none&resultType=&datumTransformation=&f=pjson')
    .then(response => response.json())
    .then(data => {
      if (data) {
        setStateList(data.features)
      }
    })

  }, [])

  return (
    <>
      <div className="qsr-map row">
        <div className="map-tools col-md-3">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            setQueryResults={setQueryResults}
            stateList={stateList}
            setStateDropdownOption={setStateDropdownOption}
            currentStateOption={currentStateOption}
          />
        </div>
        <div className="arcgis-map col-md-9">
          <MapComponent
            searchText={searchText}
            queryResults={queryResults!}
            setQueryResults={setQueryResults}
            currentStateOption={currentStateOption}
            setStateDropdownOption={setStateDropdownOption}
          />
          <div className="webmap" id={VIEW_DIV} />
          <SearchResults
            queryResults={queryResults!}
          />
        </div>
      </div>
    </>
  )
}

export default MapContainer;
