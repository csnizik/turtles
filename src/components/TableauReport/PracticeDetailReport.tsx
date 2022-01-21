import { useEffect } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import './tableau-report.scss';
import verifyTableauIsEmpty, {
  verifyUrlIsValid,
} from '../../common/util/tableau';

let viz;
const { tableau } = window;
const PracticeDetailReport = ({ practiceCode, checkTableauIsEmpty }: any) => {
  const stateAbbrInRedux = useAppSelector(
    (state: any) => state?.stateSlice?.stateAbbreviation
  );
  const fromPdfReport = useAppSelector(
    (state) => state?.pdfGenSlice?.enablePdfGen
  );

  const stateAbbr =
    stateAbbrInRedux === 'U.S.' || stateAbbrInRedux === undefined
      ? ''
      : stateAbbrInRedux;

  const srcLink: string = `${tableauGraph.PracticeDetail.link}=${stateAbbr}&Practice Code=${practiceCode}`;
  const srcImageLink: string = `${tableauGraph.PracticeDetail.imageLink}=${stateAbbr}&Practice Code=${practiceCode}`;

  const receiveMessage = () => {
    verifyTableauIsEmpty(viz, checkTableauIsEmpty);
  };

  const initViz = () => {
    if (!verifyUrlIsValid(srcLink)) {
      checkTableauIsEmpty(true);
      return;
    }
    const options = {
      device: 'desktop',
    };
    const containerDiv = document.getElementById('practice-detail');
    // eslint-disable-next-line no-new
    if (viz) viz.dispose();
    viz = new tableau.Viz(containerDiv, srcLink, options);
    viz.addEventListener(
      tableau.TableauEventName.CUSTOM_VIEW_LOAD,
      receiveMessage
    );
  };

  useEffect(() => {
    if (!fromPdfReport) initViz();
  }, [stateAbbrInRedux, fromPdfReport]);

  return (
    <div className='tableau-report-container' id='practice-detail'>
      {fromPdfReport && (
        <img src={srcImageLink} alt={tableauGraph.PracticeDetail.displayName} />
      )}
    </div>
  );
};

export default PracticeDetailReport;
