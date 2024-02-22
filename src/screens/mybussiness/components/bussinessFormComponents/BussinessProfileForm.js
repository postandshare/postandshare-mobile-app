import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';
import Dropdown from '../../../../components/Dropdown';
import {DISTRICTS, STATES} from '../../../../constants';
import globalStyles from '../../../../styles/globalStyles';
import Sizes from '../../../../constants/Sizes';

const BussinessProfileForm = ({bussinessTypeFormik}) => {
  return (
    <ScrollView
      // keyboardDismissMode='on-drag'
      contentContainerStyle={styles.root}>
      {/* bussiness name */}
      <View style={styles.textInputField}>
        <Text>Bussiness Name</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'bussinessName'}
          label={'Bussiness Name'}
        />
      </View>
      {/* bussiness detail */}
      <View style={styles.textInputField}>
        <Text>Bussiness Detail</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'bussinessDetail'}
          label={'Bussiness Detail'}
          numberOfLines={4}
        />
      </View>
      {/* bussiness Email */}
      <View style={styles.textInputField}>
        <Text>Bussiness Email</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'bussinessEmail'}
          label={'Bussiness Email'}
        />
      </View>
      {/* bussiness Website */}
      <View style={styles.textInputField}>
        <Text>Bussiness Website</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'businessWebsite'}
          label={'Bussiness Website'}
        />
      </View>
      {/* bussiness Address */}
      <View style={styles.textInputField}>
        <Text>Bussiness Address</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'bussinessAddress'}
          label={'Bussiness Address'}
        />
      </View>
      {/* bussiness tehsil */}
      <View style={styles.textInputField}>
        <Text>Bussiness Tehsil</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'bussinessTehsil'}
          label={'Bussiness Tehsil'}
        />
      </View>
      {/* bussiness PinCode */}
      <View style={styles.textInputField}>
        <Text>Bussiness PinCode</Text>
        <CustomTextInputFormik
          formik={bussinessTypeFormik}
          name={'bussinessPinCode'}
          label={'Bussiness PinCode'}
        />
      </View>
      {/* for selecting the state for current address */}
      <View
        style={{
          marginVertical: 5,
          width: Sizes.wp('91%'),
          marginHorizontal: 8,
        }}>
        <Text>Select State</Text>
        <Dropdown
          value={bussinessTypeFormik.values.bussinessState}
          label="Select State*"
          data={STATES?.map(item => ({label: item, value: item}))}
          onChangeValue={res => {
            console.log(res);
            bussinessTypeFormik.setValues(prev => ({
              ...prev,
              bussinessState: res,
            }));
          }}
        />
      </View>

      {bussinessTypeFormik.errors.bussinessState &&
        bussinessTypeFormik.touched.bussinessState && (
          <Text style={globalStyles.error_text}>
            {bussinessTypeFormik.errors.bussinessState}
          </Text>
        )}

      {/* for district */}
      <View
        style={{
          marginVertical: 5,
          width: Sizes.wp('91%'),
          marginHorizontal: 8,
        }}>
        <Text>Select District</Text>
        <Dropdown
          value={bussinessTypeFormik.values.bussinessDistrict}
          label="Select District*"
          data={DISTRICTS[
            STATES.indexOf(bussinessTypeFormik.values.bussinessState) + 1
          ]?.map(item => ({label: item, value: item}))}
          onChangeValue={res => {
            bussinessTypeFormik.setValues(prev => ({
              ...prev,
              bussinessDistrict: res,
            }));
          }}
        />
      </View>
      {bussinessTypeFormik.errors.bussinessDistrict &&
        bussinessTypeFormik.touched.bussinessDistrict && (
          <Text style={globalStyles.error_text}>
            {bussinessTypeFormik.errors.bussinessDistrict}
          </Text>
        )}
    </ScrollView>
  );
};

export default BussinessProfileForm;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  textInputField: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
  },
});
