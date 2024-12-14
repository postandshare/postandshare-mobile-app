import {StyleSheet, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {TextInput} from 'react-native-paper';
import Sizes from '../constants/Sizes';
import {Text} from 'react-native-paper';
import {Controller} from 'react-hook-form';
const ControllerInputOutlined = ({
  label = 'Label',
  keyboardType = 'default',
  maxLength = 50,
  name = '',
  control = null,
  rules = {},
  width = '100%',
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View>
      <Controller
        rules={rules}
        control={control}
        name={name}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              multiline={multiline}
              numberOfLines={numberOfLines}
              error={!!error}
              label={label}
              mode="outlined"
              value={value}
              onChangeText={onChange} // Removed parentheses
              onBlur={onBlur}
              placeholderTextColor={'rgba(0,0,0,0.1)'}
              style={{
                width: width,
                alignSelf: 'center',
                marginVertical: 5,
              }}
              maxLength={maxLength}
              keyboardType={keyboardType}
              // numberOfLines={numberOfLines}
              // multiline={numberOfLines > 1}
            />
            {!!error && <Text style={styles.errorText}>{error?.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default ControllerInputOutlined;

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
