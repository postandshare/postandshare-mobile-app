import {
  Alert,
  FlatList,
  ImageBackground,
  RefreshControl,
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
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteEvent,
  getEvents,
  sendSms,
  sendWhatsApp,
} from '../../services/userServices/personalEvent.services';
import BirthRemaiderCard from '../../components/BirthRemaiderCard';
import {useFocusEffect} from '@react-navigation/native';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Sizes from '../../constants/Sizes';

// for the filteration in the events list
export const Tray = ({backgroundColor, textColor, title, onPress}) => {
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
        elevation: 5,
        height: 40,
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
        page: success?.data?.page,
        pages: success?.data?.totalPage,
        count: success?.data?.totalDocuments,
      }));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {mutate: sendWhatsAppMutate, isLoading: sendWhatsAppLoading} =
    useMutation(sendWhatsApp, {
      onSuccess: ({data}) => {
        getEventsRefetch();
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: false,
    });

  const {mutate: sendSmsMutate, isLoading: sendSmsLoading} = useMutation(
    sendSms,
    {
      onSuccess: ({data}) => {
        getEventsRefetch();
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: false,
    },
  );
  const {mutate: deleteEventMutate, isLoading: deleteEventLoading} =
    useMutation(deleteEvent, {
      onSuccess: ({data}) => {
        getEventsRefetch();
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
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <DashboardTopHeader
          title="Events"
          onPressMenu={onPressMenu}
          onPressNotification={onPressNotification}
          onPressIcon={() => navigation.navigate('AddRemainder')}
          IconProp={
            <Feather name="calendar" size={28} style={{color: Colors.TEXT1}} />
          }
        />
        <View>
          {/* tray for the filter the events */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              height: 80,
            }}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
              marginVertical: 10,
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
          {todaysEvents.length === 0 && upcomingEvents.length === 0 && (
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: Colors.TEXT1,
                  fontSize: Sizes.hp('2%'),
                }}>
                No Events
              </Text>
            </View>
          )}

          {todaysEvents?.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title}>Today</Text>
                <Text style={[styles.title, {color: Colors.PRIMARY}]}>
                  see all
                </Text>
              </View>

              <FlatList
                contentContainerStyle={{...styles.root}}
                data={todaysEvents}
                refreshControl={
                  <RefreshControl
                    refreshing={getEventsFetching || getEventsLoading}
                    onRefresh={() => getEventsRefetch()}
                  />
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <Text style={styles.noEventsText}>No Events Today</Text>
                }
                renderItem={({item, index}) => (
                  <BirthRemaiderCard
                    item={item}
                    key={index}
                    handleDeleteEvent={() => {
                      Alert.alert(
                        'Post and Share App',
                        'Are you sure want to Send WhatsApp Message?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => {
                              deleteEventMutate({
                                eventDocId: item?._id,
                              });
                            },
                          },
                        ],
                      );
                    }}
                    handleWhatsAppSend={() => {
                      Alert.alert(
                        'Post and Share App',
                        'Are you sure want to Send WhatsApp Message?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Send',
                            onPress: () => {
                              sendWhatsApp({
                                eventDocId: item?._id,
                              });
                            },
                          },
                        ],
                      );
                    }}
                    handleSendSms={() => {
                      Alert.alert(
                        'Post and Share App',
                        'Are you sure want to Send SMS ?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Send',
                            onPress: () => {
                              sendSmsMutate({
                                eventDocId: item?._id,
                              });
                            },
                          },
                        ],
                      );
                    }}
                    onPress={() =>
                      navigation.navigate('BirthdayRemainderDetail', {
                        event: item,
                      })
                    }
                  />
                )}
              />
            </>
          )}

          {
            // list for the upcoming list
            upcomingEvents.length > 0 && (
              <>
                <Text style={styles.title}>Upcoming</Text>
                {/* list for the upcoming list */}
                <FlatList
                  contentContainerStyle={{...styles.root, paddingBottom: 200}}
                  data={upcomingEvents}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={
                    <Text style={styles.noEventsText}>No Upcoming Events</Text>
                  }
                  renderItem={({item, index}) => (
                    <BirthRemaiderCard
                      item={item}
                      key={index}
                      handleDeleteEvent={() => {
                        Alert.alert(
                          'Post and Share App',
                          'Are you sure want to Send WhatsApp Message?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'Delete',
                              style: 'destructive',
                              onPress: () => {
                                deleteEventMutate({
                                  eventDocId: item?._id,
                                });
                              },
                            },
                          ],
                        );
                      }}
                      handleWhatsAppSend={() => {
                        Alert.alert(
                          'Post and Share App',
                          'Are you sure want to Send WhatsApp Message?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'Send',
                              onPress: () => {
                                sendWhatsApp({
                                  eventDocId: item?._id,
                                });
                              },
                            },
                          ],
                        );
                      }}
                      handleSendSms={() => {
                        Alert.alert(
                          'Post and Share App',
                          'Are you sure want to Send SMS ?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'Send',
                              onPress: () => {
                                sendSmsMutate({
                                  eventDocId: item?._id,
                                });
                              },
                            },
                          ],
                        );
                      }}
                      onPress={() =>
                        navigation.navigate('BirthdayRemainderDetail', {
                          event: item,
                        })
                      }
                    />
                  )}
                />
              </>
            )
          }
        </View>
      </ImageBackground>
    </>
  );
};

export default BirthdayRemainder;
