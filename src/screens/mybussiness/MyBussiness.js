/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, ScrollView, ToastAndroid, View} from 'react-native';
import React, {useCallback} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import MyBussinessCard from '../../components/MyBussinessCard';
import CustomButton from '../../components/CustomButton';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';

const MyBussiness = ({navigation, route}) => {
  const {picData} = route.params || {};
  const PhotoData = picData;

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
      <TopHeader
        titile={'MyBussiness'}
        add
        onPress={() => navigation.navigate('Add Bussiness')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getAllBusinessListFetching || getAllBusinessListLoading}
            onRefresh={() => getAllBusinessListRefetch()}
          />
        }
        contentContainerStyle={styles.root}>
        {/* card for the bussiness name and update */}
        <View style={styles.container}>
          {getAllBusinessList_Data?.data?.list?.map((item, index) => (
            <MyBussinessCard
              key={index}
              name={item?.businessName ?? item?.volunteerName}
              EstblishmentDate={item?.createdOn}
              image={item?.logo ?? item?.partyLogo}
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
                      picData: PhotoData,
                    })
                  : item?.businessType === 'political'
                  ? navigation.navigate('View Political', {
                      businessId: item?._id,
                      businessType: item?.businessType,
                    })
                  : navigation.navigate('View Bussiness', {
                      businessId: item?._id,
                      businessType: item?.businessType,
                    })
              }
            />
          ))}
        </View>

        <CustomButton
          title={'Premium'}
          secondary={false}
          customStyle={styles.premium_Buttton}
        />
      </ScrollView>
    </>
  );
};

export default MyBussiness;
