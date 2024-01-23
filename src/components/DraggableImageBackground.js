import React, {useRef, useEffect} from 'react'; 
import {PanResponder, Animated, ImageBackground} from 'react-native';


const DraggableImageBackground = ({children, style, ...props}) => {
    const pan = useRef(new Animated.ValueXY()).current;
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    });
  
    useEffect(() => {
      return () => panResponder.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), style]}>
        <ImageBackground {...props}>{children}</ImageBackground>
      </Animated.View>
    );
  };

export default DraggableImageBackground;

