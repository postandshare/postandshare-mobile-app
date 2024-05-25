import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import images from '../../constants/images';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/globalStyles';
import moment from 'moment';
import {Tray} from './BirthdayRemainder';
import {useQuery} from '@tanstack/react-query';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {getEvent} from '../../services/userServices/personalEvent.services';

const BirthdayRemainderDetail = ({data, navigation, route}) => {
  const {event} = route?.params || {};
  const [selectedFilter, setSelectedFilter] = useState('SMS');

  const {
    isLoading: getEventLoading,
    isFetching: getEventFetching,
    refetch: getEventRefetch,
    data: getEvent_Data,
    isError: getEvent_isError,
  } = useQuery({
    queryKey: ['getEvent'],
    queryFn: () =>
      getEvent({
        eventDocId: event?._id,
      }),
    onSuccess: success => {
      console.log(success?.data, 'sucess?.data');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      getEventRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, getEventRefetch, selectedFilter]),
  );

  return (
    <>
      <ImageBackground
        source={images?.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader
          titile={event?.eventType ?? 'Event Details'}
          IconProp={<Feather name="settings" size={30} color={Colors.TEXT1} />}
          onPress={() => {
            navigation.navigate('RemainderSetting');
          }}
        />
        {/* events description */}
        {event?.eventType === 'Anniversary' ? (
          <View style={styles?.event_detail_container}>
            {/* image */}
            <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
              <Image
                source={
                  event?.personDetails
                    ? {uri: event?.personDetails[0]?.profilePic}
                    : images?.profile_placeholder1
                }
                style={styles?.profilePicMarriage}
                resizeMode="cover"
              />
              <Entypo
                name="heart"
                size={30}
                color={'red'}
                alignSelf={'center'}
              />
              <Image
                source={
                  event?.personDetails
                    ? {uri: event?.personDetails[1]?.profilePic}
                    : images?.profile_placeholder1
                }
                style={styles?.profilePicMarriage}
                resizeMode="cover"
              />
            </View>
            {/* name */}
            <Text style={styles?.event_details_container_title}>
              {event?.personDetails[0]?.personName} &{' '}
              {event?.personDetails[1]?.personName}
            </Text>
            {/* date */}
            <Text style={styles?.event_details_container_date}>
              {moment(event?.eventDate).format('LLL')}
            </Text>
          </View>
        ) : (
          <View style={styles.event_detail_container}>
            {/* image */}
            <Image
              source={
                event?.personDetails
                  ? {uri: event?.personDetails[0]?.profilePic}
                  : images?.profile_placeholder1
              }
              style={styles?.profilePic}
              resizeMode="cover"
            />
            {/* name */}
            <Text style={styles.event_details_container_title}>
              {event?.personDetails[0]?.personName}
            </Text>
            {/* date */}
            <Text style={styles.event_details_container_date}>
              {moment(event?.eventDate).format('LLL')}
            </Text>
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 40,
            width: '100%',
            marginTop: 10,
          }}>
          <Tray
            backgroundColor={
              selectedFilter === 'SMS' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={selectedFilter === 'SMS' ? Colors.white : Colors.TEXT1}
            title="SMS"
            onPress={() => {
              setSelectedFilter('SMS');
            }}
          />
          <Tray
            backgroundColor={
              selectedFilter === 'WhatsApp' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={
              selectedFilter === 'WhatsApp' ? Colors.white : Colors.TEXT1
            }
            title="WhatsApp"
            onPress={() => {
              setSelectedFilter('WhatsApp');
            }}
          />
        </ScrollView>
        {!getEvent_Data?.data?.smsTempletDetails && selectedFilter === 'SMS' ? (
          <TouchableOpacity
            style={styles.rootTemplatedContainer}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CreatePost', {
                eventType: event?.eventType,
                selectedFilter,
              });
            }}>
            <Ionicons
              name="add-circle-outline"
              size={50}
              alignSelf={'center'}
              color={Colors.TEXT1}
            />
          </TouchableOpacity>
        ) : selectedFilter === 'WhatsApp' &&
          !getEvent_Data?.data?.whatsAppTempletDetails ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CreatePost', {
                eventType: event?.eventType,
                selectedFilter,
              });
            }}
            style={styles.rootTemplatedContainer}>
            <Ionicons
              name="add-circle-outline"
              size={50}
              alignSelf={'center'}
              color={Colors.TEXT1}
            />
          </TouchableOpacity>
        ) : null}
      </ImageBackground>
    </>
  );
};

export default BirthdayRemainderDetail;
