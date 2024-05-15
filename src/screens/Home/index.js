/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './style';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
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
import {MotiText, MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import OneSignal from 'react-native-onesignal';
import {
  getUserProfile,
  saveAppNotificationToken,
} from '../../services/userServices/profile.services';
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../../services/reducer/CommonReducer';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const [value, setValue] = React.useState('photo');
  const [screenName, setScreenName] = useState('photo');
  const dispatch = useDispatch();
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    ToastAndroid.show('Notification is release soon', ToastAndroid.SHORT);
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
    queryFn: () => getTemplatesForQuotes(),
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
    queryFn: () => getTemplatesByDate(),
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
    queryFn: () => getTemplatesOfGreatLeaders(),
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
    queryFn: () => getTemplatesByBusiness(),
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
    queryFn: () => getTrendingTemlpates(),
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

  // const Spacer = ({width = 16}) => <View style={{width}} />;
  // const skeletonText = ({label}) => (
  //   <Text style={styles.skeletonText}>{label}</Text>
  // );

  // const skeletonLoading = (
  //   <MotiView
  //     transition={{
  //       type: 'timing',
  //     }}
  //     style={[styles.container , {

  //     }]}
  //     animate={{backgroundColor: '#f5f5f5'}}>
  //    <Spacer />
  //     <Skeleton
  //       height={Sizes.hp('10%')}
  //       width={Sizes.wp('20%')}
  //       colorMode="light"
  //     />
  //     <Spacer />
  //     <Skeleton
  //       height={Sizes.hp('10%')}
  //       width={Sizes.wp('40%')}
  //       colorMode="light"
  //     />
  //     <Spacer />
  //     <Skeleton
  //       height={Sizes.hp('10%')}
  //       width={Sizes.wp('40%')}
  //       colorMode="light"
  //     />
  //     <Spacer />
  //     <Skeleton
  //       height={Sizes.hp('10%')}
  //       width={Sizes.wp('40%')}
  //       colorMode="light"
  //     />
  //     <Spacer />
  //   </MotiView>
  // );

  return (
    <>
      <DashboardTopHeader
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
        onPresProfile={onPresProfile}
      />
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
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
          nestedScrollEnabled>
          <View style={styles.root}>
            {/* card for the  photo and evnet and wallpaper */}
            <View style={styles.box_card_wrapper}>
              {/* box for the photos and video */}
              <View style={styles.box_root}>
                <TouchableOpacity
                  style={[
                    styles.naviContainer,
                    screenName === 'photo'
                      ? {
                          backgroundColor: '#E9EEFE',
                          borderColor: Colors.borderColor,
                        }
                      : null,
                  ]}
                  onPress={() => setScreenName('photo')}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="photo-library"
                      size={24}
                      alignSelf="center"
                      color={Colors.PRIMARY}
                    />
                  </View>
                  <View style={{height: Sizes.hp('4%'), top: 15}}>
                    <Text style={styles.box_tittle}>Photos and Status</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* box for the remainder */}
              <View style={styles.box_root}>
                <TouchableOpacity
                  style={[
                    styles.naviContainer,
                    screenName === 'remainder'
                      ? {
                          backgroundColor: '#F6E8FB',
                          borderColor: Colors.borderColor,
                        }
                      : null,
                  ]}
                  onPress={() => setScreenName('remainder')}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="event-note"
                      size={24}
                      alignSelf="center"
                      color={Colors.SECONDRY}
                    />
                  </View>
                  <View style={{height: Sizes.hp('4%'), top: 15}}>
                    <Text style={styles.box_tittle}>Events Remainder</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* box for the wallpaper */}
              <View style={styles.box_root1}>
                <TouchableOpacity
                  style={[
                    styles.naviContainer,
                    screenName === 'wallpaper'
                      ? {
                          backgroundColor: '#E9EEFE',
                          borderColor: Colors.borderColor,
                        }
                      : null,
                  ]}
                  onPress={() => setScreenName('wallpaper')}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="now-wallpaper"
                      size={24}
                      alignSelf="center"
                      color={Colors.SECONDRY}
                    />
                  </View>
                  <View style={{height: Sizes.hp('4%'), top: 15}}>
                    <Text style={styles.box_tittle}>Wallpaper/RingTone</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {screenName === 'photo' ? (
              <>
                {/* container for photo and video status */}
                <View
                  style={{
                    height: Sizes.hp('6%'),
                    width: Sizes.wp('90%'),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#DADADA',
                    backgroundColor: Colors.PRIMARY,
                  }}>
                  <TouchableOpacity
                    onPress={() => setValue('photo')}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: value === 'photo' ? Colors.white : Colors.TEXT1,
                        fontSize: 16,
                      }}>
                      Photos
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setValue('video')}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: value === 'video' ? Colors.white : Colors.text1,
                        fontSize: 16,
                      }}>
                      Videos
                    </Text>
                  </TouchableOpacity>
                </View>

                {value === 'photo' ? (
                  <>
                    {/* carousel for the photos */}
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: Colors.TEXT1,
                      }}>
                      Trending
                    </Text>
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
                    {getTemplatesByBusiness_Data?.data?.list?.length > 0
                      ? getTemplatesByBusiness_Data?.data?.list?.map(
                          (item, index) => {
                            return (
                              <FlatListComponent
                                key={index}
                                navigation={navigation}
                                data={item?.photoList}
                                byLabel={item?.businessName}
                              />
                            );
                          },
                        )
                      : null}
                  </>
                ) : (
                  <Text
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      fontWeight: '500',
                      marginVertical: 10,
                      color: Colors.TEXT1,
                    }}>
                    This Featue will come in future release
                  </Text>
                )}
              </>
            ) : screenName === 'remainder' ? (
              <Text style={styles.box_tittle}>
                This Feature is release in future release
              </Text>
            ) : screenName === 'wallpaper' ? (
              <Text style={styles.box_tittle}>
                This Feature is release in future release
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Home;
