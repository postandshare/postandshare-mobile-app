import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import Sizes from '../../constants/Sizes';
import {scale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
type ControllerDropdownProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label?: string; // Optional label for the dropdown
  data: Array<{label: string; value: string | number}>; // Dropdown options
  placeholder?: string;
  disabled?: boolean;
};

const ControllerDropdown = <TFieldValues extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  data,
  placeholder,
  disabled = false,
}: ControllerDropdownProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field: {onChange, value = ''}, fieldState: {error}}) => (
        <View>
          {label && <Text style={styles.label}>{label}</Text>}
          <Dropdown
            style={[styles.input, error ? styles.errorInput : null]}
            data={data}
            placeholder={placeholder || 'Select an option'}
            value={value}
            onChange={item => onChange(item.value)}
            labelField="label"
            valueField="value"
            selectedTextStyle={{
              color: '#000',
            }}
            itemTextStyle={{
              color: '#000',
            }}
            mode="modal"
            search
            searchPlaceholder="Search..."
            disable={disabled}
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

export default ControllerDropdown;
