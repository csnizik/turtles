import React, { useState, useEffect } from 'react';
import { fromJS, Map, List } from 'immutable';
import { useParams } from "react-router-dom";
import { getReport } from '../common/util/AxiosUtil';
import CongressionalGrant from '../components/CongressionalGrant';

export interface IGrant {
  map: Function;
  get: Function;
  id: number;
  grantee: string;
  project: string;
  award: number;
  states: string;
  description: string;
}

interface IGrants {
  size: number
}

interface IMainContent {
  reportBody: string;
}

interface IGrantSummary {
  awards: number;
  matching: number;
}

const GrantContainer: React.FC = () => {

  const [grants, setGrants] = useState<IGrants>(List() as any);
  const [mainContent, setMainContent] = useState<IMainContent>(Map() as any);
  const [grantSummary, setGrantSummary] = useState<IGrantSummary>(Map() as any);
  const { year } = useParams<any>();

  const grantReport = async () => {
    const { data } = await getReport(`grant/${year}`);

    setGrants(fromJS(data));
  };

  const grantSummaryReport = async () => {
    const { data } = await getReport(
      `grantSummary/${year}`
    );
    setGrantSummary(fromJS(data));
  };

  const mainContentReport = async () => {
    const { data } = await getReport(
      `mainContent/${year}`
    );
    setMainContent(fromJS(data));
  };

  useEffect(() => {
    grantReport();
    grantSummaryReport();
    mainContentReport();
  }, []);

  return (
    <CongressionalGrant
      grants={grants}
      mainContent={mainContent}
      grantSummary={grantSummary}
    />
  )
}

export default GrantContainer;
