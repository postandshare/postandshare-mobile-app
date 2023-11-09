import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';

const Loader = ({open = false, text = 'Loading'}) => {
  return (
    <Portal>
      <Modal visible={open}>
        <View style={styles.root}>
          <View style={styles.loader_wrap}>
            <ActivityIndicator color="#fff" size={Sizes.hp('5%')} />
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.PRIMARY,
    height: Sizes.hp('10%'),
    borderRadius: Sizes.hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.wp('3%'),
  },
  loader_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginLeft: 15,
    fontSize: scale(19),
  },
});
