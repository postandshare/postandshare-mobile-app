import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export const LeadingText = ({text, onPress, style}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.leading, style]}>{text}</Text>
        </TouchableOpacity>
    );
};

const CustomInput = React.forwardRef((props, ref) => {
  const {
    value,
    error,
    touched,
    onChange,
    onBlur,
    setFieldTouched,
    leadingTitle,
    countryCode,
    onCodePress,
    secureTextEntry,
    passwordVisible,
    setPasswordVisible,
    editable = true,
    setEditable,
    containerStyle,
    textinputStyle,
    leadingStyle,
    inputContainerStyle,
    placeholder,
    ...inputProps
  } = props;

  const hasError = error && touched;

  let leading = null;
  let inputStyle = {paddingLeft: 20};

  if (leadingTitle === 'emailPhone') {
    if (value.length > 2) {
      inputStyle.paddingLeft = 8;
      if (!isNaN(value)) {
        leading = (
          <LeadingText
            style={leadingStyle}
            text={countryCode}
            onPress={onCodePress}
          />
        );
      } else {
        leading = <LeadingText style={leadingStyle} text="@" />;
      }
    } else {
      inputStyle.paddingLeft = 20;
    }
  } else if (leadingTitle === 'phone') {
    inputStyle.paddingLeft = 8;
    leading = (
      <LeadingText
        style={leadingStyle}
        text={countryCode}
        onPress={onCodePress}
      />
    );
  } else if (leadingTitle === 'email') {
    inputStyle.paddingLeft = 8;
    leading = <LeadingText style={leadingStyle} text="@" />;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          !editable && {backgroundColor: '#E9ECEF'},
          hasError && styles.errorInput,
          inputContainerStyle,
        ]}>
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: 10,
            backgroundColor: '#fff',
            paddingHorizontal: props?.label ? 2 : 0,
          }}>
          <Text style={{fontSize: 12, color: Colors.PRIMARY}}>
            {props?.label ?? ''}
          </Text>
        </View>
        {leading}
        <TextInput
          ref={ref}
          mode='Outlined'
          style={[styles.textInput, inputStyle, textinputStyle]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.TEXT1}
          editable={editable}
          onChangeText={text => onChange(text)}
          onBlur={() => {
            setFieldTouched();
            onBlur();
          }}
          secureTextEntry={secureTextEntry && !passwordVisible}
          {...inputProps}
        />
        {!editable && (
          <TouchableOpacity onPress={setEditable}>
            <MaterialIcons
              style={styles.trailing}
              name="edit"
              size={24}
              color={Colors.SECONDRY}
            />
          </TouchableOpacity>
        )}
        {secureTextEntry && value.length > 0 && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Feather
              style={styles.trailing}
              name={!passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});


export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    // borderColor: Colors.PRIMARY,
    borderRadius: 30,
    // overflow: "hidden",
    backgroundColor: '#fff',
  },
  leading: {
    paddingRight: 8,
    paddingLeft: 12,
    paddingVertical: 8,
    borderRightWidth: 1,
    color: Colors.TEXT1,
    minWidth: 42,
    textAlign: 'center',
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingRight: 20,
    fontSize: 18,
    color: Colors.TEXT1,
  },
  trailing: {
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
});
