/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
import {
  Alert,
  Image,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  addBusinessPartner,
  changeBusinessLogo,
  deleteBusiness,
  deleteBusinessPartner,
  getAllBusinessList,
  updateBusinessPartner,
} from '../../services/userServices/bussiness.servies';
import {useFocusEffect} from '@react-navigation/native';
import images from '../../constants/images';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import uploadFile from '../../utils/uploadFile';
import {useFormik} from 'formik';
import * as yup from 'yup';
import ImageCropPicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actions-sheet';
import AddBussinessPartnerSheet from './components/actionsheets/AddBussinessPartnerSheet';
import Loader from '../../components/Loader';
import CustomButton from '../../components/CustomButton';
import {getPoliticalPartyDetails} from '../../services/userServices/political.services';

const ViewBussiness = ({route, navigation}) => {
  const {businessId, businessType} = route?.params;
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [bussinessPartnerDetails, setBussinessPartnerDetails] = useState();
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
      console.log(formValues, 'in bussiness PartnerDetailsFormik');
      let temp = {
        name: formValues?.bussinessPartnerName,
        designation: formValues?.bussinessPartnerDessignation,
        photo: formValues?.bussinessPartnerPhoto,
        businessDocId: businessId,
      };
      // setBussinessPartner(prev => [...prev, formValues]);
      if (
        bussinessPartnerDetails &&
        Object?.keys(bussinessPartnerDetails).length > 0
      ) {
        console.log('first');
        temp.businessPartnerDocId = bussinessPartnerDetails?._id;
        updateBusinessPartnerMutate(temp);
      } else {
        addBusinessPartnerlMutate(temp);
      }
    },
  });

  const {
    isLoading: getAllBusinessListLoading,
    isFetching: getAllBusinessListFetching,
    refetch: getAllBusinessListRefetch,
    data: getAllBusinessList_Data,
    isError: getAllBusinessList_isError,
  } = useQuery({
    queryKey: ['getAllBusinessList'],
    queryFn: () =>
      getAllBusinessList({
        businessDocId: businessId,
        businessType: businessType,
      }),
    onSuccess: success => {
      setprofilePic(success?.data?.obj?.ownerPhoto);
      //console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    mutate: addBusinessPartnerlMutate,
    isLoading: addBusinessPartnerlLoading,
  } = useMutation(addBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      bussinessPartnerDetailsFormik?.resetForm();
      getAllBusinessListRefetch();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    mutate: updateBusinessPartnerMutate,
    isLoading: updateBusinessPartnerLoading,
  } = useMutation(updateBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      bussinessPartnerDetailsFormik?.resetForm();
      getAllBusinessListRefetch();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    mutate: changeBusinessLogoMutate,
    isLoading: changeBusinessLogoLoading,
  } = useMutation(changeBusinessLogo, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      getAllBusinessListRefetch();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {mutate: deleteBusinessMutate, isLoading: deleteBusinessLoading} =
    useMutation(deleteBusiness, {
      onSuccess: ({data}) => {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
        navigation.goBack();
      },
      onError: err => {
        console.log(err?.response?.data?.message, 'err');
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
    });
  const {
    mutate: deleteBusinessPartnerMutate,
    isLoading: deleteBusinessPartnerLoading,
  } = useMutation(deleteBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      getAllBusinessListRefetch();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
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
      changeBusinessLogo({
        businessDocId: businessId,
        logo: uplode?.fileURL,
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
      getAllBusinessListRefetch();
    }, [getAllBusinessListRefetch, navigation]),
  );

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

  const BussinessData = getAllBusinessList_Data?.data?.obj;

  return (
    <>
      <Loader
        text="Uploading Image"
        open={changeBusinessLogoLoading || imageUploading}
      />
      <Loader
        text="Adding Bussiness Partner"
        open={addBusinessPartnerlLoading}
      />
      <Loader text="Deleting Bussiness..." open={deleteBusinessLoading} />
      <Loader
        text="Deleting Bussiness Partner"
        open={deleteBusinessPartnerLoading}
      />
      <Loader text="Updating..." open={updateBusinessPartnerLoading} />
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
          addBusinessPartner={AddBussinessPartner}
          bussinessTypeFormik={bussinessPartnerDetailsFormik}
        />
      </ActionSheet>

      <TopHeader
        titile={BussinessData?.fetchBusiness?.businessName ?? 'My Bussiness'}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getAllBusinessListFetching || getAllBusinessListLoading}
            onRefresh={() => getAllBusinessListRefetch()}
          />
        }
        style={{
          flex: 1,
        }}>
        {/* logo view */}
        <View style={styles.logo_view}>
          <View style={styles.logo_container}>
            <Image
              // source={images.profilePlaceholder}
              source={{uri: BussinessData?.fetchBusiness?.logo ?? ''}}
              style={styles.logo}
            />
          </View>
          <View style={{flex: 0.6}}>
            <Text style={styles.logo_text}>
              {BussinessData?.fetchBusiness?.businessName ?? '--'}
            </Text>
            <Text style={styles.logo_text_subtitle}>
              {BussinessData?.fetchBusiness?.category ?? '--'} ||{' '}
              {BussinessData?.fetchBusiness?.subCategory ?? '--'} ||{' '}
              <Text style={{color: 'green', fontStyle: 'italic'}}>
                {BussinessData?.fetchBusiness?.businessStatus ?? '--'}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => TakePhotofromGallery()}
            style={{flex: 0.1, justifyContent: 'center', left: 30}}>
            <FontAwesome style={{color: '#26A9E1'}} name={'edit'} size={25} />
          </TouchableOpacity>
        </View>

        {/* card for the ownner name */}
        <View style={styles.card_container}>
          <AntDesign name={'user'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.ownerName ?? '--'} (
            {BussinessData?.fetchBusiness?.designation ?? '--'})
          </Text>
        </View>
        {/* mobile number */}
        <View style={styles.card_container}>
          <AntDesign name={'mobile1'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.mobileNumber ?? '--'}
          </Text>
        </View>
        {/* whatsapp number */}
        <View style={styles.card_container}>
          <FontAwesome name={'whatsapp'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.whatsappNumber ?? '--'}
          </Text>
        </View>
        {/* mail */}
        <View style={styles.card_container}>
          <AntDesign name={'mail'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.email ?? '--'}
          </Text>
        </View>
        {/* address */}
        <View style={styles.card_container}>
          <Entypo name={'location'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.address?.address ?? '--'}
            {'\n'}
            {BussinessData?.fetchBusiness?.address?.dist ?? '--'}
            {'\n'}
            {BussinessData?.fetchBusiness?.address?.state ?? '--'}
            {'\n'}
            {BussinessData?.fetchBusiness?.address?.pinCode ?? '--'}
          </Text>
        </View>
        {/* website */}
        <View style={styles.card_container}>
          <MaterialCommunityIcons
            name={'web'}
            size={25}
            color={Colors.PRIMARY}
          />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.website ?? '--'}
          </Text>
        </View>
        {/* description */}
        <View style={styles.card_container}>
          <MaterialIcons
            name={'description'}
            size={25}
            color={Colors.PRIMARY}
          />
          <Text style={styles.card_text}>
            {BussinessData?.fetchBusiness?.description ?? '--'}
          </Text>
        </View>

        <Text style={styles.bussinessPartnerText}>Bussiness Partner</Text>
        {getAllBusinessList_Data?.data?.obj?.businessPartnerList?.map(
          (item, index) => (
            <View style={styles.bussinessPartnerView}>
              <Image
                source={{uri: item?.photo ?? ''}}
                style={{height: 60, width: 60, borderRadius: 50}}
              />
              <View style={{flex: 0.8}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: Colors.TEXT1,
                  }}>
                  {item?.name ?? '--'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: Colors.TEXT1,
                  }}>
                  {item?.designation}
                </Text>
              </View>
              <View style={{flex: 0.2, justifyContent: 'space-between'}}>
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
                  <FontAwesome name={'edit'} size={25} color={'#26A9E1'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete Bussiness Partner',
                      'Are you sure you want to delete this bussiness partner?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            deleteBusinessPartnerMutate({
                              businessPartnerDocId: item?._id,
                              businessDocId: businessId,
                            });
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <AntDesign name={'delete'} size={25} color={'#EA1C1C'} />
                </TouchableOpacity>
              </View>
            </View>
          ),
        )}

        {/* add bussiness partner more */}
        <TouchableOpacity
          style={{
            marginBottom: 10,
          }}
          onPress={() => {
            setBussinessPartnerDetails({});
            bussinessPartnerDetailsFormik?.resetForm();
            actionSheetRef?.current?.show();
          }}>
          <Text
            style={{
              color: 'blue',
              fontStyle: 'italic',
              marginHorizontal: 10,
              textDecorationLine: 'underline',
            }}>
            Add more bussiness partner
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CustomButton
            title={'Delete'}
            onPress={() => {
              Alert.alert(
                'Delete Bussiness',
                'Are you sure you want to delete this bussiness?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteBusinessMutate({bussinessDocId: businessId});
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            width="40%"
            customStyle={{backgroundColor: '#EA1C1C'}}
          />
          <CustomButton
            title={'Edit'}
            onPress={() => {
              navigation.navigate('Add Bussiness', {
                businessId: businessId,
                bussinessDetails: getAllBusinessList_Data?.data?.obj,
              });
            }}
            width="40%"
            customStyle={{marginBottom: 30}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ViewBussiness;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  logo_view: {
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '',
    backgroundColor: '#9CDEFB60',
    padding: 10,
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  logo_container: {
    flex: 0.2,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  logo_text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3D3989',
    alignSelf: 'center',
  },
  logo_text_subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.TEXT1,
    alignSelf: 'center',
  },
  card_container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F0FBFF',
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    borderColor: '#3D398945',
    gap: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  card_text: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.TEXT1,
  },
  bussinessPartnerText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.TEXT1,
  },
  bussinessPartnerView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F0FBFF',
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    borderColor: '#3D398945',
    gap: 10,
    marginVertical: 5,
  },
});
