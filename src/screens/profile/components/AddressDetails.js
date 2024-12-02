import {StyleSheet, View} from 'react-native';
import React from 'react';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import {Text} from 'react-native-paper';
const LabelText = ({label, value}) => {
  return (
    <View style={styles.textinputView}>
      <Text style={{color: Colors.TEXT1, fontSize: 10, fontWeight: '300'}}>
        {label}
      </Text>
      <Text style={{color: Colors.TEXT1, fontSize: 13, fontWeight: '500'}}>
        {value}
      </Text>
    </View>
  );
};
const AddressDetails = ({data}) => {
  return (
    <View style={styles.container}>
      {/* name of the user */}
      <View style={styles.other_details}>
        <LabelText
          label={'Address'}
          value={
            data?.currentAddress?.address +
            ' ' +
            data?.currentAddress?.dist +
            ' ' +
            data?.currentAddress?.state +
            ' '
          }
        />
      </View>
      <View style={styles.other_details}>
        <LabelText
          label={'Pin Code'}
          value={data?.currentAddress?.pinCode ?? '--'}
        />
        <LabelText
          label={'Tehsil'}
          value={data?.currentAddress?.dist ?? '--'}
        />
      </View>
      <View style={styles.other_details}>
        <LabelText
          label={'District'}
          value={data?.currentAddress?.dist ?? '--'}
        />
        <LabelText
          label={'State'}
          value={data?.currentAddress?.state ?? '--'}
        />
      </View>
    </View>
  );
};

export default AddressDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('90%'),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 6,
  },
  other_details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  textinputView: {
    flex: 1,
  },
});
