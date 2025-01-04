/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import images from '../../constants/images';
import styles from './style';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/globalStyles';

const MonthPhotos = ({navigation, route}) => {
  const {data, byLabel} = route?.params ?? {};
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader titile={byLabel} />
        <ScrollView style={styles.root} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {data.length === 0 && (
              <View style={styles.noData}>
                <Text
                  style={{
                    color: Colors.TEXT1,
                  }}>
                  No photos
                </Text>
              </View>
            )}

            {data?.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(NavigationScreenName.PHOTO_NAVIGATOR, {
                    initialRouteName: item,
                  })
                }>
                {loading && (
                  <ActivityIndicator
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      alignSelf: 'center',
                      top: '40%',
                    }}
                    size="small"
                    color={Colors.PRIMARY}
                  />
                )}
                <Image
                  onLoadEnd={() => setLoading(false)}
                  source={{uri: item.contentUrl}}
                  style={styles.image}
                  key={index}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default MonthPhotos;
