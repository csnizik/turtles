import ConservationPracticeOverview from '../ConservationPracticeOverview';
import ImplementationExtent from '../ImplementationExtent';
import SpecificationsAndTools from '../SpecificationsAndTools';
import ResourceConcernTreated from '../ResourceConcernTreated';
import ProjectsAndInitiatives from '../ProjectsAndInitiatives';
import ApplicationImpacts from '../ApplicationImpacts';
import './report-preview.scss';
import ConservationPracticeVideo from '../ConservationPracticeVideo';

const ReportPreview = ({
  selectedStateCode,
  choiceInputs,
  reportPreviewData,
  practiceId,
  rcRef,
  rcTreatedInputs,
}: any) => {
  const { data, error, isLoading, isSuccess, isError } = reportPreviewData;
  return (
    <div className='pdf-preview'>
      <h3>Preview</h3>
      <div className='content-container' id='pdf-report-content'>
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
        <div className= {rcTreatedInputs.size<1 ? 'hidden-content' : ''}>
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
          <SpecificationsAndTools data={data} isSuccess={isSuccess} />
        )}
        {choiceInputs.input4 && (
          <ApplicationImpacts data={data} isSuccess={isSuccess} />
        )}
        {choiceInputs.input5 && (
          <ProjectsAndInitiatives data={data} isSuccess={isSuccess} />
        )}
      </div>
    </div>
  );
};

export default ReportPreview;
