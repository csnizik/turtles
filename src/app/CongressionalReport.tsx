import React, { useState, useEffect } from 'react';
import getReport from '../common/util/AxiosUtil';
import '../stylesheets/congressionalReport.css';

interface Report {
  id: number;
  grantee: string;
  project: string;
  award: number;
  states: string;
  description: string;
}

const CongressionalReport: React.FC = () => {
  const [report, setReport] = useState<Report[] | null>();

  const appendixReport = async () => {
    const { data } = await getReport.get('/api/Projects');
    setReport(data);
  };

  useEffect(() => {
    appendixReport();
  }, []);
  return (
    <div>
      <h1 className='appendix'>Appendix:SHD 2020 Awarded Projects</h1>
      <ul>
        {report &&
          report.map((item: Report) => (
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
