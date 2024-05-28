import {
  Alert,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import {getUserProfile} from '../../services/userServices/profile.services';
import {useQuery} from '@tanstack/react-query';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Skeleton} from 'moti/skeleton';
import {MotiView} from 'moti';
import Sizes from '../../constants/Sizes';
import {useDispatch} from 'react-redux';
import {setProfileUpdated} from '../../services/reducer/CommonReducer';
import ProfileDetails from './components/ProfileDetails';
import SocialMediaDetails from './components/SocialMediaDetails';
import AddressDetails from './components/AddressDetails';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';

const ProfileView = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    isLoading: getUserProfileLoading,
    isFetching: getUserProfileFetching,
    refetch: getUserProfileRefetch,
    data: getUserProfile_Data,
    isError: getUserProfile_isError,
  } = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: () => getUserProfile(),
    onSuccess: success => {
      if (success?.data?.obj?.isProfileUpdated == false) {
        Alert.alert(
          'Post And Share App',
          'Please update your profile to continue',
          [
            {
              text: 'Cancel',
              onPress: () =>
                navigation.navigate(NavigationScreenName?.LANGUAGE_SELECTION),
              style: 'cancel',
            },
            {
              text: 'Update',
              onPress: () =>
                navigation.navigate('EditProfile', {
                  data: getUserProfile_Data?.data?.obj,
                }),
            },
          ],
          {cancelable: false},
        );
      }
      if (success?.data?.obj?.isProfileUpdated == true) {
        dispatch(setProfileUpdated(true));
      }
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      getUserProfileRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
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
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <DashboardTopHeader
          title="Profile"
          onPressMenu={() => navigation.openDrawer()}
          onPressNotification={() => navigation.navigate('Notification')}
          IconProp={
            <FontAwesome name={'edit'} size={25} color={Colors.TEXT1} />
          }
          onPressIcon={() =>
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
              {/* profile details component */}
              <ProfileDetails data={getUserProfile_Data?.data?.obj} />

              <Text style={styles.title}>Social Media</Text>
              {/* social media details */}
              <SocialMediaDetails data={getUserProfile_Data?.data?.obj} />

              <Text style={styles.title}>Address</Text>
              <AddressDetails data={getUserProfile_Data?.data?.obj} />
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ProfileView;
