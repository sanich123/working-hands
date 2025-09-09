import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text,
} from 'react-native-paper';
import JobCard from '../components/job-card';
import useGetJobs from '../hooks/use-get-jobs';

export default function ListOfJobsScreen() {
  const {
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
  } = useGetJobs();

  return (
    <SafeAreaView
      edges={Platform.OS !== 'android' ? [] : ['bottom']}
      style={[{ flex: 1 }, (isLoading || isError) && styles.centered]}
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
              <Text
                style={{ textAlign: 'center' }}
              >{`По координатам ${longitude}, ${latitude} нет доступного перечня работ`}</Text>
              <Button
                onPress={() => {
                  setLongitude(0);
                  setLatitude(0);
                }}
              >
                Показать все вакансии
              </Button>
            </View>
          }
          renderItem={({ item }) => <JobCard jobInfo={item} />}
          keyExtractor={({ id }) => id}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
