/* eslint-disable react-native/no-inline-styles */
import {Alert, ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import BussinessPartnerForm from './AddEditBusinessStep2';
import {
  addBusiness,
  updateBusiness,
} from '../../services/userServices/bussiness.servies';
import NavigationScreenName from '../../constants/NavigationScreenName';
import CustomButton from '../../components/CustomButton';
import Sizes from '../../constants/Sizes';
import {AddEditBusinessStep1Screen} from './Index';

const AddEditBusiness = ({bussinessDetails}) => {
  const [formStep, setFormStep] = React.useState(1);
  const navigation = useNavigation();

  const bussinessTypeFormik = useFormik({
    initialValues: {
      logo: bussinessDetails?.fetchBusiness?.logo ?? '',
      bussinessCategory: bussinessDetails?.fetchBusiness?.category ?? '',
      bussinessCategoryDocId:
        bussinessDetails?.fetchBusiness?.categoryDocId ?? '',
      bussinessSubCategory: bussinessDetails?.fetchBusiness?.subCategory ?? '',
      bussinessSubCategoryDocId:
        bussinessDetails?.fetchBusiness?.subCategoryDocId ?? '',
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
      bussinessName: bussinessDetails?.fetchBusiness?.businessName ?? '',
      bussinessDetail: bussinessDetails?.fetchBusiness?.description ?? '',
      bussinessEmail: bussinessDetails?.fetchBusiness?.email ?? '',
      businessWebsite: bussinessDetails?.fetchBusiness?.website ?? '',
      bussinessAddress: bussinessDetails?.fetchBusiness?.address?.address ?? '',
      bussinessPinCode: bussinessDetails?.fetchBusiness?.address?.pinCode ?? '',
      bussinessTehsil: bussinessDetails?.fetchBusiness?.address?.tehsil ?? '',
      bussinessDistrict: bussinessDetails?.fetchBusiness?.address?.dist ?? '',
      bussinessState: bussinessDetails?.fetchBusiness?.address?.state ?? '',
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
      bussinessAddress: yup.string().required(),
      bussinessPinCode: yup
        .string()
        .matches(RegExp(/^[0-9]{6}$/), 'Invalid Pincode')
        .required(),
      bussinessTehsil: yup.string().required(),
      bussinessDistrict: yup.string().required(),
      bussinessState: yup.string().required(),
    }),
    onSubmit: formValues => {
      console.log(formValues, 'in bussinessformik formik');
    },
  });

  const bussinessPartnerFormik = useFormik({
    initialValues: {
      bussinessOwnerName: bussinessDetails?.fetchBusiness?.ownerName ?? '',
      bussinessOwnerPhone: bussinessDetails?.fetchBusiness?.mobileNumber ?? '',
      bussinessOwnerWhatsapp:
        bussinessDetails?.fetchBusiness?.whatsappNumber ?? '',
      bussinessOwnerDessignation:
        bussinessDetails?.fetchBusiness?.designation ?? '',
      bussinessOwnerPhoto: bussinessDetails?.fetchBusiness?.ownerPhoto ?? '',

      //bussinessPartnerInfo
      bussinessPartner: bussinessDetails?.businessPartnerList ?? [],
    },
    validationSchema: yup.object({
      //bussinessPartner
      bussinessOwnerName: yup.string().required(),
      bussinessOwnerPhone: yup
        .string()
        .matches(RegExp(/^[0-9]{10}$/), 'Invalid Phone')
        .required(),
      bussinessOwnerWhatsapp: yup
        .string()
        .matches(RegExp(/^[0-9]{10}$/), 'Invalid Whatsapp')
        .optional(),
      bussinessOwnerDessignation: yup.string().required(),
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
  const {mutate: updateBusinessMutate} = useMutation(updateBusiness, {
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
    if (bussinessDetails?.fetchBusiness?._id) {
      updateBusinessMutate({
        businessDocId: bussinessDetails?.fetchBusiness?._id,
        logo: bussinessTypeFormik?.values?.logo,
        category: bussinessTypeFormik?.values?.bussinessCategory,
        categoryDocId: bussinessTypeFormik?.values?.bussinessCategoryDocId,
        subCategory: bussinessTypeFormik?.values?.bussinessSubCategory,
        subCategoryDocId:
          bussinessTypeFormik?.values?.bussinessSubCategoryDocId,
        businessName: bussinessProfileFormik?.values?.bussinessName,
        description: bussinessProfileFormik?.values?.bussinessDetail,
        email: bussinessProfileFormik?.values?.bussinessEmail,
        website: bussinessProfileFormik?.values?.businessWebsite,
        // businessPartnerDetail: bussinessPartnerFormik?.values?.bussinessPartner,
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
        ownerPhoto: bussinessPartnerFormik?.values?.bussinessOwnerPhoto,
      });
    } else {
      addBusinesslMutate({
        logo: bussinessTypeFormik?.values?.logo,
        category: bussinessTypeFormik?.values?.bussinessCategory,
        categoryDocId: bussinessTypeFormik?.values?.bussinessCategoryDocId,
        subCategory: bussinessTypeFormik?.values?.bussinessSubCategory,
        subCategoryDocId:
          bussinessTypeFormik?.values?.bussinessSubCategoryDocId,
        businessName: bussinessProfileFormik?.values?.bussinessName,
        description: bussinessProfileFormik?.values?.bussinessDetail,
        email: bussinessProfileFormik?.values?.bussinessEmail,
        website: bussinessProfileFormik?.values?.businessWebsite,
        businessPartnerDetail: bussinessPartnerFormik?.values?.bussinessPartner,
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
        ownerPhoto: bussinessPartnerFormik?.values?.bussinessOwnerPhoto,
      });
    }
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
      <View style={styles.wrap}>
        {formStep === 1 && <AddEditBusinessStep1Screen />}
        {/* bussiness partner form */}
        {formStep === 2 && (
          <ScrollView>
            <BussinessPartnerForm
              bussinessTypeFormik={bussinessPartnerFormik}
              bussinessDetails={bussinessDetails}
            />
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
      </View>
    </>
  );
};

export default AddEditBusiness;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  wrap: {
    paddingHorizontal: Sizes.wp('5%'),
  },
});
