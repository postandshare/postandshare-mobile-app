import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useRef, useState} from 'react';
import styles from './style';
import Images from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageKey from '../../constants/LocalStorageKey';
import {useDispatch} from 'react-redux';
import {setOnBoarding} from '../../services/reducer/AuthSlice';
import OnboardingNextButton from '../../components/OnboardingNextButton';
import Paginator from '../../components/Paginator';

const onBoardingContent = [
  {
    img: Images.onboarding1,
    title: 'Create Post',
    text: 'Begin crafting stunning social media content with just a few taps',
  },
  {
    img: Images.onboarding2,
    title: 'Share the Love',
    text: 'Start spreading love with personalised posts for your special ones',
  },
  {
    img: Images.onboarding3,
    title: 'Video Templates',
    text: 'Lights, Camera, Template! Explore Our Exciting Video Templates Now!',
  },
];

const OnBoarding = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slidesRef = useRef(null);
  const scrollTo = async () => {
    try {
      if (currentIndex < onBoardingContent.length - 1) {
        slidesRef?.current?.scrollToIndex({index: currentIndex + 1});
      } else {
        await AsyncStorage.setItem(LocalStorageKey.ONBOARDING, 'true');
        dispatch(setOnBoarding(true));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnPressSkip = async () => {
    try {
      await AsyncStorage.setItem(LocalStorageKey.ONBOARDING, 'true');
      dispatch(setOnBoarding(true));
    } catch (error) {}
  };

  const handleOnPresStart = async () => {
    try {
      await AsyncStorage.setItem(LocalStorageKey.ONBOARDING, 'true');
      dispatch(setOnBoarding(true));
    } catch (error) {}
  };
  return (
    <View style={[styles.onboarding_root]}>
      <View style={styles.onboarding_relative_upper} />
      <View style={styles.onboarding_relative_bottom} />
      <FlatList
        style={styles.onboarding_flatlist_root}
        data={onBoardingContent}
        renderItem={({item}) => (
          <ImageBackground
            source={Images.onBoardingBackground}
            style={styles.onboarding_flatlist_wrap_background}>
            <View style={styles.onboarding_flatlist_upper_card}>
              <Image
                source={item.img}
                style={styles.onboarding_flatlist_upper_card_img}
              />
            </View>
            <View style={styles.onboarding_flatlist_lower_card}>
              <View style={styles.onboarding_flatlist_lower_card_wrap}>
                <Text style={styles.onboarding_flatlist_lower_card_title}>
                  {item.title}
                </Text>
                <Text style={styles.onboarding_flatlist_lower_card_text}>
                  {item.text}
                </Text>
              </View>
            </View>
          </ImageBackground>
        )}
        keyExtractor={(item, index) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />
      <View style={[styles.paginatorContainer]}>
        <TouchableOpacity onPress={handleOnPressSkip}>
          <Text style={styles.skip_button}>Skip</Text>
        </TouchableOpacity>
        <Paginator data={onBoardingContent} scrollX={scrollX} />
        <OnboardingNextButton
          percentage={(currentIndex + 1) * (100 / onBoardingContent.length)}
          scrollTo={scrollTo}
        />
      </View>
    </View>
  );
};

export default OnBoarding;
