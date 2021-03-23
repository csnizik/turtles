import React from 'react';
import { IGrant } from '../containers/app/App';
import '../stylesheets/congressionalGrant.css';
import '../stylesheets/congressionalReportUI.css';

const CongressionalGrant = (props: any) => {
  const { mainContent, grants, grantSummary } = props;
  return (
    <div>
      {mainContent && (
        <div dangerouslySetInnerHTML={{ __html: mainContent.reportBody }}></div>
      )}
      <h1 className='appendix top'>Appendix:SHD 2020 Awarded Projects</h1>
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

export default CongressionalGrant;
