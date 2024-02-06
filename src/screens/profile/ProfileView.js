import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import images from '../../constants/images';
import {getUserProfile} from '../../services/userServices/profile.services';
import {useQuery} from '@tanstack/react-query';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ViewBox = ({title, value}) => {
  return (
    <View style={styles.view_box}>
      <Text style={styles.view_box_title}>{title}</Text>
      <Text style={styles.view_box_value}>{value}</Text>
    </View>
  );
};
const ProfileView = ({}) => {
  const navigation = useNavigation();

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
    useCallback(() => {
      getUserProfileRefetch();
    }, [getUserProfileRefetch]),
  );


  return (
    <>
      <TopHeader titile={'Profile'}/>
      <ScrollView
        contentContainerStyle={styles.root}
        refreshControl={
          <RefreshControl
            refreshing={getUserProfileFetching || getUserProfileLoading}
            onRefresh={() => getUserProfileRefetch()}
          />
        }>
        {/* image of the profile */}
        <View style={styles.image_wrap}>
          <Image
            source={
              // getUserProfile_Data?.data?.obj?.profilePic
              //   ? {uri: getUserProfile_Data?.data?.obj?.profilePic}
              //   :
              images.akSchoolIcon
            }
            style={styles.profile_pic}
          />
        </View>

        {/* name of the profile */}
        <Text style={styles.name_text}>
          {getUserProfile_Data?.data?.obj?.firstName}{' '}
          {getUserProfile_Data?.data?.obj?.middle}{' '}
          {getUserProfile_Data?.data?.obj?.lastName}
        </Text>

        {/* other details of the profile */}
        <View style={styles.other_details}>
          <ViewBox
            title={'Email'}
            value={getUserProfile_Data?.data?.obj?.email}
          />
          <ViewBox
            title={'Phone'}
            value={getUserProfile_Data?.data?.obj?.mobileNumber}
          />
          <ViewBox
            title={'Address'}
            value={
              getUserProfile_Data?.data?.obj?.currentAddress?.address +
              ' ' +
              getUserProfile_Data?.data?.obj?.currentAddress?.dist +
              ' ' +
              getUserProfile_Data?.data?.obj?.currentAddress?.state +
              ' ' +
              getUserProfile_Data?.data?.obj?.currentAddress?.pinCode
            }
          />

          <ViewBox
            title={'Date of Birth'}
            value={moment(getUserProfile_Data?.data?.obj?.DOB).format('LL')}
          />


        </View>
      </ScrollView>
    </>
  );
};

export default ProfileView;
