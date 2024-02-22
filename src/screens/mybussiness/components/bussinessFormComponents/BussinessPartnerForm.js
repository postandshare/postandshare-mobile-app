import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ProfilePic from '../../../../components/ProfilePic';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import ActionSheet from 'react-native-actions-sheet';
import AddBussinessPartnerSheet from '../actionsheets/AddBussinessPartnerSheet';

const BussinessPartnerForm = ({bussinessTypeFormik}) => {
  const [profilePic, setprofilePic] = useState(
    bussinessTypeFormik?.values?.logo,
  );
  const [bussinessPartner, setBussinessPartner] = useState([{}]);
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

  const actionSheetRef = useRef(null);
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };
  const AddBussinessPartner = () => {
    // setBussinessPartner(prev => {
      
    // });
  }
  return (
    <>
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
          onPressCross={onPressCross}
          bussinessTypeFormik={bussinessTypeFormik}
        />
      </ActionSheet>

      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.root}>
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
          <Text style={styles.tittle}>Upload Your Bussiness Pic</Text>
        </View>

        {/* your name */}
        <View style={styles.textInputField}>
          <Text>Your Name</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerName'}
            label={'Your Name'}
          />
        </View>
        {/* desingnation */}
        <View style={styles.textInputField}>
          <Text>Desingnation</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerDessignation'}
            label={'Desingnation'}
          />
        </View>
        {/* mobile */}
        <View style={styles.textInputField}>
          <Text>Mobile</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerPhone'}
            label={'Mobile'}
            keyboardType={'number-pad'}
            maxLength={10}
          />
        </View>
        {/* whatsapp */}
        <View style={styles.textInputField}>
          <Text>Whatsapp</Text>
          <CustomTextInputFormik
            formik={bussinessTypeFormik}
            name={'bussinessOwnerWhatsapp'}
            label={'Whatsapp'}
            keyboardType={'number-pad'}
            maxLength={10}
          />
        </View>

        {/* BUSSINESS PARTNER   */}
        <View style={{flex: 1, marginHorizontal: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
            Bussiness Partner
          </Text>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef?.current?.show();
            }}>
            <Text style={{color: 'blue', fontStyle: 'italic'}}>
              Add More Business Partner
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default BussinessPartnerForm;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
  },
  image_wrap: {
    marginVertical: 20,
    alignItems: 'center',
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
});
