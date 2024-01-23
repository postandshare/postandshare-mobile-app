/* eslint-disable react-hooks/exhaustive-deps */
import {ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import Animated , {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import styles from './style';
import Images from '../../constants/images';


const Splash = () => {
  const Imagescale = useSharedValue(0);
  const reanimatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Imagescale.value}],
    };
  }, []);
  useEffect(() => {
    Imagescale.value = withTiming(1, {duration: 2500});
  }, []);

  return (
    <ImageBackground style={styles.root} source={Images.splashBackground}>
      <Animated.Image
        source={Images.logo}
        style={[styles.logo, reanimatedImageStyle]}
      />
    </ImageBackground>
  );
};

export default Splash;
