import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import JobItem from './src/screens/job-item';
import ListOfJobs from './src/screens/list-of-jobs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ListOfJobs: undefined;
  JobItem: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListOfJobs">
          <Stack.Screen
            name="ListOfJobs"
            component={ListOfJobs}
            options={{ title: 'Перечень работ' }}
          />
          <Stack.Screen
            name="JobItem"
            component={JobItem}
            options={{ title: 'Отдельная работа' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaProvider>
  );
}
