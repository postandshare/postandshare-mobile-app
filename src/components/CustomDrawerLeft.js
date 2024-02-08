import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Sizes from '../constants/Sizes';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {scale} from 'react-native-size-matters';
import Colors from '../constants/Colors';
import Images from '../constants/images';
import NavigationScreenName from '../constants/NavigationScreenName';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Item = ({icon, text, path, onPress = () => {}}) => (
  <TouchableOpacity style={styles.item_root} onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
    <Feather name="chevron-right" style={styles.icon} />
  </TouchableOpacity>
);
const CustomDrawerLeft = ({navigation}) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.root}>
        <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate(NavigationScreenName.USER_PROFILE)
        // }
        >
          <View style={styles.image_wrap}>
            <Image
              source={
                // loggedInUserProfile?.obj?.profilePic
                //   ? {uri: loggedInUserProfile?.obj?.profilePic}
                //   :
                Images.akSchoolIcon
              }
              style={styles.profile_pic}
            />
          </View>
          <Text style={styles.name_text}>
            {/* {loggedInUserProfile?.obj?.firstName}{' '}
            {loggedInUserProfile?.obj?.middle}{' '}
            {loggedInUserProfile?.obj?.lastName} */}
            Dr. A.K.Public Inter College
          </Text>
        </TouchableOpacity>
        <Item
          icon={<AntDesign name={'home'} style={styles.icon} />}
          text={'My Bussiness'}
          path={NavigationScreenName.MY_BUSSINESS}
          onPress={() => navigation.navigate(NavigationScreenName.MY_BUSSINESS)}
        />
        <Item
          icon={<AntDesign name={'filetext1'} style={styles.icon} />}
          text="Term & Condition"
          path={NavigationScreenName.TERM_AND_CONDITION}
          onPress={() =>
            navigation.navigate(NavigationScreenName.TERM_AND_CONDITION)
          }
        />
        <Item
          icon={<Entypo name={'images'} style={styles.icon} />}
          text="My Post"
          path={NavigationScreenName.MY_POST}
          onPress={() => navigation.navigate(NavigationScreenName.MY_POST)}
        />
        <Item
          icon={<Entypo name={'video'} style={styles.icon} />}
          text="Tutorials"
          path={NavigationScreenName.TUTORIALS}
          onPress={() => navigation.navigate(NavigationScreenName.TUTORIALS)}
        />
        <Item
          icon={<Entypo name={'share'} style={styles.icon} />}
          text="Share Us"
          // path={NavigationScreenName.PROFILE}
          // onPress={() => navigation.navigate(NavigationScreenName.PROFILE)}
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
          // path={NavigationScreenName.PROFILE}
          // onPress={() => navigation.navigate(NavigationScreenName.PROFILE)}
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
          // path={NavigationScreenName.LANGUAGE_SELECTION}
          // onPress={() =>
          //   navigation.navigate(NavigationScreenName.LANGUAGE_SELECTION)
          // }
        />
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
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#3D398960',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: Colors.white,
  },
  icon: {
    color: Colors.PRIMARY,
    fontSize: 25,
    marginRight: Sizes.wp('3%'),
  },
  text: {
    color: 'rgba(12, 47, 73, 1)',
    fontSize: 17,
    fontWeight: '500',
  },
});
