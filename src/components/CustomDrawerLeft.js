/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import Sizes from '../constants/Sizes';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {scale} from 'react-native-size-matters';
import Colors from '../constants/Colors';
import NavigationScreenName from '../constants/NavigationScreenName';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginState} from '../services/reducer/AuthSlice';
import {setProfileUpdated} from '../services/reducer/CommonReducer';
import images from '../constants/images';

const Item = ({icon, text, path, onPress = () => {}, isActive}) => (
  <TouchableOpacity
    style={[styles.item_root, isActive ? styles.active_item : {}]}
    onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
    <Feather name="chevron-right" style={styles.iconArrow} />
  </TouchableOpacity>
);

const UserProfileCard = ({profileData}) => {
  return (
    <>
      <View style={styles.userProfileCard}>
        <View style={styles.image_wrap}>
          <Image
            source={
              profileData?.profilePic
                ? {uri: profileData?.profilePic}
                : images.akSchoolIcon
            }
            style={styles.profile_pic}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.name_text}>
            {profileData?.firstName ?? '-'} {profileData?.middleName ?? '-'}{' '}
            {profileData?.lastName ?? '-'}
          </Text>
          <Text style={styles.schoole_name}>
            {profileData?.mobileNumber ?? '-'}
          </Text>
          <Text style={styles.schoole_name}>{profileData?.email ?? '-'}</Text>
        </View>
      </View>
    </>
  );
};

const CustomDrawerLeft = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userDetails} = useSelector(store => store.commonStore);

  const handlePressLogout = () => {
    Alert.alert('Post and Share App', 'Are you sure want to Logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(setLoginState(''));
          dispatch(setProfileUpdated(false));
        },
      },
    ]);
  };

  const ShareUs = async () => {
    await Share.share({
      message: 'Post and Share App',
      //  url: 'https://play.google.com/store/apps/details?id=com.postandshare',
      title: 'Post and Share App',
    });
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.root}>
        <UserProfileCard profileData={userDetails} />
        <Item
          icon={<AntDesign name={'profile'} style={styles.icon} />}
          text={'Work Profile'}
          path={NavigationScreenName.WORK_PROFILE_NAVIGATOR}
          onPress={() =>
            navigation.navigate(NavigationScreenName.WORK_PROFILE_NAVIGATOR)
          }
        />
        {/* <Divider
          style={{
            height: 1,
            backgroundColor: Colors?.PRIMARY_LIGHT,
          }}
        /> */}
        <Item
          icon={<AntDesign name={'filetext1'} style={styles.icon} />}
          text="Terms & Conditions"
          path={NavigationScreenName.TERM_AND_CONDITION}
          onPress={() =>
            navigation.navigate(NavigationScreenName.TERM_AND_CONDITION)
          }
        />
        {/* <Item
          icon={<Entypo name={'images'} style={styles.icon} />}
          text="My Post"
          path={NavigationScreenName.MY_POST}
          onPress={() => navigation.navigate(NavigationScreenName.MY_POST)}
          isActive={route?.name === NavigationScreenName.MY_POST}
        /> */}
        <Item
          icon={<Entypo name={'video'} style={styles.icon} />}
          text="Tutorials"
          path={NavigationScreenName.TUTORIALS}
          onPress={() => navigation.navigate(NavigationScreenName.TUTORIALS)}
        />
        <Item
          icon={<Entypo name={'share'} style={styles.icon} />}
          text="Share Us"
          onPress={async () => {
            await navigation.goBack(NavigationScreenName.HOME);
            ShareUs();
          }}
        />
        <Item
          icon={<Entypo name={'star-outlined'} style={styles.icon} />}
          text="Rate Us"
          path={NavigationScreenName.FEEDBACK}
          onPress={() => navigation.navigate(NavigationScreenName.FEEDBACK)}
        />
        <Item
          icon={<Entypo name={'info'} style={styles.icon} />}
          text="Help & Support"
          onPress={async () => {
            ToastAndroid.show('Coming Soon', ToastAndroid.SHORT);
            // await navigation.goBack(NavigationScreenName.HOME);
            // navigation.navigate(NavigationScreenName.HELPSUPPORT);
          }}
        />
        <Item
          icon={<MaterialIcons name={'privacy-tip'} style={styles.icon} />}
          text="Privacy Policy"
          path={NavigationScreenName.Privacy_Policy}
          onPress={() =>
            navigation.navigate(NavigationScreenName.Privacy_Policy)
          }
        />
        <Item
          icon={<FontAwesome name={'language'} style={styles.icon} />}
          text="Language Setting"
          path={NavigationScreenName.LANGUAGE_SELECTION}
          onPress={() =>
            navigation.navigate(NavigationScreenName.LANGUAGE_SELECTION)
          }
        />
        <Item
          icon={<AntDesign name={'logout'} style={styles.icon} />}
          text="Logout"
          onPress={async () => {
            await navigation.goBack(NavigationScreenName.HOME);
            handlePressLogout();
          }}
        />

        <Text
          style={{
            bottom: -18,
            textAlign: 'center',
            color: Colors.TEXT1,
            marginTop: 10,
            fontWeight: '100',
          }}>
          Post and Share App {'\n'}
          Version 1.0.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerLeft;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    minHeight: Sizes.hp('110%'),
    paddingHorizontal: Sizes.wp('3%'),
    paddingVertical: Sizes.wp('5%'),
  },
  image_wrap: {
    height: 60,
    width: 60,
    borderRadius: 40,
    elevation: 3,
    alignSelf: 'center',
    // borderColor: 'rgba(27, 27, 63, 0.5)',
    // borderWidth: 1.5,
  },
  name_text: {
    color: Colors.PRIMARY,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    flex: 1,
    width: '98%',
  },
  profile_pic: {
    resizeMode: 'cover',
    height: 60,
    width: 60,
    borderRadius: 40,
  },
  schoole_name: {
    flex: 1,
    fontSize: scale(12),
    lineHeight: scale(20),
    textAlign: 'center',
    color: Colors.TEXT1,
    fontWeight: '300',
  },
  selector_root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.hp('1%'),
    justifyContent: 'space-between',
  },
  selector_btn_wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Sizes.wp('30%'),
    height: 40,
    paddingHorizontal: Sizes.wp('1%'),
    borderColor: '#B6C8D6',
    borderWidth: 1,
    borderRadius: 5,
  },
  select_title: {
    color: Colors.TEXT1,
    fontSize: scale(15),
    fontWeight: '600',
    paddingBottom: 3,
  },
  select_icon: {
    color: Colors.TEXT1,
    fontSize: scale(25),
  },
  select_text: {
    color: Colors.TEXT1,
    fontSize: scale(13),
  },
  item_root: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 0.5,
    // borderColor: '#3D398960',
    // borderRadius: 5,
    marginVertical: 5,
    // backgroundColor: Colors.white,
  },
  icon: {
    color: Colors.PRIMARY,
    fontSize: 25,
    marginRight: Sizes.wp('3%'),
  },
  iconArrow: {
    color: Colors.TEXT1,
    fontSize: 25,
    marginRight: Sizes.wp('3%'),
  },
  text: {
    color: 'rgba(12, 47, 73, 1)',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'OpenSans-SemiBold',
  },
  active_item: {
    backgroundColor: Colors.PRIMARY,
  },
  active_text: {
    color: Colors.white,
  },
  userProfileCard: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: Colors.white,
  },
});
