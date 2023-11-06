import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../constants/images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ScreenName from '../../constants/ScreenName';
const Splash = ({navigation}) => {
  const handleOnPresStart = () => {
    navigation.navigate(ScreenName.Login);
  };
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.root}>
        <View>
          <View style={styles.top_image_wrapper}>
            <Image source={images.splashTop} />
          </View>
          <View style={styles.text_wrapper}>
            <Text style={[styles.easyText, styles.common]}>
              Easy <Text style={[styles.wayText, styles.common]}>Way</Text> to
            </Text>
            <Text style={[styles.createText, styles.common]}>
              Create <Text style={[styles.yourText, styles.common]}>Your</Text>{' '}
              <Text style={[styles.postText, styles.common]}>Post</Text>
            </Text>
            <Text style={styles.subtitle_text}>
              Lorem Ipsum is simply dummy text printing and typesetting
              industry. Lorem Ipsum been the industry's Ipsum has standard.
            </Text>
          </View>
        </View>
        <ImageBackground
          source={images.splashBottom}
          style={styles.bottomImage_root}>
          <TouchableOpacity
            style={styles.startButton_cont}
            activeOpacity={0.5}
            onPress={handleOnPresStart}>
            <View style={styles.startButton_text_wrapper}>
              <Text style={styles.startButton_text}>Start</Text>
              <FontAwesome5
                name="long-arrow-alt-right"
                style={styles.startButton_icon}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
};

export default Splash;
