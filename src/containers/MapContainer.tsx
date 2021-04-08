import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import ProjectListGroup from '../components/ProjectListGroup';
import FeatureSet from '@arcgis/core/tasks/support/FeatureSet';
import Extent from '@arcgis/core/geometry/Extent';
import Graphic from '@arcgis/core/Graphic';
import { IProject } from '../common/Types'
import {
  VIEW_DIV
} from '../common/constants.js';

const MapContainer = () => {
  const [searchText, setSearchText] = useState('');
  const [stateList, setStateList] = useState([]);
  const [currentStateOption, setStateDropdownOption] = useState<string>('');
  const [queryResults, setQueryResults] = useState<FeatureSet | null>(null);
  const [relatedTableResults, setRelatedTableResults] = useState<IProject[]>([]);
  const [stateExtent, setStateExtent] = useState<Extent>();
  const [currentSearchOption, setSearchOption] = useState('location');

  useEffect(() => {
    if (!currentStateOption && !searchText && queryResults) {
      setQueryResults(null);
      // TODO: Dispatch event to close popup
    }
  }, [searchText, currentStateOption])

  // useEffect(() => {
  //   fetch('https://age.spatialfrontgis.com/host/rest/services/Hosted/US_States_with_CIG_Projects_View/FeatureServer/0/query?where=objectid_1+%3E+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=objectid_1%2C+state_name%2C+state_fips%2C+sub_region%2C+state_abbr%2C+no_farms07%2C+avg_size07%2C+avg_size07%2C+shape_leng%2C+globalid%2C+SHAPE__Length%2C+SHAPE__Area%2C+no_projects&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&sqlFormat=none&resultType=&datumTransformation=&f=pjson')
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data) {
  //       setStateList(data.features)
  //     }
  //   })

  // }, [])

  return (
    <>
      <Header />
      <div className="qsr-map row">
        <div className="map-tools col-md-3">
          <SideBar
            searchText={searchText}
            setSearchText={setSearchText}
            setQueryResults={setQueryResults}
            stateList={stateList}
            setStateDropdownOption={setStateDropdownOption}
            currentStateOption={currentStateOption}
            setRelatedTableResults={setRelatedTableResults}
            setStateExtent={setStateExtent}
            setSearchOption={setSearchOption}
            currentSearchOption={currentSearchOption}
          />
          <ProjectListGroup
            relatedTableResults={relatedTableResults}
            setStateExtent={setStateExtent}
          />
        </div>
        <div className="arcgis-map col-md-9">
          <MapComponent
            searchText={searchText}
            queryResults={queryResults!}
            setQueryResults={setQueryResults}
            currentStateOption={currentStateOption}
            setStateDropdownOption={setStateDropdownOption}
            relatedTableResults={relatedTableResults}
            setRelatedTableResults={setRelatedTableResults}
            stateExtent={stateExtent!}
            currentSearchOption={currentSearchOption}
          />
          <div className="webmap" id={VIEW_DIV} />
          <SearchResults
            relatedTableResults={relatedTableResults}
          />
        </div>
      </div>
    </>
  )
}

export default MapContainer;
