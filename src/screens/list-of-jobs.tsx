import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useGetJobsByGeolocationQuery } from '../redux/services/jobs';
import { JobsResponse } from '../redux/services/types';
import { useEffect, useState } from 'react';

import GetLocation from 'react-native-get-location';
import { checkLocationPermission } from '../utils/request-permission';

export default function ListOfJobsScreen() {
  const [premissionRequest, setPermissionRequest] = useState('');
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
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        if (location) {
          setLongitude(location?.longitude);
          setLatitude(location?.latitude);
        }
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });

    checkLocationPermission();
  }, [premissionRequest]);

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
          contentContainerStyle={
            (isLoading || isError) && {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <Text>{`По координатам ${longitude}, ${latitude} нет доступного перечня работ`}</Text>
            </View>
          }
          renderItem={({
            item: {
              address,
              bonusPriceWorker,
              companyName,
              currentWorkers,
              customerFeedbacksCount,
              customerRating,
              dateStartByCity,
              id,
              isPromotionEnabled,
              logo,
              planWorkers,
              priceWorker,
              timeEndByCity,
              timeStartByCity,
            },
          }: {
            item: JobsResponse;
          }) => (
            <View key={id}>
              <Text>{address}</Text>
              <Text>{bonusPriceWorker}</Text>
              <Text>{companyName}</Text>
              <Text>{longitude}</Text>
              <Text>{latitude}</Text>
              <Text>{currentWorkers}</Text>
              <Text>{customerFeedbacksCount}</Text>
              <Text>{customerRating}</Text>
              <Text>{!!isPromotionEnabled}</Text>
              <Image source={{ uri: logo }} width={50} height={50} />
              <Text>{planWorkers}</Text>
              <Text>{priceWorker}</Text>
              <Text>{dateStartByCity}</Text>
              <Text>{timeEndByCity}</Text>
              <Text>{timeStartByCity}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
