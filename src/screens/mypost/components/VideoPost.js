import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import images from '../../../constants/images';
import globalStyles from '../../../styles/globalStyles';
import {Text} from 'react-native-paper';
const VideoPost = () => {
  return (
    <ImageBackground
      source={images.background}
      style={globalStyles.backgroundImage}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          This Feature will come in future release
        </Text>
      </View>
    </ImageBackground>
  );
};

export default VideoPost;

const styles = StyleSheet.create({});
