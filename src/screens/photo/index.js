/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {Text} from 'react-native-paper';
import styles from './style';
import Colors from '../../constants/Colors';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import {useQuery} from '@tanstack/react-query';
import {getRelatedTemplet} from '../../services/userServices/dashboard.services';
import {useFocusEffect} from '@react-navigation/native';

const PhotoStatus = ({navigation, route}) => {
  const {picData, picDeatils, businessDetails} = route?.params ?? {};
  console.log(picData, 'photoStatus');
  const [photoData, setPhotoData] = useState(picData ?? '');
  const {refetch: getRelatedTempletRefetch, data: getRelatedTemplet_Data} =
    useQuery({
      queryKey: ['getRelatedTemplet'],
      queryFn: () =>
        getRelatedTemplet({
          photoEntityId: picDeatils?._id,
        }),
      onSuccess: success => {},
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: false,
    });

  useFocusEffect(
    React.useCallback(() => {
      getRelatedTempletRefetch();
    }, [getRelatedTempletRefetch]),
  );

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
              picDeatils: picDeatils,
              businessDetails: businessDetails,
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
          <View style={styles.imageGrid}>
            {getRelatedTemplet_Data?.data?.list?.map((item, index) => (
              <TouchableOpacity
                onPress={() => setPhotoData(item?.contentUrl)}
                key={index}
                style={styles.uploadpic_container_image_view}>
                <Image
                  source={{uri: item?.contentUrl}}
                  style={styles.uploadpic_container_image}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default PhotoStatus;
