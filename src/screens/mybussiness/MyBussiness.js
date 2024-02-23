/* eslint-disable react-hooks/exhaustive-deps */
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useReducer} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import MyBussinessCard from '../../components/MyBussinessCard';
import Images from '../../constants/images';
import CustomButton from '../../components/CustomButton';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';

const MyBussiness_Data = [
  {
    id: 1,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder1,
    userDocId: '1',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 2,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder2,
    userDocId: '2',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 3,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder1,
    userDocId: '3',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 4,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder2,
    userDocId: '4',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 5,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder1,
    userDocId: '5',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 6,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder2,
    userDocId: '6',
    lastUpdated: '20, Mar 2023',
  },
];

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
              name={item?.businessName}
              EstblishmentDate={item?.createdOn}
              image={item?.logo}
              userDocId={item?._id}
              lastUpdated={item?.lastUpdated ?? item?.createdOn}
              edit={true}
              onPressEdit={() =>
                navigation.navigate('Edit Bussiness', {
                  businessId: item?._id,
                  businessType:item?.businessType,
                })
              }
              onPress={() =>
                picData
                  ? navigation.navigate('CustomSDK', {
                      picData: PhotoData,
                    })
                  : navigation.navigate('View Bussiness', {
                      businessId: item?._id,
                      businessType:item?.businessType,
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

{
  /* <Button onPress={()=> navigation.navigate('Add Bussiness')}>Add Bussiness</Button>
<Button onPress={()=> navigation.navigate('Edit Bussiness')}>Edit Bussiness</Button> */
}
