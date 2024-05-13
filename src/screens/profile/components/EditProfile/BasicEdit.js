/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import ProfilePic from '../../../../components/ProfilePic';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import Colors from '../../../../constants/Colors';
import Sizes from '../../../../constants/Sizes';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import Dropdown from '../../../../components/Dropdown';
import globalStyles from '../../../../styles/globalStyles';

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

const BasicEdit = ({
  profilePic,
  TakePhotofromGallery,
  personalProfileFormik,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View style={styles.container}>
        {/* profile Image*/}
        <View style={styles.image_wrap}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
        </View>

        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'firstName'}
          label={'First Name'}
          width="95%"
        />
        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'middleName'}
          label={'Middle Name'}
          width="95%"
        />
        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'lastName'}
          label={'Last Name'}
          width="95%"
        />
        {/* gender dropdown */}
        <View
          style={{
            width: '95%',
            marginTop: 10,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={styles.title}>Select Gender</Text>
          <Dropdown
            data={genderList?.map(item => ({
              label: item?.label,
              value: item?.value,
            }))}
            value={personalProfileFormik?.values['gender']}
            label="Select Gender"
            onChangeValue={value => {
              personalProfileFormik?.setFieldValue('gender', value);
            }}
          />
        </View>
        {personalProfileFormik?.errors.gender ? (
          <Text style={globalStyles?.error_text}>
            {personalProfileFormik?.errors.gender}
          </Text>
        ) : null}
        {/* Date of birth picker */}
        <View
          style={{
            width: '99%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text style={styles.title}>Select DOB</Text>
          <TouchableNativeFeedback onPress={() => setOpen(true)}>
            <View style={styles.customInput}>
              <Text style={{color: Colors.TEXT1, fontWeight: '500'}}>
                {personalProfileFormik?.values['DOB']
                  ? moment(personalProfileFormik?.values['DOB']).format(
                      'DD MMM YYYY',
                    )
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
          date={personalProfileFormik?.values['DOB'] || new Date()}
          onConfirm={date => {
            setOpen(false);
            personalProfileFormik?.setFieldValue('DOB', date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          maximumDate={new Date()}
          mode="date"
        />

        {personalProfileFormik?.errors?.DOB ? (
          <Text style={globalStyles?.error_text}>
            {personalProfileFormik?.errors?.DOB}
          </Text>
        ) : null}

        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'email'}
          label={'Email'}
          width="95%"
        />
      </View>
    </>
  );
};

export default BasicEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('95%'),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 6,
  },
  image_wrap: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: Colors.TEXT1,
    fontSize: 12,
    paddingHorizontal: 10,
  },
  customInput: {
    width: '95%',
    height: 50,
    borderWidth: 0.31,
    borderColor: Colors.PRIMARY,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
