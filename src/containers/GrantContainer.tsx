import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getReport } from '../common/util/AxiosUtil';
import CongressionalGrant from '../components/CongressionalGrant';

export interface IGrant {
  map: Function;
  id: number;
  grantee: string;
  project: string;
  award: number;
  states: string;
  description: string;
}

interface IMainContent {
  reportBody: string;
}

interface IGrantSummary {
  awards: number;
  matching: number;
}

const GrantContainer: React.FC = () => {

  const [grants, setGrants] = useState<IGrant[] | null>();
  const [mainContent, setMainContent] = useState<IMainContent | null>();
  const [grantSummary, setGrantSummary] = useState<IGrantSummary | null>();
  const { year } = useParams<any>();

  const grantReport = async () => {
    const { data } = await getReport(`grant/${year}`);

    setGrants(data);
  };

  const grantSummaryReport = async () => {
    const { data } = await getReport(
      `grantSummary/${year}`
    );
    setGrantSummary(data);
  };

  const mainContentReport = async () => {
    const { data } = await getReport(
      `mainContent/${year}`
    );
    setMainContent(data);
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
