import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import './tableau-report.scss';

declare global {
  interface Window {
    tableau: any;
  }
}

const { tableau } = window;

interface ITableauReportProps {
  pageName: string;
  practiceCode?: number;
}

interface ITableauGraphProps {
  id: number;
  displayName: string;
  link: string;
}

const TableauReport = ({ pageName, practiceCode }: ITableauReportProps) => {
  const stateAbbrInRedux = useAppSelector(
    (state) => state?.stateSlice?.stateAbbreviation
  );

  // let viz: any;
  const ref = useRef(null);
  const stateAbbr =
    stateAbbrInRedux === 'U.S.' || stateAbbrInRedux === undefined
      ? ''
      : stateAbbrInRedux;
  const [tableauLink, setTableauLink] = useState('');
  const [graph, setGraph] = useState<ITableauGraphProps>();
  console.log('tableau-->', tableau);

  const initViz = (usdaUrl: any) => {
    const options = {
      device: 'desktop',
      // hideToolbar: true,
      // 'Top Practice Rank': [1, 2, 3, 4, 5, 6],
      // 'State Name with Total': 'Maryland',
    };
    // eslint-disable-next-line no-new
    const viz = new tableau.Viz(ref.current, usdaUrl, options);
  };

  useEffect(() => {
    const tLink =
      // 'https://publicdashboards.dl.usda.gov/t/FPAC_PUB/views/EQIPTopPracticesTest/TopPractices';
      'https://publicdashboards.dl.usda.gov/t/FPAC_PUB/views/EQIPTopPracticesTest/TopPractices?:size=1,1&:embed=y&:showVizHome=n&:bootstrapWhenNotified=y&:toolbar=n&:device=desktop&Top%20Practice%20Rank=1%2C2%2C3%2C4%2C5%2C6&State%20Name%20with%20Total=Maryland&:apiID=host1';
    initViz(tLink);
  }, []);

  const getOption = () => {
    if (pageName === 'Conservation Practice')
      setGraph(tableauGraph.RegionalConservationPractice);
    else if (pageName === 'Practice Detail')
      setGraph(tableauGraph.PracticeDetail);
    else setGraph(tableauGraph.ConservationPracticeCategory);
  };

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
        setTableauLink(
          `${graph?.link}=${stateAbbr}&Practice Code=${practiceCode}`
        );
        break;
      }
      case 3: {
        setTableauLink(`${graph?.link}=${stateAbbr}`);
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    getOption();
  }, []);

  useEffect(() => {
    processGraph(graph?.id);
  }, [graph]);

  return (
    <div className='tableau-report-container'>
      {/* <img
        alt={graph?.displayName}
        src={tableauLink}
        className='tableau-graph'
      /> */}
      <div>
        <div ref={ref} />
      </div>
    </div>
  );
};

export default TableauReport;

TableauReport.defaultProps = {
  practiceCode: 100,
};
