import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../../../components/TopHeader';
import Colors from '../../../../constants/Colors';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import ProfilePic from '../../../../components/ProfilePic';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import Loader from '../../../../components/Loader';
import CustomButton from '../../../../components/CustomButton';

const PoliticalVolunteer = () => {
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const profileVolunteerFormik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      desingation: '',
      whatsappNumber: '',
      aboutYourself: '',
      profilePic: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      mobile: Yup.string().required('Required'),
      desingation: Yup.string().required('Required'),
      whatsappNumber: Yup.string().required('Required'),
      profilePic: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      console.log(values, 'values');
    },
  });

  const uploadePhoto = async (path, mime) => {
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
      // bussinessTypeFormik.setValues(prev => ({
      //   ...prev,
      //   logo: uplode?.fileURL,
      // }));
      setprofilePic(uplode?.fileURL);
    } catch (error) {
      setImageUploading(false);
    }
  };

  // profile pic image picker
  const TakePhotofromGallery = async () => {
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
      <TopHeader titile={'Political Volunteer'} />
      <Loader open={imageUploading} text="Uploading Image" />
      <ScrollView contentContainerStyle={styles.root}>
        {/* profile pic container */}
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
          <Text style={styles.tittle}>Upload Your ProfilePic</Text>
        </View>
        {/* your name */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Your Name</Text>
          <CustomTextInputFormik
            formik={profileVolunteerFormik}
            name={'name'}
            label={'Your Name'}
          />
        </View>
        {/* designation */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Designation</Text>
          <CustomTextInputFormik
            formik={profileVolunteerFormik}
            name={'desingation'}
            label={'Your Designation'}
          />
        </View>
        {/* mobile */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Mobile</Text>
          <CustomTextInputFormik
            formik={profileVolunteerFormik}
            name={'mobile'}
            label={'Your Mobile'}
          />
        </View>
        {/* whatsapp number */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Whatsapp Number</Text>
          <CustomTextInputFormik
            formik={profileVolunteerFormik}
            name={'whatsappNumber'}
            label={'Whatsapp Number'}
          />
        </View>
        {/* about youself */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>About Yourself</Text>
          <CustomTextInputFormik
            formik={profileVolunteerFormik}
            name={'aboutYourself'}
            label={'About Yourself'}
            numberOfLines={4}
            maxLength={1000}
          />
        </View>

        <CustomButton
          title={'Submit'}
          onPress={() => {
            profileVolunteerFormik?.handleSubmit();
          }}
        />
      </ScrollView>
    </>
  );
};

export default PoliticalVolunteer;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
    bottom: 10,
  },
  image_wrap: {
    alignItems: 'center',
    marginTop: 20,
  },
  tittle: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '700',
    color: Colors.TEXT1,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
  textInputField: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
  },
});
