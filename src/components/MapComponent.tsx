import { useEffect, useState, useRef } from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from '@arcgis/core/Graphic';
import FeatureSet from '@arcgis/core/tasks/support/FeatureSet';
import Extent from '@arcgis/core/geometry/Extent';
import esriConfig from "@arcgis/core/config";
import "@arcgis/core/assets/esri/themes/light/main.css";
import '../stylesheets/map.css';
import {
  VIEW_DIV,
  MAP_ZOOM,
  CENTER_COORDINATES,
  statesLayerId
} from '../common/constants.js'
import { queryLayer } from '../common/util/MapUtil';
import { usePrevious } from '../common/util/helperHooks';

import { IProject } from '../common/Types';


interface IMapProperties {
  searchText: string,
  setQueryResults: Function,
  setStateDropdownOption: Function,
  currentStateOption: string,
  queryResults: FeatureSet,
  setRelatedTableResults: Function,
  relatedTableResults: IProject[],
  stateExtent: Extent,
  currentSearchOption: string,
  resultsPaneFocus: IProject[],
  setResultsPaneFocus: Function
}

interface MapProps {
  view: MapView;
  portalWebMap: WebMap;
}

const MapComponent = ({
    searchText,
    queryResults,
    setQueryResults,
    currentStateOption,
    setStateDropdownOption,
    setRelatedTableResults,
    relatedTableResults,
    stateExtent,
    currentSearchOption,
    resultsPaneFocus,
    setResultsPaneFocus
  }: IMapProperties) => {
  const mapRef = useRef({} as MapProps);
  const [view, setView] = useState(null);

  const previousSearchText = usePrevious(searchText);
  const previousSearchOption = usePrevious(currentSearchOption);

  useEffect(() => {
    if (previousSearchOption && currentSearchOption !== previousSearchOption) {
      if (mapRef.current.view.graphics) {
        mapRef.current.view.graphics.removeAll();
      }
    }
  }, [currentSearchOption])


  let statesLayer:Layer;

  let getProjectByState = function (state:Graphic) {
    mapRef.current.portalWebMap.when(function(){
      statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);

      let relID:number = state.getObjectId();
      let stateExtent:Extent = state.geometry.extent;
      let statesFLayer:FeatureLayer = statesLayer as FeatureLayer;

      statesFLayer.queryRelatedFeatures({
        outFields: ["agreement_no_",
                    "awardee_name",
                    "project_title",
                    "funds_approved",
                    "awardee_state__territory",
                    "award_year",
                    "resource_concern__broad_",
                    "project_background",
                    "deliverables"],
        relationshipId: statesFLayer.relationships[0].id,
        objectIds: [relID]
      }).then((rdata) => {
        let projects:IProject[] = [];
        for(let feature  of rdata[relID].features){
            let project ={} as IProject;
            let feat = feature as Graphic;

            project.stateExtent = stateExtent;
            project.agreementNumber = feat.getAttribute("agreement_no_");
            project.awardeeName = feat.getAttribute("awardee_name");
            project.title = feat.getAttribute("project_title");
            project.funds = feat.getAttribute("funds_approved");
            project.state = feat.getAttribute("awardee_state__territory");
            project.year = feat.getAttribute("award_year");
            project.resource = feat.getAttribute("resource_concern__broad_");
            project.description = feat.getAttribute("project_background");
            project.deliverables = feat.getAttribute("deliverables");

            projects.push(project);
          }
          setRelatedTableResults(projects);
          setResultsPaneFocus(projects)
          


      });
    });
  }

  let selectStatesByProjectList = function (stateCodes:string[]) {

    // TODO: Query States layer and get all state graphic
    let stateWhereClause: string = '';
    for (let i = 0; i < stateCodes.length; i++) {
      if (i != stateCodes.length - 1) {
        stateWhereClause += `state_abbr = '${stateCodes[i]}' OR `;
      } else {
        stateWhereClause += `state_abbr = '${stateCodes[i]}'`;
      }
    }

    mapRef.current.portalWebMap.when(function() {
      statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);

      if (stateWhereClause.length){
        queryLayer(
          statesLayer,
          stateWhereClause,
          [ "state_name", "state_abbr", "objectid_1" ]
        )
        .then((states: FeatureSet) => {
          if (states.features.length){
            mapRef.current.view.graphics.removeAll();
            let selectedStates:Graphic[] = [];
            const stateSymbol: any = {
              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
              color: [ 51,51, 204, 0.9 ],
              style: "solid",
              outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
              }
            };
            states.features.forEach(state => {
              let selectedState = new Graphic({
                geometry:state.geometry,
                attributes:state.attributes,
                symbol: stateSymbol
              });

              selectedStates.push(selectedState);
              mapRef.current.view.graphics.add(selectedState)
            });

            if (selectedStates.length) {
              mapRef.current.view.goTo(selectedStates);
            }
          }
        });
      }

    });
    // Then zoom to graphics and add them to the view
  }



  //getAllProjectAwardee
  //SearchByAwardee
  //getProjectByNumber
  function getProjectByNumber(agreementNumber: string) {
    mapRef.current.portalWebMap.when(function(){


      let projectsTable = mapRef.current.portalWebMap.tables.getItemAt(0);
      let projects:IProject[] = [];
      //console.log(projectsTable);
      queryLayer(
        projectsTable,
        `agreement_no_ = '${agreementNumber}'`,
        ["agreement_no_",
        "awardee_name",
        "project_title",
        "funds_approved",
        "awardee_state__territory",
        "award_year",
        "resource_concern__broad_",
        "project_background",
        "deliverables"],
      ).then((rprojects: FeatureSet) => {
        for(let feature  of rprojects.features){
          let project ={} as IProject;
          let feat = feature as Graphic;

          project.stateExtent = stateExtent;
          project.agreementNumber = feat.getAttribute("agreement_no_");
          project.awardeeName = feat.getAttribute("awardee_name");
          project.title = feat.getAttribute("project_title");
          project.funds = feat.getAttribute("funds_approved");
          project.state = feat.getAttribute("awardee_state__territory");
          project.year = feat.getAttribute("award_year");
          project.resource = feat.getAttribute("resource_concern__broad_");
          project.description = feat.getAttribute("project_background");
          project.deliverables = feat.getAttribute("deliverables");

          projects.push(project);
        }

        setRelatedTableResults(projects);
        setResultsPaneFocus(projects)


        let stateCodes:string[] = [];
        for (let i = 0; i < projects.length; i++) {
          stateCodes.push(projects[i].state);
        }

        selectStatesByProjectList(stateCodes);

      })
    });


  }


  //getProjectByAwardee


  useEffect(() => {
    if (stateExtent && mapRef.current.view) {
      mapRef.current.view.when(() => {
        mapRef.current.view.goTo(stateExtent);
      })
    }
  }, [stateExtent, mapRef]);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      esriConfig.portalUrl = `${process.env.REACT_APP_PORTAL_URL}`;
      const portalWebMap = new WebMap({
        portalItem: {
          id: process.env.REACT_APP_PORTAL_ID,
        },
      });

      const view = new MapView({
        map: portalWebMap,
        container: VIEW_DIV,
        center: CENTER_COORDINATES,
        zoom: MAP_ZOOM,
       
      });


      mapRef.current.view = view;
      mapRef.current.portalWebMap = portalWebMap;

      mapRef.current.portalWebMap.when(function(){
        statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);
      });

      view.when(() => {
        view.on('pointer-up', function(event) {
          view.hitTest(event).then(function(response) {
          if (response.results.length) {
            const result = response.results[0];
            const graphic: Graphic = result.graphic;
            const graphicAttributes = graphic.attributes;

            mapRef.current.portalWebMap.when(function(){
              statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);
              setStateDropdownOption(graphicAttributes.objectid_1);
              queryLayer(
                statesLayer,
                `objectid_1 = '${graphicAttributes.objectid_1}'`,
                [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
              )
              .then((data: FeatureSet) => {
                setQueryResults(data)
              })
            });
          }
          })
        })
      })
    }
  }, [mapRef]);

  useEffect(() => {
    const currentView = mapRef.current.view;
    if (queryResults && queryResults.features && queryResults.features.length === 1) {
      const state: Graphic = queryResults.features[0];
      if (state) {
        currentView.when(() => {
          currentView.goTo(state);
          getProjectByState(state);
        })
      }
    }
  }, [queryResults])

  useEffect(() => {
    if (relatedTableResults && relatedTableResults.length) {
      console.log(relatedTableResults);
    }
  }, [relatedTableResults])

  useEffect(() => {
    if (!searchText && previousSearchText) {
      mapRef.current.view.graphics.removeAll();
    }

    if (searchText && previousSearchText !== searchText && !currentStateOption) {

      if (currentSearchOption === 'projects') {
        getProjectByNumber(searchText);
      } else {
        mapRef.current.portalWebMap.when(function(){
          statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);
          queryLayer(
            statesLayer,
            `UPPER(state_name) LIKE UPPER('${searchText}%')`,
            [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
          )
          .then((states: FeatureSet) => {
            setQueryResults(states);

            let stateExtent:Extent;

            if (states.features && states.features.length === 1) {
              getProjectByState(states.features[0])
            }
          });

        });
      }
    }

    if (currentStateOption) {
      let statesFLayer:FeatureLayer;
      mapRef.current.portalWebMap.when(function(){
        statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);
        queryLayer(
          statesLayer,
          `objectid_1 = '${currentStateOption}'`,
          [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
        )
        .then((states: FeatureSet) => {
          setQueryResults(states);
          let stateExtent:Extent;
          if (states.features && states.features.length === 1) {
              getProjectByState(states.features[0])
          }
        })
      });
    }
  }, [searchText, currentStateOption])

  return null;
}

export default MapComponent;
