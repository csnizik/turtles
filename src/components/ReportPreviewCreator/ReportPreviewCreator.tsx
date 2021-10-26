import { useEffect, useRef, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import html2pdf from 'html2pdf.js';
import './report-preview-creator.scss';
import {
  useGetRelatedResourceConcernCategoryQuery,
  useGetNationalOverviewByPracticeQuery,
} from '../../Redux/services/api';
import ReportBuilder from '../ReportBuilder';
import ReportPreview from '../ReportPreview';
import { useAppSelector } from '../../Redux/hooks/hooks';
import closebtn from './image/close-button.png';

interface DomChild {
  className: string;
  textContent: string;
}

interface DomParent {
  children: Array<DomChild>;
}

const subTitle: string = `Select the information you'd like to include in your report:`;

const ReportPreviewCreator = ({
  openModal,
  handleCreateReport,
  cleanModal,
}: any) => {
  const rcRef = useRef();
  const [rcTreatedInputs, setRcTreatedInputs] = useState(new Set());
  const [childArr, setChildArr] = useState<DomParent>();
  const [choiceInputs, setChoiceInputs] = useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false,
    input5: false,
  });

  useEffect(() => {
    setRcTreatedInputs(new Set());
    setChildArr(rcRef.current);
    setChoiceInputs({
      input1: false,
      input2: false,
      input3: false,
      input4: false,
      input5: false,
    });
  }, [cleanModal]);

  const state = useAppSelector((s) => s);
  const practiceId: any = state?.practiceSlice?.selectedSpecficPractice;
  let stateCode = state?.practiceSlice?.searchInput?.state_county_code;
  if (!stateCode) stateCode = state?.stateSlice?.stateCode;
  if (!stateCode) stateCode = '00';
  if (stateCode.length > 2) stateCode = stateCode.slice(0, 2);

  let stateName = state?.practiceSlice?.searchInfo.state;
  if (!stateName) stateName = state?.stateSlice?.stateNameDisplay;
  if (!stateName) stateName = 'U.S.';

  const initialFilter = {
    stateCode,
    practiceId,
  };

  const { data } = useGetRelatedResourceConcernCategoryQuery(initialFilter);
  const reportPreviewData = useGetNationalOverviewByPracticeQuery(practiceId);

  const getRCTreatedComponent = (selectedIds) => {
    setChildArr(rcRef.current);
    if (!childArr) return;

    childArr.children.forEach((child) => {
      const categoryId: number = +child.textContent.charAt(0);
      child.className = selectedIds.has(categoryId) // eslint-disable-line no-param-reassign
        ? 'accordion-container'
        : 'hidden-content';
    });
  };

  const handleGeneratePdf = () => {
    const element = document.getElementById('preview-content');
    const opt = {
      margin: 0.2,
      filename: `Practice Report.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <Modal isOpen={openModal}>
      <ModalBody>
        <div className='creator-container'>
          <div className='report-header'>
            <div className='create-report-title'>Create a Custom Report</div>
            <button
              className='close-btn'
              onClick={() => handleCreateReport()}
              type='button'
            >
              <img src={closebtn} alt='close button' />
            </button>
          </div>
          <div className='create-report-subtitle'>{subTitle}</div>
          <div className='horz-line'>
            <hr />
          </div>
          <div className='report-container'>
            <ReportBuilder
              swapaData={data}
              choiceInputs={choiceInputs}
              setChoiceInputs={setChoiceInputs}
              rcTreatedInputs={rcTreatedInputs}
              setRcTreatedInput={setRcTreatedInputs}
              getRCTreatedComponent={getRCTreatedComponent}
              reportPreviewData={reportPreviewData.data}
              handleGeneratePdf={handleGeneratePdf}
            />
            <div className='preview-container'>
              <ReportPreview
                selectedStateName={stateName}
                selectedStateCode={stateCode}
                choiceInputs={choiceInputs}
                rcTreatedInputs={rcTreatedInputs}
                reportPreviewData={reportPreviewData}
                practiceId={practiceId}
                rcRef={rcRef}
                // content={content}
              />
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ReportPreviewCreator;
