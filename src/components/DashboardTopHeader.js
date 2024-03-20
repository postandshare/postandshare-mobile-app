import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Sizes from '../constants/Sizes';
import Images from '../constants/images';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DashboardTopHeader = ({
  onPressMenu = () => {},
  onPressNotification = () => {},
  onPresProfile = () => {},
  title = '',
  next,
  onPress,
}) => {
  return (
    <ImageBackground source={Images.topHeader} style={styles.root}>
      <View style={[styles.left_wrap, next ? {flex: 1} : null]}>
        {/* Menu button */}
        {/* {schoolDocId && ( */}
        <TouchableOpacity style={styles.left_icon_wrap} onPress={onPressMenu}>
          <Feather name="menu" style={styles.left_icon} />
        </TouchableOpacity>
        {/* )} */}
        {/* title */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title ? title : 'Dashboard'}
        </Text>
      </View>
      <View style={[styles.right_container, next ? {flex: 0.5} : null]}>
        {/* notification container */}
        <View>
          <TouchableOpacity onPress={onPressNotification}>
            <Ionicons name="notifications-outline" style={styles.right_icon} />
          </TouchableOpacity>
        </View>
        {!next && (
          <>
            {/* profile container */}
            <View>
              <TouchableOpacity onPress={onPresProfile}>
                {/* {loggedInUserProfile?.obj?.profilePic ? ( */}
                {/* <Image
              source={{uri: loggedInUserProfile?.obj?.profilePic}}
              style={{
                width: 35,
                height: 35,
                borderRadius: 17.5,
                borderColor: '#fff',
                borderWidth: 1,
                resizeMode: 'cover',
                marginBottom: -8,
                marginLeft: 5,
              }}
            /> */}
                {/* ) : ( */}
                <FontAwesome5 name="user-alt" style={styles.userIcon} />
                {/* )} */}
              </TouchableOpacity>
            </View>
          </>
        )}
        {/* next container */}
        <View>
          {next ? (
            <TouchableOpacity onPress={onPress} style={styles.right_icon_next}>
              <Text style={styles.title}>{next}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
};

export default DashboardTopHeader;

const styles = StyleSheet.create({
  root: {
    height: Sizes.hp('12%'),
    resizeMode: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.wp('3%'),
    paddingTop: Sizes.hp('5%'),
  },
  left_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left_icon_wrap: {
    marginRight: 13,
  },
  left_icon: {
    color: '#fff',
    fontSize: scale(27),
  },
  right_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  right_icon: {
    color: '#fff',
    fontSize: scale(25),
    marginTop: Sizes.hp('1%'),
  },
  right_icon_next: {
    color: '#fff',
    fontSize: scale(30),
    marginTop: Sizes.hp('1%'),
    left: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: scale(16),
    letterSpacing: 1.2,
    width: Sizes.wp('63%'),
    marginBottom: -1,
  },
  userIcon: {
    marginLeft: 15,
    color: '#fff',
    fontSize: scale(23),
    marginTop: Sizes.hp('1%'),
  },
});
