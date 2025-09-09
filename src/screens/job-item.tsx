import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigation';
import { useCallback } from 'react';
import { getEndingOfWord } from '../utils/utils';

export default function JobItem({
  route: {
    params: {
      address,
      companyName,
      currentWorkers,
      customerFeedbacksCount,
      dateStartByCity,
      logo,
      planWorkers,
      priceWorker,
      timeEndByCity,
      timeStartByCity,
    },
  },
}: NativeStackScreenProps<RootStackParamList, 'JobItem'>) {
  const image = useCallback(
    () => <Image source={{ uri: logo }} width={40} height={40} />,
    [logo],
  );
  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <View>
        <Card.Title
          title={`${companyName} ${
            customerFeedbacksCount ? `${customerFeedbacksCount}` : ''
          }`}
          subtitle={address}
          left={image}
        />
        <Card.Content>
          <Text variant="titleLarge" style={{ textAlign: 'center' }}>{`Нуж${
            planWorkers === 1 ? 'ен' : 'ны'
          } ${planWorkers} работник${getEndingOfWord(planWorkers)} ${
            currentWorkers
              ? `(уже есть ${currentWorkers} работник${getEndingOfWord(
                  currentWorkers,
                )})`
              : ''
          }`}</Text>
          <Text variant="bodyMedium">{`Оплата ${priceWorker} р.`}</Text>
          <Text variant="bodyMedium">{`Дата ${dateStartByCity}`}</Text>
          <Text variant="bodyMedium">{`Начало смены ${timeStartByCity}`}</Text>
          <Text variant="bodyMedium">{`Конец смены ${timeEndByCity}`}</Text>
          <Text variant="bodyMedium">{`Оплата ${priceWorker} р.`}</Text>
        </Card.Content>
      </View>
    </SafeAreaView>
  );
}
