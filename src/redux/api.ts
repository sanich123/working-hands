import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'splitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mobile.handswork.pro/api/',
    timeout: 35000,
  }),
  endpoints: () => ({}),
});
