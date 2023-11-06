import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const CustomTextInput = ({
  label = '',
  value = '',
  onChangeText = () => {},
  inputPops,
  placeholder = 'Type...',
  mt = 0,
}) => {
  return (
    <View style={{marginTop: mt}}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        underlineColorAndroid="#fff"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        cursorColor={COLORS.text1}
        {...inputPops}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  label: {
    color: COLORS.text1,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1,
    opacity: 0.5,
    marginBottom: 5,
    marginLeft: 5,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(61, 57, 137, 0.1)',
    borderStyle: 'solid',
    borderRadius: 10,
    elevation: 2,
    shadowColor: 'rgba(61, 57, 137, 0.4)',
    height: 50,
    paddingHorizontal: 15,
  },
});
