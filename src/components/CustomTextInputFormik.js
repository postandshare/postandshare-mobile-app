import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../styles/globalStyles'
import { TextInput } from 'react-native-paper'

const CustomTextInputFormik = ({
    formik,
    name,
    label,
    maxLength = 100,
    keyboardType = 'default',
    numberOfLines=1
}) => {
  return (
    <>
        <TextInput
          label={label}
          mode="outlined"
          value={formik.values[name]}
          onChangeText={formik.handleChange(name)} // Removed parentheses
          onBlur={formik.handleBlur(name)}
          style={{width: '95%'}}
          maxLength={maxLength}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          multiline={numberOfLines > 1}
        />
        {formik.errors[name] && formik.touched[name] && (
          <Text style={globalStyles.error_text}>{formik.errors[name]}</Text>
        )}
      </>
  )
}

export default CustomTextInputFormik

const styles = StyleSheet.create({})
