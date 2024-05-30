/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './style';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import CustomCarousel from '../../components/CustomCarousel';
import FlatListComponent from './components/FlatListComponent';
import {useQuery} from '@tanstack/react-query';
import {
  getTemplatesByBusiness,
  getTemplatesByDate,
  getTemplatesForQuotes,
  getTemplatesOfGreatLeaders,
  getTrendingTemlpates,
} from '../../services/userServices/dashboard.services';
import {useFocusEffect} from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import {
  getUserProfile,
  saveAppNotificationToken,
} from '../../services/userServices/profile.services';
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../../services/reducer/CommonReducer';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import NavigationScreenName from '../../constants/NavigationScreenName';
import SkeletonLoading from './components/SkeletonLoading';

const Home = ({navigation}) => {
  const [value, setValue] = React.useState('photo');
  const [screenName, setScreenName] = useState('photo');
  const dispatch = useDispatch();
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    navigation.navigate(NavigationScreenName.NOTIFICATION);
  };
  const onPresProfile = () => {
    navigation.navigate('ProfileNavigator');
  };

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
      dispatch(setUserDetails(success?.data?.obj));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    isLoading: getTemplatesForQuotesLoading,
    isFetching: getTemplatesForQuotesFetching,
    refetch: getTemplatesForQuotesRefetch,
    data: getTemplatesForQuotes_Data,
    isError: getTemplatesForQuotes_isError,
  } = useQuery({
    queryKey: ['getTemplatesForQuotes'],
    queryFn: () =>
      getTemplatesForQuotes({
        allData: false,
      }),
    onSuccess: success => {
      // console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });
  const {
    isLoading: getTemplatesByDateLoading,
    isFetching: getTemplatesByDateFetching,
    refetch: getTemplatesByDateRefetch,
    data: getTemplatesByDate_Data,
    isError: getTemplatesByDate_isError,
  } = useQuery({
    queryKey: ['getTemplatesByDate'],
    queryFn: () =>
      getTemplatesByDate({
        allData: false,
      }),
    onSuccess: success => {
      // console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });
  const {
    isLoading: getTemplatesOfGreatLeadersLoading,
    isFetching: getTemplatesOfGreatLeadersFetching,
    refetch: getTemplatesOfGreatLeadersRefetch,
    data: getTemplatesOfGreatLeaders_Data,
    isError: getTemplatesOfGreatLeaders_isError,
  } = useQuery({
    queryKey: ['getTemplatesOfGreatLeaders'],
    queryFn: () =>
      getTemplatesOfGreatLeaders({
        allData: false,
      }),
    onSuccess: success => {
      // console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });
  const {
    isLoading: getTemplatesByBusinessLoading,
    isFetching: getTemplatesByBusinessFetching,
    refetch: getTemplatesByBusinessRefetch,
    data: getTemplatesByBusiness_Data,
    isError: getTemplatesByBusiness_isError,
  } = useQuery({
    queryKey: ['getTemplatesByBusiness'],
    queryFn: () =>
      getTemplatesByBusiness({
        allData: false,
      }),
    onSuccess: success => {
      // console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });
  const {
    isLoading: getTrendingTemlpatesLoading,
    isFetching: getTrendingTemlpatesFetching,
    refetch: getTrendingTemlpatesRefetch,
    data: getTrendingTemlpates_Data,
    isError: getTrendingTemlpates_isError,
  } = useQuery({
    queryKey: ['getTrendingTemlpates'],
    queryFn: () =>
      getTrendingTemlpates({
        allData: false,
      }),
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
      const fetchData = async () => {
        await getTemplatesByDateRefetch();
        await getTemplatesForQuotesRefetch();
        await getTemplatesOfGreatLeadersRefetch();
        await getTemplatesByBusinessRefetch();
        await getTrendingTemlpatesRefetch();
        await getUserProfileRefetch();
        getOnesignalData();
      };
      fetchData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      getTemplatesForQuotesRefetch,
      getTemplatesByDateRefetch,
      navigation,
      getTemplatesByBusinessRefetch,
      getTemplatesOfGreatLeadersRefetch,
      getTrendingTemlpatesRefetch,
    ]),
  );

  const getOnesignalData = useCallback(async () => {
    const data = await OneSignal.getDeviceState();
    const playerId = data?.userId;
    console.log(playerId, 'playerId');
    saveAppNotificationToken({
      userDocId: getUserProfile_Data?.data?.obj?._id,
      appNotificationToken: playerId,
    });

    //checking the user is already subscribe to onesignal or not
    const isSubscribed = data?.isSubscribed;
    if (!isSubscribed) {
      OneSignal.promptForPushNotificationsWithUserResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <DashboardTopHeader
          onPressMenu={onPressMenu}
          onPressNotification={onPressNotification}
          onPresProfile={onPresProfile}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                getTemplatesByDateLoading ||
                getTemplatesForQuotesLoading ||
                getTemplatesOfGreatLeadersLoading ||
                getTemplatesByDateFetching ||
                getTemplatesForQuotesFetching ||
                getTemplatesOfGreatLeadersFetching
              }
              onRefresh={() => {
                getTemplatesByDateRefetch();
                getTemplatesForQuotesRefetch();
                getTemplatesOfGreatLeadersRefetch();
              }}
            />
          }
          contentContainerStyle={
            {
              // marginBottom: Sizes.hp('10%'),
            }
          }
          nestedScrollEnabled>
          {getTemplatesByDateLoading ||
          getTemplatesForQuotesLoading ||
          getTemplatesOfGreatLeadersLoading ||
          getTemplatesByDateFetching ||
          getTemplatesForQuotesFetching ||
          getTemplatesOfGreatLeadersFetching ? (
            <SkeletonLoading />
          ) : (
            <View style={styles.root}>
              <View style={{padding: 5}}>
                <CustomCarousel
                  width={'98%'}
                  navigation={navigation}
                  data={getTrendingTemlpates_Data?.data?.list}
                />
              </View>

              {/* container for showing the templates by date */}

              {getTemplatesByDate_Data?.data?.list?.length > 0 ? (
                <FlatListComponent
                  navigation={navigation}
                  data={getTemplatesByDate_Data?.data?.list}
                  byLabel={'By Date'}
                />
              ) : null}

              {/* container for showing the templates for quotes */}
              {getTemplatesForQuotes_Data?.data?.list?.length > 0 ? (
                <FlatListComponent
                  navigation={navigation}
                  data={getTemplatesForQuotes_Data?.data?.list}
                  byLabel={'For Quotes'}
                />
              ) : null}
              {/* container for showing the templates for great leaders */}
              {getTemplatesOfGreatLeaders_Data?.data?.list?.length > 0 ? (
                <FlatListComponent
                  navigation={navigation}
                  data={getTemplatesOfGreatLeaders_Data?.data?.list}
                  byLabel={'For Great Leaders'}
                />
              ) : null}

              {/* CONTAINER FOR ALL TYPES OF BUSSINESS THAT USER HAVE IN HIS PROFILE */}
              {
                // getTemplatesByBusiness_Data?.data?.list?.length > 0
                //   ?
                getTemplatesByBusiness_Data?.data?.list?.map((item, index) => {
                  if (item?.photoList?.length > 0)
                    return (
                      <FlatListComponent
                        key={index}
                        navigation={navigation}
                        data={item?.photoList}
                        byLabel={item?.businessName}
                      />
                    );
                })
                // : null
              }
            </View>
          )}
        </ScrollView>

        {/* {value === 'video' ? (
          <TouchableOpacity
            style={globalStyles.add_button}
            onPress={() => {
              setValue('photo');
            }}>
            <MaterialIcons
              name={'photo-camera-back'}
              size={30}
              style={globalStyles.add_icon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={globalStyles.add_button}
            onPress={() => {
              setValue('video');
            }}>
            <MaterialIcons
              name={'photo-camera-front'}
              size={30}
              style={globalStyles.add_icon}
            />
          </TouchableOpacity>
        )} */}
      </ImageBackground>
    </>
  );
};

export default Home;
