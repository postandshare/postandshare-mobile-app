import {
  PermissionsAndroid,
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

const bussinessCategory = [
  {label: 'Doctor', value: 'Doctor'},
  {label: 'Engineer', value: 'Engineer'},
  {label: 'Teacher', value: 'Teacher'},
  {label: 'Student', value: 'Student'},
  {label: 'Contractor', value: 'Contractor'},
  {label: 'Shopkeeper', value: 'Shopkeeper'},
  {label: 'Businessman', value: 'Businessman'},
  {label: 'Others', value: 'Others'},
];

const bussinessSubCategory = [
  {label: 'School', value: 'School'},
  {label: 'College', value: 'College'},
  {label: 'University', value: 'University'},
  {label: 'Others', value: 'Others'},
];

const BussinessTypeForm = ({bussinessTypeFormik}) => {
  const [profilePic, setprofilePic] = useState(bussinessTypeFormik?.values?.logo);
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

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <ScrollView
        keyboardDismissMode="on-drag"
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
            data={bussinessCategory?.map(item => ({
              label: item?.label,
              value: item?.value,
            }))}
            value={bussinessTypeFormik.values['bussinessCategory']}
            label="Select Bussiness Category"
            onChangeValue={value => {
              bussinessTypeFormik.setValues(prev => ({
                ...prev,
                bussinessCategory: value,
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
            data={bussinessSubCategory?.map(item => ({
              label: item?.label,
              value: item?.value,
            }))}
            value={bussinessTypeFormik.values['bussinessSubCategory']}
            label="Select Bussiness Sub-Category"
            onChangeValue={value => {
                bussinessTypeFormik.setValues(prev => ({
                  ...prev,
                  bussinessSubCategory: value,
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
  },
  subtitle: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '500',
  },
});
