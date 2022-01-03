import { useEffect } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import './tableau-report.scss';

let viz;
const { tableau } = window;
const PracticeDetailReport = ({ practiceCode }: any) => {
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

  const finalLink = fromPdfReport
    ? tableauGraph.PracticeDetail.imageLink
    : tableauGraph.PracticeDetail.link;
  const srcLink: string = `${finalLink}=${stateAbbr}&Practice Code=${practiceCode}`;

  const initViz = () => {
    const options = {
      device: 'desktop',
    };
    const containerDiv = document.getElementById('practice-detail');
    // eslint-disable-next-line no-new
    if (viz) viz.dispose();
    viz = new tableau.Viz(containerDiv, srcLink, options);
  };

  useEffect(() => {
    initViz();
  }, [stateAbbrInRedux, fromPdfReport]);

  return (
    <div className='tableau-report-container' id='practice-detail'>
      {fromPdfReport && (
        <img src={srcLink} alt={tableauGraph.PracticeDetail.displayName} />
      )}
    </div>
  );
};

export default PracticeDetailReport;
