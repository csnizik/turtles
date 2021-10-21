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
  IRCRequestBody,
  IAssociatedPracticeList,
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
    //! Resource Concern depending on SWAPA category
    getResourceConcern: builder.query<IResourceConcernList[], string>({
      query: (swapaCategory) =>
        `/resourceConcern/concern/category/${swapaCategory}`,
    }),
    //!Post request for Search
    postSearchData: builder.query<ISearchData[], ISearchData>({
      query: (data) => ({
        url: '/practiceSearch',
        method: 'POST',
        body: data,
      }),
    }),
    getPracticeVideoLink: builder.query<IPracticeVideo[], void>({
      query: (practiceId) => `/video/${practiceId}`,
    }),
    getRelatedResourceConcernCategory: builder.query<
      IRCCategory,
      IRCRequestBody
    >({
      query: (data) =>
        `/relatedResourceConcernCategory?stateCode=${data.stateCode}&practiceId=${data.practiceId}`,
    }),
    // ! Associated Practices depending on State Code and Practice Id
    getAssociatedPractice: builder.query<
      IAssociatedPracticeList[],
      IRCRequestBody
    >({
      query: (data) =>
        `/practice/associatedPractice?state_code=${data.stateCode}&practice_id=${data.practiceId}`,
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetResourceConcernQuery,
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
  usePostSearchDataQuery,
  useGetNationalOverviewByPracticeQuery,
  useGetCountyListQuery,
  useGetStateListQuery,
  useGetLandUseOptionsQuery,
  useGetPracticeVideoLinkQuery,
  useGetRelatedResourceConcernCategoryQuery,
  useGetAssociatedPracticeQuery,
} = api;
