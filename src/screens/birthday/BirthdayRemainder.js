import {ImageBackground, ScrollView, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import images from '../../constants/images';
import styles from './style';
import globalStyles from '../../styles/globalStyles';
import {useQuery} from '@tanstack/react-query';
import {getEvents} from '../../services/userServices/personalEvent.services';
import SearchSortFilter from './components/SearchSortFilter';
import BirthRemaiderCard from '../../components/BirthRemaiderCard';
import {useFocusEffect} from '@react-navigation/native';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';

const BirthdayRemainder = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest');
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
    queryFn: () => getEvents({}),
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

  const filteredEvents = events?.list?.filter(event =>
    event?.personDetails[0]?.personName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const sortedBusinesses = [...(filteredEvents || [])].sort((a, b) => {
    switch (sortOption) {
      case 'AtoZ':
        return a?.eventType?.localeCompare(b?.eventType);
      case 'ZtoA':
        return b?.eventType?.localeCompare(a?.eventType);
      case 'Newest':
        return new Date(b?.eventDate) - new Date(a?.eventDate);
      case 'Oldest':
        return new Date(a?.eventDate) - new Date(b?.eventDate);
      default:
        return 0;
    }
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
    }, [navigation, getEventsRefetch]),
  );

  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    navigation.navigate(NavigationScreenName.NOTIFICATION);
  };

  return (
    <>
      <DashboardTopHeader
        title="Events"
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
      />

      {/* <TopHeader
        titile={'Birthday Remainder'}
        icon={images.add_birthday_icon}
        onPress={() => navigation.navigate('AddRemainder')}
      /> */}
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <SearchSortFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <ScrollView
          contentContainerStyle={styles.root}
          showsVerticalScrollIndicator={false}>
          {/* <View style={styles.cardContainer}> */}
          {sortedBusinesses.map((event, index) => (
            <BirthRemaiderCard item={event} key={index} />
          ))}
          {/* </View> */}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default BirthdayRemainder;
