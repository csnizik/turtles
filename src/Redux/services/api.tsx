import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../common/util/AxiosUtil';
import {
  IConservationPractice,
  IResourceConcernList,
  ICountyList,
} from '../../common/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getResources: builder.query<IResourceConcernList[], void>({
      query: () => '/resourceConcern/concern',
    }),
    getPractices: builder.query<IConservationPractice[], void>({
      query: () => '/nationalOverviews/all',
    }),
    getCountyList: builder.query<ICountyList[], string>({
      query: (stateCode) => `/counties/${stateCode}`,
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetPracticesQuery,
  useGetCountyListQuery,
} = api;
