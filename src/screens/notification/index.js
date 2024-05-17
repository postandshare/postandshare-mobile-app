import {FlatList, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import Loader from '../../components/Loader';
import NotificationCard from './compoents/NotificationCard';

const NotificationData = [
  {
    id: 1,
    notificationTitle: 'Happy Birthday',
    content: 'Happy Birthday to you',
    date: '2021-09-10',
  },
  {
    id: 2,
    notificationTitle: 'Happy Marriage Anniversary',
    content: 'Happy Marriage Anniversary to you',
    date: '2021-09-11',
  },
  {
    id: 3,
    notificationTitle: 'Happy Mothers Day',
    content: 'Happy Mothers Day to you',
    date: '2021-09-12',
  },
  {
    id: 4,
    notificationTitle: 'Happy Fathers Day',
    content: 'Happy Fathers Day to you',
    date: '2021-09-13',
  },
  {
    id: 5,
    notificationTitle: 'Happy Teachers Day',
    content: 'Happy Teachers Day to you',
    date: '2021-09-14',
  },
  {
    id: 6,
    notificationTitle: 'Happy Independence Day',
    content: 'Happy Independence Day to you',
    date: '2021-09-15',
  },
  {
    id: 7,
    notificationTitle: 'Happy Republic Day',
    content: 'Happy Republic Day to you',
    date: '2021-09-16',
  },
  {
    id: 8,
    notificationTitle: 'Happy Diwali',
    content: 'Happy Diwali to you',
    date: '2021-09-17',
  },
  {
    id: 9,
    notificationTitle: 'Happy Holi',
    content: 'Happy Holi to you',
    date: '2021-09-18',
  },
  {
    id: 10,
    notificationTitle: 'Happy New Year',
    content: 'Happy New Year to you',
    date: '2021-09-19',
  },
  {
    id: 11,
    notificationTitle: 'Happy Christmas',
    content: 'Happy Christmas to you',
    date: '2021-09-20',
  },
  {
    id: 12,
    notificationTitle: 'Happy Eid',
    content: 'Happy Eid to you',
    date: '2021-09-21',
  },
  {
    id: 13,
    notificationTitle: 'Happy Raksha Bandhan',
    content: 'Happy Raksha Bandhan to you',
    date: '2021-09-22',
  },
  {
    id: 14,
    notificationTitle: 'Happy Navratri',
    content: 'Happy Navratri to you',
    date: '2021-09-23',
  },
  {
    id: 15,
    notificationTitle: 'Happy Dussehra',
    content: 'Happy Dussehra to you',
    date: '2021-09-24',
  },
  {
    id: 16,
    notificationTitle: 'Happy Lohri',
    content: 'Happy Lohri to you',
    date: '2021-09-25',
  },
  {
    id: 17,
    notificationTitle: 'Happy Pongal',
    content: 'Happy Pongal to you',
    date: '2021-09-26',
  },
];

const Notification = ({navigation}) => {
  const [notificationData, setNotificationData] = useState({
    page: 1,
    pages: 1,
    list: [],
    count: 0,
  });

  // const {
  //   data: getSchoolNotification_data,
  //   isLoading: getSchoolNotificationLoading,
  //   isFetching: getSchoolNotificationFetching,
  //   refetch: getSchoolNotification_refetch,
  // } = useQuery({
  //   queryKey: ['getSchoolNotification', notificationData.page],
  //   queryFn: () =>
  //     getSchoolNotification({
  //       page: notificationData.page,
  //     }),
  //   onSuccess: ({data}) => {
  //     setNotificationData(prev => ({
  //       ...prev,
  //       page: data?.page,
  //       pages: data?.pages,
  //       list: [...prev.list, ...data?.list],
  //       count: prev.count + data?.count,
  //     }));
  //   },
  //   onError: err =>
  //     ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
  //   enabled: notificationData?.pages > notificationData?.page ? false : true,
  // });

  // const {mutate: updateReadStatusMutate, isLoading: updateReadStatusLoading} =
  // useMutation(updateReadStatus, {
  //   onSuccess: ({data}) => {
  //     setNotificationData(prev => ({
  //       ...prev,
  //       list: [],
  //       page: 1,
  //       count: 0,
  //       pages: 1,
  //     }));
  //     getSchoolNotification_refetch();
  //    // ToastAndroid.show(data?.message, ToastAndroid.LONG);
  //   },
  //   onError: err =>
  //     ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
  //   enabled: false,
  // });

  // const {
  //   mutate: deleteNotificationMutate,
  //   isLoading: deleteNotificationLoading,
  // } = useMutation(deleteNotification, {
  //   onSuccess: success => {
  //     setNotificationData(prev => ({
  //       ...prev,
  //       list: [],
  //       page: 1,
  //       count: 0,
  //       pages: 1,
  //     }));
  //     ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
  //     getSchoolNotification_refetch();
  //   },
  //   onError: error => {
  //     ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
  //   },
  //   enabled: false,
  // });

  // const fetchMore = () => {
  //   if (notificationData.page < notificationData.pages) {
  //     setNotificationData(prev => ({...prev, page: prev.page + 1}));
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribeBlur = navigation.addListener('blur', () => {
  //     setNotificationData(prev => ({...prev, list: [], page: 1, count: 0}));
  //   });
  //   return () => {
  //     unsubscribeBlur();
  //   };
  // }, [navigation]);

  // const ListEndLoader = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 40,
  //         width: '100%',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       {getSchoolNotificationFetching && (
  //         <ActivityIndicator color={Colors.PRIMARY} />
  //       )}
  //     </View>
  //   );
  // };

  const scrollViewRef = useRef(null);

  return (
    <>
      {/* <Loader loading={updateReadStatusLoading} text="Loading..." /> */}
      <TopHeader titile={'Notification'} />

      <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <Text>Count: {notificationData?.count}</Text>
        <FlatList
          // ref={scrollViewRef}
          // data={notificationData?.list}
          data={NotificationData}
          renderItem={({item}) => (
            <NotificationCard
              item={item}
              scrollViewRef={scrollViewRef}
              // updateReadStatusMutate={updateReadStatusMutate}
              // deleteNotificationMutate={deleteNotificationMutate}
            />
          )}
          keyExtractor={(_, i) => i}
          ListEmptyComponent={() => (
            <Text
              style={{alignSelf: 'center', fontSize: 15, fontWeight: '500'}}>
              There is No Notification.....
            </Text>
          )}
          // onEndReached={fetchMore}
          // onEndReachedThreshold={0.2}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={
          //       getSchoolNotificationFetching || getSchoolNotificationLoading
          //     }
          //     onRefresh={() => {
          //       setNotificationData(prev => ({
          //         ...prev,
          //         list: [],
          //         page: 1,
          //         count: 0,
          //         pages: 1,
          //       }));
          //       getSchoolNotification_refetch();
          //     }}
          //     colors={[Colors.PRIMARY]}
          //   />
          // }
          // ListFooterComponent={ListEndLoader}
          nestedScrollEnabled
        />
      </View>
    </>
  );
};

export default Notification;
