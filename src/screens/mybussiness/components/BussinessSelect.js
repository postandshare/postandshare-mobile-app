import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';

const BussinessSelect = ({bussinessType, setBussinessType}) => {
  return (
    <>
      {/* selection of bussiness category weather it is for bussiness or political use */}
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => setBussinessType('Bussiness')}
          style={[
            bussinessType === 'Bussiness'
              ? {backgroundColor: Colors.PRIMARY}
              :  {backgroundColor: 'grey'},
            styles.buttonContainer,
          ]}>
          <Text
            style={[
              bussinessType === 'Bussiness'
                ? {color: '#fff'}
                : null,
              styles.buttonText,
            ]}>
            Bussiness
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setBussinessType('Political')}
          style={[
            bussinessType === 'Political'
              ? {backgroundColor: Colors.PRIMARY}
              : {backgroundColor: 'grey'},
            styles.buttonContainer,
          ]}>
          <Text
            style={[
              bussinessType === 'Political'
                ? {color: '#fff'}
                : null,
              styles.buttonText,
            ]}>
            Political
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BussinessSelect;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
