import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useState} from 'react';
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
  getDistinctCategoryGroup,
} from '../../../services/userServices/category.service';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import Loader from '../../../components/Loader';
import ControllerInputOutlined from '../../../components/ControllerInputOutlined';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import CustomButton from '../../../components/CustomButton';
import ControllerDropdown from '../../../components/common/ControllerDropdown';

const AddEditBusinessStep1 = ({navigation, route}) => {
  const {businessDocId} = route?.params || '';

  const defaultValues = {
    logo: '',

    bussinessCategoryGroup: '',
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

  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [categoryGroupList, setCategoryGroupList] = useState([]);
  const [bussinessCategoryData, setBussinessCategoryData] = useState([]);
  const [bussinessSubCategoryList, setBussinessSubCategoryList] = useState([]);

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
  const TakePhoto = async () => {
    try {
      const data = await TakePhotofromGalleryWithCrop();
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

          bussinessCategoryGroup: data?.category?.categoryGroupName || '',
          bussinessCategory: data?.category?.category || '',
          bussinessCategoryDocId: data?.category?._id || '',

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
      queryKey: [
        'getCategory' +
          (watch('bussinessCategory') && watch('bussinessCategoryGroup')),
      ],
      queryFn: () =>
        getCategory({
          categoryGroupName: watch('bussinessCategoryGroup'),
          category: watch('bussinessCategory'),
        }),
      onSuccess: success => {
        setBussinessSubCategoryList(success?.data?.list);
      },
      onError: err => {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
      enabled:
        !!watch('bussinessCategoryGroup') && !!watch('bussinessCategory'),
    });
  const {isFetching: getDistinctCategoryFetching} = useQuery({
    queryKey: ['getDistinctCategory' + watch('bussinessCategoryGroup')],
    queryFn: () =>
      getDistinctCategory({
        categoryGroupName: watch('bussinessCategoryGroup'),
      }),
    onSuccess: success => {
      setBussinessCategoryData(success?.data?.list);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: !!watch('bussinessCategoryGroup'),
  });
  const {isFetching: getDistinctCategoryGroupFetching} = useQuery({
    queryKey: ['getDistinctCategoryGroup'],
    queryFn: () => getDistinctCategoryGroup(),
    onSuccess: success => {
      setCategoryGroupList(success?.data?.list || []);
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
        console.log(err?.response?.data?.message, 'err');
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
        console.log(err?.response?.data?.message, 'err');
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
      },
    });

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={
                getCategoryFetching ||
                getDistinctCategoryFetching ||
                getDistinctCategoryGroupFetching ||
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
                TakePhotofromGallery={TakePhoto}
              />
              <Text style={styles.title}>Upload Your Bussiness Logo</Text>
            </View>

            {/* bussiness category group dropdown */}

            <ControllerDropdown
              control={control}
              rules={{
                required: 'Category group reauired',
              }}
              name="bussinessCategoryGroup"
              data={categoryGroupList?.map(item => ({
                label: item,
                value: item,
              }))}
              disabled={getDistinctCategoryGroupFetching}
              placeholder="Select Business Category Group"
            />

            {/* bussiness catergory dropdown */}

            <ControllerDropdown
              control={control}
              name="bussinessCategory"
              rules={{
                required: 'Business category required',
              }}
              placeholder="Select Busines Category"
              data={bussinessCategoryData?.map(item => ({
                label: item,
                value: item,
              }))}
              disabled={
                getDistinctCategoryFetching || !watch('bussinessCategoryGroup')
              }
            />

            {/* bussiness subcategory dropdown */}

            <ControllerDropdown
              control={control}
              name="bussinessCategoryDocId"
              data={(bussinessSubCategoryList || []).map(item => ({
                label: item?.subCategory,
                value: item?._id,
              }))}
              disabled={
                getCategoryFetching ||
                !watch('bussinessCategoryGroup') ||
                !watch('bussinessCategory')
              }
              placeholder="Select  Sub Category"
            />
          </View>
          <View>
            <Text style={styles.title}>Bussiness Profile</Text>
            <View style={styles.white_box}>
              <ControllerInputOutlined
                rules={{
                  required: 'Business name required',
                }}
                control={control}
                name={'bussinessName'}
                label={'Bussiness Name *'}
              />

              <ControllerInputOutlined
                rules={{
                  required: 'Business detail required',
                }}
                control={control}
                name={'bussinessDetail'}
                label={'Bussiness Detail *'}
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
                rules={{
                  required: 'Address required',
                }}
                control={control}
                name={'bussinessAddress'}
                label={'Bussiness Address *'}
              />
              <ControllerInputOutlined
                rules={{
                  required: 'Tehsil required',
                }}
                control={control}
                name={'bussinessTehsil'}
                label={'Bussiness Tehsil *'}
              />
              <ControllerDropdown
                control={control}
                name="bussinessState"
                rules={{
                  required: 'State required',
                }}
                data={STATES.map(item => ({
                  label: item,
                  value: item,
                }))}
                placeholder="Select State *"
              />

              <ControllerDropdown
                control={control}
                name="bussinessDistrict"
                rules={{
                  required: 'District required',
                }}
                data={DISTRICTS[
                  STATES.indexOf(watch('bussinessState')) + 1
                ]?.map(item => ({
                  label: item,
                  value: item,
                }))}
                placeholder="Select District *"
              />

              <ControllerInputOutlined
                rules={{
                  required: 'Pin code required',
                  minLength: {
                    value: 6,
                    message: 'Pin code should be 6 digit',
                  },
                }}
                control={control}
                name={'bussinessPinCode'}
                label={'Bussiness PinCode *'}
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
