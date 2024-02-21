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
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Skeleton} from 'moti/skeleton';
import {MotiView} from 'moti';
import Sizes from '../../constants/Sizes';

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

  const Spacer = ({height = 16}) => <View style={{height}} />;

  const skeletonLoading = (
    <MotiView
      transition={{
        type: 'timing',
      }}
      style={styles.container}
      animate={{backgroundColor: '#f5f5f5'}}>
      <Skeleton
        colorMode={'light'}
        radius="round"
        height={95}
        width={95}
        alingSele
      />
      <Spacer />
      <Skeleton
        height={Sizes.hp('10%')}
        width={Sizes.wp('90%')}
        colorMode="light"
      />
      <Spacer />
      <Skeleton
        height={Sizes.hp('10%')}
        width={Sizes.wp('90%')}
        colorMode="light"
      />
      <Spacer />
      <Skeleton
        height={Sizes.hp('10%')}
        width={Sizes.wp('90%')}
        colorMode="light"
      />
      <Spacer />
      <Skeleton
        height={Sizes.hp('10%')}
        width={Sizes.wp('90%')}
        colorMode="light"
      />
      <Spacer />
    </MotiView>
  );

  return (
    <>
      <TopHeader
        titile={'Profile'}
        IconProp={
          <FontAwesome name={'edit'} size={25} color={Colors.SECONDRY} />
        }
        onPress={() =>
          navigation.navigate('EditProfile', {
            data: getUserProfile_Data?.data?.obj,
          })
        }
      />
      <ScrollView
        contentContainerStyle={styles.root}
        refreshControl={
          <RefreshControl
            refreshing={getUserProfileFetching || getUserProfileLoading}
            onRefresh={() => getUserProfileRefetch()}
          />
        }>
        {getUserProfileLoading || getUserProfileFetching ? (
          skeletonLoading
        ) : (
          <>
            {/* image of the profile */}
            <View style={styles.image_wrap}>
              <Image
                source={
                  getUserProfile_Data?.data?.obj?.profilePic
                    ? {uri: getUserProfile_Data?.data?.obj?.profilePic}
                    : images.akSchoolIcon
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

              <ViewBox
                title={'Gender'}
                value={getUserProfile_Data?.data?.obj?.gender}
              />

              <ViewBox
                title={'WhatsApp Number'}
                value={getUserProfile_Data?.data?.obj?.whatsappNumber}
              />

              
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default ProfileView;
