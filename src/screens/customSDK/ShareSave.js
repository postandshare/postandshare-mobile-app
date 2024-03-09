import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import styles from './style';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import TopHeader from '../../components/TopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Loader from '../../components/Loader';

const ShareSave = ({route, navigation}) => {
  const {picUrl} = route.params;
  const [loading, setLoading] = useState(false);

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }

    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  console.log(picUrl, 'uri , picUrl');

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function savePicture(uri) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.saveAsset(uri, {
      type: 'photo',
      album: CameraRoll.AlbumTypeOptions.All,
    })
      .then(() => {
        setLoading(false);
        console.log('Image saved to camera roll');
        ToastAndroid.show('Image saved to camera roll', ToastAndroid.SHORT);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  const onCapture = async () => {
    try {
      setLoading(true);
      await requestStoragePermission();
      if (Platform.OS === 'android') {
        const imageName = `myImage_${new Date().getTime()}.jpg`;
        const path = `${RNFS.CachesDirectoryPath}/${imageName}`;

        // Convert the image uri to base64
        const imageBase64 = await RNFS.readFile(picUrl, 'base64');

        // Write the image file
        await RNFS.writeFile(path, imageBase64, 'base64');

        console.log('Image saved to', path);
        // ToastAndroid.show('Image saved to ' + path, ToastAndroid.SHORT);

        // Save the image to the camera roll
        await savePicture(path);

        navigation.navigate(NavigationScreenName.HOME);
      } else {
        console.log('Storage permission denied');
        ToastAndroid.show('Storage permission denied', ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show('Failed to save the file', ToastAndroid.SHORT);
      console.warn(err);
    }
  };

  const shareImage = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Message from post and share app',
      url: picUrl,
      social: Share.Social.WHATSAPP,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  return (
    <View>
      <TopHeader titile={'Share & Save'} />
      <Loader open={loading} text="Saving Image..." />
      <View style={styles.chooseImageContainer}>
        <ImageBackground
          source={{uri: picUrl}}
          resizeMode="cover"
          style={{
            zIndex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
          }}></ImageBackground>
      </View>

      {/* buttons for sae and share */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onCapture}>
          <Text style={[styles.buttonText, {color: Colors.SECONDRY}]}>
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={shareImage}
          style={[styles.button, {backgroundColor: Colors.SECONDRY}]}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareSave;
