import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Sizes from '../../../../constants/Sizes';
import Colors from '../../../../constants/Colors';
import CustomTextInputFormik from '../../../../components/CustomTextInputFormik';

const SocialMediaEdit = ({personalProfileFormik}) => {
  return (
    <>
      <View style={styles.container}>
        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'twitterLink'}
          label={'Twitter Link'}
          width="95%"
        />
        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'facebookLink'}
          label={'Facebook Link'}
          width="95%"
        />
        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'mobileNumber'}
          label={'Mobile Number'}
          width="95%"
          maxLength={10}
          keyboardType={'number-pad'}
        />
        <CustomTextInputFormik
          formik={personalProfileFormik}
          name={'whatsappNumber'}
          label={'WhatsApp Number'}
          width="95%"
          maxLength={10}
          keyboardType={'number-pad'}
        />
      </View>
    </>
  );
};

export default SocialMediaEdit;

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
