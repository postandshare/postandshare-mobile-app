import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Images from '../../constants/Images';
import NavigationScreenName from '../../constants/NavigationScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageKey from '../../constants/LocalStorageKey';
import { useDispatch } from 'react-redux';
import { setOnBoarding } from '../../services/reducer/AuthSlice';
const OnBoarding = ({navigation}) => {
  const dispatch = useDispatch();
  const handleOnPresStart = async() => {
    try {
      await AsyncStorage.setItem(LocalStorageKey.ONBOARDING, 'true');
      dispatch(setOnBoarding(true));
    } catch (error) {}
  };
  return (
    <>
      <View style={styles.rootOboarding}>
        <View>
          <View style={styles.top_image_wrapper}>
            <Image source={Images.splashTop} />
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
          source={Images.splashBottom}
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

export default OnBoarding;
