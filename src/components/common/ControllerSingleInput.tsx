import React from 'react';
import {TextInput, Text, View, StyleSheet, TextInputProps} from 'react-native';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import Sizes from '../../constants/Sizes';
import {scale} from 'react-native-size-matters';

type ControllerInputProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label?: string;
} & TextInputProps;

const ControllerSingleInput = <TFieldValues extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  ...rest
}: ControllerInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: {onChange, onBlur, value = ''},
        fieldState: {error},
      }) => (
        <View>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            cursorColor={'#000'}
            style={[styles.input, error ? styles.errorInput : null]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
          {error?.message && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#000',
    opacity: 0.75,
    marginLeft: Sizes.wp('3%'),
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
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
    elevation: 6,
    fontSize: scale(16),
    color: '#0C2F49',
    paddingHorizontal: Sizes.wp('5%'),
    marginBottom: 5,
  },
  errorInput: {
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 2,
    marginLeft: Sizes.wp('1%'),
  },
});

export default ControllerSingleInput;
