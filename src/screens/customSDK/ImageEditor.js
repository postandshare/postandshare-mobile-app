import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  PinchGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
const ImageEditor = ({item, onPresDelete, index}) => {
  // Drag, Scale, Resize Values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const width = useSharedValue(50);
  const height = useSharedValue(50);

  // Drag Gesture
  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
  });

  // Pinch Zoom Gesture
  const pinchGesture = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
    },
  });

  // Resize Gesture (Bottom Right Handle)
  const resizeGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startWidth = width.value;
      ctx.startHeight = height.value;
    },
    onActive: (event, ctx) => {
      width.value = withSpring(
        Math.max(50, ctx.startWidth + event.translationX),
      );
      height.value = withSpring(
        Math.max(50, ctx.startHeight + event.translationY),
      );
    },
  });

  // Apply Animated Styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
    width: width.value,
    height: height.value,
  }));

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View>
        <PinchGestureHandler onGestureEvent={pinchGesture}>
          <Animated.View
            style={[
              styles.imageContainer,
              animatedStyle,
              item?.selected && {borderWidth: 1, borderColor: '#fff'},
            ]}>
            <Animated.Image
              source={{uri: item?.uri}}
              style={[styles.image, {width: '100%', height: '100%'}]}
              resizeMode="stretch"
            />
            {item?.selected && (
              <>
                <TouchableOpacity
                  style={styles.deleteIcon_container}
                  onPress={() => onPresDelete(index)}>
                  <AntDesign name="delete" style={styles.icon} />
                </TouchableOpacity>

                <PanGestureHandler onGestureEvent={resizeGesture}>
                  <Animated.View style={styles.resizeHandle}>
                    <Fontisto
                      name="arrow-resize"
                      style={[
                        styles.resizeHandle,
                        {transform: [{rotate: '90deg'}]},
                      ]}
                    />
                  </Animated.View>
                </PanGestureHandler>
              </>
            )}
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 4,
  },
  image: {
    position: 'absolute',
  },
  resizeHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 20,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 5,
    color: '#fff',
  },
  deleteIcon_container: {
    position: 'absolute',
    top: 0,
    lef: 0,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ImageEditor;
