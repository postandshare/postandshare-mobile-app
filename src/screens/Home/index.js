/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './style';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import CustomCarousel from '../../components/CustomCarousel';
import FlatListComponent from './components/FlatListComponent';
import {useQuery} from '@tanstack/react-query';
import {
  getDashboardContent,
  getTrendingContent,
} from '../../services/userServices/mobileDashboard.services';
import OneSignal from 'react-native-onesignal';
import {saveAppNotificationToken} from '../../services/userServices/profile.services';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../services/authServices/auth.services';
import {setUserDetails} from '../../services/reducer/CommonReducer';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import NavigationScreenName from '../../constants/NavigationScreenName';
import SkeletonLoading from './components/SkeletonLoading';
import {getBannerList} from '../../services/userServices/banner.service';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../constants/Colors';

const ListEndLoader = ({loading}) => {
  return (
    <View
      style={{
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {loading && <ActivityIndicator color={Colors.PRIMARY} />}
    </View>
  );
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    bannerList: [],
    trendingTemplates: [],
    templatesByBusiness: [],
    page: 1,
    pages: 1,
  });
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

  const {refetch: getUserProfileRefetch, data: getUserProfile_Data} = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: () => getUserProfile(),
    onSuccess: success => {
      dispatch(setUserDetails(success?.data?.obj));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    isLoading: getBannerListLoading,
    isFetching: getBannerListFetching,
    refetch: getBannerListRefetch,
  } = useQuery({
    queryKey: ['getBannerList'],
    queryFn: () => getBannerList(),
    onSuccess: success => {
      setState(prev => ({
        ...prev,
        bannerList: success?.data?.list ?? [],
      }));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    isFetching: getDashboardContentFetching,
    refetch: getDashboardContentRefetch,
  } = useQuery({
    queryKey: ['getDashboardContent' + state?.page],
    queryFn: () =>
      getDashboardContent({
        page: state?.page,
      }),
    onSuccess: success => {
      if (success?.data?.list?.length === 0) return;
      if (success?.data?.page === 1) {
        setState(prev => ({
          ...prev,
          templatesByBusiness: success?.data?.list,
          page: success?.data?.page,
          pages: success?.data?.pages,
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        templatesByBusiness: [
          ...prev?.templatesByBusiness,
          ...success?.data?.list,
        ],
        page: success?.data?.page ?? 1,
        pages: success?.data?.pages ?? 1,
      }));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    refetch: getTrendingContentRefetch,
    isFetching: getTrendingContentFetching,
  } = useQuery({
    queryKey: ['getTrendingContent'],
    queryFn: () => getTrendingContent(),
    onSuccess: success => {
      setState(prev => ({
        ...prev,
        trendingTemplates: success?.data?.list ?? [],
      }));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

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
  }, []);
  useEffect(() => {
    getOnesignalData();
  }, []);

  const fetchMore = () => {
    if (
      state.page < state.pages &&
      !getDashboardContentFetching &&
      state.templatesByBusiness.length > 0
    ) {
      setState(prev => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const scrollViewRef = useRef(null);

  const handleRefresh = () => {
    setState(prev => ({
      ...prev,
      page: 1,
      templatesByBusiness: [],
    }));
  };

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

        <FlatList
          ref={scrollViewRef}
          data={state?.templatesByBusiness}
          contentContainerStyle={{paddingBottom: 100}}
          refreshControl={
            <RefreshControl
              refreshing={
                getBannerListLoading ||
                getBannerListFetching ||
                getDashboardContentFetching ||
                getTrendingContentFetching
              }
              onRefresh={async () => {
                handleRefresh();
                getTrendingContentRefetch();
                getUserProfileRefetch();
                getBannerListRefetch();
                getDashboardContentRefetch();
              }}
            />
          }
          ListHeaderComponent={
            getTrendingContentFetching || getBannerListFetching ? (
              <SkeletonLoading />
            ) : (
              <View style={styles.root}>
                <View style={{padding: 5}}>
                  <CustomCarousel
                    width={'98%'}
                    navigation={navigation}
                    data={state.bannerList}
                  />
                </View>

                {/* container for showing the trending template */}
                {state?.trendingTemplates?.length > 0 ? (
                  <FlatListComponent
                    navigation={navigation}
                    data={state?.trendingTemplates}
                    byLabel={'Trending'}
                  />
                ) : null}
              </View>
            )
          }
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            if (item?.contnts?.length > 0) {
              return (
                <FlatListComponent
                  key={index}
                  navigation={navigation}
                  data={item?.contnts}
                  byLabel={item?.subCategory}
                />
              );
            }
            return null;
          }}
          ListFooterComponent={
            <ListEndLoader loading={getDashboardContentFetching} />
          }
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
        />
      </ImageBackground>
    </>
  );
};

export default Home;
