import {
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DashboardTopHeader from '../../../components/DashboardTopHeader';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import {Text} from 'react-native-paper';
import Sizes from '../../../constants/Sizes';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {launchImageLibrary} from 'react-native-image-picker';

const Choose = ({navigation}) => {
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    navigation.navigate(NavigationScreenName.NOTIFICATION);
  };
  const TakePhotofromGallery = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Post and Share App',
          message:
            'We want to access the photo gallery' +
            'To perform the desired function',
        },
      );
      const image = await launchImageLibrary({
        maxWidth: 300,
        maxHeight: 400,
        mediaType: 'photo',
      });
      navigation.navigate(NavigationScreenName.ADD_NAVIGATOR, {
        pic: image.assets[0].uri,
      });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  return (
    <View style={styles.container}>
      <DashboardTopHeader
        title="Create Post"
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
      />
      <View style={styles.wrapper}>
        <View style={styles.upper_box_wrapper}>
          <TouchableOpacity
            onPress={TakePhotofromGallery}
            style={[styles.wrapper_box, styles.localImage_wrapper]}>
            <Entypo name="images" size={36} />
            <Text style={styles.wrapper_box_text}>Custom Image Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(NavigationScreenName.AI_IMAGE)}
            style={[styles.wrapper_box, styles.aiImage_wrapper]}>
            <FontAwesome6 name="wand-magic-sparkles" size={32} />
            <Text style={styles.wrapper_box_text}>Generate Image With AI</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.myLibrary_text}>My Library</Text>
      </View>
    </View>
  );
};

export default Choose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    padding: Sizes.wp('5%'),
  },
  upper_box_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper_box: {
    width: Sizes.wp('40%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: Sizes.hp('20%'),
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  wrapper_box_text: {
    fontSize: Sizes.wp('4.5%'),
    textAlign: 'center',
  },
  myLibrary_text: {
    fontSize: Sizes.wp('7%'),
    fontWeight: '700',
    marginVertical: 15,
  },
  localImage_wrapper: {},
  aiImage_wrapper: {},
});
