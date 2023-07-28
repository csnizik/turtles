import {
    cleanup,
    render,
    screen,
  } from '../../common/test-utils/test_utils';
import CPPESCoreView from './CPPEScoreColumnView';  
  afterEach(() => {
    cleanup();
  });

  describe('Verify CPPEScore is rendered correctly', () => {
    beforeEach(() => {
      render(
        <CPPESCoreView/>
      );
    });
  
    test('Verify CPPEScoreEntry component', async () => {
      expect(screen.getByText('Sort By:')).toBeInTheDocument();
      expect(screen.getByText('Conservation Practice(s)')).toBeInTheDocument();
      expect(screen.getByText('Filter by CPPE')).toBeInTheDocument();
      expect(screen.getByText('Filter by practice category')).toBeInTheDocument();
      expect(screen.getByText('Apply')).toBeInTheDocument();
    });

  });
  