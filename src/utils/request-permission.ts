import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';


export async function requestLocationPermission({
  setIsReadyToRequestGeoposition,
}: {
  setIsReadyToRequestGeoposition: (value: boolean) => void;
}) {
  try {
    if (Platform.OS === 'ios') {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (status === RESULTS.GRANTED) {
        setIsReadyToRequestGeoposition(true);
      }
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        setIsReadyToRequestGeoposition(true);
      }
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text2:
        'Во время получения информации о наличии разрешения на геолокацию произошла ошибка',
    });
  }
}

export async function checkLocationPermission({
  setIsReadyToRequestGeoposition,
}: {
  setIsReadyToRequestGeoposition: (value: boolean) => void;
}) {
  try {
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
        Alert.alert(
          'Доступ к геопозиции',
          'Для корректного отображения перечня доступных работ приложению необходим доступ к геопозиции устройства. Пожалуйста, разрешите приложению доступ к геолокации',
          [
            {
              text: 'Отменить',
              style: 'cancel',
            },
            {
              text: 'Разрешить доступ к геолокации',
              onPress: async () =>
                await requestLocationPermission({
                  setIsReadyToRequestGeoposition,
                }),
            },
          ],
        );
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
  } catch (error) {
    Toast.show({
      type: 'error',
      text2:
        'Во время получения информации о наличии разрешения на геолокацию произошла ошибка',
    });
  }
}
