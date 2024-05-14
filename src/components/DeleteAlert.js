import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import CustomButton from './CustomButton';
import Colors from '../constants/Colors';

const DeleteAlert = ({
  visible = false,
  onDismiss = () => {},
  tittle = `Are you Sure`,
  onPress = () => {},
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
      }}
      dismissable={false}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#FFDAD9',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#404040'}}>
            {tittle}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CustomButton
            title={'No'}
            onPress={onDismiss}
            titleColor={Colors.TEXT1}
            width="35%"
            customStyle={{
              backgroundColor: Colors.white,
              borderColor: Colors.TEXT1,
              borderWidth: 1,
              height: 42,
              borderRadius: 5,
            }}
          />
          <CustomButton
            title={'Yes'}
            onPress={onPress}
            titleColor={Colors.white}
            width="35%"
            customStyle={{
              backgroundColor: Colors.SECONDRY,
              borderColor: Colors.SECONDRY,
              borderWidth: 1,
              height: 42,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAlert;

const styles = StyleSheet.create({});
