import React, { useState, useEffect } from 'react';
import getReport from '../common/util/AxiosUtil';
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

  const grantReport = async () => {
    try {
      const { data } = await getReport.get('/congressionalReport/grant/123');

      setGrants(data);
} catch (error) {
  console.log(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

  };

  const grantSummaryReport = async () => {
    try {
      const { data } = await getReport.get(
        '/congressionalReport/grantSummary/123'
      );
      setGrantSummary(data);
    } catch (error) {
    console.log(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
    }

  };

  const mainContentReport = async () => {
    try {
      const { data } = await getReport.get(
        '/congressionalReport/mainContent/123'
      );
      setMainContent(data);
} catch (error) {
  console.log(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

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
      <h1 data-testid="custom-element" className='appendix top'>Appendix:SHD 2020 Awarded Projects</h1>
      <p className='appendix'>
        Total NRCS Funds Awarded: ${grantSummary && grantSummary.awards}
      </p>
      <p className='appendix'>
        Total Grantee Matching Contributions: $
        {grantSummary && grantSummary.matching}
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
                <span>Award:</span>${item.award}
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
