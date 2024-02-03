import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Sizes from '../constants/Sizes';

const DragDrop = ({children, onDrag, onDrop}) => {
  const panRef = React.createRef();
  const pinchRef = React.createRef();
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const drag = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: (event, ctx) => {
      const newX = event.translationX + ctx.x;
      const newY = event.translationY + ctx.y;
      if (newX >= 0 && newX <= Sizes.height * 0.4) {
        x.value = newX;
      }
      if (newY >= 0 && newY <= Sizes.width * 0.9) {
        y.value = newY;
      }
      // x.value = event.translationX + ctx.x;
      // y.value = event.translationY + ctx.y;
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

  const pinchGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.scale = savedScale.value;
    },
    onActive: (event, ctx) => {
      scale.value = ctx.scale * event.scale;
    },
    onEnd: _ => {
      savedScale.value = scale.value;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value }, // Apply the scale value here
    ],
  };
});

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        ref={panRef}
        simultaneousHandlers={pinchRef}
        onGestureEvent={drag}>
        <Animated.View
          style={animatedStyle}>
          <PinchGestureHandler
            ref={pinchRef}
            simultaneousHandlers={panRef}
            onGestureEvent={pinchGesture}>
            <Animated.View style={animatedStyle}>{children}</Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default DragDrop;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});
