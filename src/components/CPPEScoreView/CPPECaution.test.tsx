import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import {
    cleanup,
    render,
} from '../../common/test-utils/test_utils';
import CPPECaution from './CPPECaution';
import { useGetNegativeCPPEPracticeQuery } from '../../Redux/services/api';
import { ICPPEPractice } from '../../common/types';

const updateTimeout = 50000;

jest.mock('../../Redux/services/api'); // Mock the API call

beforeEach((): void => {
  fetchMock.resetMocks();
  fetchMock.doMock();
});

afterEach(() => {
    cleanup();
});

  describe('Verify CPPECautionEntry is rendered correctly', () => {
    beforeEach(() => {
      render(
        <CPPECaution practiceCode = '326'/>
      )
    });

    test('renders component with fetched data', async () => {
      // Mock the data returned from the API call
      const mockPracticeResponse: ICPPEPractice = {
        // Create mock practice object that matches the expected type
        resourceConcernId: 160,
        practiceCode: '326',
        resourceConcernName: 'Sediment transported to surface water',
        resourceConcernDescription: 'Offsite transport of sediment to surface water degrades water quality and limits use for intended purpsoes',
        practiceName: 'Clearing and Snagging',
        cppeEffectValue: -2,
        rationale: 'Removal of snags or large wood may re-suspend sediments into the stream.'
      }

      
      fetchMock.mockResponse(JSON.stringify(mockPracticeResponse));
      const { result, waitForNextUpdate } = renderHook(
        () => useGetNegativeCPPEPracticeQuery('326')
      );
      await waitForNextUpdate({ timeout: updateTimeout });

      expect(result.current.endpointName).toBe('getResources');
  });
});