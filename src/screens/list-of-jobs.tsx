import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useGetJobsByGeolocationQuery } from '../redux/services/jobs';
import { JobsResponse } from '../redux/services/types';

export default function ListOfJobsScreen() {
  const {
    data: listOfJobs,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetJobsByGeolocationQuery({
    longitude: 0,
    latitude: 0,
  });
  console.log(listOfJobs?.data);
  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
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
          renderItem={({
            item: {
              address,
              bonusPriceWorker,
              companyName,
              coordinates: { longitude, latitude },
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
              <Text>{dateStartByCity}</Text>
              <Text>{isPromotionEnabled}</Text>
              <Image source={{ uri: logo }} width={50} height={50} />
              <Text>{planWorkers}</Text>
              <Text>{priceWorker}</Text>
              <Text>{timeEndByCity}</Text>
              <Text>{timeStartByCity}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
