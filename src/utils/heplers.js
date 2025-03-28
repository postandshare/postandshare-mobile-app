import {PermissionsAndroid, ToastAndroid} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

export const TakePhotofromGalleryWithCrop = async (type = 'gallery') => {
  return new Promise(async (resolve, reject) => {
    try {
      if (type === 'gallery') {
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
            resolve({path: image.path, mime: image.mime});
          })
          .catch(err => {
            reject(err);
          });
      } else {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Post And Share App',
            message:
              'We want to access your Camera' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
            resolve({path: image.path, mime: image.mime});
          })
          .catch(err => {
            reject(err);
          });
      }
    } catch (error) {
      reject(error);
      ToastAndroid.show('Permission Denied', ToastAndroid.LONG);
    }
  });
};
export const onError = error => {
  ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
};
