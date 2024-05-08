import {StyleSheet, View, Animated, useWindowDimensions} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row'}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 25, 10],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View style={[styles.dot, {width: dotWidth}]} key={i} />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 4,
  },
});
