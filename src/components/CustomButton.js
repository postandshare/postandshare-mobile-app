/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {scale} from 'react-native-size-matters';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
import {ActivityIndicator, Text} from 'react-native-paper';

const CustomButton = ({
  secondary = false,
  width = '90%',
  title,
  onPress = () => {},
  props,
  marginTop = Sizes.hp('2%'),
  customStyle,
  disabled = false,
  titleColor = '#fff',
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      {...props}
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled
          ? '#D0D0E2'
          : secondary
          ? Colors.SECONDRY
          : Colors.PRIMARY,
        height: 50,
        width: Sizes.wp(width),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.hp('2%'),
        marginTop: marginTop,
        flexDirection: 'row',
        gap: 5,
        ...customStyle,
      }}>
      {loading && <ActivityIndicator size={'small'} color={titleColor} />}
      <Text
        style={{
          color: titleColor ?? '#fff',
          fontSize: scale(19),
          letterSpacing: 1,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
