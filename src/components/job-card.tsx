import { Image, View } from 'react-native';
import { JobsResponse } from '../redux/services/types';
import { Text } from 'react-native-paper';

export default function JobCard({ jobInfo }: { jobInfo: JobsResponse }) {
  const {
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
  } = jobInfo;
  return (
    <View key={id}>
      <Text>{address}</Text>
      <Text>{bonusPriceWorker}</Text>
      <Text>{companyName}</Text>
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
  );
}
