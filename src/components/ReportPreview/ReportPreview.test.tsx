import ReportPreview from './ReportPreview';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('ReportPreview is rendered correctly', () => {
  const selectedStateCode = { stateCode: '00' };
  const choiceInputs = { input1: false, input2: true };
  const reportPreviewData = {};
  const practiceId = 10;
  const rcRef = {};
  const rcTreatedInputs = new Set([1, 2]);

  beforeEach(() => {
    render(
      <ReportPreview
        selectedStateCode={selectedStateCode}
        choiceInputs={choiceInputs}
        reportPreviewData={reportPreviewData}
        practiceId={practiceId}
        rcRef={rcRef}
        rcTreatedInputs={rcTreatedInputs}
      />
    );
  });
  test('Should display the contents of ReportPreview', () => {
    expect(screen.queryByTestId('preview')).toBeDefined();
  });
});
