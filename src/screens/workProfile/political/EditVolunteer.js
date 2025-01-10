import {
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import {Controller, useForm} from 'react-hook-form';
import ControllerSingleInput from '../../../components/common/ControllerSingleInput';
import {useMutation} from '@tanstack/react-query';
import {updateVolunteerProfile} from '../../../services/userServices/political.services';
import CustomButton from '../../../components/CustomButton';

import Loader from '../../../components/Loader';
import {Button, Text} from 'react-native-paper';
import {TakePhotofromGalleryWithCrop} from '../../../utils/heplers';
import uploadFile from '../../../utils/uploadFile';
import globalStyles from '../../../styles/globalStyles';
import NavigationScreenName from '../../../constants/NavigationScreenName';
const EditVolunteer = ({navigation, route}) => {
  console.log(route.params?.data);
  const [state, setState] = useState({
    imageFile: {
      path: '',
      mime: '',
    },
    loading: false,
  });
  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      volunteerName: route?.params?.data?.volunteerName,
      volunteerPhoto: route?.params?.data?.volunteerPhoto,
      designation: route?.params?.data?.designation,
      mobileNumber: route?.params?.data?.mobileNumber,
      whatsAppNumber: route?.params?.data?.whatsAppNumber,
      description: route?.params?.data?.description,
    },
  });
  const onSubmit = async data => {
    setState(prev => ({...prev, loading: true}));
    if (state.imageFile) {
      const {fileURL} = await uploadFile({
        filePath: {path: state.imageFile?.path},
        fileLocation: `postAndShare/volunteer/${Date.now()}`,
        contentType: state.imageFile?.mime,
      });
      data.volunteerPhoto = fileURL;
    }
    updateVolunteerProfileMutate({
      ...data,
      profileDocId: route?.params?.data?._id,
    });
    setState(prev => ({...prev, loading: false}));
  };
  const handleUploadImage = async () => {
    try {
      const {path, mime} = await TakePhotofromGalleryWithCrop();
      setValue('volunteerPhoto', path);
      setState(prev => ({...prev, imageFile: {path, mime}}));
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutate: updateVolunteerProfileMutate,
    isLoading: updateVolunteerProfileLoading,
  } = useMutation({
    mutationKey: ['updateVolunteerProfile'],
    mutationFn: updateVolunteerProfile,
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
      navigation.replace(NavigationScreenName.WORK_PROFILE_LIST);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  return (
    <>
      <Loader
        open={updateVolunteerProfileLoading || state.loading}
        text="Updating..."
      />
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.white_box}>
            <View>
              <Controller
                control={control}
                name="volunteerPhoto"
                rules={{required: 'Photo required'}}
                render={({field: {value}, fieldState: {error}}) => (
                  <>
                    <View style={styles.upload_wrap}>
                      {value && (
                        <Image
                          source={{uri: value}}
                          style={styles.upload_img}
                        />
                      )}
                      <Button
                        onPress={handleUploadImage}
                        mode="contained"
                        style={styles.upload_button}>
                        <Text style={styles.upload_text}>Upload Photo</Text>
                      </Button>
                    </View>
                    {error?.message && (
                      <Text style={globalStyles.error_text}>
                        {error.message}
                      </Text>
                    )}
                  </>
                )}
              />
              {/* name */}
              <ControllerSingleInput
                name="volunteerName"
                control={control}
                label="Volunteer Name"
                placeholder="Type volunteer name"
                rules={{
                  required: 'Volunteer name required',
                }}
              />
              {/* designation */}
              <ControllerSingleInput
                name="designation"
                control={control}
                label="Designation"
                placeholder="Type desgination"
                rules={{
                  required: 'Designation required',
                }}
              />
              {/* mobile number */}
              <ControllerSingleInput
                name="mobileNumber"
                control={control}
                label="Mobile Number"
                placeholder="Type mobile number"
                rules={{
                  required: 'Mobile number required',
                }}
                maxLength={10}
                keyboardType="number-pad"
              />

              {/* mobile number */}
              <ControllerSingleInput
                name="whatsAppNumber"
                control={control}
                label="WhatsApp Number"
                placeholder="Type mobile number"
                maxLength={10}
                keyboardType="number-pad"
              />
              {/* description */}
              <ControllerSingleInput
                name="description"
                control={control}
                label="Description"
                placeholder="Type description"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.submit_button}>
          <CustomButton title={'Submit'} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </>
  );
};

export default EditVolunteer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: Sizes.wp('5%'),
    paddingBottom: Sizes.hp('10%'),
  },
  upload_wrap: {
    justifyContent: 'center',
  },
  upload_text: {
    color: '#fff',
  },
  upload_button: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  upload_img: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  submit_button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 17,
    marginVertical: 7,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  white_box: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  party_select_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT,
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 3,
  },
  part_img_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  party_icon: {
    height: Sizes.hp('6%'),
    width: Sizes.hp('6%'),
    borderRadius: Sizes.hp('3%'),
    resizeMode: 'cover',
  },
  party_select_text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  second_sroll_box: {
    maxHeight: Sizes.hp('35%'),
  },
  second_sroll_container: {
    paddingVertical: 5,
  },
});
