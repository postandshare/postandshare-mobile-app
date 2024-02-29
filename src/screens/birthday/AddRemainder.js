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

const AddRemainder = ({navigation}) => {
  const eventsAddFormik = useFormik({
    initialValues: {
      eventDate: '',
      selectedEvent: '',
      eventPhoto: '',
      eventPerson: '',
      eventPersonNickName: '',
      eventName: '',
      eventPerson1: '',
      eventPersonNickName1: '',
      eventPhoto1: '',
      note: '',
      open: false,
    },
    validationSchema: yup.object({
      eventDate: yup.string().required('Event Date is Required'),
      selectedEvent: yup.string().required('Event is Required'),
      eventPhoto: yup.string().optional(''),
      eventPerson: yup.string().required('Event Person is Required'),
      eventName: yup.string().when('selectedEvent', {
        is: 'Other',
        then: () => yup.string().required('Event Name is Required'),
      }),
      eventPerson1: yup.string().when('selectedEvent', {
        is: 'Anniversary',
        then: () => yup.string().required('Second Person Name is Required'),
      }),
      eventPersonNickName: yup.string().optional(),
      note: yup.string().optional(''),
    }),
    onSubmit: values => {
      console.log(values, 'values');
    },
  });

  const [imageUploading, setImageUploading] = useState(false);

  const uploadePhoto = async (path, mime, setValues, photo) => {
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
      setValues(prev => ({
        ...prev,
        photo: uplode?.fileURL,
      }));
      //   eventsAddFormik.setValues(prev => ({
      //     ...prev,
      //     logo: uplode?.fileURL,
      //   }));
      // setprofilePic(uplode?.fileURL);
    } catch (error) {
      setImageUploading(false);
    }
  };


  const TakePhotofromGallery = async ({setValues, photo}) => {
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
          uploadePhoto(image.path, image.mime, setValues, photo);
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

      <TopHeader titile={'Add Events'} />

      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.Background,
        }}>
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Event Date</Text>
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
          <Text style={{color: Colors.TEXT1}}>Select Event</Text>
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
            <Text style={{color: Colors.TEXT1}}>Event Name</Text>
            <CustomTextInputFormik
              formik={eventsAddFormik}
              name="eventName"
              label="Event Name"
            />
          </View>
        )}

        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Person Name</Text>
          <CustomTextInputFormik
            formik={eventsAddFormik}
            name="eventPerson"
            label="Person Name"
          />
        </View>

        <Text style={{color: Colors.TEXT1, paddingHorizontal: 10}}>
          Event Photo
        </Text>
        <View style={styles.photo_container}>
          {eventsAddFormik?.values?.eventPhoto ? (
            <Image
              source={{uri: eventsAddFormik?.values?.eventPhoto}}
              style={{width: '100%', height: '100%', borderRadius: 10 , resizeMode: 'contain'}}
            />
          ) : (
            <TouchableOpacity
              onPress={() =>
                TakePhotofromGallery({
                  setValues: eventsAddFormik.setValues,
                  photo: eventsAddFormik?.values?.eventPhoto,
                })
              }
              style={styles.photo_button_container}>
              <Text style={styles.photo_button_text}>Upload Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Person Nick Name</Text>
          <CustomTextInputFormik
            formik={eventsAddFormik}
            name="eventPersonNickName"
            label="Person Nick Name"
          />
        </View>

        {eventsAddFormik?.values?.selectedEvent === 'Anniversary' && (
          <View style={styles.textInputField}>
            <Text style={{color: Colors.TEXT1}}> Second Person Name</Text>
            <CustomTextInputFormik
              formik={eventsAddFormik}
              name="eventPerson1"
              label=" Second Person Name"
            />
          </View>
        )}

        {eventsAddFormik?.values?.selectedEvent === 'Anniversary' && (
          <View style={styles.textInputField}>
            <Text style={{color: Colors.TEXT1}}>Second Person Nick Name</Text>
            <CustomTextInputFormik
              formik={eventsAddFormik}
              name="eventPersonNickName1"
              label="Second Person Nick Name"
            />
          </View>
        )}

        {/* {eventsAddFormik?.values?.selectedEvent === 'Anniversary' && (
          <>
            <Text style={{color: Colors.TEXT1, paddingHorizontal: 10}}>
              Second Person Photo
            </Text>
                   <View style={styles.photo_container}>
          {eventsAddFormik?.values?.eventPhoto ? (
            <Image
              source={{uri: eventsAddFormik?.values?.eventPhoto}}
              style={{width: '100%', height: '100%', borderRadius: 10 , resizeMode: 'contain'}}
            />
          ) : (
            <TouchableOpacity
              onPress={() =>
                TakePhotofromGallery({
                  setValues: eventsAddFormik.setValues,
                  photo: eventsAddFormik?.values?.eventPhoto,
                })
              }
              style={styles.photo_button_container}>
              <Text style={styles.photo_button_text}>Upload Photo</Text>
            </TouchableOpacity>
          )}
        </View>
          </>
        )} */}

        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Note</Text>
          <CustomTextInputFormik
            formik={eventsAddFormik}
            name="note"
            label="Note"
            numberOfLines={3}
          />
        </View>

        <CustomButton
          title={'Add Event'}
          onPress={() => eventsAddFormik.handleSubmit()}
        />
      </ScrollView>
    </>
  );
};

export default AddRemainder;
