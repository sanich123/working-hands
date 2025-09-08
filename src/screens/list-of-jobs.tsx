import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ListOfJobsScreen() {
  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <View>
        <Text>Здесь будет список работ</Text>
      </View>
    </SafeAreaView>
  );
}
