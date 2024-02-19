import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import images from '../constants/images';
import Colors from '../constants/Colors';


const ProfilePic = ({imageUrl, TakePhotofromGallery}) => {
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        key={imageUrl}
        source={
          !imageUrl
            ? images.profilePlaceholder
            : {uri: imageUrl, cache: 'reload'}
        }
      />
      <TouchableOpacity
        style={styles.camera}
        onPress={() => TakePhotofromGallery()}
        activeOpacity={0.5}>
        <Icons name="camera" size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: 120,
    width: 120,
  },
  camera: {
    elevation: 10,
    height: 36,
    width: 36,
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    bottom: 0,
    right: 10,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.white
  },
});
