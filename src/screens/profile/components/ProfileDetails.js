import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../constants/Colors';
import images from '../../../constants/images';
import Sizes from '../../../constants/Sizes';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ProfilePic from '../../../components/ProfilePic';
import {useMutation} from '@tanstack/react-query';
import {updateSelfPhoto} from '../../../services/userServices/profile.services';
import uploadFile from '../../../utils/uploadFile';

const LabelText = ({label, value}) => {
  return (
    <View style={styles.textinputView}>
      <Text style={{color: Colors.TEXT1, fontSize: 10, fontWeight: '300'}}>
        {label}
      </Text>
      <Text style={{color: Colors.TEXT1, fontSize: 13, fontWeight: '500'}}>
        {value}
      </Text>
    </View>
  );
};

const ProfileDetails = ({data}) => {
  const [profilePic, setprofilePic] = useState(data?.profilePic ?? '');
  const [imageUploading, setImageUploading] = useState(false);
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

  return (
    <View style={styles.container}>
      {/* profile image */}
      <View style={styles.profile_pic}>
        <ProfilePic
          imageUrl={profilePic}
          TakePhotofromGallery={TakePhotofromGallery}
        />
      </View>
      {/* name */}
      <Text style={styles.name_text}>
        {data?.firstName} {data?.middleName} {data?.lastName}
      </Text>

      {/* name of the user */}
      <View style={styles.other_details}>
        <LabelText label={'First Name'} value={data?.firstName ?? '--'} />
        <LabelText label={'Middle Name'} value={data?.middleName ?? '--'} />
        <LabelText label={'Last Name'} value={data?.lastName ?? '--'} />
      </View>
      {/* other details */}
      <View style={styles.other_details}>
        <LabelText
          label={'DOB'}
          value={data?.DOB ? moment(data?.DOB).format('LL') : '--'}
        />
        <LabelText label={'Mail Id'} value={data?.email ?? '--'} />
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('90%'),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 6,
    marginTop: 30,
    alignItems: 'center',
  },
  image_wrap: {
    alignItems: 'center',
    marginTop: 0,
  },
  profile_pic: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    resizeMode: 'center',
    top: -30,
  },
  name_text: {
    color: Colors.PRIMARY,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -10,
  },
  textinputView: {
    flex: 1,
    marginVertical: 4,
  },
  other_details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
