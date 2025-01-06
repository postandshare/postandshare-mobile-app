import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useRef, useState} from 'react';
import ProfilePic from '../../components/ProfilePic';
import uploadFile from '../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';

import ActionSheet from 'react-native-actions-sheet';
import AddBussinessPartnerSheet from './components/actionsheets/AddBussinessPartnerSheet';
import Colors from '../../constants/Colors';
import images from '../../constants/images';
import {useMutation} from '@tanstack/react-query';
import {addBusinessPartner} from '../../services/userServices/bussiness.servies';
import Loader from '../../components/Loader';
import {useForm} from 'react-hook-form';
import ControllerInputOutlined from '../../components/ControllerInputOutlined';
import Sizes from '../../constants/Sizes';
import CustomButton from '../../components/CustomButton';

const AddEditBusinessStep2 = ({navigation, route}) => {
  const params = route?.params;
  console.log(params, 'in params');
  const [profilePic, setprofilePic] = useState('');
  const [bussinessPartner, setBussinessPartner] = useState([]);
  const {control, handleSubmit} = useForm({
    defaultValues: {
      bussinessOwnerName: '',
      bussinessOwnerPhone: '',
      bussinessOwnerWhatsapp: '',
      bussinessOwnerDessignation: '',
      bussinessOwnerPhoto: '',
    },
  });

  const onSubmit = data => {};

  const {
    mutate: addBusinessPartnerlMutate,
    isLoading: addBusinessPartnerlLoading,
  } = useMutation(addBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

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
  const onPressAddPartner = data => {
    setBussinessPartner(prev => [...prev, data]);
  };
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };
  return (
    <>
      <Loader visible={imageUploading} text="loading..." />
      <ActionSheet
        ref={actionSheetRef}
        closeOnTouchBackdrop={false}
        gestureEnabled={false}
        containerStyle={styles.actionSheet_content}>
        <AddBussinessPartnerSheet
          onPressCross={onPressCross}
          onPressAddPartner={onPressAddPartner}
        />
      </ActionSheet>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview_content}>
          <Text style={styles.title}>Your Detail</Text>
          <View style={styles.white_box}>
            <View style={styles.image_wrap}>
              <ProfilePic
                imageUrl={profilePic}
                TakePhotofromGallery={TakePhotofromGallery}
              />
              <Text style={styles.title}>Upload Your Bussiness Pic</Text>
            </View>

            <ControllerInputOutlined
              rules={{
                required: 'Name required',
              }}
              control={control}
              name={'bussinessOwnerName'}
              label={'Your Name'}
            />

            {/* desingnation */}

            <ControllerInputOutlined
              rules={{
                required: 'Name required',
              }}
              control={control}
              name={'bussinessOwnerDessignation'}
              label={'Desingnation'}
            />

            {/* mobile */}

            <ControllerInputOutlined
              rules={{
                required: 'Mobile number required',
                minLength: {
                  value: 10,
                  message: 'Number should be 10 digit',
                },
              }}
              control={control}
              name={'bussinessOwnerPhone'}
              label={'Mobile'}
              keyboardType={'number-pad'}
              maxLength={10}
            />

            {/* whatsapp */}

            <ControllerInputOutlined
              rules={{
                minLength: {
                  value: 10,
                  message: 'Number should be 10 digit',
                },
              }}
              control={control}
              name={'bussinessOwnerWhatsapp'}
              label={'Whatsapp'}
              keyboardType={'number-pad'}
              maxLength={10}
            />
          </View>

          {/* BUSSINESS PARTNER   */}

          <View style={styles.partner_title_wrapper}>
            <Text style={styles.title}>Bussiness Partner</Text>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef?.current?.show();
              }}>
              <Text style={styles.add_text}>Add Bussiness Partner</Text>
            </TouchableOpacity>
          </View>

          {bussinessPartner?.map((item, index) => (
            <View key={index} style={styles.partnerCard}>
              <View style={{flex: 0.2}}>
                <Image
                  source={
                    item.bussinessPartnerPhoto
                      ? {uri: item.bussinessPartnerPhoto}
                      : images.profilePlaceholder
                  }
                  style={{width: 50, height: 50, borderRadius: 50}}
                />
              </View>
              <View style={{flex: 0.6}}>
                <Text style={{fontSize: 16, color: Colors.PRIMARY}}>
                  {item?.bussinessPartnerName}
                </Text>
                <Text style={{fontSize: 14, color: Colors.TEXT1}}>
                  {item?.bussinessPartnerDessignation}
                </Text>
              </View>
              <View style={{flex: 0.2, justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setBussinessPartner(prev =>
                      prev?.filter((_, i) => i !== index),
                    );
                  }}>
                  <Text style={styles.revove_text}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {bussinessPartner?.length > 0 ? null : (
            <Text style={styles.no_business_text}>
              No Bussiness Partner Added
            </Text>
          )}
        </ScrollView>
        {/* submit button */}
      </View>
      <View style={styles.submit_button_wrap}>
        <CustomButton title={'Submit'} onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};

export default AddEditBusinessStep2;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: Sizes.wp('5%'),
  },
  scrollview_content: {
    paddingBottom: 100,
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
    marginVertical: 10,
    alignItems: 'center',
  },
  partnerCard: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  revove_text: {
    color: 'red',
    fontStyle: 'italic',
  },
  edit_text: {
    color: 'blue',
    fontStyle: 'italic',
  },
  no_business_text: {
    color: 'red',
    height: 100,
    alignSelf: 'center',
    fontSize: 16,
  },
  submit_button_wrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Sizes.wp('5%'),
    paddingVertical: Sizes.hp('1%'),
    alignItems: 'center',
  },

  // business partner
  partner_title_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add_text: {
    color: Colors.PRIMARY,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  actionSheet_content: {
    paddingBottom: 50,
    marginBottom: 0,
    backgroundColor: '#f5f5f5',
  },
});
