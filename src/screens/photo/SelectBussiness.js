/* eslint-disable react-hooks/exhaustive-deps */
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useState} from 'react';
import images from '../../constants/images';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import {useQuery} from '@tanstack/react-query';
import NavigationScreenName from '../../constants/NavigationScreenName';
import globalStyles from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import SearchSortFilter from '../../components/SearchSortFilter';
import {getProfileListForContent} from '../../services/userServices/profile.services';
import ShowProfileCard from '../../components/ShowProfileCard';

const SelectBussiness = ({route, navigation}) => {
  const {picData} = route?.params ?? {};
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest');

  const {
    isLoading: getProfileListForContentLoading,
    isFetching: getProfileListForContentFetching,
    refetch: getProfileListForContentRefetch,
    data: getProfileListForContent_Data,
  } = useQuery({
    queryKey: ['getProfileListForContent'],
    queryFn: () => getProfileListForContent(),
    onSuccess: success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  const filteredBusinesses = getProfileListForContent_Data?.data?.list?.filter(
    business =>
      business?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const sortedBusinesses = [...(filteredBusinesses || [])].sort((a, b) => {
    switch (sortOption) {
      case 'AtoZ':
        return a?.name?.localeCompare(b?.name);
      case 'ZtoA':
        return b?.name?.localeCompare(a?.name);
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
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
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
              refreshing={
                getProfileListForContentFetching ||
                getProfileListForContentLoading
              }
              onRefresh={getProfileListForContentRefetch}
            />
          }
          contentContainerStyle={styles.root}>
          {/* card for the bussiness name and update */}
          <SearchSortFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          {/* <Text style={styles.text}>Your Profile</Text> */}

          {/* <ShowProfileCard
            item={getUserProfile_Data?.data?.obj}
            onPress={() =>
              picData
                ? navigation.navigate('CustomSDK', {
                    picData: picData,
                    businessDetails: getUserProfile_Data?.data?.obj,
                  })
                : null
            }
          />
          <Text style={styles.text}>Your Business</Text> */}
          {getProfileListForContent_Data?.data?.list?.length === 0 && (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>
                You have not added any Work Profile yet {'\n'}
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
            {!getProfileListForContent_Data?.data?.list?.length === 0 && (
              <SearchSortFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            )}

            {sortedBusinesses?.map((item, index) => (
              <ShowProfileCard
                item={item}
                key={index}
                onPress={() =>
                  navigation.navigate('CustomSDK', {
                    picData: picData,
                    businessDetails: item,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SelectBussiness;
