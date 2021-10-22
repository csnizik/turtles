import ReportPreviewCreator from './ReportPreviewCreator';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('ReportPreviewCreator is rendered correctly', () => {
  const selectedStateCode = {
    stateCode: '00',
  };
  const openModal = true;
  const handleCreateReport = () => {};
  const cleanModal = false;
  beforeEach(() => {
    render(
      <ReportPreviewCreator
        selectedStateCode={selectedStateCode}
        openModal={openModal}
        handleCreateReport={handleCreateReport}
        cleanModal={cleanModal}
      />
    );
  });
  test('Should display the contents of ReportPreviewCreator', () => {
    expect(screen.queryByTestId('report-builder')).toBeDefined();
  });
  test('Should display the contents of ReportPreviewCreator - ReportBuilder', () => {
    expect(screen.queryByTestId('report-builder')).toBeDefined();
  });
  test('Should display the contents of ReportPreviewCreator - ReportPreview', () => {
    expect(screen.queryByTestId('report-preview')).toBeDefined();
  });
});
