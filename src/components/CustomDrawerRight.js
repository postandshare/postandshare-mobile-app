import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Sizes from '../constants/Sizes';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationScreenName from '../constants/NavigationScreenName';
// import {useDispatch, useSelector} from 'react-redux';
// import {setLogout} from '../services/reducers/AuthReducer';
import {scale} from 'react-native-size-matters';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

const Item = ({icon, text, path, onPress = () => {}}) => (
  <TouchableOpacity style={styles.item_root} onPress={onPress}>
    {icon}
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);
const CustomDrawerRight = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {loggedInUserProfile, SchoolList} = useSelector(
//     store => store.commonStore,
//   );

//   const onPressLogout = () => {
//     dispatch(setLogout());
//   };

  return (
    <DrawerContentScrollView>
      <View style={styles.root}>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate(NavigationScreenName.USER_PROFILE)
          // }
          >
          <View style={styles.image_wrap}>
            {/* <Image
              source={
                loggedInUserProfile?.obj?.profilePic
                  ? {uri: loggedInUserProfile?.obj?.profilePic}
                  : Images.profilePlaceholder
              }
              style={styles.profile_pic}
            /> */}
          </View>
          {/* <Text style={styles.name_text}>
            {loggedInUserProfile?.obj?.firstName}{' '}
            {loggedInUserProfile?.obj?.middle}{' '}
            {loggedInUserProfile?.obj?.lastName}
          </Text> */}
        </TouchableOpacity>
        {/* {SchoolList?.obj?.instituteList?.length > 1 && (
          <Item
            icon={<Feather name="refresh-ccw" style={styles.icon} />}
            text={'Switch School'}
            onPress={() =>
              navigation.navigate(NavigationScreenName.SCHOOL_LIST)
            }
          />
        )} */}
        <Item
          icon={<FontAwesome5 name="school" style={styles.icon} />}
          text={'Apply To School'}
          // onPress={() =>
          //   navigation.navigate(NavigationScreenName.APPLY_TO_SCHOOL)
          // }
        />
        {/* <Item
          icon={<AntDesign name="logout" style={styles.icon} />}
          text={'Logout'}
          onPress={onPressLogout}
        /> */}
        {/* upper part */}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerRight;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    minHeight: Sizes.hp('110%'),
    paddingHorizontal: Sizes.wp('3%'),
    paddingVertical: Sizes.wp('5%'),
  },
  image_wrap: {
    height: 80,
    width: 80,
    borderRadius: 40,
    elevation: 3,
    alignSelf: 'center',
    // borderColor: 'rgba(27, 27, 63, 0.5)',
    // borderWidth: 1.5,
  },
  name_text: {
    color: Colors.TEXT1,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  profile_pic: {
    resizeMode: 'cover',
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  schoole_name: {
    fontSize: scale(15),
    lineHeight: scale(20),
    paddingTop: 10,
    textAlign: 'center',
    color: Colors.TEXT1,
    fontWeight: '600',
    textTransform: 'capitalize',
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
    paddingVertical: 10,
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(12, 47, 73, 1)',
    fontSize: 25,
    marginRight: Sizes.wp('3%'),
  },
  text: {
    color: 'rgba(12, 47, 73, 1)',
    fontSize: 17,
    fontWeight: '500',
  },
});
