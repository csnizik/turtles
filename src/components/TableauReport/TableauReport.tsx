import { useState, useEffect } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import './tableau-report.scss';

interface ITableauReportProps {
  pageName: string;
  practiceCode?: number;
}

interface ITableauGraphProps {
  id: number;
  displayName: string;
  link: string;
}

const TableauReport = ({
  pageName,
  practiceCode
}: ITableauReportProps) => {
  const stateAbbrInRedux = useAppSelector(
    (state) => state?.stateSlice?.stateAbbreviation
  );

  const stateAbbr = (stateAbbrInRedux === 'U.S.' || stateAbbrInRedux=== undefined) ? '' : stateAbbrInRedux;
  const [tableauLink, setTableauLink] = useState('');
  const [graph, setGraph] = useState<ITableauGraphProps>();

  const getOption = () => {
    if (pageName === 'Conservation Practice') setGraph(tableauGraph.RegionalConservationPractice);
    else if(pageName === 'Practice Detail') setGraph(tableauGraph.PracticeDetail);
    else setGraph(tableauGraph.ConservationPracticeCategory);
  }

  const processGraph = (id) => {
    switch (id) {
      case 0: {
        setTableauLink(`${graph?.link}=${stateAbbr}`);
        break;
      }
      case 1: {
        setTableauLink(`${graph?.link}=${stateAbbr}&Measure=${pageName}`);
        break;
      }
      case 2: {
        setTableauLink(`${graph?.link}=${stateAbbr}&Practice Code=${practiceCode}`)
        break;
      }
      default: {
        break;
      }
    }
  }

  useEffect(() => {
    getOption();
  }, []);

  useEffect(() => {
    processGraph(graph?.id);
  }, [graph]);

  return (
    <div className='tableau-report-container'>
      <img
        alt={graph?.displayName}
        src={tableauLink}
        className='tableau-graph'
      />
    </div>
  );
}

export default TableauReport;

TableauReport.defaultProps = {
  practiceCode: 100
}