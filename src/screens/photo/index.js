import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';
import styles from './style';
import Colors from '../../constants/Colors';
import images, {uploadedImages} from '../../constants/images';
import globalStyles from '../../styles/globalStyles';

const PhotoStatus = ({navigation, route}) => {
  const {picData, picDeatils, businessDetails} = route?.params ?? {};
  console.log(picData, 'photoStatus');
  const [photoData, setPhotoData] = useState(picData ? picData : '');
  // select photo of the further editing processes

  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader
          titile={'Photo Status'}
          next={'Next'}
          onPress={() =>
            navigation.navigate('CustomSDK', {
              picData: photoData,
            })
          }
        />
        <View style={styles.container}>
          <Image
            source={{
              uri: photoData,
            }}
            style={styles.Image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.text}>Select Photo</Text>
        <ScrollView style={{flexGrow: 1, backgroundColor: Colors.transparent}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.uploadpic_container}>
            <View style={styles.imageGrid}>
              {uploadedImages?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setPhotoData(item?.pic)}
                  key={index}
                  style={styles.uploadpic_container_image_view}>
                  <Image
                    source={item?.pic}
                    style={styles.uploadpic_container_image}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default PhotoStatus;
