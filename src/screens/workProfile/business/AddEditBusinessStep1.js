import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {Dialog, Divider, Portal, Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {DISTRICTS, STATES} from '../../../constants';
import ProfilePic from '../../../components/ProfilePic';
import uploadFile from '../../../utils/uploadFile';
import {TakePhotofromGalleryWithCrop} from '../../../utils/heplers';
import {
  addBusiness,
  getBusinessProfile,
  updateBusiness,
} from '../../../services/userServices/bussiness.servies';
import {
  getCategory,
  getDistinctCategory,
} from '../../../services/userServices/category.service';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import Loader from '../../../components/Loader';
import ControllerInputOutlined from '../../../components/ControllerInputOutlined';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import CustomButton from '../../../components/CustomButton';
import ControllerDropdown from '../../../components/common/ControllerDropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OpenCameraAndGalleryDialog from '../../../components/common/OpenCameraAndGalleryDialog';

const AddEditBusinessStep1 = ({navigation, route}) => {
  const {businessDocId} = route?.params || '';

  const defaultValues = {
    logo: '',

    bussinessCategory: '',
    bussinessCategoryDocId: '',

    bussinessName: '',
    bussinessDetail: '',
    bussinessEmail: '',
    businessWebsite: '',

    mobileNumber: '',
    whatsAppNumber: '',

    bussinessAddress: '',
    bussinessPinCode: '',
    bussinessTehsil: '',
    bussinessDistrict: '',
    bussinessState: '',
  };

  const {control, handleSubmit, setValue, watch, reset} = useForm({
    defaultValues: defaultValues,
  });
  const watchBusinessCategory = watch('bussinessCategory');
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [bussinessCategoryData, setBussinessCategoryData] = useState([]);
  const [bussinessSubCategoryList, setBussinessSubCategoryList] = useState([]);
  const [chooseImageDialog, setChooseImageDialog] = useState(false);
  const uploadePhoto = async (path, mime) => {
    try {
      setImageUploading(true);
      const uplode = await uploadFile({
        filePath: {path: path},
        fileLocation: `profile/${Date.now()}`,
        contentType: mime,
      });
      setImageUploading(false);
      setprofilePic(uplode?.fileURL);
      setValue('logo', uplode?.fileURL);
    } catch (error) {
      setImageUploading(false);
    }
  };
  // profile pic image picker
  const TakePhoto = async type => {
    try {
      setChooseImageDialog(false);
      const data = await TakePhotofromGalleryWithCrop(type);
      uploadePhoto(data?.path, data?.mime);
    } catch (error) {}
  };

  const onSubmit = data => {
    let body = {
      logo: data?.logo || '',
      categoryDocId: data?.bussinessCategoryDocId || '',
      businessName: data?.bussinessName || '',
      description: data?.bussinessDetail || '',
      email: data?.bussinessEmail || '',
      website: data?.businessWebsite || '',
      mobileNumber: data?.mobileNumber || '',
      whatsAppNumber: data?.whatsAppNumber || '',

      address: data?.bussinessAddress
        ? {
            address: data?.bussinessAddress || '',
            pinCode: data?.bussinessPinCode || '',
            tehsil: data?.bussinessTehsil || '',
            dist: data?.bussinessDistrict || '',
            state: data?.bussinessState || '',
          }
        : null,
    };
    if (businessDocId) {
      body = {
        ...body,
        businessDocId,
      };
      updateBusinessMutate(body);
      return;
    }

    addBusinesslMutate(body);
  };
  const {
    isFetching: getBusinessProfileFetching,
    refetch: getBusinessProfileRefetch,
  } = useQuery({
    queryKey: ['getBusinessProfile', businessDocId],
    queryFn: () => getBusinessProfile({businessDocId}),
    onSuccess: success => {
      const data = success?.data?.obj;

      if (data) {
        reset({
          logo: data?.logo || '',
          bussinessCategory: data?.categoryDocId?.category || '',
          bussinessCategoryDocId: data?.categoryDocId?._id || '',

          bussinessName: data?.businessName || '',
          bussinessDetail: data?.description || '',
          bussinessEmail: data?.email || '',
          businessWebsite: data?.website || '',

          mobileNumber: data?.mobileNumber || '',
          whatsAppNumber: data?.whatsAppNumber || '',

          bussinessAddress: data?.address?.address || '',
          bussinessPinCode: data?.address?.pinCode || '',
          bussinessTehsil: data?.address?.tehsil || '',
          bussinessDistrict: data?.address?.dist || '',
          bussinessState: data?.address?.state || '',
        });
        setprofilePic(data?.logo || '');
      }
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: !!businessDocId,
  });

  const {isFetching: getCategoryFetching, refetch: getCategoryRefetch} =
    useQuery({
      queryKey: ['getCategory', watchBusinessCategory],
      queryFn: () =>
        getCategory({
          categoryGroupName: 'Business',
          category: watchBusinessCategory,
        }),
      onSuccess: success => {
        setBussinessSubCategoryList(success?.data?.list);
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled: !!watchBusinessCategory,
    });
  const {isFetching: getDistinctCategoryFetching} = useQuery({
    queryKey: ['getDistinctCategory', watchBusinessCategory],
    queryFn: () =>
      getDistinctCategory({
        categoryGroupName: 'Business',
      }),
    onSuccess: success => {
      setBussinessCategoryData(success?.data?.list);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {mutate: updateBusinessMutate, isLoading: updateBusinessLoading} =
    useMutation(updateBusiness, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
        Alert.alert(
          success?.data?.message,
          'Do you want to update more detail?',
          [
            {
              text: 'Yes',
              onPress: () => {
                navigation.replace(
                  NavigationScreenName.ADD_EDIT_BUSINESS_STEP2,
                  {
                    businessDocId: businessDocId,
                  },
                );
              },
            },
            {
              text: 'No',
              onPress: () => {
                navigation.replace(NavigationScreenName.WORK_PROFILE_LIST);
              },
            },
          ],
        );
        reset(defaultValues);
        setprofilePic('');
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
    });

  const {mutate: addBusinesslMutate, isLoading: addBusinesslLoading} =
    useMutation(addBusiness, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
        Alert.alert(
          success?.data?.message,
          'But your business is not fully completed, Do you want to proceed?',
          [
            {
              text: 'Yes',
              onPress: () => {
                navigation.replace(
                  NavigationScreenName.ADD_EDIT_BUSINESS_STEP2,
                  {
                    businessDocId: success?.data?.obj?._id,
                  },
                );
              },
            },
            {
              text: 'No',
              onPress: () => {
                navigation.replace(NavigationScreenName.WORK_PROFILE_LIST);
              },
            },
          ],
        );
        reset(defaultValues);
        setprofilePic('');
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
    });
  useEffect(() => {
    if (watchBusinessCategory && !businessDocId) {
      setValue('bussinessCategoryDocId', '');
      setBussinessSubCategoryList([]);
    }
  }, [setValue, watchBusinessCategory, businessDocId]);

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <OpenCameraAndGalleryDialog
        TakePhoto={TakePhoto}
        visible={chooseImageDialog}
        onDismiss={() => setChooseImageDialog(!chooseImageDialog)}
      />
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={
                getCategoryFetching ||
                getDistinctCategoryFetching ||
                getBusinessProfileFetching
              }
              onRefresh={() => {
                getCategoryRefetch();
                if (businessDocId) {
                  getBusinessProfileRefetch();
                }
              }}
            />
          }>
          <Text style={styles.title}>Bussiness Type</Text>
          <View style={styles.white_box}>
            {/* logo of the add bussiness */}
            <View style={styles.image_wrap}>
              <ProfilePic
                imageUrl={profilePic}
                TakePhotofromGallery={() =>
                  setChooseImageDialog(!chooseImageDialog)
                }
              />
              <Text style={styles.title}>Upload Your Bussiness Logo</Text>
            </View>

            {/* bussiness catergory dropdown */}

            <ControllerDropdown
              control={control}
              name="bussinessCategory"
              rules={{
                required: 'Business category required',
              }}
              placeholder="Select Busines Category *"
              data={bussinessCategoryData?.map(item => ({
                label: item,
                value: item,
              }))}
            />

            {/* bussiness subcategory dropdown */}

            <ControllerDropdown
              control={control}
              name="bussinessCategoryDocId"
              data={(bussinessSubCategoryList || []).map(item => ({
                label: item?.subCategory,
                value: item?._id,
              }))}
              disabled={getCategoryFetching || !watchBusinessCategory}
              placeholder="Select  Sub Category *"
            />
          </View>
          <View>
            <Text style={styles.title}>Bussiness Profile</Text>
            <View style={styles.white_box}>
              <ControllerInputOutlined
                rules={{
                  require: 'Business name required',
                }}
                control={control}
                name={'bussinessName'}
                label={'Bussiness Name *'}
              />

              <ControllerInputOutlined
                control={control}
                name={'bussinessDetail'}
                label={'Bussiness Detail'}
                multiline
                numberOfLines={4}
                maxLength={1000}
              />
              <ControllerInputOutlined
                rules={{
                  pattern: {
                    value: RegExp(
                      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    ),
                    message: 'Email is not valid',
                  },
                }}
                control={control}
                name={'bussinessEmail'}
                label={'Bussiness Email (Optional)'}
              />
              <ControllerInputOutlined
                control={control}
                name={'businessWebsite'}
                label={'Bussiness Website (Optional)'}
              />

              <ControllerInputOutlined
                rules={{
                  required: 'Mobile number required',
                  minLength: {
                    value: 10,
                    message: 'Mobile number should be 10 digit',
                  },
                }}
                control={control}
                name={'mobileNumber'}
                label={'Mobile Number *'}
                maxLength={10}
                keyboardType="number-pad"
              />

              <ControllerInputOutlined
                rules={{
                  minLength: {
                    value: 10,
                    message: 'WhatsApp number should be 10 digit',
                  },
                }}
                control={control}
                name={'whatsAppNumber'}
                label={'WhatsApp Number (Optional)'}
                maxLength={10}
                keyboardType="number-pad"
              />

              <ControllerInputOutlined
                control={control}
                name={'bussinessAddress'}
                label={'Bussiness Address (Optional)'}
              />
              <ControllerInputOutlined
                control={control}
                name={'bussinessTehsil'}
                label={'Bussiness Tehsil (Optional)'}
              />
              <ControllerDropdown
                control={control}
                name="bussinessState"
                data={STATES.map(item => ({
                  label: item,
                  value: item,
                }))}
                placeholder="Select State (Optional)"
              />

              <ControllerDropdown
                control={control}
                name="bussinessDistrict"
                data={DISTRICTS[
                  STATES.indexOf(watch('bussinessState')) + 1
                ]?.map(item => ({
                  label: item,
                  value: item,
                }))}
                placeholder="Select District (Optional)"
              />

              <ControllerInputOutlined
                rules={{
                  minLength: {
                    value: 6,
                    message: 'Pin code should be 6 digit',
                  },
                }}
                control={control}
                name={'bussinessPinCode'}
                label={'Bussiness PinCode (Optional)'}
                maxLength={6}
                keyboardType="number-pad"
              />
            </View>
            <CustomButton
              title={'Submit'}
              loading={addBusinesslLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AddEditBusinessStep1;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: Sizes.wp('5%'),
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
  box: {
    marginBottom: 10,
  },
});
