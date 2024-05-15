/* eslint-disable react-hooks/exhaustive-deps */
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import MyBussinessCard from '../../components/MyBussinessCard';
import images from '../../constants/images';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {getUserProfile} from '../../services/userServices/profile.services';
import globalStyles from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import SearchSortFilter from '../../components/SearchSortFilter';

const SelectBussiness = ({route, navigation}) => {
  const {picData} = route?.params;
  /******************************************************************************* */
  /*****************************SearchSortFilterWork****************************** */
  /******************************************************************************* */
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest');

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

  const filteredBusinesses = getAllBusinessList_Data?.data?.list?.filter(
    business =>
      business?.businessName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      business?.volunteerName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const sortedBusinesses = [...(filteredBusinesses || [])].sort((a, b) => {
    switch (sortOption) {
      case 'AtoZ':
        return (a?.businessName ?? a?.volunteerName)?.localeCompare(
          b?.businessName ?? b?.volunteerName,
        );
      case 'ZtoA':
        return (b?.businessName ?? b?.volunteerName)?.localeCompare(
          a?.businessName ?? a?.volunteerName,
        );
      case 'Newest':
        return new Date(b?.createdOn) - new Date(a?.createdOn);
      case 'Oldest':
        return new Date(a?.createdOn) - new Date(b?.createdOn);
      default:
        return 0;
    }
  });

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
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                getAllBusinessListFetching || getAllBusinessListLoading
              }
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

          {searchQuery.length > 0 && sortedBusinesses.length === 0 && (
            <View style={styles.padded}>
              <CustomButton
                title={'No Business Found'}
                secondary={false}
                customStyle={styles.premium_Buttton}
              />
            </View>
          )}

          <View style={styles.container}>
            <SearchSortFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />

            {sortedBusinesses?.map((item, index) => (
              <MyBussinessCard
                key={index}
                name={item?.businessName ?? item?.volunteerName}
                EstblishmentDate={item?.createdOn}
                image={item?.logo ?? item?.partyLogo}
                userDocId={item?._id}
                lastUpdated={item?.lastUpdated ?? item?.createdOn}
                data={item}
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
      </ImageBackground>
    </>
  );
};

export default SelectBussiness;
