import {StyleSheet, View} from 'react-native';
import React from 'react';
import Sizes from '../../../../constants/Sizes';
import Colors from '../../../../constants/Colors';
import ControllerInputOutlined from '../../../../components/ControllerInputOutlined';

const SocialMediaEdit = ({control}) => {
  return (
    <>
      <View style={styles.container}>
        <ControllerInputOutlined
          control={control}
          name={'twitterLink'}
          label={'Twitter Link'}
          width="95%"
        />
        <ControllerInputOutlined
          control={control}
          name={'facebookLink'}
          label={'Facebook Link'}
          width="95%"
        />
        <ControllerInputOutlined
          rules={{
            required: 'Mobile Number required',
            minLength: {
              value: 10,
              message: 'Number should be 10 digit',
            },
          }}
          control={control}
          name={'mobileNumber'}
          label={'Mobile Number'}
          width="95%"
          maxLength={10}
          keyboardType={'number-pad'}
        />
        <ControllerInputOutlined
          rules={{
            minLength: {
              value: 10,
              message: 'Number should be 10 digit',
            },
          }}
          control={control}
          name={'whatsAppNumber'}
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
