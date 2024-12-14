import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import ProfilePic from '../../components/ProfilePic';
import Dropdown from '../../components/Dropdown';
import Loader from '../../components/Loader';
import uploadFile from '../../utils/uploadFile';
import globalStyles from '../../styles/globalStyles';
import Colors from '../../constants/Colors';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getBusinessCategory,
  getBusinessSubCategory,
} from '../../services/userServices/common.services';
import {Controller, useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import ControllerInputOutlined from '../../components/ControllerInputOutlined';
import Sizes from '../../constants/Sizes';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {TakePhotofromGalleryWithCrop} from '../../utils/heplers';
const AddEditBusinessStep1 = ({navigation}) => {
  console.log('in render');
  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      logo: '',
      bussinessCategoryDocId: '',
      bussinessSubCategoryDocId: '',
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
  });
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
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
    navigation.navigate(NavigationScreenName.ADD_EDIT_BUSINESS_STEP2, {data});
  };
  const {
    isFetching: getBusinessCategoryFetching,
    refetch: getBusinessCategoryRefetch,
    data: getBusinessCategory_Data,
  } = useQuery({
    queryKey: ['getBusinessCategory'],
    queryFn: getBusinessCategory,
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    data: getBusinessSubCategory_Data,
    mutate: getBusinessSubCategoryMutate,
  } = useMutation({
    mutationKey: ['getBusinessSubCategory'],
    mutationFn: getBusinessSubCategory,
    onSuccess: async success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  useEffect(() => {
    getBusinessCategoryRefetch();
  }, [getBusinessCategoryRefetch]);

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={getBusinessCategoryFetching} />
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

            {/* bussiness catergory dropdown */}
            <View style={styles.box}>
              <Controller
                control={control}
                name="bussinessCategoryDocId"
                rules={{
                  required: 'Business category required',
                }}
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <>
                    <Dropdown
                      width="100%"
                      data={getBusinessCategory_Data?.data?.list?.map(item => ({
                        label: item?.categoryName,
                        value: item?._id,
                      }))}
                      value={value}
                      label="Select Bussiness Category *"
                      onChangeValue={res => {
                        onChange(res);
                        setValue('bussinessSubCategoryDocId', '');
                        getBusinessSubCategoryMutate({
                          categoryDocId: res,
                        });
                      }}
                    />
                    {!!error && (
                      <Text style={globalStyles.error_text}>
                        {error?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            {/* bussiness subcategory dropdown */}
            <View style={styles.box}>
              <Controller
                control={control}
                name="bussinessSubCategoryDocId"
                rules={{
                  required: 'Business sub-category required',
                }}
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <>
                    <Dropdown
                      data={getBusinessSubCategory_Data?.data?.list?.map(
                        item => ({
                          label: item?.subCategoryName,
                          value: item?.subCategoryName,
                          item: item,
                        }),
                      )}
                      value={value}
                      label="Select Bussiness Sub-Category *"
                      onChangeValue={res => onChange(res)}
                    />
                    {!!error && (
                      <Text style={globalStyles.error_text}>
                        {error?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
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
                  required: 'Business detail required',
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
            <CustomButton title={'Next'} onPress={handleSubmit(onSubmit)} />
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
