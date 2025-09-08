import { apiSlice } from '../api';
import { GeolocationParams, JobsByGeolocationPresponse } from './types';

export const jobsByGeolocation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: ({ query }) => ({
    getJobsByGeolocation: query<JobsByGeolocationPresponse, GeolocationParams>({
      query: ({ latitude, longitude }) => ({
        url: `shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
      }),
    }),
  }),
});

export const { useGetJobsByGeolocationQuery } = jobsByGeolocation;
