import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import './tableau-report.scss';

let viz;
const { tableau } = window;
const TopPracticesEQUIPOpenData = () => {
  const ref = useRef(null);
  let stateName = useAppSelector(
    (state: any) => state?.stateSlice?.stateNameDisplay
  );
  if (stateName === 'U.S.') stateName = 'National';

  const srcLink: string = `${tableauGraph.TopPracticesEQUIPOpenData?.link}=${stateName}&:tabs=no`;

  const initViz = () => {
    const options = {
      device: 'desktop',
    };
    // eslint-disable-next-line no-new
    if (viz) viz.dispose();
    viz = new tableau.Viz(ref.current, srcLink, options);
  };

  useEffect(() => {
    initViz();
  }, [stateName]);

  return (
    <div className='tableau-report-container'>
      <div ref={ref} />
    </div>
  );
};

export default TopPracticesEQUIPOpenData;
