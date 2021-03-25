import React, { useState, useEffect } from 'react';
import { fromJS, Map, List } from 'immutable';
import { useParams } from "react-router-dom";
import getReport from '../common/util/AxiosUtil';
import { formatCurrency } from '../utils/formats';
import '../stylesheets/congressionalGrant.css';
import '../stylesheets/congressionalReportUI.css';

interface IGrant {
  map: Function;
  get: Function;
  id: number;
  grantee: string;
  project: string;
  award: number;
  states: string;
  description: string;
}

interface IGrants extends Array<IGrant>{
  size: number
}

interface IMainContent {
  reportBody: string;
  size: number;
  get: Function;
}

interface IGrantSummary {
  awards: number;
  matching: number;
  size: number;
  get: Function;
}

const CongressionalReport: React.FC = () => {
  const [grants, setGrants] = useState<IGrants>(List() as any);
  const [mainContent, setMainContent] = useState<IMainContent>(Map() as any);
  const [grantSummary, setGrantSummary] = useState<IGrantSummary>(Map() as any);
  const { year } = useParams<any>();


  const grantReport = async () => {
    const { data } = await getReport.get(`/congressionalReport/grant/${year}`);

    setGrants(fromJS(data));
  };

  const grantSummaryReport = async () => {
    const { data } = await getReport.get(
      `/congressionalReport/grantSummary/${year}`
    );
    setGrantSummary(fromJS(data));
  };

  const mainContentReport = async () => {
    const { data } = await getReport.get(
      `/congressionalReport/mainContent/${year}`
    );
    setMainContent(fromJS(data));
  };

  useEffect(() => {
    grantReport();
    grantSummaryReport();
    mainContentReport();
  }, []);

  const renderGrants = () => {
    if (!grants.size) return null;
    return (
      <ul>
        { grants.map((item: IGrant) => (
          <div className='awardee-list' key={item.get('id')}>
            <span>{item.get('id')}</span>
            <li>
              <span>Grantee:</span>
              {item.get('grantee')}
            </li>
            <li>
              <span>Project:</span>
              {item.get('project')}
            </li>
            <li>
              <span>Award:</span>
              {formatCurrency(item.get('award'))}
            </li>
            <li>
              <span>States Involved:</span>
              {item.get('states')}
            </li>
            <li>
              <span>Description:</span>
              {item.get('description')}
            </li>
          </div>
        ))}
      </ul>
    )
  }

  const renderGrantSummarySection = () => {
    if (!grantSummary.size) return null;
    return (
      <>
        <p className='appendix'>
          Total NRCS Funds Awarded:
          {' '}
          {formatCurrency(grantSummary.get('awards'))}
        </p>
        <p className='appendix'>
          Total Grantee Matching Contributions:
          {' '}
          {formatCurrency(grantSummary.get('matching'))}
        </p>
      </>
    )
  }

  return (
    <div>
      { mainContent.size && (
        <div dangerouslySetInnerHTML={{ __html: mainContent.get('reportBody') }}></div>
      )}
      <h1 className='appendix top'>Appendix:SHD 2020 Awarded Projects</h1>
      { renderGrantSummarySection() }
      { renderGrants() }
    </div>
  );
};

export default CongressionalReport;
