import html2pdf from 'html2pdf.js';
import './report-preview.scss';
import { useEffect, useRef, useState } from 'react';
import { map } from 'esri/widgets/TableList/TableListViewModel';
import ConservationPracticeOverview from '../ConservationPracticeOverview';
import ImplementationExtent from '../ImplementationExtent';
import SpecificationsAndTools from '../SpecificationsAndTools';
import ResourceConcernTreated from '../ResourceConcernTreated';
import ProjectsAndInitiatives from '../ProjectsAndInitiatives';
import ProjectListItem from '../ProjectListGroup/ProjectListItem';
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
  selectedProjInitData,
}: any) => {
  const { data, error, isLoading, isSuccess, isError } = reportPreviewData;
  const [pdfUrl, setPdfUrl] = useState(null);
  const mountedRef = useRef(true);

  const renderProjInit = (projInit) => {
    console.log('renderProjInit: ', projInit);
    const projInitList = projInit.data.map((item, index) => {
      let identifyer = projInit.title.includes('Landscape')
        ? 'initiative'
        : 'project';
      return (
        <div key={`${identifyer}${index}`}>
          <ProjectListItem
            id={item?.[`${identifyer}Id`]}
            description={item?.[`${identifyer}Description`]}
            title={item?.[`${identifyer}Title`]}
            owner={item?.[`${identifyer}Owner`]}
            statesInvolved={item?.statesInvolved}
            year={item?.awardeeYear}
          />
        </div>
      );
    });
    return (
      <>
        <div>{projInit.title}</div>
        {projInitList}
      </>
    );
  };
  const renderProjInits = (projInit) => {
    console.log('renderProjInits: ', projInit);
    let total = projInit.map((pItem) => {
      return renderProjInit(pItem);
    });
    return total;
  };
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
        {selectedProjInitData.length > 0
          ? renderProjInits(selectedProjInitData)
          : null}
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
  }, [choiceInputs, rcTreatedInputs, selectedProjInitData]);

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
