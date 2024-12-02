/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import Sizes from '../../../../constants/Sizes';
import Colors from '../../../../constants/Colors';
import Dropdown from '../../../../components/Dropdown';
import {DISTRICTS, STATES} from '../../../../constants';
import {Text} from 'react-native-paper';
const AddressEdit = ({personalProfileFormik}) => {
  return (
    <View style={styles.container}>
      <CustomTextInputFormik
        formik={personalProfileFormik}
        name={'caddress'}
        label={'Address'}
        width="95%"
      />
      {/* Drop Down for Selecting State in Current Address */}
      <View
        style={{
          position: 'relative',
          marginVertical: 10,
          width: '95%',
          alignSelf: 'center',
        }}>
        <Dropdown
          value={personalProfileFormik?.values['cstate']}
          label="Select State"
          data={STATES?.map(item => ({label: item, value: item}))}
          onChangeValue={res => {
            personalProfileFormik?.setFieldValue('cdist', '');
            personalProfileFormik?.setFieldValue('cstate', res);
          }}
        />
        {/* label */}
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
      {personalProfileFormik?.errors['cstate'] && (
        <Text style={styles.errorText}>
          {personalProfileFormik?.errors['cstate']}
        </Text>
      )}

      {/* Drop Down For Selecting the District once the state is selected in Current Address*/}
      <View
        style={{
          position: 'relative',
          marginVertical: 5,
          width: '95%',
          alignSelf: 'center',
        }}>
        <Dropdown
          value={personalProfileFormik?.values['cdist']}
          label="Select District"
          data={DISTRICTS[
            STATES.indexOf(personalProfileFormik?.values['cstate']) + 1
          ]?.map(item => ({label: item, value: item}))}
          onChangeValue={res => {
            personalProfileFormik?.setFieldValue('cdist', res);
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
      {personalProfileFormik?.errors['cdist'] && (
        <Text style={styles.errorText}>
          {personalProfileFormik?.errors['cdist']}
        </Text>
      )}
      <CustomTextInputFormik
        formik={personalProfileFormik}
        name={'cpinCode'}
        label={'Pin Code'}
        width="95%"
      />
    </View>
  );
};

export default AddressEdit;

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
});
