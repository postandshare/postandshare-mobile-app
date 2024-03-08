import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import {uploadedImages} from '../../constants/images';
import styles from './style';
import NavigationScreenName from '../../constants/NavigationScreenName';

const MonthPhotos = ({navigation}) => {
  return (
    <>
      <TopHeader titile={'This Month'} />
      <ScrollView style={styles.root} nestedScrollEnabled>
        <View style={styles.imageWrap}>
          {uploadedImages.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavigationScreenName.PHOTO_NAVIGATOR, {
                  initialRouteName: item,
                })
              }>
              <Image source={item.pic} style={styles.image} key={index} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default MonthPhotos;
