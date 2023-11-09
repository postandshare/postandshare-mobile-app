import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
const CustomInputField = ({
  label = 'Label',
  placeholder = 'placeholder',
  err = '',
  value = '',
  keyboardType = 'default',
  onChange = () => {},
  isPasswordType = false,
  onPressPassword = () => {},
  passwordVisible = false,
  multiline,
  maxLength = 50,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {isPasswordType ? (
        <View style={styles.password}>
          <TextInput
            style={styles.passwordInput}
            placeholder={placeholder}
            placeholderTextColor="rgba(12, 47, 73, 0.5)"
            cursorColor={Colors.PRIMARY}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity activeOpacity={0.6} onPress={onPressPassword}>
            <Feather
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={Sizes.hp('3%')}
              color="rgba(12, 47, 73, 0.7)"
            />
          </TouchableOpacity>
        </View>
      ) : multiline ? (
        <TextInput
          style={[styles.input, {height: 100}]}
          placeholder={placeholder}
          placeholderTextColor="rgba(12, 47, 73, 0.5)"
          cursorColor={'#0C2F49'}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          textAlignVertical="top"
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(12, 47, 73, 0.5)"
          cursorColor={'#0C2F49'}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          textAlignVertical="top"
          maxLength={maxLength}
        />
      )}

      <Text style={styles.errorText}>{err}</Text>
    </View>
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  label: {
    color: '#0C2F49',
    opacity: 0.75,
    fontSize: scale(15),
    fontWeight: '500',
    marginLeft: Sizes.wp('1%'),
  },
  passwordInput: {
    height: 50,
    fontSize: scale(16),
    color: '#0C2F49',
    width: '87%',
  },
  password: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: 'rgba(22, 75, 146, 0.15)',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: 'rgba(61, 57, 137,0.4)',
    alignItems: 'center',
    justifyContent: 'space-between',
    // shadowOffset: {width: 0, height: 4},

    // shadowRadius: 2,
    elevation: 6,

    paddingHorizontal: Sizes.wp('5%'),
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'rgba(22, 75, 146, 0.15)',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: 'rgba(61, 57, 137,0.4)',
    height: 50,
    // shadowOffset: {width: 0, height: 4},

    // shadowRadius: 2,
    elevation: 6,
    fontSize: scale(16),
    color: '#0C2F49',
    paddingHorizontal: Sizes.wp('5%'),
  },
  errorText: {
    marginLeft: Sizes.wp('1%'),
    color: 'red',
    marginTop: 2,
  },
});
