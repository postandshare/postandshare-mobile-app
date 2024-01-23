import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLogout} from '../services/reducer/AuthSlice';
import Images from '../constants/images';
import Sizes from '../constants/Sizes';

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
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressBack = () => {
    if (logout) {
      dispatch(setLogout());
    } else {
      if (path) {
        navigation.navigate(path);
      } else {
        navigation.goBack();
      }
    }
  };
  return (
    <ImageBackground source={Images?.topHeader} style={styles.root}>
      <View style={styles.left_wrap}>
        {/* Back button */}
        {showBackIcon && (
          <TouchableOpacity style={styles.left_icon_wrap} onPress={onPressBack}>
            <MaterialIcons
              name="keyboard-arrow-left"
              style={styles.left_icon}
            />
          </TouchableOpacity>
        )}
        {/* title */}
        <Text style={styles.title}>{titile}</Text>
      </View>
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
          <AntDesign name={'plussquareo'} size={26} color="white" />
        </TouchableOpacity>
      ) : icon ? (
        <TouchableOpacity onPress={onPress}>
          <Image source={icon} style={{height: 30 , width: 30 ,}}/>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </ImageBackground>
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

    paddingTop: Sizes.hp('5%'),
  },
  left_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left_icon_wrap: {
    height: 30,
    width: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 13,
    borderWidth: 1,
    borderColor: '#fff',
  },
  left_icon: {
    color: '#fff',
    fontSize: scale(20),
  },
  title: {
    color: '#fff',
    fontSize: scale(19),
    letterSpacing: 1.2,
  },
  icon: {
    color: '#fff',
    fontSize: scale(25),
  },
  notificationIconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});
