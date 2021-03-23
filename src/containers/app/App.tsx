import React, { useState, useEffect } from 'react';
import getReport from '../../common/util/AxiosUtil';
import CongressionalGrant from '../../components/CongressionalGrant';

export interface IGrant {
  map: Function;
  id: number;
  grantee: string;
  project: string;
  award: number;
  states: string;
  description: string;
}

export interface IMainContent {
  reportBody: string;
}

export interface IGrantSummary {
  awards: number;
  matching: number;
}

const App: React.FC = () => {

  const [grants, setGrants] = useState<IGrant[] | null>();
  const [mainContent, setMainContent] = useState<IMainContent | null>();
  const [grantSummary, setGrantSummary] = useState<IGrantSummary | null>();

  const grantReport = async () => {
    const { data } = await getReport.get('/congressionalReport/grant/123');

    setGrants(data);
  };

  const grantSummaryReport = async () => {
    const { data } = await getReport.get(
      '/congressionalReport/grantSummary/123'
    );
    setGrantSummary(data);
  };

  const mainContentReport = async () => {
    const { data } = await getReport.get(
      '/congressionalReport/mainContent/123'
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

export default App;
