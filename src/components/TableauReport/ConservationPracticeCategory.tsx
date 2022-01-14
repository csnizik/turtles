import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import verifyTableauIsEmpty, {
  verifyUrlIsValid,
} from '../../common/util/tableau';
import './tableau-report.scss';

declare global {
  // eslint-disable-next-line  no-unused-vars
  interface Window {
    tableau: any;
  }
}

let viz;
const { tableau } = window;
const ConservationPracticeCategory = ({ pageName, setIsTableauEmpty }: any) => {
  const ref = useRef(null);
  const stateAbbrInRedux = useAppSelector(
    (state: any) => state?.stateSlice?.stateAbbreviation
  );
  const stateAbbr =
    stateAbbrInRedux === 'U.S.' || stateAbbrInRedux === undefined
      ? ''
      : stateAbbrInRedux;
  const srcLink: string = `${
    tableauGraph.ConservationPracticeCategory?.link
  }=${stateAbbr}&Measure=${pageName.replace('&', '%26')}`;

  const initViz = () => {
    if (!verifyUrlIsValid(srcLink)) {
      setIsTableauEmpty(true);
      return;
    }
    const options = {
      device: 'desktop',
      onFirstInteractive: function checkEmpty() {
        verifyTableauIsEmpty(viz, setIsTableauEmpty);
      },
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

export default ConservationPracticeCategory;
