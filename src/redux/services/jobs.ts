import { apiSlice } from '../api';
import { GeolocationParams, JobsByGeolocationPresponse } from './types';

export const jobsByGeolocation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: ({ query }) => ({
    getJobsByGeolocation: query<JobsByGeolocationPresponse, GeolocationParams>({
      query: ({ latitude, longitude }) => ({
        url: `shifts/map-list-unauthorized?latitude=45.039268&longitude=38.987221`,
      }),
    }),
  }),
});

export const { useGetJobsByGeolocationQuery } = jobsByGeolocation;
