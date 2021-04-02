import React, { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import ListGroup from '../components/ListGroup';
import {
  VIEW_DIV
} from '../common/constants.js';

const MapContainer = () => {
  const [searchText, setSearchText] = useState('');
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    fetch('https://age.spatialfrontgis.com/host/rest/services/Hosted/US_States_with_CIG_Projects_View/FeatureServer/0/query?where=objectid_1+%3E+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=objectid_1%2C+state_name%2C+state_abbr%2C+no_farms07&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&sqlFormat=none&resultType=&datumTransformation=&f=pjson')
    .then(response => response.json())
    .then(data => {
      if (data) {
        console.log("data: ", data)
        setStateList(data.features)
      }
    })
  }, [])

  return (
    <div className="qsr-map">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <MapComponent
        searchText={searchText}
      />
      <div className="webmap" id={VIEW_DIV} />
    </div>
  )
}

export default MapContainer;
