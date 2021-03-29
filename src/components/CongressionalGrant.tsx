import React from 'react';
import { IGrant } from '../containers/GrantContainer';
import { formatCurrency } from '../utils/formats';
import '../stylesheets/congressionalGrant.css';
import '../stylesheets/congressionalReportUI.css';

const CongressionalGrant = (props: any) => {
  const { mainContent, grants, grantSummary } = props;
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
      { mainContent.size ? (
        <div dangerouslySetInnerHTML={{ __html: mainContent.get('reportBody') }}></div>
      ) : null }
      <h1 className='appendix top'>
        Appendix:SHD 2020 Awarded Projects
      </h1>
      { renderGrantSummarySection() }
      { renderGrants() }
    </div>
  )
};

export default CongressionalGrant;
