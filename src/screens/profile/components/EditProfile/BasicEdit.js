/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import ProfilePic from '../../../../components/ProfilePic';

import Colors from '../../../../constants/Colors';
import Sizes from '../../../../constants/Sizes';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import Dropdown from '../../../../components/Dropdown';
import globalStyles from '../../../../styles/globalStyles';
import {Text} from 'react-native-paper';
import ControllerInputOutlined from '../../../../components/ControllerInputOutlined';
import {Controller} from 'react-hook-form';
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

  control = null,
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

        <ControllerInputOutlined
          rules={{
            required: 'First name required',
          }}
          control={control}
          name={'firstName'}
          label={'First Name *'}
          width="95%"
        />
        <ControllerInputOutlined
          control={control}
          name={'middleName'}
          label={'Middle Name'}
          width="95%"
        />
        <ControllerInputOutlined
          control={control}
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
          <Controller
            rules={{
              required: 'Gender required',
            }}
            control={control}
            name="gender"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <Dropdown
                  data={genderList?.map(item => ({
                    label: item?.label,
                    value: item?.value,
                  }))}
                  value={value}
                  label="Select Gender *"
                  onChangeValue={res => onChange(res)}
                />
                {!!error && (
                  <Text style={globalStyles?.error_text}>{error?.message}</Text>
                )}
              </>
            )}
          />
        </View>

        {/* Date of birth picker */}
        <View
          style={{
            width: '99%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Controller
            rules={{
              required: 'D.O.B required',
            }}
            control={control}
            name="DOB"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <TouchableNativeFeedback onPress={() => setOpen(true)}>
                  <View style={styles.customInput}>
                    <Text style={{color: Colors.TEXT1, fontWeight: '500'}}>
                      {value
                        ? moment(value).format('DD MMM YYYY')
                        : 'Enter your birthday *'}
                    </Text>
                    <Entypo name="calendar" size={22} color="grey" />
                  </View>
                </TouchableNativeFeedback>
                {!!error && (
                  <Text style={[globalStyles?.error_text, {marginLeft: 10}]}>
                    {error?.message}
                  </Text>
                )}
                <DatePicker
                  textColor="black"
                  modal
                  open={open}
                  date={value || new Date()}
                  onConfirm={date => {
                    setOpen(false);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  maximumDate={new Date()}
                  mode="date"
                />
              </>
            )}
          />
        </View>

        <ControllerInputOutlined
          control={control}
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
