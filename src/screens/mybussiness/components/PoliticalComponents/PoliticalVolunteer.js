import {
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  addPoliticalBusiness,
  getPoliticalPartyDetails,
  updatePoliticalBusiness,
} from '../../../../services/userServices/political.services';
import NavigationScreenName from '../../../../constants/NavigationScreenName';
import {useFocusEffect} from '@react-navigation/native';

const PoliticalVolunteer = ({route, navigation}) => {
  const {
    selectedLeaderDocId,
    partyDocId,
    partyLogo,
    politicalData,
    businessId,
  } = route?.params || {};
  const [profilePic, setprofilePic] = useState(
    getPoliticalPartyDetails_Data?.data?.obj?.fetchExistingPoliticalBusiness
      ?.volunteerPhoto ?? '',
  );
  const [imageUploading, setImageUploading] = useState(false);

  const {
    isLoading: getPoliticalPartyDetailsLoading,
    isFetching: getPoliticalPartyDetailsFetching,
    refetch: getPoliticalPartyDetailsRefetch,
    data: getPoliticalPartyDetails_Data,
    isError: getPoliticalPartyDetails_isError,
  } = useQuery({
    queryKey: ['getPoliticalPartyDetails'],
    queryFn: () =>
      getPoliticalPartyDetails({
        politicalBusinessDocId: businessId,
      }),
    onSuccess: success => {
      setprofilePic(
        success?.data?.obj?.fetchExistingPoliticalBusiness?.volunteerPhoto,
      );
      profileVolunteerFormik?.setValues({
        name: success?.data?.obj?.fetchExistingPoliticalBusiness?.volunteerName,
        mobile:
          success?.data?.obj?.fetchExistingPoliticalBusiness?.mobileNumber,
        desingation:
          success?.data?.obj?.fetchExistingPoliticalBusiness?.designation,
        whatsappNumber:
          success?.data?.obj?.fetchExistingPoliticalBusiness?.whatsappNumber,
        aboutYourself:
          success?.data?.obj?.fetchExistingPoliticalBusiness?.volunteerDetail,
        profilePic:
          success?.data?.obj?.fetchExistingPoliticalBusiness?.volunteerPhoto,
      });

      //console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

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
      // console.log(values, 'values');
      businessId
        ? updatePoliticalBusinessMuatate({
            politicalBusinessDocId: businessId,
            partyDocId: partyDocId,
            partyLogo:
              getPoliticalPartyDetails_Data?.data?.obj
                ?.fetchExistingPoliticalBusiness?.partyLogo,
            state:
              getPoliticalPartyDetails_Data?.data?.obj
                ?.fetchExistingPoliticalBusiness?.state,
            district:
              getPoliticalPartyDetails_Data?.data?.obj
                ?.fetchExistingPoliticalBusiness?.district,
            legislativeAssembly:
              getPoliticalPartyDetails_Data?.data?.obj
                ?.fetchExistingPoliticalBusiness?.constituency,
            volunteerName: values?.name,
            volunteerPhoto: profilePic,
            designation: values?.desingation,
            mobileNumber: values?.mobile,
            whatsappNumber: values?.whatsappNumber,
            volunteerDetail: values?.aboutYourself,
          })
        : addPoliticalBusinessMuatate({
            partyDocId: partyDocId,
            partyLogo: partyLogo,
            state: politicalData?.state,
            district: politicalData?.district,
            legislativeAssembly: politicalData?.constituency,
            politicalLeaderDetail: selectedLeaderDocId,
            volunteerName: values?.name,
            volunteerPhoto: profilePic,
            designation: values?.desingation,
            mobileNumber: values?.mobile,
            whatsappNumber: values?.whatsappNumber,
            volunteerDetail: values?.aboutYourself,
          });
    },
  });

  const {
    mutate: addPoliticalBusinessMuatate,
    isLoading: addPoliticalBusinessLoading,
  } = useMutation(addPoliticalBusiness, {
    onSuccess: async success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
      profileVolunteerFormik?.resetForm();
      await navigation.replace(NavigationScreenName?.MY_BUSSINESS);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });
  const {
    mutate: updatePoliticalBusinessMuatate,
    isLoading: updatePoliticalBusinessLoading,
  } = useMutation(updatePoliticalBusiness, {
    onSuccess: async success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
      profileVolunteerFormik?.resetForm();
      await navigation.replace(NavigationScreenName?.MY_BUSSINESS);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
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
      profileVolunteerFormik?.setValues(prev => ({
        ...prev,
        profilePic: uplode?.fileURL,
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

  useFocusEffect(
    useCallback(() => {
      businessId && getPoliticalPartyDetailsRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <TopHeader titile={'Political Volunteer'} />
      <Loader open={imageUploading} text="Uploading Image" />
      <Loader
        open={addPoliticalBusinessLoading}
        text="Adding Political Bussiness"
      />
      <Loader
        open={updatePoliticalBusinessLoading}
        text="Updating Political Bussiness"
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getPoliticalPartyDetailsFetching}
            onRefresh={getPoliticalPartyDetailsRefetch}
          />
        }
        contentContainerStyle={styles.root}>
        {/* profile pic container */}
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
          {profileVolunteerFormik?.errors?.profilePic &&
            profileVolunteerFormik?.touched?.profilePic && (
              <Text style={{color: 'red'}}>
                {profileVolunteerFormik?.errors?.profilePic}
              </Text>
            )}
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
            keyboardType={'num-pad'}
            maxLength={10}
          />
        </View>
        {/* whatsapp number */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Whatsapp Number</Text>
          <CustomTextInputFormik
            formik={profileVolunteerFormik}
            name={'whatsappNumber'}
            label={'Whatsapp Number'}
            keyboardType={'num-pad'}
            maxLength={10}
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
