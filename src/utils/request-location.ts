import GetLocation from 'react-native-get-location';
import Toast from 'react-native-toast-message';

export async function getGeopositionCoordinates({
  setLongitude,
  setLatitude,
}: {
  setLongitude: (longitude: number) => void;
  setLatitude: (latitude: number) => void;
}) {
  try {
    const currentPosition = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });
    if (currentPosition) {
      Toast.show({
        type: 'success',
        text2: `Координаты геопозиции получены: ${currentPosition.latitude}, ${currentPosition.longitude}`,
      });
      setLongitude(currentPosition?.longitude);
      setLatitude(currentPosition?.latitude);
    } else {
      Toast.show({
        type: 'error',
        text2: 'Не удалось получить координаты геопозиции',
      });
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text2: 'Во время получения координат геопозиции произошла ошибка',
    });
  }
}
