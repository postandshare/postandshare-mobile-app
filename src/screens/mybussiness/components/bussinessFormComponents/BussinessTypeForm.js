import {
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProfilePic from '../../../../components/ProfilePic';
import Dropdown from '../../../../components/Dropdown';
import Loader from '../../../../components/Loader';
import ImageCropPicker from 'react-native-image-crop-picker';
import uploadFile from '../../../../utils/uploadFile';
import globalStyles from '../../../../styles/globalStyles';
import Colors from '../../../../constants/Colors';
import {useQuery} from '@tanstack/react-query';
import {
  getBusinessCategory,
  getBusinessSubCategory,
} from '../../../../services/userServices/common.services';

const BussinessTypeForm = ({bussinessTypeFormik}) => {
  const [profilePic, setprofilePic] = useState(
    bussinessTypeFormik?.values?.logo,
  );
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
      bussinessTypeFormik.setValues(prev => ({
        ...prev,
        logo: uplode?.fileURL,
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

  const {
    isLoading: getBusinessCategoryLoading,
    isFetching: getBusinessCategoryFetching,
    refetch: getBusinessCategoryRefetch,
    data: getBusinessCategory_Data,
    isError: getBusinessCategory_isError,
  } = useQuery({
    queryKey: ['getBusinessCategory'],
    queryFn: () => getBusinessCategory(),
    onSuccess: async success => {
      // console.log(success?.data, 'in success');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    isLoading: getBusinessSubCategoryLoading,
    isFetching: getBusinessSubCategoryFetching,
    refetch: getBusinessSubCategoryRefetch,
    data: getBusinessSubCategory_Data,
    isError: getBusinessSubCategory_isError,
  } = useQuery({
    queryKey: ['getBusinessSubCategory'],
    queryFn: () =>
      getBusinessSubCategory({
        categoryDocId: bussinessTypeFormik.values?.bussinessCategoryDocId,
      }),
    onSuccess: async success => {
      // console.log(success?.data, 'in success');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });




  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <ScrollView
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={
              getBusinessCategoryFetching || getBusinessSubCategoryFetching
            }
            onRefresh={() => {
              getBusinessCategoryRefetch();
              {
                bussinessTypeFormik.values?.bussinessCategory?._id &&
                  getBusinessSubCategoryRefetch();
              }
            }}
          />
        }
        contentContainerStyle={styles.root}>
        {/* logo of the add bussiness */}
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
          <Text style={styles.tittle}>Upload Your Bussiness Logo</Text>
        </View>

        {/* bussiness catergory dropdown */}
        <View style={{width: '95%', marginTop: 10, justifyContent: 'center'}}>
          <Text style={styles.subtitle}>Select Bussiness Category</Text>
          <Dropdown
            refetch={getBusinessCategoryRefetch}
            data={getBusinessCategory_Data?.data?.list?.map(item => ({
              label: item?.categoryName,
              value: item?.categoryName,
              item: item,
            }))}
            value={bussinessTypeFormik.values['bussinessCategory']}
            label="Select Bussiness Category"
            onChangeValue={(value, item) => {
              console.log(item, 'in category')
              bussinessTypeFormik.setValues(prev => ({
                ...prev,
                bussinessCategory: value,
                bussinessCategoryDocId: item?.item?._id,
              }));
            }}
          />
        </View>
        {bussinessTypeFormik.errors.bussinessCategory &&
          bussinessTypeFormik.touched.bussinessCategory && (
            <Text style={globalStyles.error_text}>
              {bussinessTypeFormik.errors.bussinessCategory}
            </Text>
          )}

        {/* bussiness subcategory dropdown */}
        <View style={{width: '95%', marginTop: 10, justifyContent: 'center'}}>
          <Text style={styles.subtitle}>Select Bussiness Sub-Category</Text>
          <Dropdown
            refetch={getBusinessSubCategoryRefetch}
            data={getBusinessSubCategory_Data?.data?.list?.map(item => ({
              label: item?.subCategoryName,
              value: item?.subCategoryName,
              item: item,
            }))}
            value={bussinessTypeFormik.values['bussinessSubCategory']}
            label="Select Bussiness Sub-Category"
            onChangeValue={(value , item) => {
              console.log(value, 'in sub category')
              bussinessTypeFormik.setValues(prev => ({
                ...prev,
                bussinessSubCategory: value,
                bussinessSubCategoryDocId: item?.item?._id,
              }));
            }}
          />
        </View>
        {bussinessTypeFormik.errors.bussinessSubCategory &&
          bussinessTypeFormik.touched.bussinessSubCategory && (
            <Text style={globalStyles.error_text}>
              {bussinessTypeFormik.errors.bussinessSubCategory}
            </Text>
          )}
      </ScrollView>
    </>
  );
};

export default BussinessTypeForm;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
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
});
