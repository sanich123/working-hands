import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';

export async function handleDeniedPermissionModal() {
  Alert.alert(
    'Доступ к геопозиции',
    'Для корректного отображения перечня доступных работ приложению необходим доступ к геолокации устройства. Пожалуйста, разрешите приложению доступ к геолокации',
    [
      {
        text: 'Отменить',
        style: 'cancel',
      },
      {
        text: 'Разрешить доступ к геолокации',
        onPress: async () => await requestLocationPermission(),
      },
    ],
  );
}

export async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (status !== RESULTS.GRANTED) {
      await handleDeniedPermissionModal();
    }
  } else if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      await handleDeniedPermissionModal();
    }
  }
}

export async function checkLocationPermission() {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const result = await check(permission);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      Toast.show({
        type: 'error',
        text2: 'Возможно, геопозиция недоступна на этом устройстве',
      });
      break;
    case RESULTS.DENIED:
      handleDeniedPermissionModal();
      break;
    case RESULTS.GRANTED:
      break;
    case RESULTS.BLOCKED:
      Toast.show({
        type: 'error',
        text2: 'Запросы геолокации заблокированы на данном устройстве',
      });
      break;
  }
}
