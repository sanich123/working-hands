import { useEffect, useState } from 'react';
import { useGetJobsByGeolocationQuery } from '../redux/services/jobs';
import { checkLocationPermission } from '../utils/request-permission';
import { getGeopositionCoordinates } from '../utils/request-location';

export default function useGetJobs() {
  const [isReadyToRequestGeoposition, setIsReadyToRequestGeoposition] =
    useState(false);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const {
    data: listOfJobs,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetJobsByGeolocationQuery({
    longitude,
    latitude,
  });

  useEffect(() => {
    checkLocationPermission({ setIsReadyToRequestGeoposition });
  }, []);

  useEffect(() => {
    if (isReadyToRequestGeoposition) {
      getGeopositionCoordinates({ setLongitude, setLatitude });
    }
  }, [isReadyToRequestGeoposition]);

  return {
    listOfJobs,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch,
    longitude,
    latitude,
    setLongitude,
    setLatitude,
  };
}
