import { useEffect } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { tableauGraph } from '../../common/typedconstants.common';
import verifyTableauIsEmpty, { verifyUrlIsValid } from '../../common/util/tableau';
import './tableau-report.scss';

const { tableau } = window;
let viz;
const EquipPracticeCertificationTrend = ({ practiceCode, checkTableauIsEmpty }: any) => {
  let stateName = useAppSelector(
    (state: any) => state?.stateSlice?.stateNameDisplay
  );
  if (stateName === 'U.S.') stateName = 'National';
  const fromPdfReport = useAppSelector(
    (state) => state?.pdfGenSlice?.enablePdfGen
  );

  const finalLink = fromPdfReport
    ? tableauGraph.EquipPracticeCertificationTrend.imageLink
    : tableauGraph.EquipPracticeCertificationTrend.link;
  const srcLink: string = `${finalLink}=${stateName}&practice_code_num=${practiceCode}&:tabs=no`;

  const initViz = () => {
    if (!verifyUrlIsValid(srcLink)) checkTableauIsEmpty(true);
    const options = {
      device: 'desktop',
      onFirstInteractive: function checkEmpty() {
        verifyTableauIsEmpty(viz, checkTableauIsEmpty);
      },
    };
    const containerDiv = document.getElementById(
      'equip-practice-certification-trend'
    );
    // eslint-disable-next-line no-new
    if (viz) viz.dispose();
    viz = new tableau.Viz(containerDiv, srcLink, options);
  };

  useEffect(() => {
    if (!fromPdfReport) initViz();
  }, [stateName, fromPdfReport]);

  return (
    <div
      className='tableau-report-container'
      id='equip-practice-certification-trend'
    >
      {fromPdfReport && (
        <img
          src={srcLink}
          alt={tableauGraph.EquipPracticeCertificationTrend.displayName}
        />
      )}
    </div>
  );
};

export default EquipPracticeCertificationTrend;
