/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
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
import Images from '../../constants/images';
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

const Home = ({navigation}) => {
  const [value, setValue] = React.useState('photo');
  const [screenName, setScreenName] = useState('photo');
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {};
  const onPresProfile = () => {
    navigation.navigate('ProfileNavigator');
  };

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
      getTemplatesByDateRefetch();
      getTemplatesForQuotesRefetch();
      getTemplatesOfGreatLeadersRefetch();
      getTemplatesByBusinessRefetch();
      getTrendingTemlpatesRefetch();
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

  return (
    <>
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
        nestedScrollEnabled>
        <View style={styles.root}>
          {/* card for the  photo and evnet and wallpaper */}
          <View style={styles.box_card_wrapper}>
            {/* box for the photos and video */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  screenName === 'photo'
                    ? {backgroundColor: '#FFB33920', borderColor: '#FFB339'}
                    : null,
                ]}
                onPress={() => setScreenName('photo')}>
                <Image
                  source={Images.photo_video_icon}
                  style={styles.box_image}
                />
              </TouchableOpacity>
              <View style={{height: Sizes.hp('4%')}}>
                <Text style={styles.box_tittle}>Photos and Status</Text>
              </View>
            </View>

            {/* box for the remainder */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  screenName === 'remainder'
                    ? {backgroundColor: '#20B2FB20', borderColor: '#20B2FB'}
                    : null,
                ]}
                onPress={() => setScreenName('remainder')}>
                <Image
                  source={Images.remainder_icon}
                  style={styles.box_image}
                />
              </TouchableOpacity>
              <View style={{height: Sizes.hp('4%')}}>
                <Text style={styles.box_tittle}>Events Reminder</Text>
              </View>
            </View>

            {/* box for the wallpaper */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  screenName === 'wallpaper'
                    ? {backgroundColor: '#D6363520', borderColor: '#D63635'}
                    : null,
                ]}
                onPress={() => setScreenName('wallpaper')}>
                <Image
                  source={Images.wallpaper_icon}
                  style={styles.box_image}
                />
              </TouchableOpacity>
              <View style={{height: Sizes.hp('4%')}}>
                <Text style={styles.box_tittle}>Wallpaper</Text>
              </View>
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
                      data={getTemplatesForQuotes_Data?.data?.list}
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
    </>
  );
};

export default Home;
