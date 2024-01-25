import {Button, SafeAreaView, StyleSheet, Image as RNImage} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';
import {
  Box,
  BoxShadow,
  Canvas,
  Fill,
  Image,
  ImageFormat,
  Mask,
  rect,
  rrect,
  Skia,
  SkImage,
  useCanvasRef,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import DragDrop from '../components/DragDrop';

const END_POSITION = 200;
const generateSkiaImage = async path => {
  return await Skia.Data.fromURI(path).then(data =>
    Skia.Image.MakeImageFromEncoded(data),
  );
};

const DraggableText = ({onRemove}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDrag = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  return <></>;
};

const ResizableFrame = () => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDrag = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
  });

  const onPinch = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <Animated.View style={animatedStyle}>
        <PinchGestureHandler onGestureEvent={onPinch}>
          <Animated.View>
            <Box box={rrect(rect(50, 50, 200, 200), 10, 10)} />
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const Custom = () => {
  const [image, setImage] = useState();
  const [capturedImage, setCapturedImage] = useState('');
  const canvasRef = useCanvasRef();
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    generateSkiaImage(
      'https://images.unsplash.com/photo-1670272501077-c72d2d42f362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ).then(value => {
      if (value) {
        setImage(value);
      }
    });
  }, []);

  return (
    <>
      <TopHeader titile={'Custom'} />

      <Canvas ref={canvasRef} style={{width: 300, height: 300}}>
        <Fill color="red" />

        {image ? (
          <Image
            x={50}
            y={10}
            image={image}
            width={300}
            height={300}
            fit="cover"
          />
        ) : null}
       
      </Canvas>

      <Button
        title="Capture"
        onPress={() => {
          const skImg = canvasRef.current?.makeImageSnapshot();
          if (skImg) {
            const base64 = skImg.encodeToBase64(ImageFormat.PNG, 100);
            setCapturedImage('data:image/png;base64,' + base64);
          }
        }}
        />

        <DragDrop>
           <Text>Hi I am Alok Rawat</Text>
         </DragDrop>
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

// export default function Custom() {
//   const onLeft = useSharedValue(true);
//   const position = useSharedValue(0);

//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       if (onLeft.value) {
//         position.value = e.translationX;
//       } else {
//         position.value = END_POSITION + e.translationX;
//       }
//     })
//     .onEnd((e) => {
//       if (position.value > END_POSITION / 2) {
//         position.value = withTiming(END_POSITION, { duration: 100 });
//         onLeft.value = false;
//       } else {
//         position.value = withTiming(0, { duration: 100 });
//         onLeft.value = true;
//       }
//     });
//     const animatedStyle = useAnimatedStyle(() => ({
//       transform: [{ translateX: position.value }],
//     }));
//   return (
//     <GestureDetector style={{flex: 1}} gesture={Gesture}>
//       {/* <SDKDemo /> */}
//       <Animated.View style={[styles.box, animatedStyle]} />
//     </GestureDetector>
//   );
// }

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
