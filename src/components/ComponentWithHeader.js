import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';

import {Text} from 'react-native-paper';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';

const ComponentWithHeader = ({children, navigation, headerTitle}) => {
  return (
    <View style={styles.root}>
      <View style={styles.header_wrap}>
        <View style={styles.left_wrap}>
          {/* Back button */}
          <TouchableOpacity
            style={styles.left_icon_wrap}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" style={styles.left_icon} />
          </TouchableOpacity>

          {/* title */}
        </View>
        <Text style={styles.title}>{headerTitle}</Text>
      </View>
    </View>
  );
};

export default ComponentWithHeader;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  title: {
    color: 'rgba(64, 64, 64, 1)',
    fontSize: 20,
    letterSpacing: 0.5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  icon: {
    color: Colors.TEXT1,
    fontSize: scale(25),
  },
});
