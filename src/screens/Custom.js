import {
  Button,
  StyleSheet,
  Image as RNImage,
  Text as RNText,
  PanResponder,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';

import {
  Canvas,
  Fill,
  Image,
  ImageFormat,
  Skia,
  Text,
  useCanvasRef,
} from '@shopify/react-native-skia';

import DragDrop from '../components/DragDrop';

const END_POSITION = 200;
const generateSkiaImage = async path => {
  return await Skia.Data.fromURI(path).then(data =>
    Skia.Image.MakeImageFromEncoded(data),
  );
};

const Custom = () => {
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

      <Canvas ref={canvasRef} 
      style={{width: 300, height: 300}}
      {...panResponder.panHandlers}
      >
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
