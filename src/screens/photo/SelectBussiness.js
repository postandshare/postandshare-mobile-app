/* eslint-disable react-hooks/exhaustive-deps */
import {
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import MyBussinessCard from '../../components/MyBussinessCard';
import images from '../../constants/images';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {getUserProfile} from '../../services/userServices/profile.services';

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

  const {
    isLoading: getUserProfileLoading,
    isFetching: getUserProfileFetching,
    refetch: getUserProfileRefetch,
    data: getUserProfile_Data,
    isError: getUserProfile_isError,
  } = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: () => getUserProfile(),
    onSuccess: success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      getUserProfileRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserProfileRefetch, navigation]),
  );

  useFocusEffect(
    useCallback(() => {
      getAllBusinessListRefetch();
    }, [getAllBusinessListRefetch, navigation]),
  );

  console.log(getUserProfile_Data?.data?.obj?.profilePic, 'user profile');

  return (
    <>
      <TopHeader
        titile={'Select Bussiness'}
        add
        onPress={() =>
          navigation.navigate(NavigationScreenName.MY_BUSSINESS, {
            screen: 'Add Bussiness',
          })
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getAllBusinessListFetching || getAllBusinessListLoading}
            onRefresh={getAllBusinessListRefetch}
          />
        }
        contentContainerStyle={styles.root}>
        {/* card for the bussiness name and update */}

        {getAllBusinessList_Data?.data?.list?.length === 0 && (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>
              You have not added any bussiness yet {'\n'}
              Please add a bussiness to continue
            </Text>
          </View>
        )}

        <View style={styles.container}>
          {getAllBusinessList_Data?.data?.list?.map((item, index) => (
            <MyBussinessCard
              key={index}
              name={item?.businessName ?? item?.volunteerName}
              EstblishmentDate={item?.createdOn}
              image={item?.logo ?? item?.partyLogo}
              userDocId={item?._id}
              lastUpdated={item?.lastUpdated ?? item?.createdOn}
              onPress={() =>
                picData
                  ? navigation.navigate('CustomSDK', {
                      picData: picData?.photo,
                      businessDetails: item,
                    })
                  : navigation.navigate('View Bussiness', {
                      businessId: item?._id,
                      businessType: item?.businessType,
                    })
              }
            />
          ))}

          <Text style={styles.text}>Your Profile</Text>
          {/* <MyBussinessCard */}
          <MyBussinessCard
            name={
              getUserProfile_Data?.data?.obj?.firstName
                ? getUserProfile_Data?.data?.obj?.firstName
                : '-' + getAllBusinessList_Data?.data?.obj?.middleName
                ? getUserProfile_Data?.data?.obj?.middleName
                : '-' + getUserProfile_Data?.data?.obj?.lastName
                ? getUserProfile_Data?.data?.obj?.lastName
                : '-'
            }
            EstblishmentDate={getUserProfile_Data?.data?.obj?.DOB}
            image={getUserProfile_Data?.data?.obj?.profilePic}
            userDocId={getUserProfile_Data?.data?.obj?._id}
            // lastUpdated={item?.lastUpdated ?? item?.createdOn}
            onPress={
              () =>
                picData
                  ? navigation.navigate('CustomSDK', {
                      picData: picData?.photo,
                      businessDetails: getUserProfile_Data?.data?.obj,
                    })
                  : null
              // : navigation.navigate('View Bussiness', {
              //     businessId: item?._id,
              //     businessType: item?.businessType,
              //   })
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default SelectBussiness;
