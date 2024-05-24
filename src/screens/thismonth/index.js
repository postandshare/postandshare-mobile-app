import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import images, {uploadedImages} from '../../constants/images';
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
      <TopHeader titile={byLabel} />
      <ImageBackground
        source={images.background}
        style={globalStyles?.backgroundImage}>
        <ScrollView style={styles.root} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {data.length === 0 && (
              <View style={styles.noData}>
                <Text style={styles.noDataText}>
                  No photos uploaded for this month
                </Text>
              </View>
            )}

            {data.map((item, index) => (
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
                  source={{uri: item.photo}}
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
