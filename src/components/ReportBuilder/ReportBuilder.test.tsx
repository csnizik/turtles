import ReportBuilder from './ReportBuilder';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('ReportBuilder is rendered correctly', () => {
  beforeEach(() => {
    const swapaData = {
      result: [{ rcCategoryName: 'Air' }, { rcCategoryName: 'Water' }],
    };
    // const handleChoiceInput = () => {};
    const reportPreviewData = {};
    const choiceInputs = {
      input1: false,
      input2: false,
      input3: false,
      input4: false,
      input5: false,
    };
    const setChoiceInputs = () => {};
    const rcTreatedInputs = new Set([1, 2]);
    const setRcTreatedInput = () => {};
    const getRCTreatedComponent = () => {};
    const handleGeneratePdf = () => {};
    render(
      <ReportBuilder
        swapaData={swapaData}
        // handleChoiceInput={handleChoiceInput}
        reportPreviewData={reportPreviewData}
        choiceInputs={choiceInputs}
        setChoiceInputs={setChoiceInputs}
        rcTreatedInputs={rcTreatedInputs}
        setRcTreatedInput={setRcTreatedInput}
        getRCTreatedComponent={getRCTreatedComponent}
        handleGeneratePdf={handleGeneratePdf}
      />
    );
  });
  test('Should display the contents of ReportBuilder', () => {
    expect(screen.queryByTestId('builder')).toBeDefined();
  });
  test('Should display the SWAPA resources in the data plus "All"', () => {
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Air')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
  });
});
