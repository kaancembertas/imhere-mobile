import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const showImagePicker = async (maxPixel) => {
  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxWidth: maxPixel,
    maxHeight: maxPixel,
  };

  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.error) {
        reject('ImagePicker Error: ' + response.error);
      } else if (response.customButton) {
        reject('User tapped custom button: ' + response.customButton);
      } else {
        resolve({
          ...response,
          uri:
            Platform.OS === 'android'
              ? 'file:///' + response.path
              : response.uri,
        });
      }
    });
  });
};
