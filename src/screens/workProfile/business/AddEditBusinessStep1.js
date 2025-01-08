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
import {useQuery} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import ControllerInputOutlined from '../../components/ControllerInputOutlined';
import Sizes from '../../constants/Sizes';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {TakePhotofromGalleryWithCrop} from '../../utils/heplers';
import {getCategory} from '../../services/userServices/category.service';

const AddEditBusinessStep1 = ({navigation}) => {
  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      logo: '',
      bussinessCategory: '',
      bussinessSubCategory: '',
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
    isFetching: getCategoryFetching,
    refetch: getCategoryRefetch,
    data: getCategory_Data,
  } = useQuery({
    queryKey: ['getCategory'],
    queryFn: () =>
      getCategory({
        categoryGroupName: 'Business',
      }),
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useEffect(() => {
    getCategoryRefetch();
  }, [getCategoryRefetch]);

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={getCategoryFetching} />}>
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
                      data={getCategory_Data?.data?.list?.map(item => ({
                        label: item?.category,
                        value: item?._id,
                      }))}
                      value={value}
                      label="Select Bussiness Category *"
                      onChangeValue={res => {
                        onChange(res);
                        setValue('bussinessSubCategoryDocId', res);
                        setValue('bussinessCategory', res);
                        setValue('bussinessSubCategory', '');
                        setBussinessSubCategoryList([
                          getCategory_Data?.data?.list?.find(
                            item => item?._id === res,
                          )?.subCategory,
                        ]);
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
                name="bussinessSubCategory"
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <>
                    <Dropdown
                      data={(bussinessSubCategoryList || []).map(item => ({
                        label: item,
                        value: item,
                      }))}
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
                  required: 'District required',
                }}
                control={control}
                name={'bussinessDistrict'}
                label={'Bussiness District *'}
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
              <ControllerInputOutlined
                rules={{
                  required: 'State required',
                }}
                control={control}
                name={'bussinessState'}
                label={'Bussiness State *'}
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
