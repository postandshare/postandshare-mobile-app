import {
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import images from '../../constants/images';
import styles from './style';
import globalStyles from '../../styles/globalStyles';
import {useQuery} from '@tanstack/react-query';
import {getEvents} from '../../services/userServices/personalEvent.services';
import BirthRemaiderCard from '../../components/BirthRemaiderCard';
import {useFocusEffect} from '@react-navigation/native';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const Tray = ({backgroundColor, textColor, title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: `${backgroundColor}`,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.borderColor,
      }}>
      <Text
        style={{
          fontSize: 16,
          padding: 5,
          margin: 5,
          color: `${textColor}`,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const BirthdayRemainder = ({navigation}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [events, setEvents] = useState({
    page: 1,
    pages: 1,
    list: [],
    count: 0,
  });
  const {
    isLoading: getEventsLoading,
    isFetching: getEventsFetching,
    refetch: getEventsRefetch,
    data: getEvents_Data,
    isError: getEvents_isError,
  } = useQuery({
    queryKey: ['getEvents'],
    queryFn: () =>
      getEvents({
        ...(selectedFilter === 'All' ? {} : {eventType: selectedFilter}),
      }),
    onSuccess: success => {
      // console.log(success?.data, 'success');
      setEvents(prev => ({
        ...prev,
        list: success?.data?.data,
        // page: success?.data?.data?.page,
        // pages: success?.data?.data?.pages,
        // count: success?.data?.data?.count,
      }));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setEvents(prev => ({...prev, list: [], page: 1, count: 0}));
    });
    return () => {
      unsubscribeBlur();
    };
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getEventsRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, getEventsRefetch, selectedFilter]),
  );

  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    navigation.navigate(NavigationScreenName.NOTIFICATION);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysEvents = events?.list?.filter(
    event =>
      new Date(event?.eventDate).setHours(0, 0, 0, 0) === today.getTime(),
  );
  const upcomingEvents = events?.list?.filter(
    event => new Date(event?.eventDate).setHours(0, 0, 0, 0) > today.getTime(),
  );

  return (
    <>
      <DashboardTopHeader
        title="Events"
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
        onPressIcon={() => navigation.navigate('AddRemainder')}
        IconProp={
          <Feather name="calendar" size={28} style={{color: Colors.TEXT1}} />
        }
      />
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.title}>see all</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 40,
            width: '100%',
            marginTop: 10,
            // backgroundColor: 'red',
          }}>
          <Tray
            backgroundColor={
              selectedFilter === 'All' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={selectedFilter === 'All' ? Colors.white : Colors.TEXT1}
            title="All"
            onPress={() => {
              setSelectedFilter('All');
            }}
          />
          <Tray
            backgroundColor={
              selectedFilter === 'Birthday' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={
              selectedFilter === 'Birthday' ? Colors.white : Colors.TEXT1
            }
            title="Birthday"
            onPress={() => {
              setSelectedFilter('Birthday');
            }}
          />
          <Tray
            backgroundColor={
              selectedFilter === 'Anniversary' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={
              selectedFilter === 'Anniversary' ? Colors.white : Colors.TEXT1
            }
            title="Anniversary"
            onPress={() => {
              setSelectedFilter('Anniversary');
            }}
          />
        </ScrollView>

        <ScrollView
          contentContainerStyle={{...styles.root, paddingBottom: 0}}
          showsVerticalScrollIndicator={false}>
          {todaysEvents?.length === 0 && (
            <Text style={styles.noEventsText}>No Events Today</Text>
          )}
          {todaysEvents?.map((event, index) => (
            <BirthRemaiderCard item={event} key={index} />
          ))}
        </ScrollView>

        <Text style={styles.title}>Upcoming</Text>
        <ScrollView
          contentContainerStyle={{...styles.root, paddingBottom: 400}}
          showsVerticalScrollIndicator={false}>
          {upcomingEvents?.length === 0 && (
            <Text style={styles.noEventsText}>No Upcoming Events</Text>
          )}
          {upcomingEvents?.map((event, index) => (
            <BirthRemaiderCard item={event} key={index} />
          ))}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default BirthdayRemainder;
