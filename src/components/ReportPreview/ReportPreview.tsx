import html2pdf from 'html2pdf.js';
import './report-preview.scss';
import { useEffect, useRef, useState } from 'react';
import ConservationPracticeOverview from '../ConservationPracticeOverview';
import ImplementationExtent from '../ImplementationExtent';
import SpecificationsAndTools from '../SpecificationsAndTools';
import ResourceConcernTreated from '../ResourceConcernTreated';
import ProjectsAndInitiatives from '../ProjectsAndInitiatives';
import ApplicationImpacts from '../ApplicationImpacts';
import ConservationPracticeVideo from '../ConservationPracticeVideo';

const ReportPreview = ({
  selectedStateName,
  selectedStateCode,
  choiceInputs,
  reportPreviewData,
  practiceId,
  rcRef,
  rcTreatedInputs,
}: any) => {
  const { data, error, isLoading, isSuccess, isError } = reportPreviewData;
  const [pdfUrl, setPdfUrl] = useState(null);
  const mountedRef = useRef(true);

  const contentToRender = () => {
    return (
      <div id='preview-content'>
        <h3 id='preview-content-header'>
          {data?.practiceName} in{' '}
          {selectedStateName === 'U.S.' ? 'the U.S.' : selectedStateName}
        </h3>
        {choiceInputs.input1 && (
          <div>
            <ConservationPracticeOverview
              data={data}
              error={error}
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isLoading}
            />
            <ConservationPracticeVideo selectedPracticeId={practiceId} />
          </div>
        )}
        <div className={rcTreatedInputs.size < 1 ? 'hidden-content' : ''}>
          <ResourceConcernTreated
            selectedStateCode={selectedStateCode}
            selectedPracticeId={practiceId}
            rcRef={rcRef}
          />
        </div>
        {choiceInputs.input2 && (
          <ImplementationExtent data={data} isSuccess={isSuccess} />
        )}
        {choiceInputs.input3 && (
          <SpecificationsAndTools
            selectedStateCode={selectedStateCode}
            selectedPracticeId={practiceId}
            data={data}
            isSuccess={isSuccess}
          />
        )}
        {choiceInputs.input4 && (
          <ApplicationImpacts data={data} isSuccess={isSuccess} />
        )}
        {/* {choiceInputs.input5 && (
          <ProjectsAndInitiatives
            data={data}
            isSuccess={isSuccess}
            setProjectsInitiativesData={() => {}}
          />
        )} */}
      </div>
    );
  };

  const makePDF = () => {
    const element = document.getElementById('preview-content');
    const opt = {
      margin: 0.2,
      filename: `Practice Report.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] },
    };

    html2pdf()
      .from(element)
      .to('pdf')
      .set(opt)
      .output('datauristring')
      .then((result) => {
        if (!mountedRef.current) return null;
        setPdfUrl(result);
        return null;
      });
  };

  useEffect(() => {
    mountedRef.current = true;
    makePDF();
    return () => {
      mountedRef.current = false;
    };
  }, [choiceInputs, rcTreatedInputs]);

  return (
    <div className='pdf-preview'>
      <h3>Preview</h3>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className='content-container'
          title='Embedded PDF'
        />
      )}
      <div className='hidden-content'>{contentToRender()}</div>
    </div>
  );
};

export default ReportPreview;
