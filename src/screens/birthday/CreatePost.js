/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import {useQuery} from '@tanstack/react-query';
import {getTemplets} from '../../services/userServices/eventTemplate.services';
import {useFocusEffect} from '@react-navigation/native';

const CreatePost = ({route, navigation}) => {
  const {eventType, selectedFilter} = route?.params || {};

  const {
    isLoading: getTempletsLoading,
    isFetching: getTempletsFetching,
    refetch: getTempletsRefetch,
    data: getTemplets_Data,
    isError: getTemplets_isError,
  } = useQuery({
    queryKey: ['getTemplets'],
    queryFn: () =>
      getTemplets({
        templetType: selectedFilter,

        eventType: eventType,
      }),
    onSuccess: success => {
      console.log(success?.data, 'sucess?.data');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      getTempletsRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, getTempletsRefetch]),
  );

  return (
    <>
      <ImageBackground
        source={images?.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader titile={'Create Post'} />
        <ScrollView
          contentContainerStyle={styles.root}
          showsVerticalScrollIndicator={false}>
          {getTemplets_Data?.data?.data?.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={styles?.templet}>
                <Text style={{}}>Create Post Templated</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CreatePost;
