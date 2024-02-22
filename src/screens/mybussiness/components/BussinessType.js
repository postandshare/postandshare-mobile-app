/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/CustomButton';
import BussinessTypeForm from './bussinessFormComponents/BussinessTypeForm';
import {useFormik} from 'formik';
import * as yup from 'yup';
import BussinessProfileForm from './bussinessFormComponents/BussinessProfileForm';
import BussinessPartnerForm from './bussinessFormComponents/BussinessPartnerForm';
import {addBusiness} from '../../../services/userServices/bussiness.servies';
import {useMutation} from '@tanstack/react-query';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../components/Loader';

const BussinessType = ({}) => {
  const [formStep, setFormStep] = React.useState(1);
  const navigation = useNavigation();

  const bussinessTypeFormik = useFormik({
    initialValues: {
      logo: '',
      bussinessCategory: '',
      bussinessSubCategory: '',
    },
    validationSchema: yup.object({
      logo: yup.string().required('logo is required'),
      bussinessCategory: yup
        .string()
        .required('Bussiness Category is required'),
      bussinessSubCategory: yup
        .string()
        .required('Bussiness Sub Category is required'),
    }),
    onSubmit: formValues => {
      console.log(formValues, 'in addbussiness formik');
    },
  });

  const bussinessProfileFormik = useFormik({
    initialValues: {
      // bussiness profile
      bussinessName: '',
      bussinessDetail: '',
      bussinessEmail: '',
      businessWebsite: '',
      bussinessAddress: '',
      bussinessPinCode: '',
      bussinessTehsil: '',
      bussinessDistrict: '',
      bussinessState: '',
    },
    validationSchema: yup.object({
      bussinessName: yup.string().required('Bussiness Name is required'),
      bussinessDetail: yup.string().required(),
      bussinessEmail: yup
        .string()
        .matches(
          RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
          'Invalid Email',
        )
        .required(),
      businessWebsite: yup.string().optional(),
      bussinessAddress: yup
        .string().trim()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Address')
        .required(),
      bussinessPinCode: yup
        .string()
        .matches(RegExp(/^[0-9]{6}$/), 'Invalid Pincode')
        .required(),
      bussinessTehsil: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Tehsil')
        .required(),
      bussinessDistrict: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid District')
        .required(),
      bussinessState: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid State')
        .required(),
    }),
    onSubmit: formValues => {
      console.log(formValues, 'in bussinessformik formik');
    },
  });

  const bussinessPartnerFormik = useFormik({
    initialValues: {
      bussinessOwnerName: '',
      bussinessOwnerPhone: '',
      bussinessOwnerWhatsapp: '',
      bussinessOwnerDessignation: '',

      //bussinessPartnerInfo
      bussinessPartnerName: '',
      bussinessPartnerDesignation: '',
      bussinessPartnerPhoto: '',
    },
    validationSchema: yup.object({
      //bussinessPartner
      bussinessOwnerName: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Name')
        .required(),
      bussinessOwnerPhone: yup
        .string()
        .matches(RegExp(/^[0-9]{10}$/), 'Invalid Phone')
        .required(),
      bussinessOwnerWhatsapp: yup
        .string()
        .matches(RegExp(/^[0-9]{10}$/), 'Invalid Whatsapp')
        .optional(),
      bussinessOwnerDessignation: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Designation')
        .required(),
      bussinessPartnerName: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Name')
        .required(),
      bussinessPartnerDesignation: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Designation')
        .optional(),
      bussinessPartnerPhoto: yup
        .string()
        .matches(RegExp(/^[a-zA-Z0-9._-]+$/), 'Invalid Photo')
        .optional(),
    }),
    onSubmit: formValues => {
      console.log(formValues, 'in bussiness formik');
    },
  });

  const {mutate: addBusinesslMutate, isLoading: addBusinesslLoading} =
    useMutation(addBusiness, {
      onSuccess: ({data}) => {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
        bussinessTypeFormik?.resetForm();
        bussinessProfileFormik?.resetForm();
        bussinessPartnerFormik?.resetForm();
        navigation.replace(NavigationScreenName?.MY_BUSSINESS);
      },
      onError: err => {
        console.log(err?.response?.data?.message, 'err');
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
    });

  const handleSubmition = () => {
    addBusinesslMutate({
      logo: bussinessTypeFormik?.values?.logo,
      category: bussinessTypeFormik?.values?.bussinessCategory,
      subCategory: bussinessTypeFormik?.values?.bussinessSubCategory,
      businessName: bussinessProfileFormik?.values?.bussinessName,
      description: bussinessProfileFormik?.values?.bussinessDetail,
      email: bussinessProfileFormik?.values?.bussinessEmail,
      website: bussinessProfileFormik?.values?.businessWebsite,
      businessPartnerDetail: [
        {
          name: bussinessPartnerFormik?.values?.bussinessPartnerName,
          designation:
            bussinessPartnerFormik?.values?.bussinessPartnerDesignation,
          photo: bussinessPartnerFormik?.values?.bussinessPartnerPhoto,
        },
      ],
      address: {
        address: bussinessProfileFormik?.values?.bussinessAddress,
        pinCode: bussinessProfileFormik?.values?.bussinessPinCode,
        tehsil: bussinessProfileFormik?.values?.bussinessTehsil,
        dist: bussinessProfileFormik?.values?.bussinessDistrict,
        state: bussinessProfileFormik?.values?.bussinessState,
      },
      ownerName: bussinessPartnerFormik?.values?.bussinessOwnerName,
      mobileNumber: bussinessPartnerFormik?.values?.bussinessOwnerPhone,
      whatsappNumber: bussinessPartnerFormik?.values?.bussinessOwnerWhatsapp,
      designation: bussinessPartnerFormik?.values?.bussinessOwnerDessignation,
      ownerPhoto: '',
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    const unsubscribeBlur = navigation.addListener('blur', () => {
      bussinessTypeFormik?.resetForm();
      bussinessProfileFormik?.resetForm();
      bussinessPartnerFormik?.resetForm();
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <>
      <Loader open={addBusinesslLoading} text="Adding Bussiness" />
      {/* top navigator */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        {/* bussiness type */}
        <View style={{alignItems: 'center'}}>
          <View
            style={[
              formStep === 1 ? {backgroundColor: Colors.PRIMARY} : null,
              styles.container,
            ]}>
            <Entypo name="user" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>
        {/* bussiness profile */}
        <View style={{alignItems: 'center'}}>
          <View
            style={[
              formStep === 2 ? {backgroundColor: Colors.PRIMARY} : null,
              styles.container,
            ]}>
            <FontAwesome5 name="hand-holding-usd" size={20} />
          </View>
          <Text>Bussiness Profile</Text>
        </View>

        {/* patner */}
        <View style={{alignItems: 'center'}}>
          <View
            style={[
              formStep === 3 ? {backgroundColor: Colors.PRIMARY} : null,
              styles.container,
            ]}>
            <Ionicons name="people" size={20} />
          </View>
          <Text>Bussiness Partner</Text>
        </View>
      </View>

      {/* bussiness type form */}
      {formStep == 1 && (
        <View>
          <BussinessTypeForm bussinessTypeFormik={bussinessTypeFormik} />
          <CustomButton
            title={'Next'}
            onPress={async () => {
              bussinessTypeFormik?.setTouched({
                bussinessCategory: true,
                bussinessSubCategory: true,
                logo: true,
              });
              const errors = await bussinessTypeFormik?.validateForm();
              if (Object.keys(errors).length > 0) {
                //addressInfoFormik.handleSubmit();
                ToastAndroid.show(
                  `Please correct ${Object.keys(
                    errors,
                  )} errors before proceeding.`,
                  ToastAndroid.LONG,
                );
                return;
              } else {
                bussinessTypeFormik.handleSubmit();
                setFormStep(2);
              }
            }}
          />
        </View>
      )}
      {/* bussiness profile form */}
      {formStep == 2 && (
        <ScrollView>
          <BussinessProfileForm bussinessTypeFormik={bussinessProfileFormik} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              bottom: 10,
            }}>
            <CustomButton
              title={'Back'}
              onPress={() => setFormStep(1)}
              width="40%"
            />
            <CustomButton
              title={'Next'}
              onPress={async () => {
                bussinessProfileFormik?.setTouched({
                  bussinessName: true,
                  bussinessDetail: true,
                  bussinessEmail: true,
                  businessWebsite: true,
                  bussinessAddress: true,
                  bussinessPinCode: true,
                  bussinessTehsil: true,
                  bussinessDistrict: true,
                  bussinessState: true,
                });
                const errors = await bussinessProfileFormik?.validateForm();
                if (Object.keys(errors).length > 0) {
                  //addressInfoFormik.handleSubmit();
                  ToastAndroid.show(
                    `Please correct ${Object.keys(
                      errors,
                    )} errors before proceeding.`,
                    ToastAndroid.LONG,
                  );
                  return;
                } else {
                  bussinessProfileFormik.handleSubmit();
                  setFormStep(3);
                }
              }}
              width="40%"
            />
          </View>
        </ScrollView>
      )}
      {/* bussiness partner form */}
      {formStep == 3 && (
        <ScrollView>
          <BussinessPartnerForm bussinessTypeFormik={bussinessPartnerFormik} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              bottom: 10,
            }}>
            <CustomButton
              title={'Back'}
              onPress={() => setFormStep(2)}
              width="40%"
            />
            <CustomButton
              title={'Next'}
              onPress={async () => {
                bussinessPartnerFormik?.setTouched({
                  bussinessOwnerName: true,
                  bussinessOwnerPhone: true,
                  bussinessOwnerDessignation: true,
                  bussinessOwnerWhatsapp: true,
                  bussinessPartnerName: true,
                  bussinessPartnerDesignation: true,
                  bussinessPartnerPhoto: true,
                });
                const errors = await bussinessPartnerFormik?.validateForm();
                if (Object.keys(errors).length > 0) {
                  //addressInfoFormik.handleSubmit();
                  ToastAndroid.show(
                    `Please correct ${Object.keys(
                      errors,
                    )} errors before proceeding.`,
                    ToastAndroid.LONG,
                  );
                  return;
                } else {
                  bussinessPartnerFormik.handleSubmit();
                  Alert.alert(
                    'Are you sure you want to submit?',
                    'Please verify the details before submitting',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => handleSubmition()},
                    ],
                  );
                }
              }}
              width="40%"
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default BussinessType;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.TEXT1,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
