import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
    runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const DragDrop = ({children, onDrag, onDrop}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const drag = useAnimatedGestureHandler({
    onStart: (_ , ctx) => {
        ctx.x = x.value;
        ctx.y = y.value;
    },
    onActive: (event , ctx) => {

      x.value = event.translationX + ctx.x;
      y.value = event.translationY + ctx.y;
      if (onDrag) {
        runOnJS(onDrag)(x.value, y.value);
      }
    },
    onEnd: event => {
    
      if (onDrop) {
        runOnJS(onDrop)(event.absoluteX, event.absoluteY);
      }
    },
  });
  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View
        style={[
            {zIndex: 2},
          useAnimatedStyle(() => {
            return {
              transform: [{translateX: x.value}, {translateY: y.value}],
            };
          }),
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DragDrop;

const styles = StyleSheet.create({});
