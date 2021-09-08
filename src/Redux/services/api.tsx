import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../common/util/AxiosUtil';
import {
  IPractice,
  IAllConservationPractice,
  IResourceConcernList,
  ICountyList,
  IStateDropdownOption,
  ILandUseOption,
  IPracticeCategory,
  ISearchData,
} from '../../common/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    //! Resource Concern Get the SWAPA data
    getResources: builder.query<IResourceConcernList[], void>({
      query: () => '/resourceConcern/concern',
    }),
    getAllPractices: builder.query<IAllConservationPractice[], void>({
      query: () => '/nationalOverviews/all',
    }),
    // getNationalPractices: builder.query<IPractice[], void>({
    //   query: () => '/stored_procedures/search',
    // }),
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
    postSearchData: builder.query<ISearchData[], object>({
      query: (data) => ({
        url: '/stored_procedures/search',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetAllPracticesQuery,
  // useGetNationalPracticesQuery,
  useGetCountyListQuery,
  useGetStateListQuery,
  useGetLandUseOptionsQuery,
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
  usePostSearchDataQuery,
} = api;
