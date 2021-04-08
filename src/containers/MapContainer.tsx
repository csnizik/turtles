import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import SideBar from '../components/SideBar';
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
  const [resultsPaneFocus, setResultsPaneFocus] = useState<IProject[]>([]);

  useEffect(() => {
    if (!currentStateOption && !searchText && queryResults) {
      setQueryResults(null);
      // TODO: Dispatch event to close popup
    }
  }, [searchText, currentStateOption])

  return (
    <>
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
            resultsPaneFocus={resultsPaneFocus}
            setResultsPaneFocus={setResultsPaneFocus}
          />
          <ProjectListGroup
            setRelatedTableResults={setRelatedTableResults}
            relatedTableResults={relatedTableResults}
            setStateExtent={setStateExtent}
            resultsPaneFocus={resultsPaneFocus}
            setResultsPaneFocus={setResultsPaneFocus}
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
            resultsPaneFocus={resultsPaneFocus}
            setResultsPaneFocus={setResultsPaneFocus}
          />
          <div className="webmap" id={VIEW_DIV} />
          <SearchResults
            resultsPaneFocus={resultsPaneFocus}
            setResultsPaneFocus={setResultsPaneFocus}
          />
        </div>
      </div>
    </>
  )
}

export default MapContainer;
