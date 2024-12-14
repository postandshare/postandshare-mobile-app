import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useRef, useState} from 'react';
import ProfilePic from '../../components/ProfilePic';
import uploadFile from '../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomTextInputFormik from '../../components/CustomTextInputFormik';
import ActionSheet from 'react-native-actions-sheet';
import AddBussinessPartnerSheet from './components/actionsheets/AddBussinessPartnerSheet';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Colors from '../../constants/Colors';
import images from '../../constants/images';
import {useMutation} from '@tanstack/react-query';
import {addBusinessPartner} from '../../services/userServices/bussiness.servies';
import Loader from '../../components/Loader';
import {useFieldArray, useForm} from 'react-hook-form';
import ControllerInputOutlined from '../../components/ControllerInputOutlined';

const AddEditBusinessStep2 = ({navigation, route}) => {
  const [profilePic, setprofilePic] = useState('');
  const [edit, setEdit] = useState(false);
  const [bussinessPartnerDetails, setBussinessPartnerDetails] = useState();

  const [bussinessPartner, setBussinessPartner] = useState([]);
  const {control} = useForm({
    defaultValues: {
      bussinessOwnerName: '',
      bussinessOwnerPhone: '',
      bussinessOwnerWhatsapp: '',
      bussinessOwnerDessignation: '',
      bussinessOwnerPhoto: '',
    },
  });

  const onSubmit = data => {};

  const {
    mutate: addBusinessPartnerlMutate,
    isLoading: addBusinessPartnerlLoading,
  } = useMutation(addBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const [imageUploading, setImageUploading] = useState(false);

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

  const actionSheetRef = useRef(null);
  const onPressAddPartner = () => {};
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };
  return (
    <>
      <Loader visible={imageUploading} text="loading..." />
      {/* <ActionSheet
        ref={actionSheetRef}
        closeOnTouchBackdrop={false}
        gestureEnabled={false}
        containerStyle={{
          paddingBottom: 50,
          marginBottom: 0,
          backgroundColor: '#f5f5f5',
        }}>
        <AddBussinessPartnerSheet onPressCross={onPressCross} edit={edit} />
      </ActionSheet> */}

      <ScrollView contentContainerStyle={styles.root}>
        <Text style={styles.title}>Your Detail</Text>
        <View style={styles.white_box}>
          <View style={styles.image_wrap}>
            <ProfilePic
              imageUrl={profilePic}
              TakePhotofromGallery={TakePhotofromGallery}
            />
            <Text style={styles.title}>Upload Your Bussiness Pic</Text>
          </View>

          <ControllerInputOutlined
            rules={{
              required: 'Name required',
            }}
            control={control}
            name={'bussinessOwnerName'}
            label={'Your Name'}
          />

          {/* desingnation */}

          <ControllerInputOutlined
            rules={{
              required: 'Name required',
            }}
            control={control}
            name={'bussinessOwnerDessignation'}
            label={'Desingnation'}
          />

          {/* mobile */}

          <ControllerInputOutlined
            rules={{
              required: 'Mobile number required',
              minLength: {
                value: 10,
                message: 'Number should be 10 digit',
              },
            }}
            control={control}
            name={'bussinessOwnerPhone'}
            label={'Mobile'}
            keyboardType={'number-pad'}
            maxLength={10}
          />

          {/* whatsapp */}
          <View style={styles.textInputField}>
            {/* <Text style={{color: Colors.TEXT1}}>Whatsapp</Text> */}
            <ControllerInputOutlined
              rules={{
                minLength: {
                  value: 10,
                  message: 'Number should be 10 digit',
                },
              }}
              control={control}
              name={'bussinessOwnerWhatsapp'}
              label={'Whatsapp'}
              keyboardType={'number-pad'}
              maxLength={10}
            />
          </View>
        </View>

        {/* BUSSINESS PARTNER   */}
        {/* {bussinessDetails ? null : (
          <View style={{flex: 1, marginHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: Colors.TEXT1,
                }}>
                Bussiness Partner
              </Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.show();
                }}>
                <Text style={{color: Colors.PRIMARY, fontStyle: 'italic'}}>
                  Add Bussiness Partner
                </Text>
              </TouchableOpacity>
            </View>

            {fields?.map((item, index) => (
              <View key={index} style={styles.partnerCard}>
                <View style={{flex: 0.2}}>
                  <Image
                    source={
                      bussinessDetails?.businessPartnerList
                        ? {uri: item?.photo}
                        : item && item.bussinessPartnerPhoto
                        ? {uri: item.bussinessPartnerPhoto}
                        : images && images.profilePlaceholder
                    }
                    style={{width: 50, height: 50, borderRadius: 50}}
                  />
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={{fontSize: 16, color: Colors.PRIMARY}}>
                    {bussinessDetails?.businessPartnerList
                      ? item?.name
                      : item?.bussinessPartnerName}
                  </Text>
                  <Text style={{fontSize: 14, color: Colors.TEXT1}}>
                    {bussinessDetails?.businessPartnerList
                      ? item?.designation
                      : item?.bussinessPartnerDessignation}
                  </Text>
                </View>
                <View style={{flex: 0.2, justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      let temp = bussinessPartner;
                      setBussinessPartner(temp);
                    }}>
                    <Text style={styles.revove_text}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setEdit(true);
                      actionSheetRef?.current?.show();
                    }}>
                    <Text style={styles.edit_text}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {bussinessPartner?.length > 0 ? null : (
              <Text style={styles.no_business_text}>
                No Bussiness Partner Added
              </Text>
            )}
          </View>
        )} */}
      </ScrollView>
    </>
  );
};

export default AddEditBusinessStep2;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
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
  image_wrap: {
    marginVertical: 10,
    alignItems: 'center',
  },

  textInputField: {
    width: '95%',
    marginTop: 1,
    alignSelf: 'center',
  },
  partnerCard: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.white,
    elevation: 5,
    marginVertical: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.borderColor,
  },
  revove_text: {
    color: 'red',
    fontStyle: 'italic',
  },
  edit_text: {
    color: 'blue',
    fontStyle: 'italic',
  },
  no_business_text: {
    color: 'red',
    height: 100,
    alignSelf: 'center',
    fontSize: 16,
  },
});
