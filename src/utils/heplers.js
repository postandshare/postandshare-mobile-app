import {PermissionsAndroid, ToastAndroid} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

export const TakePhotofromGalleryWithCrop = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Post And Share App',
          message:
            'We want to access your photos' +
            'so you can take awesome pictures.',
        },
      );
      ImageCropPicker.openPicker({
        cropping: true,
      })
        .then(image => {
          console.log(image, 'imgae in the edit profile');
          resolve({path: image.path, mime: image.mime});
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {
      reject(error);
      ToastAndroid.show('Permission Denied', ToastAndroid.LONG);
    }
  });
};
export const onError = error => {
  ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
};
