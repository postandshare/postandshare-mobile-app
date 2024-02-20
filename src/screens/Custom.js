import {
  Button,
  StyleSheet,
  Image as RNImage,
  Text as RNText,
  PanResponder,
  useWindowDimensions,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  Share,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import TopHeader from '../components/TopHeader';
import RNFS from 'react-native-fs';
import {
  BlendMode,
  Canvas,
  Circle,
  Fill,
  Image,
  ImageFormat,
  Picture,
  Skia,
  Text,
  createPicture,
  useCanvasRef,
} from '@shopify/react-native-skia';

import DragDrop from '../components/DragDrop';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const END_POSITION = 200;
const generateSkiaImage = async path => {
  return await Skia.Data.fromURI(path).then(data =>
    Skia.Image.MakeImageFromEncoded(data),
  );
};

const Custom = () => {
  const {width} = useWindowDimensions();
  const leftBoundary = 0;
  const rightBoundary = width;
  const translateX = useSharedValue(width / 2);
  const translateY = useSharedValue(40);
  const [image, setImage] = useState();
  const [capturedImage, setCapturedImage] = useState('');
  const canvasRef = useCanvasRef();
  const [imagePosition, setImagePosition] = useState({x: 50, y: 10});

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      setImagePosition({
        x: imagePosition.x + gestureState.dx,
        y: imagePosition.y + gestureState.dy,
      });
    },
    onPanResponderRelease: (evt, gestureState) => {
      setImagePosition({
        x: imagePosition.x + gestureState.dx,
        y: imagePosition.y + gestureState.dy,
      });
    },
  });
  const gesture = Gesture.Pan()
    .onChange(e => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd(e => {
      translateY.value = withDecay({
        velocity: e.velocityY,
        clamp: [0, 100],
      });
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  useEffect(() => {
    generateSkiaImage(
      'https://images.unsplash.com/photo-1670272501077-c72d2d42f362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ).then(value => {
      if (value) {
        setImage(value);
      }
    });
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <>
      <TopHeader titile={'Custom'} />
      <GestureDetector gesture={gesture}>
        <Canvas ref={canvasRef} style={{flex: 1}}>
          <Fill color="white" />
          {image ? (
            <>
              <Image
                x={50}
                y={10}
                image={image}
                width={300}
                height={300}
                fit="cover"
              />
            </>
          ) : null}
          <Circle cx={translateX} cy={translateY} r={20} color="#3E3E" />
          <Text x={150} y={50} text={'Hello World'} color={'white'} />
        </Canvas>
      </GestureDetector>

      <Button
        title="Capture"
        onPress={async () => {
          const skImg = canvasRef.current?.makeImageSnapshot();

          if (skImg) {
            const base64 = skImg.encodeToBase64(ImageFormat.PNG, 100);
            const uri = 'data:image/png;base64,' + base64;
            setCapturedImage(uri);
          }
        }}
      />

      {capturedImage ? (
        <>
          <RNImage
            source={{uri: capturedImage}}
            style={{width: 200, height: 200, backgroundColor: 'red'}}
          />
          <Button title="Remove" onPress={() => setCapturedImage('')} />
        </>
      ) : null}
    </>
  );
};

export default Custom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
});
