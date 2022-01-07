import fetchMock from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import {
  useGetAssociatedPracticeQuery,
  useGetResourcesQuery,
  useGetNationalOverviewByPracticeQuery,
  useGetStateListQuery,
  useGetCountyListQuery,
  useGetLandUseOptionsQuery,
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
  useGetPaymentScheduleLinksQuery,
  useGetResourceConcernQuery,
  useGetPracticeVideoLinkQuery,
  useGetRelatedResourceConcernCategoryQuery,
} from '../../Redux/services/api';
import { createTestStore } from '../../Redux/store';
import {
  mockedAssociatedPracticeResponse,
  mockedPaymentScheduleResponse,
  mockedNationalOverviewResponse,
  mockedPracticeVideoResponse,
  mockedResourcesResponse,
  mockedStateResponse,
  mockedCountyResponse,
  mockedSwapaCategoryResponse,
} from './mockedResponses';
import { Provider } from 'react-redux';

const updateTimeout = 5000;

beforeEach((): void => {
  fetchMock.resetMocks();
  fetchMock.doMock();
});

const wrapper: React.FC = ({ children }) => {
  const storeRef = createTestStore();
  return <Provider store={storeRef}>{children}</Provider>;
};

describe('Verify redux services are working properly', () => {
  test('useGetResourcesQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedResourcesResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetResourcesQuery(),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getResources');
  });

  test('useGetNationalOverviewByPracticeQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedNationalOverviewResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetNationalOverviewByPracticeQuery(2),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getNationalOverviewByPractice');
  });

  test('useGetStateListQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedStateResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetStateListQuery(),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getStateList');
  });

  test('getCountyListQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedCountyResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetCountyListQuery('08'),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getCountyList');
  });

  test('getLandUseOptionsQuery', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetLandUseOptionsQuery(),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getLandUseOptions');
  });

  test('getPracticeCategoryQuery', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetPracticeCategoryQuery(),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getPracticeCategory');
  });

  test('getPracticeQuery', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetPracticeQuery(2),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getPractice');
  });

  test('useGetStateListQueryQuery', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetStateListQuery(),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getStateList');
  });

  test('getPaymentScheduleLinksQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedPaymentScheduleResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetPaymentScheduleLinksQuery('08'),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getPaymentScheduleLinks');
  });

  test('getAssociatedPracticeQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedAssociatedPracticeResponse));
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useGetAssociatedPracticeQuery({
          stateCode: '08',
          practiceId: 2,
        }),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getAssociatedPractice');
  });

  test('getRelatedResourceConcernCategoryQuery', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useGetRelatedResourceConcernCategoryQuery({
          stateCode: '08',
          practiceId: 2,
        }),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe(
      'getRelatedResourceConcernCategory'
    );
  });

  test('getPracticeVideoLinkQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedPracticeVideoResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetPracticeVideoLinkQuery(2),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getPracticeVideoLink');
  });

  test('getResourceConcernQuery', async () => {
    fetchMock.mockResponse(JSON.stringify(mockedSwapaCategoryResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetResourceConcernQuery('2'),
      { wrapper }
    );
    await waitForNextUpdate({ timeout: updateTimeout });

    expect(result.current.endpointName).toBe('getResourceConcern');
  });
});
