/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {Text} from 'react-native-paper';
import Colors from '../../constants/Colors';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import {useQuery} from '@tanstack/react-query';
import {getRelatedTemplate} from '../../services/userServices/mobileDashboard.services';
import {useIsFocused} from '@react-navigation/native';
import NavigationScreenName from '../../constants/NavigationScreenName';
import styles from './style';
const ViewCategoryImages = ({navigation, route}) => {
  const {picData} = route?.params;
  const isFocused = useIsFocused();
  const [photoData, setPhotoData] = useState(picData?.contentUrl ?? '');
  const [templateData, setTemplateData] = useState([]);
  const {
    isLoading: getRelatedTemplateLoading,
    isFetching: getRelatedTemplateFetching,
    refetch: getRelatedTemplateRefetch,
  } = useQuery({
    queryKey: ['getRelatedTemplate', isFocused],
    queryFn: () =>
      getRelatedTemplate({
        categoryDocIds: JSON.stringify(picData?.categoryDocIds ?? []),
      }),
    onSuccess: success => {
      setTemplateData(success?.data?.list);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader
          titile={'Photo Status'}
          next={'Next'}
          onPress={() =>
            navigation.navigate(NavigationScreenName.WORK_PROFILE_LIST, {
              picData,
            })
          }
        />
        <ScrollView
          style={{flexGrow: 1, backgroundColor: Colors.transparent}}
          refreshControl={
            <RefreshControl
              refreshing={
                getRelatedTemplateLoading || getRelatedTemplateFetching
              }
              onRefresh={getRelatedTemplateRefetch}
            />
          }>
          <View style={styles.container}>
            <Image
              source={{
                uri: photoData ?? picData?.contentUrl,
              }}
              style={styles.Image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.text}>Select Photo</Text>

          <View style={styles.imageGrid}>
            {templateData?.map((item, index) => (
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

export default ViewCategoryImages;
