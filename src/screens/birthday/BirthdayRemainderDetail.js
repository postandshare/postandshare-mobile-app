import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import images from '../../constants/images';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text} from 'react-native-paper';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/globalStyles';
import moment from 'moment';
import {useQuery} from '@tanstack/react-query';
import {useFocusEffect} from '@react-navigation/native';
import {getEvent} from '../../services/userServices/personalEvent.services';
import SMSTemplate from './components/SMSTemplate';
import Remainder from './components/Remainder';

const BirthdayRemainderDetail = ({data, navigation, route}) => {
  const {event, eventDocId} = route?.params || {};
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
        eventDocId: event?._id ?? eventDocId,
      }),
    onSuccess: success => {},
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
          titile={getEvent_Data?.data?.data?.eventType ?? 'Event Details'}
          path="BirthdayRemainder"
          // IconProp={<Feather name="settings" size={30} color={Colors.TEXT1} />}
          // onPress={() => {
          //   navigation.navigate('RemainderSetting');
          // }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={getEventFetching}
              onRefresh={getEventRefetch}
            />
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}>
          {/* events description */}
          {getEvent_Data?.data?.data?.eventType === 'Anniversary' ? (
            <View style={styles?.event_detail_container}>
              {/* image */}
              <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
                <Image
                  source={
                    getEvent_Data?.data?.data?.personDetails
                      ? {
                          uri: getEvent_Data?.data?.data?.personDetails[0]
                            ?.profilePic,
                        }
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
                    getEvent_Data?.data?.data?.personDetails
                      ? {
                          uri: getEvent_Data?.data?.data?.personDetails[1]
                            ?.profilePic,
                        }
                      : images?.profile_placeholder1
                  }
                  style={styles?.profilePicMarriage}
                  resizeMode="cover"
                />
              </View>
              {/* name */}
              <Text style={styles?.event_details_container_title}>
                {getEvent_Data?.data?.data?.personDetails[0]?.personName} &{' '}
                {getEvent_Data?.data?.data?.personDetails[1]?.personName}
              </Text>
              {/* date */}
              <Text style={styles?.event_details_container_date}>
                {moment(getEvent_Data?.data?.data?.eventDate).format('LL')}
              </Text>
            </View>
          ) : (
            <View style={styles.event_detail_container}>
              {/* image */}
              <Image
                source={
                  getEvent_Data?.data?.data?.personDetails
                    ? {
                        uri: getEvent_Data?.data?.data?.personDetails[0]
                          ?.profilePic,
                      }
                    : images?.profile_placeholder1
                }
                style={styles?.profilePic}
                resizeMode="cover"
              />
              {/* name */}
              <Text style={styles.event_details_container_title}>
                {getEvent_Data?.data?.data?.personDetails[0]?.personName}
              </Text>
              {/* date */}
              <Text style={styles.event_details_container_date}>
                {moment(getEvent_Data?.data?.data?.eventDate).format('LLL')}
              </Text>
            </View>
          )}

          <>
            {/* whatsApp template */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles?.event_details_container_title,
                  {color: Colors.TEXT1},
                ]}>
                WhatsApp Template
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreateEvent', {
                    templateType: 'WhatsApp',
                    eventDocId: getEvent_Data?.data?.data?._id,
                    data: getEvent_Data?.data?.data,
                  });
                }}>
                <Text style={{textAlign: 'center', color: Colors.PRIMARY}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            {getEvent_Data?.data?.data?.whatsAppTempletDetails && (
              <SMSTemplate
                item={getEvent_Data?.data?.data?.whatsAppTempletDetails}
                onPress={() => {}}
                isSelected={false}
                msgImage={getEvent_Data?.data?.data?.msgImage}
                onEditPress={() => {}}
                showEdit={false}
              />
            )}

            {/* sms template */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles?.event_details_container_title,
                  {color: Colors.TEXT1},
                ]}>
                SMS Template
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreateEvent', {
                    templateType: 'SMS',
                    eventDocId: getEvent_Data?.data?.data?._id,
                    data: getEvent_Data?.data?.data,
                  });
                }}>
                <Text style={{textAlign: 'center', color: Colors.PRIMARY}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            {getEvent_Data?.data?.data?.smsTempletDetails && (
              <SMSTemplate
                item={getEvent_Data?.data?.data?.smsTempletDetails}
                onPress={() => {}}
                isSelected={false}
                onEditPress={() => {}}
                showEdit={false}
                width="90%"
              />
            )}

            {/* reminders */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles?.event_details_container_title,
                  {color: Colors.TEXT1},
                ]}>
                Reminders
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreateEvent', {
                    templateType: 'Reminder',
                    eventDocId: getEvent_Data?.data?.data?._id,
                    data: getEvent_Data?.data?.data,
                  });
                }}>
                <Text style={{textAlign: 'center', color: Colors.PRIMARY}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            {getEvent_Data?.data?.data?.reminder?.length > 0 &&
              getEvent_Data?.data?.data?.reminder?.map((item, index) => (
                <Remainder
                  item={item}
                  index={index}
                  showTittle={false}
                  showDelete={false}
                  key={index}
                  handleChange={false}
                />
              ))}
          </>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default BirthdayRemainderDetail;
