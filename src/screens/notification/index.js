/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import Loader from '../../components/Loader';
import NotificationCard from './compoents/NotificationCard';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteNotification,
  getNotifications,
  updateReadStatus,
} from '../../services/userServices/profile.services';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../constants/Colors';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';

const Notification = ({navigation}) => {
  const [notificationData, setNotificationData] = useState({
    page: 1,
    pages: 1,
    list: [],
    count: 0,
  });

  const {
    isLoading: getNotificationsLoading,
    isFetching: getNotificationsFetching,
    refetch: getNotifications_refetch,
  } = useQuery({
    queryKey: ['getNotifications', notificationData.page],
    queryFn: () =>
      getNotifications({
        page: notificationData.page,
      }),
    onSuccess: ({data}) => {
      setNotificationData(prev => ({
        ...prev,
        page: data?.page,
        pages: data?.pages,
        list: [...prev.list, ...data?.list],
        count: prev.count + data?.count,
      }));
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: notificationData?.pages > notificationData?.page ? false : true,
  });

  const {mutate: updateReadStatusMutate, isLoading: updateReadStatusLoading} =
    useMutation(updateReadStatus, {
      onSuccess: ({data}) => {
        setNotificationData(prev => ({
          ...prev,
          list: [],
          page: 1,
          count: 0,
          pages: 1,
        }));
        getNotifications_refetch();
      },
      onError: err =>
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
      enabled: false,
    });

  const {mutate: deleteNotificationMutate} = useMutation(deleteNotification, {
    onSuccess: success => {
      setNotificationData(prev => ({
        ...prev,
        list: [],
        page: 1,
        count: 0,
        pages: 1,
      }));
      ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
      getNotifications_refetch();
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
    enabled: false,
  });

  const fetchMore = () => {
    if (notificationData.page < notificationData.pages) {
      setNotificationData(prev => ({...prev, page: prev.page + 1}));
    }
  };

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setNotificationData(prev => ({...prev, list: [], page: 1, count: 0}));
    });
    return () => {
      unsubscribeBlur();
    };
  }, [navigation]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const ListEndLoader = () => {
    return (
      <View
        style={{
          height: 40,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {getNotificationsFetching && (
          <ActivityIndicator color={Colors.PRIMARY} />
        )}
      </View>
    );
  };

  const scrollViewRef = useRef(null);

  return (
    <>
      <Loader loading={updateReadStatusLoading} text="Loading..." />
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader titile={'Notification'} />

        <View style={{flex: 1, backgroundColor: Colors.transparent}}>
          <Text>Count: {notificationData?.count}</Text>
          <FlatList
            ref={scrollViewRef}
            data={notificationData?.list}
            renderItem={({item}) => (
              <NotificationCard
                item={item}
                updateReadStatusMutate={updateReadStatusMutate}
                deleteNotificationMutate={deleteNotificationMutate}
              />
            )}
            keyExtractor={(_, i) => i}
            ListEmptyComponent={() => (
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                  color: Colors.TEXT1,
                }}>
                There is No Notification.....
              </Text>
            )}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.2}
            refreshControl={
              <RefreshControl
                refreshing={getNotificationsFetching || getNotificationsLoading}
                onRefresh={() => {
                  setNotificationData(prev => ({
                    ...prev,
                    list: [],
                    page: 1,
                    count: 0,
                    pages: 1,
                  }));
                  getNotifications_refetch();
                }}
                colors={[Colors.PRIMARY]}
              />
            }
            ListFooterComponent={ListEndLoader}
            nestedScrollEnabled
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default Notification;
