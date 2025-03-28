import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dialog, Divider, Portal} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Sizes from '../../constants/Sizes';

const OpenCameraAndGalleryDialog = ({
  visible = false,
  onDismiss = () => {},
  TakePhoto = () => {},
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <View style={styles.root}>
          <TouchableOpacity onPress={() => TakePhoto('gallery')}>
            <Text style={styles.text}>Open Gallery</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity onPress={() => TakePhoto('camera')}>
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </Portal>
  );
};

export default OpenCameraAndGalleryDialog;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: Sizes.wp('5%'),
    paddingBottom: 30,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  divider: {
    backgroundColor: '#333',
    marginVertical: 10,
  },
});
