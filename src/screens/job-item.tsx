import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export default function JobItem({
  route: {
    params: {},
  },
}: NativeStackScreenProps<RootStackParamList, 'JobItem'>) {
  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <View>
        <Text>Здесь будет страница отдельной работы</Text>
      </View>
    </SafeAreaView>
  );
}
