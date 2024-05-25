import {
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
// import uploadFile from '../../utils/uploadFile';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import uploadFile from '../../utils/uploadFile';
import Loader from '../../components/Loader';
import {useMutation} from '@tanstack/react-query';
import {
  updateSelfPhoto,
  updateUserProfile,
} from '../../services/userServices/profile.services';
import {useDispatch} from 'react-redux';
import {setProfileUpdated} from '../../services/reducer/CommonReducer';
import BasicEdit from './components/EditProfile/BasicEdit';
import SocialMediaEdit from './components/EditProfile/SocialMediaEdit';
import AddressEdit from './components/EditProfile/AddressEdit';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim(),
  DOB: Yup.date().required('Please enter your birthday'),
  gender: Yup.string().trim().required('Please select gender'),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter your mobile number'),
  whatsappNumber: Yup.string().matches(
    phoneRegExp,
    'Phone number is not valid',
  ),
  email: Yup.string().email('Must be a valid email').max(255),
  caddress: Yup.string().trim().required(),
  cdist: Yup.string().trim().required(),
  cpinCode: Yup.number().required(),
  cstate: Yup.string().trim().required(),
});

const genderList = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const EditProfile = ({route, navigation}) => {
  const {data} = route.params;
  const [profilePic, setprofilePic] = useState(data?.profilePic ?? '');
  const [imageUploading, setImageUploading] = useState(false);
  const dispatch = useDispatch();

  const {mutate: updateSelfPhotoMutate, isLoading: updateSelfPhotoLoading} =
    useMutation(updateSelfPhoto, {
      onSuccess: ({data}) => {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
      },
      onError: err =>
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
      enabled: false,
    });

  const uploadePhoto = async (path, mime) => {
    try {
      setImageUploading(true);
      const uplode = await uploadFile({
        filePath: {path: path},
        fileLocation: `profile/${Date.now()}`,
        contentType: mime,
      });
      setImageUploading(false);
      updateSelfPhotoMutate({
        profilePic: uplode?.fileURL,
      });
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
      ImagePicker.openPicker({
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

  const {mutate: updateUserProfileMutate, isLoading: updateUserProfileLoading} =
    useMutation(updateUserProfile, {
      onSuccess: ({data}) => {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
        dispatch(setProfileUpdated(true));
        navigation.goBack();
      },
      onError: err =>
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    });

  const personalProfileFormik = useFormik({
    initialValues: {
      firstName: data?.firstName ?? '',
      middleName: data?.middleName ?? '',
      lastName: data?.lastName ?? '',
      DOB: data?.DOB ? new Date(data?.DOB) : '',
      gender: data?.gender ?? '',
      community: data?.community ?? '',
      mobileNumber: data?.mobileNumber ?? '',
      alternateNumber: data?.alternateNumber ?? '',
      whatsappNumber: data?.whatsappNumber ?? '',
      email: data?.email ?? '',
      PAN: data?.PAN ?? '',
      maritalStatus: data?.maritalStatus ?? '',
      facebookLink: data?.facebookLink ?? '',
      twitterLink: data?.twitterLink ?? '',
      //current address
      caddress: data?.currentAddress?.address ?? '',
      cdist: data?.currentAddress?.dist ?? '',
      cpinCode: data?.currentAddress?.pinCode ?? '',
      cstate: data?.currentAddress?.state ?? '',
    },
    validationSchema,
    onSubmit(values) {
      const castedVal = validationSchema.cast(values);
      const body = {
        ...castedVal,
        DOB: new Date(castedVal?.DOB),
        currentAddress: {
          address: castedVal?.caddress,
          dist: castedVal?.cdist,
          pinCode: String(castedVal?.cpinCode),
          state: castedVal?.cstate,
        },
        isProfileUpdated: true,
        profilePic,
      };
      delete body.caddress;
      delete body.cdist;
      delete body.cpinCode;
      delete body.cstate;
      delete body.paddress;
      delete body.pdist;
      delete body.ppinCode;
      delete body.pstate;
      delete body?.mobileNumber;
      delete body?.category;
      delete body?.linkedinLink;
      delete body?.instagramLink;

      console.log(body, 'body');
      updateUserProfileMutate(body);
    },
  });

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <Loader open={updateUserProfileLoading} text="Updating Deatils..." />
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader titile={'Edit Profile'} />
        <ScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.root}>
          <Text style={styles.title}>Basic Edit</Text>
          <BasicEdit
            profilePic={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
            personalProfileFormik={personalProfileFormik}
          />
          <Text style={styles.title}>Social Media</Text>
          <SocialMediaEdit personalProfileFormik={personalProfileFormik} />
          <Text style={styles.title}>Address</Text>
          <AddressEdit personalProfileFormik={personalProfileFormik} />
          <TouchableOpacity
            onPress={personalProfileFormik?.handleSubmit}
            style={styles.button}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Update
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default EditProfile;
