import {Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Sizes from '../constants/Sizes';
import {uploadedImages} from '../constants/images';
import NavigationScreenName from '../constants/NavigationScreenName';

const width = Dimensions.get('window').width;
const CustomCarousel = ({data , navigation}) => {
  return (
    <View style={styles.carousel_root}>
      <Carousel
        loop
        pagingEnabled
        width={Sizes.wp('98%')}
        height={width / 2}
        autoPlay={true}
        data={data ?? uploadedImages}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => {}}
        renderItem={({item, index}) => (
          <TouchableOpacity 
          onPress={() =>
            navigation.navigate(NavigationScreenName.PHOTO_NAVIGATOR, {
              initialRouteName: item,
            })
          }
          style={styles.carousel_Container}>
            <ImageBackground
              source={item?.photo ? {uri: item?.photo} : item?.pic}
              resizeMode="cover"
              style={[styles.image, {overflow: 'hidden'}]}>
              {/* <Text style={styles.text}>Inside</Text> */}
            </ImageBackground>
          </TouchableOpacity>
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
