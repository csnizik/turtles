import {
    cleanup,
    render,
    screen,
} from '../../common/test-utils/test_utils';
import CPPEScoreLegend from './CPPEScoreLegend';
afterEach(() => {
    cleanup();
});
const numbers = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
const description = ["Substantial Improvement", "Moderate Improvement", "Slight Improvement", "Slight Worsening", "Moderate Worsening", "Substantial Worsening"];
const title = "Conservation Practices Ranked by Physical Effects (CPPE) | NRCS";
const disclaimerDescription = "This page provides a screening tool to view the effectiveness of conservation practices in treating the specific resource concern at a national level. The positive CPPE score does not ensure treatment of resource concernsand may conflict with other resource concerns. Please contact your local NRCS conservation planners for professional assistance.";
describe('Verify CPPEScoreLegend is rendered correctly', () => {
    beforeEach(() => {
      render(
        <CPPEScoreLegend
          selectednumbers={numbers}
          selecteddescription={description}
        />
      );
    });   
    test('Verify CPPEScoreLegend component', async () => {
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(disclaimerDescription)).toBeInTheDocument();
      });
});
  