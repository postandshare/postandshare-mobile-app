/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Colors from '../../constants/Colors';
import styles from './style';
import CustomTextInputFormik from '../../components/CustomTextInputFormik';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Dropdown from '../../components/Dropdown';
import globalStyles from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import uploadFile from '../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import ProfilePic from '../../components/ProfilePic';
import Loader from '../../components/Loader';
import {useMutation} from '@tanstack/react-query';
import {addNewEvent} from '../../services/userServices/personalEvent.services';

const AddRemainder = ({navigation}) => {
  const eventsAddFormik = useFormik({
    initialValues: {
      eventDate: '',
      selectedEvent: '',
      personDetails: [
        {
          profilePic: '',
          personName: '',
          contactNumber: '',
          notes: '',
        },
      ],
      open: false,
    },
    validationSchema: yup.object({
      eventDate: yup.string().required('Event Date is Required'),
      selectedEvent: yup.string().required('Event is Required'),
      personDetails: yup.array().of(
        yup.object().shape({
          profilePic: yup.string().required('Profile Photo is Required'),
          personName: yup.string().required('Event Person is Required'),
          contactNumber: yup
            .string()
            .required('Contact Number is Required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
          notes: yup.string().required('note is Required').min(3, 'Min 3 Char'),
        }),
      ),
    }),
    onSubmit: values => {
      console.log(values, 'values');
      let body = {
        eventDate: moment(values.eventDate).format('YYYY-MM-DD'),
        eventType: values?.eventName,
        personDetails: values?.personDetails,
      };
      addNewEventlMutate(body);
    },
  });

  const addPerson = () => {
    const newPerson = {
      profilePic: '',
      personName: '',
      contactNumber: '',
      notes: '',
    };
    eventsAddFormik.setValues(prev => ({
      ...prev,
      personDetails: [...prev.personDetails, newPerson],
    }));
  };

  const [imageUploading, setImageUploading] = useState(false);

  const {mutate: addNewEventlMutate, isLoading: addNewEventlLoading} =
    useMutation(addNewEvent, {
      onSuccess: ({data}) => {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
        eventsAddFormik?.resetForm();
        navigation.goBack();
      },
      onError: err => {
        console.log(err?.response?.data?.message, 'err');
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
    });

  const uploadePhoto = async (path, mime, index) => {
    try {
      console.log(path, 'in uploade photo');
      setImageUploading(true);
      const uplode = await uploadFile({
        filePath: {path: path},
        fileLocation: `profile/${Date.now()}`,
        contentType: mime,
      });
      setImageUploading(false);
      console.log(uplode?.fileURL, 'uplode file url');
      eventsAddFormik.setValues(prev => ({
        ...prev,
        personDetails: prev.personDetails.map((person, i) => {
          if (i === index) {
            return {
              ...person,
              profilePic: uplode?.fileURL,
            };
          }
          return person;
        }),
      }));
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
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          console.log(image, 'imgae in the edit profile');
          uploadePhoto(image.path, image.mime, index);
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
      {/* event date  */}
      <DatePicker
        textColor="black"
        modal
        open={eventsAddFormik?.values?.open}
        date={
          eventsAddFormik?.values?.eventDate
            ? new Date(eventsAddFormik?.values?.eventDate)
            : new Date()
        }
        onConfirm={date => {
          console.log(date);
          eventsAddFormik.setValues(prev => ({
            ...prev,
            eventDate: date,
            open: false,
          }));
        }}
        onCancel={() => {
          eventsAddFormik.setValues(prev => ({
            ...prev,
            open: false,
          }));
        }}
        maximumDate={new Date()}
        mode="date"
      />

      <Loader open={imageUploading} text="Uploading Image" />
      <TopHeader titile={'Add Events'} />

      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          backgroundColor: Colors.Background,
        }}>
        <Text style={styles.Labeltitle}>Event</Text>
        {/* container for selection of date and event name*/}
        <View style={styles.cardContainer}>
          <View style={styles.textInputField}>
            <Text style={{color: Colors.TEXT1, fontWeight: '600'}}>
              Event Date
            </Text>
            <TouchableOpacity
              style={styles.date_container}
              onPress={() => {
                eventsAddFormik.setValues(prev => ({
                  ...prev,
                  open: true,
                }));
              }}>
              <Text style={styles.placeHolder}>
                {eventsAddFormik?.values?.eventDate
                  ? moment(eventsAddFormik?.values?.eventDate).format('LL')
                  : 'Please Select Date'}
              </Text>
              <Entypo name="calendar" size={24} color={Colors.TEXT1} />
            </TouchableOpacity>
          </View>
          {eventsAddFormik.errors.eventDate && (
            <Text style={globalStyles.error_text}>
              {eventsAddFormik.errors.eventDate}
            </Text>
          )}
          <View style={styles.textInputField}>
            <Text style={{color: Colors.TEXT1, fontWeight: '600'}}>
              Select Event
            </Text>
            <Dropdown
              value={eventsAddFormik.values.selectedEvent}
              label="Select Event*"
              data={[
                {label: 'Birthday', value: 'Birthday'},
                {label: 'Anniversary', value: 'Anniversary'},
                {label: 'Other', value: 'Other'},
              ]}
              onChangeValue={res => {
                eventsAddFormik.setValues(prev => ({
                  ...prev,
                  selectedEvent: res,
                  eventName: res,
                }));
              }}
            />
          </View>
          {eventsAddFormik.errors.selectedEvent && (
            <Text style={globalStyles.error_text}>
              {eventsAddFormik.errors.selectedEvent}
            </Text>
          )}

          {eventsAddFormik?.values?.selectedEvent === 'Other' && (
            <View style={styles.textInputField}>
              <Text style={{color: Colors.TEXT1, fontWeight: '600'}}>
                Event Name
              </Text>
              <CustomTextInputFormik
                formik={eventsAddFormik}
                name="eventName"
                label="Event Name"
              />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.Labeltitle}>Person Details</Text>
          <TouchableOpacity onPress={addPerson}>
            <Text style={[styles.Labeltitle, {color: Colors.PRIMARY}]}>
              Add Person
            </Text>
          </TouchableOpacity>
        </View>
        {eventsAddFormik?.values?.personDetails.map((person, index) => (
          <View key={index} style={[styles.cardContainer, {marginBottom: 10}]}>
            <Text style={{color: Colors.TEXT1, paddingHorizontal: 10}}>
              Event Photo
            </Text>

            <View style={styles.image_wrap}>
              <ProfilePic
                imageUrl={person.profilePic}
                TakePhotofromGallery={() => TakePhotofromGallery(index)}
              />
              {eventsAddFormik.errors.personDetails &&
                eventsAddFormik.errors.personDetails[index] &&
                eventsAddFormik.errors.personDetails[index].profilePic && (
                  <Text style={globalStyles.error_text}>
                    {eventsAddFormik.errors.personDetails[index].profilePic}
                  </Text>
                )}
            </View>

            <View style={styles.textInputField}>
              <Text style={{color: Colors.TEXT1}}>Person Name</Text>
              <CustomTextInputFormik
                formik={eventsAddFormik}
                name={`personDetails[${index}].personName`}
                label="Person Name"
                error={
                  eventsAddFormik.errors.personDetails &&
                  eventsAddFormik.errors.personDetails[index] &&
                  eventsAddFormik.errors.personDetails[index].personName
                }
              />
            </View>

            <View style={styles.textInputField}>
              <Text style={{color: Colors.TEXT1}}>Person Contact Number</Text>
              <CustomTextInputFormik
                formik={eventsAddFormik}
                name={`personDetails[${index}].contactNumber`}
                label="Person Contact Number"
                keyboardType="numeric"
                error={
                  eventsAddFormik.errors.personDetails &&
                  eventsAddFormik.errors.personDetails[index] &&
                  eventsAddFormik.errors.personDetails[index].contactNumber
                }
              />
            </View>

            <View style={styles.textInputField}>
              <Text style={{color: Colors.TEXT1}}>notes</Text>
              <CustomTextInputFormik
                formik={eventsAddFormik}
                name={`personDetails[${index}].notes`}
                label="notes"
                numberOfLines={3}
              />
            </View>
          </View>
        ))}

        <CustomButton
          title={'Add Event'}
          onPress={() => eventsAddFormik.handleSubmit()}
        />
      </ScrollView>
    </>
  );
};

export default AddRemainder;
