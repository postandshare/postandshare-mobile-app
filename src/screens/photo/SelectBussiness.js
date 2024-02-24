/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useCallback} from 'react';
import MyBussinessCard from '../../components/MyBussinessCard';
import images from '../../constants/images';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';

const SelectBussiness = ({route, navigation}) => {
  const {picData} = route?.params;
  console.log(picData, 'selectbussiness');

  const {
    isLoading: getAllBusinessListLoading,
    isFetching: getAllBusinessListFetching,
    refetch: getAllBusinessListRefetch,
    data: getAllBusinessList_Data,
    isError: getAllBusinessList_isError,
  } = useQuery({
    queryKey: ['getAllBusinessList'],
    queryFn: () => getAllBusinessList(),
    onSuccess: success => {
      // console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      getAllBusinessListRefetch();
    }, [getAllBusinessListRefetch, navigation]),
  );

  return (
    <>
      <TopHeader titile={'Select Bussiness'} />
      <ScrollView contentContainerStyle={styles.root}>
        {/* card for the bussiness name and update */}
        <View style={styles.container}>
          {getAllBusinessList_Data?.data?.list?.map((item, index) => (
            <MyBussinessCard
              key={index}
              name={item?.businessName}
              EstblishmentDate={item?.createdOn}
              image={item?.logo}
              userDocId={item?._id}
              lastUpdated={item?.lastUpdated ?? item?.createdOn}
              // edit={true}
              // onPressEdit={() =>
              //   navigation.navigate('Edit Bussiness', {
              //     businessId: item?._id,
              //     businessType:item?.businessType,
              //   })
              // }
              onPress={() =>
                picData
                  ? navigation.navigate('CustomSDK', {
                      picData: picData?.pic,
                    })
                  : navigation.navigate('View Bussiness', {
                      businessId: item?._id,
                      businessType: item?.businessType,
                    })
              }
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SelectBussiness;
