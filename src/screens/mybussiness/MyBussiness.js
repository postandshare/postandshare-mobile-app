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
import TopHeader from '../../components/TopHeader';
import styles from './style';
import MyBussinessCard from '../../components/MyBussinessCard';
import CustomButton from '../../components/CustomButton';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import {Button, Menu, Portal, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ViewBussinessModal from './components/modal/ViewBussinessModal';
import {getPoliticalPartyDetails} from '../../services/userServices/political.services';

const MyBussiness = ({navigation, route}) => {
  const {picData} = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const PhotoData = picData;
  const [visible, setVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Newest');
  const [showBussiness, setShowBussiness] = useState({
    show: false,
    businessId: '',
    businessType: '',
  });
  const [bussinessList, setBussinessList] = useState([]);
  const [detailedBussiness, setDetailedBussiness] = useState();
  const {
    isLoading: getAllBusinessListLoading,
    isFetching: getAllBusinessListFetching,
    refetch: getAllBusinessListRefetch,
    data: getAllBusinessList_Data,
    isError: getAllBusinessList_isError,
  } = useQuery({
    queryKey: ['getAllBusinessList'],
    queryFn: () => {
      if (showBussiness?.show) {
        return getAllBusinessList({
          businessDocId: showBussiness?.businessId,
          businessType: showBussiness?.businessType,
        });
      } else {
        return getAllBusinessList();
      }
    },
    onSuccess: success => {
      if (showBussiness?.show) {
        console.log(success?.data, 'success');
        setDetailedBussiness(success?.data?.obj);
      } else {
        setBussinessList(success?.data?.list);
      }
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    isLoading: getPoliticalPartyDetailsLoading,
    isFetching: getPoliticalPartyDetailsFetching,
    refetch: getPoliticalPartyDetailsRefetch,
    data: getPoliticalPartyDetails_Data,
    isError: getPoliticalPartyDetails_isError,
  } = useQuery({
    queryKey: ['getPoliticalPartyDetails'],
    queryFn: () =>
      getPoliticalPartyDetails({
        politicalBusinessDocId: showBussiness?.businessId,
      }),
    onSuccess: success => {
      console.log(success?.data, 'success');
      setDetailedBussiness(success?.data?.obj);
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

  useFocusEffect(
    useCallback(() => {
      if (showBussiness?.show) {
        if (showBussiness?.businessType === 'political') {
          getPoliticalPartyDetailsRefetch();
        } else getAllBusinessListRefetch();
      }
    }, [showBussiness, getAllBusinessListRefetch]),
  );

  const filteredBusinesses = bussinessList?.filter(
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
        titile={'MyBussiness'}
        add
        onPress={() => navigation.navigate('Add Bussiness')}
      />
      <Portal>
        <ViewBussinessModal
          detailedBussiness={detailedBussiness}
          showBussiness={showBussiness?.show}
          setShowBussiness={setShowBussiness}
          handleEdit={() => {
            if (showBussiness?.businessType === 'political') {
              navigation.navigate('Add Bussiness', {
                businessId: showBussiness?.businessId,
                bussinessDetails: getPoliticalPartyDetails_Data?.data?.obj,
              });
            } else {
              navigation.navigate('Add Bussiness', {
                businessId: showBussiness?.businessId,
                bussinessDetails: getAllBusinessList_Data?.data?.obj,
              });
            }
          }}
          handleDelailedView={() => {
            if (showBussiness?.businessType === 'political') {
              navigation.navigate('View Political', {
                businessId: showBussiness?.businessId,
                businessType: showBussiness?.businessType,
              });
            } else {
              navigation.navigate('View Bussiness', {
                businessId: showBussiness?.businessId,
                businessType: showBussiness?.businessType,
              });
            }
          }}
        />
      </Portal>
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                getAllBusinessListFetching || getAllBusinessListLoading
              }
              onRefresh={() => getAllBusinessListRefetch()}
            />
          }
          contentContainerStyle={styles.root}>
          <View style={styles.container}>
            {/* search option for bussineess */}
            <View style={styles.row_container}>
              <TextInput
                mode="outlined"
                label={'Search'}
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
              />
              <Menu
                visible={visible}
                contentStyle={{
                  backgroundColor: Colors.Background,
                }}
                onDismiss={() => setVisible(false)}
                anchor={
                  <TouchableOpacity
                    style={styles.sortButtonContainer}
                    onPress={() => setVisible(true)}>
                    <FontAwesome name="sort" size={15} color={Colors.white} />
                    <Text style={styles.sortText}>
                      {sortOption === 'Newest' ? 'Newest' : sortOption}
                    </Text>
                  </TouchableOpacity>
                }>
                <Menu.Item
                  title="A to Z"
                  onPress={() => {
                    setSortOption('AtoZ');
                    setVisible(false);
                  }}
                  icon={sortOption === 'AtoZ' ? 'check' : 'none'}
                />
                <Menu.Item
                  title="Z to A"
                  onPress={() => {
                    setSortOption('ZtoA');
                    setVisible(false);
                  }}
                  icon={sortOption === 'ZtoA' ? 'check' : 'none'}
                />
                <Menu.Item
                  title="Newest"
                  onPress={() => {
                    setSortOption('Newest');
                    setVisible(false);
                  }}
                  icon={sortOption === 'Newest' ? 'check' : 'none'}
                />
                <Menu.Item
                  title="Oldest"
                  onPress={() => {
                    setSortOption('Oldest');
                    setVisible(false);
                  }}
                  icon={sortOption === 'Oldest' ? 'check' : 'none'}
                />
              </Menu>
            </View>
            {searchQuery.length > 0 && sortedBusinesses.length === 0 && (
              <View style={styles.padded}>
                <CustomButton
                  title={'No Business Found'}
                  secondary={false}
                  customStyle={styles.premium_Buttton}
                />
              </View>
            )}

            {sortedBusinesses?.map((item, index) => (
              <MyBussinessCard
                key={index}
                name={item?.businessName ?? item?.volunteerName}
                EstblishmentDate={item?.createdOn}
                image={item?.logo ?? item?.partyLogo}
                userDocId={item?._id}
                lastUpdated={item?.lastUpdated ?? item?.createdOn}
                details={
                  item?.description ??
                  (item?.volunteerDetail === ''
                    ? 'No Description'
                    : item?.volunteerDetail)
                }
                onPress={() =>
                  picData
                    ? navigation.navigate('CustomSDK', {
                        picData: PhotoData,
                      })
                    : item?.businessType === 'political'
                    ? setShowBussiness({
                        show: true,
                        businessId: item?._id,
                        businessType: item?.businessType,
                      })
                    : setShowBussiness({
                        show: true,
                        businessId: item?._id,
                        businessType: item?.businessType,
                      })
                }
              />
            ))}

            {/* card for the bussiness name and update */}
            {!searchQuery &&
              !sortedBusinesses?.length &&
              bussinessList?.map((item, index) => (
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
                      : setShowBussiness({
                          show: true,
                          businessId: item?._id,
                          businessType: item?.businessType,
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

export default MyBussiness;
