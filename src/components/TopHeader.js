import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../services/reducer/AuthSlice';
import {Text} from 'react-native-paper';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
import {setProfileUpdated} from '../services/reducer/CommonReducer';

const TopHeader = ({
  titile,
  right,
  onPress,
  showBackIcon = true,
  path = '',
  docId = '',
  filter,
  logout = false,
  add,
  icon,
  IconProp,
  next,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressBack = () => {
    if (logout) {
      dispatch(setLoginState(''));
      dispatch(setProfileUpdated(false));
    } else {
      if (path) {
        navigation.navigate(path);
      } else {
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.left_wrap}>
        {/* Back button */}
        {showBackIcon && (
          <TouchableOpacity style={styles.left_icon_wrap} onPress={onPressBack}>
            <MaterialIcons name="arrow-back" style={styles.left_icon} />
          </TouchableOpacity>
        )}
        {/* title */}
      </View>
      <Text style={styles.title}>{titile}</Text>
      {right ? (
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="delete" style={styles.icon} />
        </TouchableOpacity>
      ) : filter ? (
        <View style={styles.notificationIconContainer}>
          <TouchableOpacity style={{left: 10}} onPress={onPress}>
            <AntDesign name="filter" size={26} color="white" />
          </TouchableOpacity>
        </View>
      ) : add ? (
        <TouchableOpacity onPress={onPress}>
          <AntDesign name={'plussquareo'} size={26} color={Colors.TEXT1} />
        </TouchableOpacity>
      ) : icon ? (
        <TouchableOpacity onPress={onPress}>
          <Image source={icon} style={{height: 30, width: 30}} />
        </TouchableOpacity>
      ) : IconProp ? (
        <TouchableOpacity onPress={onPress}>{IconProp}</TouchableOpacity>
      ) : next ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.title}>{next}</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  root: {
    height: Sizes.hp('13%'),
    resizeMode: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.wp('5%'),
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#40404029',
    opacity: 1,
    paddingTop: Sizes.hp('5%'),
    elevation: 5,
  },
  left_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left_icon_wrap: {
    // height: 30,
    // width: 30,
    // borderRadius: 7,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // marginRight: 13,
    // borderWidth: 1,
    // borderColor: 'rgba(64, 64, 64, 1)',
  },
  left_icon: {
    color: 'rgba(64, 64, 64, 1)',
    fontSize: scale(30),
  },
  title: {
    color: 'rgba(64, 64, 64, 1)',
    fontSize: scale(19),
    letterSpacing: 0.5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  icon: {
    color: Colors.TEXT1,
    fontSize: scale(25),
  },
  notificationIconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});
