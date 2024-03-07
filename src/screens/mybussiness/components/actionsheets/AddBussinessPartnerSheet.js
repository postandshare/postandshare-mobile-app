import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyles from '../../../../styles/globalStyles';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import Colors from '../../../../constants/Colors';
import CustomButton from '../../../../components/CustomButton';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';

const AddBussinessPartnerSheet = ({
  onPressCross,
  addBusinessPartner,
  bussinessTypeFormik,
}) => {
  const [profilePic, setprofilePic] = useState(
    bussinessTypeFormik?.values?.bussinessPartnerPhoto ?? '',
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
      //   updateSelfPhotoMutate({
      //     profilePic: uplode?.fileURL,
      //   });
      bussinessTypeFormik.setValues(prev => ({
        ...prev,
        bussinessPartnerPhoto: uplode?.fileURL,
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
      {/* header */}
      <View style={globalStyles.actionSheet_header}>
        <Text style={globalStyles.actionSheet_header_left_text}>
          Add Bussiness Partner
        </Text>
        <View>
          <TouchableOpacity
            style={globalStyles.actionSheet_header_right}
            onPress={onPressCross}>
            <Entypo
              style={globalStyles.actionSheet_header_right_text}
              name="cross"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={globalStyles.divider_studentDetails} />

      {/* body */}
      <View style={styles.container}>
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Partner Name</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessPartnerName'}
            label={'Partner Name'}
          />
        </View>
        {/* desingnation */}
        <View style={styles.textInputField}>
          <Text style={{color: Colors.TEXT1}}>Desingnation</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessPartnerDessignation'}
            label={'Desingnation'}
          />
        </View>
        {/* photo */}
        <TouchableOpacity
          style={styles.photoInput}
          onPress={() => {
            TakePhotofromGallery();
          }}>
          {profilePic ? (
            <Image
              source={{uri: profilePic}}
              style={{width: '100%', height: '100%', borderRadius: 10}}
            />
          ) : (
            <Text style={{color: Colors.TEXT1}}>Add Photo</Text>
          )}
        </TouchableOpacity>

        <CustomButton title={'Add'} onPress={() => addBusinessPartner()} />
      </View>
    </>
  );
};

export default AddBussinessPartnerSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 10,
  },

  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputField: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
  },
  photoInput: {
    width: '25%',
    marginTop: 10,
    height: 90,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
