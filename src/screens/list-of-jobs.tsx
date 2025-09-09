import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useGetJobsByGeolocationQuery } from '../redux/services/jobs';
import { useEffect, useState } from 'react';
import { checkLocationPermission } from '../utils/request-permission';
import JobCard from '../components/job-card';
import { getGeopositionCoordinates } from '../utils/request-location';

export default function ListOfJobsScreen() {
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

  return (
    <SafeAreaView
      edges={[]}
      style={[
        { flex: 1 },
        (isLoading || isError) && {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      {isLoading && <ActivityIndicator size="large" />}
      {isError && (
        <>
          <Text>{`Произошла ошибка ${JSON.stringify(error)}`}</Text>
          <Button onPress={refetch}>
            <Text>Перезагрузить страницу</Text>
          </Button>
        </>
      )}
      {isSuccess && (
        <FlatList
          data={listOfJobs?.data}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <Text>{`По координатам ${longitude}, ${latitude} нет доступного перечня работ`}</Text>
            </View>
          }
          contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
          renderItem={({ item }) => <JobCard jobInfo={item} />}
          keyExtractor={({ id }) => id}
        />
      )}
    </SafeAreaView>
  );
}
