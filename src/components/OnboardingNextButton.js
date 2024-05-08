import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';

const OnboardingNextButton = ({percentage, scrollTo}) => {
  const size = 70;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressref = useRef(null);
  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);
  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressref?.current) {
          progressref.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={'#e6e7e8'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressref}
            stroke={Colors.PRIMARY}
            fill="#fff"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </G>
      </Svg>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={scrollTo}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingNextButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
    padding: 10,
    position: 'absolute',
  },
});
