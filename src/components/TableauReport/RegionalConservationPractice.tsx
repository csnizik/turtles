import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import './tableau-report.scss';
import { verifyUrlIsValid } from '../../common/util/tableau';

let viz;
const { tableau } = window;
const RegionalConservationPractice = ({ setIsTableauEmpty }: any) => {
  const ref = useRef(null);
  const stateAbbrInRedux = useAppSelector(
    (state: any) => state?.stateSlice?.stateAbbreviation
  );
  const stateAbbr =
    stateAbbrInRedux === 'U.S.' || stateAbbrInRedux === undefined
      ? ''
      : stateAbbrInRedux;
  const srcLink: string = `${tableauGraph.RegionalConservationPractice?.link}=${stateAbbr}`;

  const initViz = () => {
    if (!verifyUrlIsValid(srcLink)) {
      setIsTableauEmpty(true);
      return;
    }
    const options = {
      device: 'desktop',
    };
    // eslint-disable-next-line no-new
    if (viz) viz.dispose();
    viz = new tableau.Viz(ref.current, srcLink, options);
  };

  useEffect(() => {
    initViz();
  }, [stateAbbrInRedux]);

  return (
    <div className='tableau-report-container'>
      <div ref={ref} />
    </div>
  );
};

export default RegionalConservationPractice;
