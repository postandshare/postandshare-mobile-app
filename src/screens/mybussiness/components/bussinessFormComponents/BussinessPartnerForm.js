import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ProfilePic from '../../../../components/ProfilePic';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import ActionSheet from 'react-native-actions-sheet';
import AddBussinessPartnerSheet from '../actionsheets/AddBussinessPartnerSheet';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Colors from '../../../../constants/Colors';
import images from '../../../../constants/images';
import {useMutation} from '@tanstack/react-query';
import {addBusinessPartner} from '../../../../services/userServices/bussiness.servies';

const BussinessPartnerForm = ({bussinessTypeFormik , bussinessDetails}) => {
  const [profilePic, setprofilePic] = useState(
    bussinessTypeFormik?.values?.logo,
  );
  const [bussinessPartnerDetails, setBussinessPartnerDetails] = useState();
  // console.log(bussinessTypeFormik?.values?.bussinessPartner, 'bussiness partner')
  const [bussinessPartner, setBussinessPartner] = useState(
    bussinessTypeFormik?.values?.bussinessPartner ?? [],
  );

  const bussinessPartnerDetailsFormik = useFormik({
    initialValues: {
      bussinessPartnerName: '',
      bussinessPartnerDessignation: '',
      bussinessPartnerPhoto: '',
    },
    validationSchema: yup.object({
      //bussinessPartner
      bussinessPartnerName: yup.string().required('Required'),
      bussinessPartnerDessignation: yup.string().optional(),
      bussinessPartnerPhoto: yup.string().optional(),
    }),
    onSubmit: formValues => {
      actionSheetRef?.current?.hide();
      console.log(formValues, 'in bussiness formik');
      let temp = {
        name: formValues?.bussinessPartnerName,
        designation: formValues?.bussinessPartnerDessignation,
        photo: formValues?.bussinessPartnerPhoto,
      };
      setBussinessPartner(prev => [...prev, formValues]);
      // addBusinessPartnerlMutate(formValues);
      bussinessTypeFormik.setValues(prev => ({
        ...prev,
        bussinessPartner: [...prev?.bussinessPartner, temp],
      }));
    },
  });

  const {
    mutate: addBusinessPartnerlMutate,
    isLoading: addBusinessPartnerlLoading,
  } = useMutation(addBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      bussinessPartnerDetailsFormik?.resetForm();
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
      console.log(uplode?.fileURL, 'uplode file url');
      //   updateSelfPhotoMutate({
      //     profilePic: uplode?.fileURL,
      //   });
      bussinessTypeFormik.setValues(prev => ({
        ...prev,
        bussinessOwnerPhoto: uplode?.fileURL,
      }));
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

  // console.log(bussinessPartner, 'bussiness partner in the state');

  const actionSheetRef = useRef(null);
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };
  const AddBussinessPartner = async () => {
    bussinessPartnerDetailsFormik?.setTouched({
      bussinessPartnerName: true,
      bussinessPartnerDessignation: true,
      bussinessPartnerPhoto: true,
    });
    bussinessPartnerDetailsFormik.handleSubmit();
  };
  return (
    <>
      <ActionSheet
        ref={actionSheetRef}
        closeOnTouchBackdrop={false}
        gestureEnabled={false}
        containerStyle={{
          paddingBottom: 50,
          marginBottom: 0,
          backgroundColor: '#f5f5f5',
        }}>
        <AddBussinessPartnerSheet
          bussinessPartnerDetails={bussinessPartnerDetails}
          onPressCross={onPressCross}
          bussinessTypeFormik={bussinessPartnerDetailsFormik}
          AddBussinessPartner={AddBussinessPartner}
        />
      </ActionSheet>

      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.root}>
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
          <Text style={styles.tittle}>Upload Your Bussiness Pic</Text>
        </View>

        {/* your name */}
        <View style={styles.textInputField}>
          <Text>Your Name</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerName'}
            label={'Your Name'}
          />
        </View>
        {/* desingnation */}
        <View style={styles.textInputField}>
          <Text>Desingnation</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerDessignation'}
            label={'Desingnation'}
          />
        </View>
        {/* mobile */}
        <View style={styles.textInputField}>
          <Text>Mobile</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerPhone'}
            label={'Mobile'}
            keyboardType={'number-pad'}
            maxLength={10}
          />
        </View>
        {/* whatsapp */}
        <View style={styles.textInputField}>
          <Text>Whatsapp</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerWhatsapp'}
            label={'Whatsapp'}
            keyboardType={'number-pad'}
            maxLength={10}
          />
        </View>

        {/* BUSSINESS PARTNER   */}
        {bussinessDetails ? null : (
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
              Bussiness Partner
            </Text>
            {bussinessPartner?.map((item, index) => (
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
                  <Text style={{fontSize: 16, color: Colors.TEXT1}}>
                    { bussinessDetails?.businessPartnerList
                      ? item?.name
                      : item?.bussinessPartnerName}
                  </Text>
                  <Text style={{fontSize: 14, color: Colors.TEXT1}}>
                    { bussinessDetails?.businessPartnerList
                      ? item?.designation
                      : item?.bussinessPartnerDessignation}
                  </Text>
                </View>
                <View style={{flex: 0.2, justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      let temp = bussinessPartner;
                      temp.splice(index, 1);
                      setBussinessPartner(temp);
                      bussinessTypeFormik.setValues(prev => ({
                        ...prev,
                        bussinessPartner: temp,
                      }));
                    }}>
                    <Text style={{color: 'red'}}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef?.current?.show();
                      setBussinessPartnerDetails(item);
                      bussinessPartnerDetailsFormik.setValues(prev => ({
                        ...prev,
                        bussinessPartnerName: item?.name,
                        bussinessPartnerDessignation: item?.designation,
                        bussinessPartnerPhoto: item?.photo,
                      }));
                    }}>
                    <Text style={{color: 'blue', fontStyle: 'italic'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => {
                actionSheetRef?.current?.show();
              }}>
              <Text style={{color: 'blue', fontStyle: 'italic'}}>
                Add More Business Partner
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default BussinessPartnerForm;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
  },
  image_wrap: {
    marginVertical: 20,
    alignItems: 'center',
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputField: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
  },
  partnerCard: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F0FBFF',
    elevation: 5,
    marginVertical: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#3D3989',
  },
});
