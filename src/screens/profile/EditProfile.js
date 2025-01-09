import {
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
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
import {useForm} from 'react-hook-form';
import {DISTRICTS, STATES} from '../../constants';
const EditProfile = ({route, navigation}) => {
  const {data} = route.params;
  const [profilePic, setprofilePic] = useState(data?.profilePic ?? '');
  const [state, setState] = useState({districtList: []});
  const [imageUploading, setImageUploading] = useState(false);
  const dispatch = useDispatch();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {
      firstName: data?.firstName ?? '',
      middleName: data?.middleName ?? '',
      lastName: data?.lastName ?? '',
      DOB: data?.DOB ? new Date(data?.DOB) : '',
      gender: data?.gender ?? '',
      community: data?.community ?? '',
      mobileNumber: data?.mobileNumber ?? '',
      alternateNumber: data?.alternateNumber ?? '',
      whatsAppNumber: data?.whatsAppNumber ?? '',
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
  });
  const stateWatch = watch('cstate');
  const onSubmit = prevData => {
    const body = {
      firstName: prevData?.firstName,
      middleName: prevData?.middleName,
      lastName: prevData?.lastName,
      gender: prevData?.gender,
      email: prevData?.email,
      DOB: new Date(prevData?.DOB),
      currentAddress: {
        address: prevData?.caddress,
        dist: prevData?.cdist,
        pinCode: String(prevData?.cpinCode),
        state: prevData?.cstate,
      },
      isProfileUpdated: true,
      profilePic,
    };
    updateUserProfileMutate(body);
  };
  const {mutate: updateSelfPhotoMutate} = useMutation(updateSelfPhoto, {
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
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
        dispatch(setProfileUpdated(true));
        navigation.goBack();
      },
      onError: err =>
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    });

  useEffect(() => {
    if (stateWatch) {
      setState(prev => ({
        ...prev,
        districtList: DISTRICTS[STATES.indexOf(stateWatch) + 1],
      }));
    }
  }, [stateWatch]);

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
          <Text style={styles.title}>Basic Information</Text>
          <BasicEdit
            profilePic={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
            control={control}
          />
          <Text style={styles.title}>Social Media</Text>
          <SocialMediaEdit control={control} />
          <Text style={styles.title}>Address</Text>
          <AddressEdit districtList={state.districtList} control={control} />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
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
