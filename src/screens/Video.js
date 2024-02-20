import {useWindowDimensions} from 'react-native';
import {Canvas, Circle, Fill, useImage, Image} from '@shopify/react-native-skia';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useSharedValue, withDecay} from 'react-native-reanimated';
import TopHeader from '../components/TopHeader';

const Video = () => {
  const {width} = useWindowDimensions();
  const leftBoundary = 0;
  const rightBoundary = width;
  const translateX = useSharedValue(width / 2);
  const translateY = useSharedValue(40);

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
    const image = useImage(require("../assets/frames/Frame 6.png"));
    console.log(image, 'image')
  return (
    <>
      <TopHeader titile={'Video'} />
      <GestureDetector gesture={gesture}>
        <Canvas style={{flex: 1}}>
          <Fill color="white" />
          <Image image={image} fit="contain" x={0} y={0} width={256} height={256}/>
          <Circle cx={translateX} cy={translateY} r={20} color="#3E3E" />
        </Canvas>
      </GestureDetector>
    </>
  );
};

export default Video;
