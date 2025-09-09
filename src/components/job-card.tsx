import { Image, useWindowDimensions } from 'react-native';
import { JobsResponse } from '../redux/services/types';
import { Card, Text } from 'react-native-paper';
import { getEndingOfWord } from '../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export default function JobCard({ jobInfo }: { jobInfo: JobsResponse }) {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const {
    address,
    companyName,
    customerFeedbacksCount,
    logo,
    planWorkers,
    priceWorker,
  } = jobInfo;

  const image = useCallback(
    () => <Image source={{ uri: logo }} width={40} height={40} />,
    [logo],
  );

  return (
    <Card contentStyle={{ width }} onPress={() => navigate('JobItem', jobInfo)}>
      <Card.Title
        title={`${companyName} ${
          customerFeedbacksCount ? `${customerFeedbacksCount}` : ''
        }`}
        subtitle={address}
        left={image}
      />
      <Card.Content>
        <Text variant="titleLarge">{`Нуж${
          planWorkers === 1 ? 'ен' : 'ны'
        } ${planWorkers} работник${getEndingOfWord(planWorkers)}`}</Text>
        <Text variant="bodyMedium">{`Оплата ${priceWorker} р.`}</Text>
      </Card.Content>
    </Card>
  );
}
