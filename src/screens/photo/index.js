import {
  FlatList,
  Image,
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
import {uploadedImages} from '../../constants/images';

const PhotoStatus = ({navigation, route}) => {
  const {picData} = route.params;
  console.log(picData, 'photoStatus');
  const [photoData, setPhotoData] = useState(picData ? picData?.pic : '');
  // select photo of the further editing processes

  return (
    <>
      <TopHeader
        titile={'Photo Status'}
        next={'Next'}
        onPress={() => 
          navigation.navigate('CustomSDK', {
            picData: photoData,
          })}
      />
      <ScrollView style={{flexGrow: 1, backgroundColor: Colors.Background}}>
        <View style={styles.container}>
          <Image source={photoData} style={styles.Image} resizeMode="contain" />
        </View>

        <Text style={styles.text}>Select Photo</Text>
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
    </>
  );
};

export default PhotoStatus;
