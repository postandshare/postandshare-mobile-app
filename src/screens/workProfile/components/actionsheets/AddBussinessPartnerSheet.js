import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyles from '../../../../styles/globalStyles';
import Colors from '../../../../constants/Colors';
import CustomButton from '../../../../components/CustomButton';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Text} from 'react-native-paper';
import ControllerInputOutlined from '../../../../components/ControllerInputOutlined';
import {Controller, useForm} from 'react-hook-form';
const AddBussinessPartnerSheet = ({
  onPressAddPartner,
  onPressCross,
  edit = false,
}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const {control, handleSubmit, reset, setValue} = useForm({
    defaultValues: {
      photo: '',
      bussinessPartnerName: '',
      bussinessPartnerDessignation: '',
      profilePic: '',
    },
  });
  const onSubmit = data => {
    onPressAddPartner(data);
    reset({
      photo: '',
      bussinessPartnerName: '',
      bussinessPartnerDessignation: '',
      profilePic: '',
    });
  };
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

      setValue('profilePic', uplode?.fileURL);
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
        <ControllerInputOutlined
          rules={{
            required: 'Partner name required',
          }}
          control={control}
          name={'bussinessPartnerName'}
          label={'Partner Name'}
        />

        {/* desingnation */}
        <ControllerInputOutlined
          rules={{
            required: 'Designation required',
          }}
          control={control}
          name={'bussinessPartnerDessignation'}
          label={'Desingnation'}
        />
        {/* photo */}
        <Controller
          control={control}
          name="profilePic"
          render={({field: {value}}) => (
            <>
              <TouchableOpacity
                style={styles.photoInput}
                onPress={() => {
                  TakePhotofromGallery();
                }}>
                {value ? (
                  <Image
                    source={{uri: value}}
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                  />
                ) : (
                  <Text style={{color: Colors.TEXT1}}>Add Photo</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        />

        <CustomButton
          title={
            imageUploading
              ? 'Uploading...'
              : edit
              ? 'Update Partner'
              : 'Add Partner'
          }
          onPress={handleSubmit(onSubmit)}
        />
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
