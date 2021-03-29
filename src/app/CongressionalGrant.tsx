import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getReport } from '../common/util/AxiosUtil';
import { formatCurrency } from '../utils/formats';
import '../stylesheets/congressionalGrant.css';
import '../stylesheets/congressionalReportUI.css';

interface IGrant {
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

const CongressionalReport: React.FC = () => {
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
    <div>
      {mainContent && (
        <div dangerouslySetInnerHTML={{ __html: mainContent.reportBody }}></div>
      )}
      <h1 className='appendix top'>Appendix:SHD 2020 Awarded Projects</h1>
      <p className='appendix'>
        Total NRCS Funds Awarded:{' '}
        {grantSummary && formatCurrency(grantSummary.awards)}
      </p>
      <p className='appendix'>
        Total Grantee Matching Contributions:{' '}
        {grantSummary && formatCurrency(grantSummary.matching)}
      </p>
      <ul>
        {grants &&
          grants.map((item: IGrant) => (
            <div className='awardee-list' key={item.id}>
              <span>{item.id}</span>
              <li>
                <span>Grantee:</span>
                {item.grantee}
              </li>
              <li>
                <span>Project:</span>
                {item.project}
              </li>
              <li>
                <span>Award:</span>
                {formatCurrency(item.award)}
              </li>
              <li>
                <span>States Involved:</span>
                {item.states}
              </li>
              <li>
                <span>Description:</span>
                {item.description}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default CongressionalReport;
