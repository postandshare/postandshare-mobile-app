import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyles from '../../../../styles/globalStyles';
import Colors from '../../../../constants/Colors';
import CustomButton from '../../../../components/CustomButton';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Text} from 'react-native-paper';
import ControllerInputOutlined from '../../../../components/ControllerInputOutlined';
import {Controller, useForm} from 'react-hook-form';
import Sizes from '../../../../constants/Sizes';
import {useMutation} from '@tanstack/react-query';
import {
  addBusinessPartner,
  updateBusinessPartner,
} from '../../../../services/userServices/bussiness.servies';
import {TakePhotofromGalleryWithCrop} from '../../../../utils/heplers';
import OpenCameraAndGalleryDialog from '../../../../components/common/OpenCameraAndGalleryDialog';

const AddBussinessPartnerSheet = ({
  onPressCross,
  edit = false,
  selectedBussinessPartner,
  bussinessDocId,
  refetch = () => {},
}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [chooseImageDialog, setChooseImageDialog] = useState(false);
  const {control, handleSubmit, reset, setValue} = useForm({
    defaultValues: {
      bussinessPartnerName: '',
      bussinessPartnerDessignation: '',
      profilePic: '',
    },
  });

  useEffect(() => {
    if (edit) {
      setValue('bussinessPartnerName', selectedBussinessPartner?.name);
      setValue(
        'bussinessPartnerDessignation',
        selectedBussinessPartner?.designation,
      );
      setValue('profilePic', selectedBussinessPartner?.photo);
    }
  }, [edit, selectedBussinessPartner, setValue]);

  const handleClose = () => {
    onPressCross();
    reset({
      bussinessPartnerName: '',
      bussinessPartnerDessignation: '',
      profilePic: '',
    });
  };

  const onSubmit = data => {
    let body = {
      businessDocId: bussinessDocId,
      name: data?.bussinessPartnerName ?? '',
      photo: data?.profilePic ?? '',
      designation: data?.bussinessPartnerDessignation ?? '',
    };
    if (edit) {
      body = {
        ...body,
        businessPartnerDocId: selectedBussinessPartner?._id,
      };
      return updateBusinessPartnerMutate(body);
    }
    addBusinessPartnerlMutate(body);
  };

  const {
    mutate: addBusinessPartnerlMutate,
    isLoading: addBusinessPartnerlLoading,
  } = useMutation(addBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      refetch();
      handleClose();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    mutate: updateBusinessPartnerMutate,
    isLoading: updateBusinessPartnerLoading,
  } = useMutation(updateBusinessPartner, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      handleClose();
      refetch();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const uploadePhoto = async (path, mime) => {
    try {
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
  const TakePhoto = async type => {
    try {
      const data = await TakePhotofromGalleryWithCrop('gallery');
      uploadePhoto(data?.path, data?.mime);
    } catch (error) {}
  };

  const Loading = addBusinessPartnerlLoading || updateBusinessPartnerLoading;

  return (
    <>
      <OpenCameraAndGalleryDialog
        TakePhoto={TakePhoto}
        visible={chooseImageDialog}
        onDismiss={() => setChooseImageDialog(!chooseImageDialog)}
      />
      {/* header */}
      <View style={globalStyles.actionSheet_header}>
        <Text style={globalStyles.actionSheet_header_left_text}>
          {edit ? 'Edit Business Partner' : 'Add Business Partner'}
        </Text>
        <View>
          <TouchableOpacity
            style={globalStyles.actionSheet_header_right}
            onPress={handleClose}>
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
          label={'Partner Name *'}
        />

        {/* desingnation */}
        <ControllerInputOutlined
          rules={{
            required: 'Designation required',
          }}
          control={control}
          name={'bussinessPartnerDessignation'}
          label={'Desingnation *'}
        />
        {/* photo */}
        <Controller
          control={control}
          name="profilePic"
          render={({field: {value}, fieldState: {error}}) => (
            <>
              <TouchableOpacity
                style={styles.photoInput}
                onPress={() => {
                  TakePhoto();
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
              {!!error && (
                <Text style={globalStyles.error_text}>{error.message}</Text>
              )}
            </>
          )}
        />

        <CustomButton
          loading={Loading}
          title={edit ? 'Update' : 'Add'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

export default AddBussinessPartnerSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.wp('5%'),
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
