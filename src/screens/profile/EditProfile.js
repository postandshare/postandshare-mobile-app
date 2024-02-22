import {
  PermissionsAndroid,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import ProfilePic from '../../components/ProfilePic';
import ImagePicker from 'react-native-image-crop-picker';
// import uploadFile from '../../utils/uploadFile';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import Dropdown from '../../components/Dropdown';
import DatePicker from 'react-native-date-picker';
import CustomInput from '../../components/CustomInput';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import uploadFile from '../../utils/uploadFile';
import Loader from '../../components/Loader';
import {DISTRICTS, STATES} from '../../constants';
import {Checkbox} from 'react-native-paper';
import {useMutation} from '@tanstack/react-query';
import {updateSelfPhoto, updateUserProfile} from '../../services/userServices/profile.services';
import Sizes from '../../constants/Sizes';
import { useDispatch } from 'react-redux';
import { setProfileUpdated } from '../../services/reducer/CommonReducer';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim(),
  DOB: Yup.date().required('Please enter your birthday'),
  gender: Yup.string().trim().required('Please select gender'),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter your mobile number'),
  whatsappNumber: Yup.string().matches(
    phoneRegExp,
    'Phone number is not valid',
  ),
  email: Yup.string().email('Must be a valid email').max(255),

  caddress: Yup.string().trim().required(),
  cdist: Yup.string().trim().required(),
  cpinCode: Yup.number().required(),
  cstate: Yup.string().trim().required(),

  paddress: Yup.string().trim().required(),
  pdist: Yup.string().trim().required(),
  ppinCode: Yup.number().required(),
  pstate: Yup.string().trim().required(),
});

const genderList = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const EditProfile = ({route, navigation}) => {
  const {data} = route.params;
  const [isSelected, setSelection] = useState(false);
  const [profilePic, setprofilePic] = useState(data?.profilePic ?? '');
  const [imageUploading, setImageUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const passRef = useRef(null);
  const dispatch = useDispatch();

  const {
    mutate: updateSelfPhotoMutate,
    isLoading: updateSelfPhotoLoading,
  } = useMutation(updateSelfPhoto, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: false,
  });


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

      updateSelfPhotoMutate({
        profilePic: uplode?.fileURL,
      });
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
      ImagePicker.openPicker({
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

  const {mutate: updateUserProfileMutate, isLoading: updateUserProfileLoading} =
    useMutation(updateUserProfile, {
      onSuccess: ({data}) => {
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
        dispatch(setProfileUpdated(true));
        navigation.goBack();
      },
      onError: err =>
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: data?.firstName ?? '',
      middleName: data?.middleName ?? '',
      lastName: data?.lastName ?? '',
      DOB: data?.DOB ? new Date(data?.DOB) : '',
      gender: data?.gender ?? '',
      community: data?.community ?? '',
      // category: data?.category ?? '',
      mobileNumber: data?.mobileNumber ?? '',
      alternateNumber: data?.alternateNumber ?? '',
      whatsappNumber: data?.whatsappNumber ?? '',
      email: data?.email ?? '',
      PAN: data?.PAN ?? '',
      maritalStatus: data?.maritalStatus ?? '',
      facebookLink: data?.facebookLink ?? '',
      // linkedinLink: data?.linkedinLink ?? '',
      twitterLink: data?.twitterLink ?? '',
      // instagramLink: data?.instagramLink ?? '',
      //current address
      caddress: data?.currentAddress?.address ?? '',
      cdist: data?.currentAddress?.dist ?? '',
      cpinCode: data?.currentAddress?.pinCode ?? '',
      cstate: data?.currentAddress?.state ?? '',
      //permanent address
      paddress: data?.permanentAddress?.address ?? '',
      pdist: data?.permanentAddress?.dist ?? '',
      pstate: data?.permanentAddress?.state ?? '',
      ppinCode: data?.permanentAddress?.pinCode ?? '',
      isProfileUpdated: data?.isProfileUpdated,
    },
    validationSchema,
    onSubmit(values) {
      const castedVal = validationSchema.cast(values);
      const body = {
        ...castedVal,
        DOB: new Date(castedVal?.DOB),
        currentAddress: {
          address: castedVal?.caddress,
          dist: castedVal?.cdist,
          pinCode: String(castedVal?.cpinCode),
          state: castedVal?.cstate,
        },
        permanentAddress: {
          address: castedVal?.paddress,
          dist: castedVal?.pdist,
          pinCode: String(castedVal?.ppinCode),
          state: castedVal?.pstate,
        },
        isProfileUpdated: true,
        profilePic,
      };
      delete body.caddress;
      delete body.cdist;
      delete body.cpinCode;
      delete body.cstate;
      delete body.paddress;
      delete body.pdist;
      delete body.ppinCode;
      delete body.pstate;
      delete body?.mobileNumber;
      delete body?.category;
      delete body?.linkedinLink;
      delete body?.instagramLink;

      console.log(body, 'body');
      updateUserProfileMutate(body);
    },
  });

  const handleChecked = () => {
    setSelection(prev => !prev);
    if (!values) return;

    if (!isSelected) {
      handleChange('paddress')(values['caddress']);
      handleChange('pdist')(values['cdist']);
      handleChange('ppinCode')(values['cpinCode']);
      handleChange('pstate')(values['cstate']);
    } else {
      handleChange('paddress')('');
      handleChange('pdist')('');
      handleChange('ppinCode')('');
      handleChange('pstate')('');
    }
  };

  const focusPass = () => {
    // passRef.current.focus();
  };

  return (
    <>
      <Loader open={imageUploading} text="Uploading Image" />
      <Loader open={updateUserProfileLoading} text="Updating Deatils..." />
      <TopHeader titile={'Edit Profile'} />
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.root}>
        {/* profile Image*/}
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
        </View>

        {/* form */}
        <View style={styles.textinputView}>
          <CustomInput
            label="First Name"
            value={values['firstName']}
            error={errors['firstName']}
            touched={touched['firstName']}
            onChange={handleChange('firstName')}
            onBlur={() => handleBlur('firstName')}
            setFieldTouched={() => setFieldTouched('firstName')}
            placeholder="First Name"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />
          <CustomInput
            label="Middle Name"
            value={values['middleName']}
            error={errors['middleName']}
            touched={touched['middleName']}
            onChange={handleChange('middleName')}
            onBlur={() => handleBlur('middleName')}
            setFieldTouched={() => setFieldTouched('middleName')}
            placeholder="Middle Name"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />

          <CustomInput
            label="Last Name"
            value={values['lastName']}
            error={errors['lastName']}
            touched={touched['lastName']}
            onChange={handleChange('lastName')}
            onBlur={() => handleBlur('lastName')}
            setFieldTouched={() => setFieldTouched('lastName')}
            placeholder="Last Name"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginTop: 10, marginBottom: 5}}
          />

          {/* gender dropdown */}
          <View
            style={{width: '100%', marginTop: 10, justifyContent: 'center'}}>
            <Text style={styles.title}>Select Gender</Text>
            <Dropdown
              data={genderList?.map(item => ({
                label: item?.label,
                value: item?.value,
              }))}
              value={values['gender']}
              label="Select Gender"
              onChangeValue={value => {
                setFieldValue('gender', value);
              }}
            />
          </View>
          {errors.gender ? (
            <Text style={styles.errorText}>{errors.gender}</Text>
          ) : null}

          {/* Date of birth picker */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text style={styles.title}>Select DOB</Text>
            <TouchableNativeFeedback onPress={() => setOpen(true)}>
              <View style={styles.customInput}>
                <Text style={{color: Colors.TEXT1, fontWeight: '500'}}>
                  {values['DOB']
                    ? moment(values['DOB']).format('DD MMM YYYY')
                    : 'Enter your birthday'}
                </Text>
                <Entypo name="calendar" size={22} color="grey" />
              </View>
            </TouchableNativeFeedback>
          </View>

          <DatePicker
            textColor="black"
            modal
            open={open}
            date={values['DOB'] || new Date()}
            onConfirm={date => {
              setOpen(false);
              setFieldValue('DOB', date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            maximumDate={new Date()}
            mode="date"
            
          />

          {errors.DOB ? (
            <Text style={styles.errorText}>{errors.DOB}</Text>
          ) : null}

          {/* Mobile number input box */}

          <CustomInput
            editable={false}
            label="Mobile No"
            value={values['mobileNumber']}
            error={errors['mobileNumber']}
            touched={touched['mobileNumber']}
            onChange={handleChange('mobileNumber')}
            onBlur={() => handleBlur('mobileNumber')}
            setFieldTouched={() => setFieldTouched('mobileNumber')}
            placeholder="Mobile No"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginTop: 10}}
            maxLength={10}
          />
          <CustomInput
            label="WhatsApp No"
            value={values['whatsappNumber']}
            error={errors['whatsappNumber']}
            touched={touched['whatsappNumber']}
            onChange={handleChange('whatsappNumber')}
            onBlur={() => handleBlur('whatsappNumber')}
            setFieldTouched={() => setFieldTouched('whatsappNumber')}
            placeholder="WhatsApp No"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginTop: 10}}
            maxLength={10}
          />
          <CustomInput
            label="Alternate No"
            value={values['alternateNumber']}
            error={errors['alternateNumber']}
            touched={touched['alternateNumber']}
            onChange={handleChange('alternateNumber')}
            onBlur={() => handleBlur('alternateNumber')}
            setFieldTouched={() => setFieldTouched('alternateNumber')}
            placeholder="Alternate No"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginTop: 10}}
            maxLength={10}
          />

          <CustomInput
            label="Email"
            value={values['email']}
            error={errors['email']}
            touched={touched['email']}
            onChange={handleChange('email')}
            onBlur={() => handleBlur('email')}
            setFieldTouched={() => setFieldTouched('email')}
            placeholder="Email address"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 5}}
          />
          <CustomInput
            label="facebookLink"
            value={values['facebookLink']}
            error={errors['facebookLink']}
            touched={touched['facebookLink']}
            onChange={handleChange('facebookLink')}
            onBlur={() => handleBlur('facebookLink')}
            setFieldTouched={() => setFieldTouched('facebookLink')}
            placeholder="Facebook Link"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />
          <CustomInput
            label="Instagram Link"
            value={values['instagramLink']}
            error={errors['instagramLink']}
            touched={touched['instagramLink']}
            onChange={handleChange('instagramLink')}
            onBlur={() => handleBlur('instagramLink')}
            setFieldTouched={() => setFieldTouched('instagramLink')}
            placeholder="Instagram Link"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />
          <CustomInput
            label="Linkedin Link"
            value={values['linkedinLink']}
            error={errors['linkedinLink']}
            touched={touched['linkedinLink']}
            onChange={handleChange('linkedinLink')}
            onBlur={() => handleBlur('linkedinLink')}
            setFieldTouched={() => setFieldTouched('linkedinLink')}
            placeholder="Linked Link"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />
          <CustomInput
            label="Twitter Link"
            value={values['twitterLink']}
            error={errors['twitterLink']}
            touched={touched['twitterLink']}
            onChange={handleChange('twitterLink')}
            onBlur={() => handleBlur('twitterLink')}
            setFieldTouched={() => setFieldTouched('linkedinLink')}
            placeholder="Twitter Link"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />
          {/* pan number */}
          <CustomInput
            label="PAN"
            value={values['PAN']}
            error={errors['PAN']}
            touched={touched['PAN']}
            onChange={handleChange('PAN')}
            onBlur={() => handleBlur('PAN')}
            setFieldTouched={() => setFieldTouched('PAN')}
            placeholder="PAN"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 10}}
          />

          <Text style={styles.header}>Current Address</Text>
          <CustomInput
            label="Current Address"
            value={values['caddress']}
            error={errors['caddress']}
            touched={touched['caddress']}
            onChange={handleChange('caddress')}
            onBlur={() => handleBlur('caddress')}
            setFieldTouched={() => setFieldTouched('caddress')}
            placeholder="Current Address"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 5}}
          />

          {/* Drop Down for Selecting State in Current Address */}
          <View
            style={{position: 'relative', marginVertical: 10, width: '100%'}}>
            <Dropdown
              value={values['cstate']}
              label="Select State"
              data={STATES?.map(item => ({label: item, value: item}))}
              onChangeValue={res => {
                setFieldValue('cdist', '');
                setFieldValue('cstate', res);
              }}
            />

            <View
              style={{
                position: 'absolute',
                left: 15,
                top: -10,
                backgroundColor: '#fff',
                marginHorizontal: 3,
              }}>
              <Text style={{color: 'grey', fontSize: 13}}>State</Text>
            </View>
          </View>
          {errors['cstate'] && (
            <Text style={styles.errorText}>{errors['cstate']}</Text>
          )}

          {/* Drop Down For Selecting the District once the state is selected in Current Address*/}
          <View
            style={{position: 'relative', marginVertical: 10, width: '100%'}}>
            <Dropdown
              value={values['cdist']}
              label="Select District"
              data={DISTRICTS[STATES.indexOf(values['cstate']) + 1]?.map(
                item => ({label: item, value: item}),
              )}
              onChangeValue={res => {
                setFieldValue('cdist', res);
              }}
            />

            <View
              style={{
                position: 'absolute',
                left: 15,
                top: -10,
                backgroundColor: '#fff',
                marginHorizontal: 3,
              }}>
              <Text style={{color: 'grey', fontSize: 13}}>District</Text>
            </View>
          </View>
          {errors['cdist'] && (
            <Text style={styles.errorText}>{errors['cdist']}</Text>
          )}
          <CustomInput
            label="Pin Code"
            value={values['cpinCode']}
            error={errors['cpinCode']}
            touched={touched['cpinCode']}
            onChange={handleChange('cpinCode')}
            onBlur={() => handleBlur('cpinCode')}
            setFieldTouched={() => setFieldTouched('cpinCode')}
            placeholder="Pin Code"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 5}}
            maxLength={6}
            keyboardType="number-pad"
          />
        </View>

        <View style={{paddingHorizontal: 30}}>
          <Text style={styles.header}>Permanent Address</Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              status={isSelected ? 'checked' : 'unchecked'}
              onPress={handleChecked}
              style={styles.checkbox}
            />
            <Text style={{fontSize: 12, color: Colors.TEXT1}}>
              Autofill as Current Address?
            </Text>
          </View>
        </View>

        <View style={styles.textinputView}>
          <CustomInput
            label="Permanent Address"
            value={values['paddress']}
            error={errors['paddress']}
            touched={touched['paddress']}
            onChange={handleChange('paddress')}
            onBlur={() => handleBlur('paddress')}
            setFieldTouched={() => setFieldTouched('paddress')}
            placeholder="Permanent Address"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 5}}
          />

          {/* Drop Down for Selecting State in Permenant Address */}

          <View
            style={{position: 'relative', marginVertical: 10, width: '100%'}}>
            <Dropdown
              value={values['pstate']}
              label="Select State"
              data={STATES?.map(item => ({label: item, value: item}))}
              onChangeValue={res => {
                setFieldValue('pdist', '');
                setFieldValue('pstate', res);
              }}
            />

            <View
              style={{
                position: 'absolute',
                left: 15,
                top: -10,
                backgroundColor: '#fff',
                marginHorizontal: 3,
              }}>
              <Text style={{color: 'grey', fontSize: 13}}>State</Text>
            </View>
          </View>
          {errors['pstate'] && (
            <Text style={styles.errorText}>{errors['pstate']}</Text>
          )}

          {/* Drop Down For Selecting the District once the state is selected in Permenant Address*/}

          <View
            style={{position: 'relative', marginVertical: 10, width: '100%'}}>
            <Dropdown
              value={values['pdist']}
              label="Select District"
              data={DISTRICTS[STATES.indexOf(values['pstate']) + 1]?.map(
                item => ({label: item, value: item}),
              )}
              onChangeValue={res => {
                setFieldValue('pdist', res);
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: 15,
                top: -10,
                backgroundColor: '#fff',
                marginHorizontal: 3,
              }}>
              <Text style={{color: 'grey', fontSize: 13}}>District</Text>
            </View>
          </View>
          {errors['pdist'] && (
            <Text style={styles.errorText}>{errors['pdist']}</Text>
          )}
          <CustomInput
            label="Pin Code"
            value={values['ppinCode']}
            error={errors['ppinCode']}
            touched={touched['ppinCode']}
            onChange={handleChange('ppinCode')}
            onBlur={() => handleBlur('ppinCode')}
            setFieldTouched={() => setFieldTouched('ppinCode')}
            placeholder="Pin Code"
            onCodePress={() => {}}
            returnKeyType="next"
            onSubmitEditing={focusPass}
            inputContainerStyle={styles.margin}
            containerStyle={{marginVertical: 5}}
            maxLength={6}
            keyboardType="number-pad"
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;
