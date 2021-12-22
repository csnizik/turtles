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
  var viz;
  const stateAbbrInRedux = useAppSelector(
    (state: any) => state?.stateSlice?.stateAbbreviation
  );
  let stateName
  stateName = useAppSelector(
    (state: any) => state?.stateSlice?.stateNameDisplay
  );
  if (stateName === 'U.S.'){
    stateName = 'National'
  }
  const ref = useRef(null);
  const stateAbbr =
    stateAbbrInRedux === 'U.S.' || stateAbbrInRedux === undefined
      ? ''
      : stateAbbrInRedux;
  const [tableauLink, setTableauLink] = useState('');
  const [graph, setGraph] = useState<ITableauGraphProps>();

  const initViz = (usdaUrl: any) => {
    const options = {
      device: 'desktop',
      // hideToolbar: true,
      // 'Top Practice Rank': [1, 2, 3, 4, 5, 6],
      // 'State Name with Total': 'Maryland',
    };
    // eslint-disable-next-line no-new
    viz = new tableau.Viz(ref.current, usdaUrl, options);
  };

  const getOption = () => {
    if (pageName === 'Conservation Practice')
      setGraph(tableauGraph.RegionalConservationPractice);
    else if (pageName === 'Practice Detail')
      setGraph(tableauGraph.PracticeDetail);
    else if (pageName === 'TopPracticesEQUIPOpenData')
      setGraph(tableauGraph.TopPracticesEQUIPOpenData);
    else if (pageName === 'EQUIPOpenData')
      setGraph(tableauGraph.EQUIPOpenData);
    else if (pageName === 'SecondEQUIPOpenData')
      setGraph(tableauGraph.SecondEQUIPOpenData);
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
        setTableauLink(`${graph?.link}=${stateName}&:tabs=no`);
        break;
      }
      case 4: {
        setTableauLink(`${graph?.link}=${stateName}&:tabs=no`);
        break;
      }
      case 5: {
        setTableauLink(`${graph?.link}=${stateName}&:tabs=no`);
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    getOption();
    console.log('viz', viz)
    if(tableauLink) {
    initViz(tableauLink)
    console.log('Newviz', viz)
    }
    // if(viz) {
    //   viz.dispose()
    // }
  }, [tableauLink]);

  useEffect(() => {
    processGraph(graph?.id);
  }, [graph, stateAbbr]);

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
