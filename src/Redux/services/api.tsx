import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../common/util/AxiosUtil';
import {
  IAccordion,
  IConservationPractice,
  IResourceConcernList,
  ICountyList,
  IStateDropdownOption,
  ILandUseOption,
  IPracticeVideo,
} from '../../common/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getResources: builder.query<IResourceConcernList[], void>({
      query: () => '/resourceConcern/concern',
    }),
    getNationalOverviewByPractice: builder.query<IConservationPractice, void>({
      query: (practiceId) => `/nationalPracticeOverview/${practiceId}`,
    }),
    getNationalPractices: builder.query<IAccordion[], void>({
      query: () => '/stored_procedures/search',
    }),
    getStateList: builder.query<IStateDropdownOption[], void>({
      query: () => `/states`,
    }),
    getCountyList: builder.query<ICountyList[], string>({
      query: (stateCode) => `/counties/${stateCode}`,
    }),
    getLandUseOptions: builder.query<ILandUseOption[], void>({
      query: () => '/categories',
    }),
    getPracticeVideoLink: builder.query<IPracticeVideo[], void>({
      query: (practiceId) => `/video/${practiceId}`,
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetNationalOverviewByPracticeQuery,
  useGetNationalPracticesQuery,
  useGetCountyListQuery,
  useGetStateListQuery,
  useGetLandUseOptionsQuery,
  useGetPracticeVideoLinkQuery,
} = api;
