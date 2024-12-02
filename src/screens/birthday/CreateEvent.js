/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useCallback, useState} from 'react';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import TopHeader from '../../components/TopHeader';
import Colors from '../../constants/Colors';
import {Tray} from './BirthdayRemainder';
import Remainder from './components/Remainder';
import CustomButton from '../../components/CustomButton';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getTemplets,
  update,
} from '../../services/userServices/eventTemplate.services';
import {useFocusEffect} from '@react-navigation/native';
import SMSTemplate from './components/SMSTemplate';
import Feather from 'react-native-vector-icons/Feather';
import uploadFile from '../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  addReminders,
  addTemplet,
  getEvent,
  getReminder,
  updateEvent,
} from '../../services/userServices/personalEvent.services';
import moment from 'moment';

const CreateEvent = ({navigation, route}) => {
  const {eventsAddFormik, eventDocId, data, templateType} = route?.params || {};
  const [selectedFilter, setSelectedFilter] = React.useState(
    templateType ?? 'Remainder',
  );
  const [eventRemainder, setEventRemainder] = React.useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = React.useState(
    getEvent_Data?.data?.data?.smsTempletDetails?._id ?? null,
  );
  const [selectedTemplateIdWhatsApp, setSelectedTemplateIdWhatsApp] =
    React.useState(
      getEvent_Data?.data?.data?.whatsAppTempletDetails?._id ?? null,
    );
  const [imageUploading, setImageUploading] = useState(false);

  const {
    isLoading: getTempletsLoading,
    isFetching: getTempletsFetching,
    refetch: getTempletsRefetch,
    data: getTemplets_Data,
    isError: getTemplets_isError,
  } = useQuery({
    queryKey: ['getTemplets'],
    queryFn: () =>
      getTemplets({
        eventType:
          eventsAddFormik?.selectedEvent ??
          getEvent_Data?.data?.data?.eventType,
        templetType: selectedFilter,
      }),
    onSuccess: success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });
  const {
    isLoading: getReminderLoading,
    isFetching: getReminderFetching,
    refetch: getReminderRefetch,
    data: getReminder_Data,
    isError: getReminder_isError,
  } = useQuery({
    queryKey: ['getReminder'],
    queryFn: () =>
      getReminder({
        eventDocId: eventDocId,
      }),
    onSuccess: success => {
      setEventRemainder(success?.data?.data?.reminder);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

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
        eventDocId: eventDocId,
      }),
    onSuccess: success => {
      setSelectedTemplateIdWhatsApp(
        success?.data?.data?.whatsAppTempletDetails?._id ?? null,
      );
      setSelectedTemplateId(
        success?.data?.data?.smsTempletDetails?._id ?? null,
      );
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {mutate: updateEventMutate, isLoading: updateEventLoading} =
    useMutation(updateEvent, {
      onSuccess: ({data}) => {
        if (selectedFilter === 'WhatsApp' || selectedFilter === 'SMS') {
          getTempletsRefetch();
        }
        getEventRefetch();
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: false,
    });
  const {mutate: addRemindersMutate, isLoading: addRemindersLoading} =
    useMutation(addReminders, {
      onSuccess: ({data}) => {
        setSelectedFilter('SMS');
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: false,
    });
  const {mutate: addTempletMutate, isLoading: addTempletLoading} = useMutation(
    addTemplet,
    {
      onSuccess: ({data}) => {
        if (selectedFilter === 'SMS') setSelectedFilter('WhatsApp');
        if (selectedFilter === 'WhatsApp')
          navigation.navigate('BirthdayRemainderDetail', {
            eventDocId: eventDocId,
          });
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: false,
    },
  );

  useFocusEffect(
    useCallback(() => {
      getEventRefetch();
      if (selectedFilter === 'SMS' || selectedFilter === 'WhatsApp')
        getTempletsRefetch();
      if (selectedFilter === 'Remainder') getReminderRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, getTempletsRefetch, selectedFilter]),
  );

  const AddRemainder = () => {
    setEventRemainder([
      ...eventRemainder,
      {
        date: new Date(),
        time: new Date(),
      },
    ]);
  };
  const DeleteRemainder = index => {
    let temp = eventRemainder;
    temp.splice(index, 1);
    setEventRemainder([...temp]);
  };

  const onDeletePress = index => {
    DeleteRemainder(index);
  };

  const uploadePhoto = async (path, mime, index) => {
    try {
      console.log(path, 'in uploade photo');
      setImageUploading(true);
      const uplode = await uploadFile({
        filePath: {path: path},
        fileLocation: `eventTemplate/${Date.now()}`,
        contentType: mime,
      });
      setImageUploading(false);
      console.log(uplode?.fileURL, 'uplode file url');
      updateEventMutate({
        eventDocId: eventDocId,
        msgImage: uplode?.fileURL,
      });
    } catch (error) {
      setImageUploading(false);
    }
  };

  const TakePhotofromGallery = async index => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Post And Share App',
          message:
            'We want to access your photos' +
            'so you can take awesome pictures.',
        },
      );
      ImageCropPicker.openPicker({
        cropping: true,
      })
        .then(image => {
          console.log(image, 'imgae in the edit profile');
          uploadePhoto(image.path, image.mime);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Permission Denied', ToastAndroid.LONG);
    }
  };

  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader titile={'Create Event'} />

        {/* image  */}
        <ImageBackground
          source={
            getEvent_Data?.data?.data?.msgImage
              ? {uri: getEvent_Data?.data?.data?.msgImage}
              : images.coupleAniverssary
          }
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
          }}>
          {/* edit icon for image replace ment */}
          <TouchableOpacity
            onPress={() => TakePhotofromGallery()}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              backgroundColor: Colors.SECONDRY,
              padding: 5,
              borderRadius: 50,
              alignItems: 'center',
            }}>
            <Feather name="edit" size={20} color={Colors.white} />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              bottom: 0,
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {getEvent_Data?.data?.data?.eventName === 'Anniversary'
                ? `${
                    getEvent_Data?.data?.data?.personDetails[0]?.personName
                  } & ${
                    getEvent_Data?.data?.data?.personDetails[1]?.personName ||
                    ''
                  }`
                : `${getEvent_Data?.data?.data?.personDetails[0]?.personName}`}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                textAlign: 'center',
              }}>
              {moment(getEvent_Data?.data?.data?.eventDate).format('LL')}
            </Text>
          </View>
        </ImageBackground>

        {/* filter tray */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 50,
            width: '100%',
            marginVertical: 10,
          }}>
          <Tray
            backgroundColor={
              selectedFilter === 'Remainder' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={
              selectedFilter === 'Remainder' ? Colors.white : Colors.TEXT1
            }
            title="Remainder"
            onPress={() => {
              setSelectedFilter('Remainder');
            }}
          />
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

        {/* remaider */}
        {selectedFilter === 'Remainder' ? (
          <FlatList
            contentContainerStyle={{
              padding: 5,
              width: '100%',
              paddingBottom: 100,
            }}
            data={eventRemainder}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}>
                <Text style={styles.title}>No Remainder Added</Text>
              </View>
            }
            ListFooterComponent={
              <>
                <TouchableOpacity
                  onPress={() => AddRemainder()}
                  style={{
                    alignSelf: 'flex-end',
                    margin: 10,
                  }}>
                  <Text style={{color: Colors.PRIMARY, fontWeight: '700'}}>
                    Add More Remainder
                  </Text>
                </TouchableOpacity>

                <CustomButton
                  title={'Next'}
                  onPress={() => {
                    if (eventRemainder?.length === 0) {
                      ToastAndroid.show(
                        'Please add atleast one remainder',
                        ToastAndroid.LONG,
                      );
                      return;
                    }

                    addRemindersMutate({
                      eventDocId: eventDocId,
                      reminder: eventRemainder,
                    });
                  }}
                />
              </>
            }
            renderItem={({item, index}) => (
              <Remainder
                item={item}
                onDeletePress={() => onDeletePress(index)}
                handleDateChange={date => {
                  let temp = [...eventRemainder];
                  temp[index].date = date.toISOString();
                  setEventRemainder(temp);
                }}
                index={index}
                handleTimeChange={time => {
                  let temp = [...eventRemainder];
                  temp[index].time = time.toISOString();
                  setEventRemainder(temp);
                }}
              />
            )}
          />
        ) : null}

        {/* sms */}
        {selectedFilter === 'SMS' || selectedFilter === 'WhatsApp' ? (
          <FlatList
            contentContainerStyle={{
              padding: 5,
              width: '100%',
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl
                refreshing={getTempletsFetching || getTempletsLoading}
                onRefresh={() => getTempletsRefetch()}
              />
            }
            data={getTemplets_Data?.data?.data}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}>
                <Text style={styles.title}>No Template Available</Text>
              </View>
            }
            ListFooterComponent={
              <>
                <CustomButton
                  title={'Next'}
                  onPress={() => {
                    if (selectedFilter === 'SMS' && !selectedTemplateId) {
                      ToastAndroid.show(
                        'Please select a template first',
                        ToastAndroid.LONG,
                      );
                      return;
                    }
                    if (
                      selectedFilter === 'WhatsApp' &&
                      !selectedTemplateIdWhatsApp
                    ) {
                      ToastAndroid.show(
                        'Please select a template first',
                        ToastAndroid.LONG,
                      );
                      return;
                    }
                    addTempletMutate({
                      eventDocId: eventDocId,
                      templetType: selectedFilter,
                      templetId:
                        selectedFilter === 'SMS'
                          ? selectedTemplateId
                          : selectedTemplateIdWhatsApp,
                    });
                  }}
                />
              </>
            }
            renderItem={({item, index}) => {
              return (
                <SMSTemplate
                  item={item}
                  onEditPress={() => {
                    if (selectedTemplateId || selectedTemplateIdWhatsApp) {
                      TakePhotofromGallery(index);
                    } else {
                      ToastAndroid.show(
                        'Please select a template first',
                        ToastAndroid.LONG,
                      );
                    }
                  }}
                  isSelected={
                    selectedFilter === 'SMS'
                      ? item?._id ===
                        (selectedTemplateId ??
                          getEvent_Data?.data?.data?.smsTempletDetails?._id)
                      : item?._id ===
                        (selectedTemplateIdWhatsApp ??
                          getEvent_Data?.data?.data?.whatsAppTempletDetails
                            ?._id)
                  }
                  onPress={() => {
                    if (selectedFilter === 'SMS') {
                      setSelectedTemplateId(item?._id);
                    } else {
                      setSelectedTemplateIdWhatsApp(item?._id);
                    }
                  }}
                  showEdit={false}
                  key={index}
                />
              );
            }}
          />
        ) : null}
      </ImageBackground>
    </>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TEXT1,
    marginVertical: 10,
  },
});
