import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
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
import {useQuery} from '@tanstack/react-query';
import {getRelatedTemplet} from '../../services/userServices/dashboard.services';
import {useFocusEffect} from '@react-navigation/native';

const PhotoStatus = ({navigation, route}) => {
  const {picData, picDeatils, businessDetails} = route?.params ?? {};
  console.log(picData, 'photoStatus');
  const [photoData, setPhotoData] = useState(picData ?? '');
  const {
    isLoading: getRelatedTempletLoading,
    isFetching: getRelatedTempletFetching,
    refetch: getRelatedTempletRefetch,
    data: getRelatedTemplet_Data,
    isError: getRelatedTemplet_isError,
  } = useQuery({
    queryKey: ['getRelatedTemplet'],
    queryFn: () =>
      getRelatedTemplet({
        _id: picDeatils?._id,
      }),
    onSuccess: success => {
      // console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      getRelatedTempletRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, getRelatedTempletRefetch]),
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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.uploadpic_container}>
            <View style={styles.imageGrid}>
              {getRelatedTemplet_Data?.data?.list?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setPhotoData(item?.photo)}
                  key={index}
                  style={styles.uploadpic_container_image_view}>
                  <Image
                    source={{uri: item?.photo}}
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
