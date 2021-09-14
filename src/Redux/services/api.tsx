import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../common/util/AxiosUtil';
import {
  IPractice,
  IResourceConcernList,
  ICountyList,
  IStateDropdownOption,
  ILandUseOption,
  IPracticeCategory,
  ISearchData,
  IPracticeVideo,
  IConservationPractice,
  IRCCategory,
} from '../../common/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    //! Resource Concern Get the SWAPA data
    getResources: builder.query<IResourceConcernList[], void>({
      query: () => '/resourceConcern/concern',
    }),
    getNationalOverviewByPractice: builder.query<IConservationPractice, void>({
      query: (practiceId) => `/nationalPracticeOverview/${practiceId}`,
    }),

    getStateList: builder.query<IStateDropdownOption[], void>({
      query: () => `/states`,
    }),
    getCountyList: builder.query<ICountyList[], string>({
      query: (stateCode) => `/counties/${stateCode}`,
    }),
    //! Get the Land Use
    getLandUseOptions: builder.query<ILandUseOption[], void>({
      query: () => '/categories',
    }),
    //! Practice Category
    getPracticeCategory: builder.query<IPracticeCategory[], void>({
      query: () => '/practice/categories',
    }),
    //! Practice depending on Category
    getPractice: builder.query<IPractice[], number>({
      query: (id) => `/practice/catagories/practices?id=${id}`,
    }),
    //!Post request for Search
    postSearchData: builder.query<ISearchData[], ISearchData>({
      query: (data) => ({
        url: '/stored_procedures/search',
        method: 'POST',
        body: data,
      }),
    }),
    getPracticeVideoLink: builder.query<IPracticeVideo[], void>({
      query: (practiceId) => `/video/${practiceId}`,
    }),
    getRelatedResourceConcernCategory: builder.query<IRCCategory, IRCCategory>({
      query: (data) => `/relatedResourceConcernCategory?stateCode='${data.stateCode}'&practiceId=${data.practiceId}`,
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
  usePostSearchDataQuery,
  useGetNationalOverviewByPracticeQuery,
  useGetCountyListQuery,
  useGetStateListQuery,
  useGetLandUseOptionsQuery,
  useGetPracticeVideoLinkQuery,
  useGetRelatedResourceConcernCategoryQuery,
} = api;
