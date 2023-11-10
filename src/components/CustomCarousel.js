import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Sizes from '../constants/Sizes';
import {uploadedImages} from '../constants/Images';

const width = Dimensions.get('window').width;
const CustomCarousel = () => {
  return (
    <View style={styles.carousel_root}>
      <Carousel
        loop
        pagingEnabled
        width={Sizes.wp('98%')}
        height={width / 2}
        autoPlay={true}
        data={uploadedImages}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => {}}
        renderItem={({item, index}) => (
          <View style={styles.carousel_Container}>
            <ImageBackground
              source={item?.pic}
              resizeMode="cover"
              style={styles.image}>
              {/* <Text style={styles.text}>Inside</Text> */}
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carousel_root: {
    flex: 1,
  },
  carousel_Container: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    height: Sizes.hp('25%'),
    padding: 5,
    alignSelf: 'center',
    width: Sizes.wp('98%'),
  },
});
