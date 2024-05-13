import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';

const DeleteAlert = () => {
  return (
    <Modal visible={true}>
      <View>
        <Text>Are you sure you want to delete this item?</Text>
      </View>
    </Modal>
  );
};

export default DeleteAlert;

const styles = StyleSheet.create({});
