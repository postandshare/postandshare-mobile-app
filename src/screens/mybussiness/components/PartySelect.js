import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import {RadioButton} from 'react-native-paper';
import CustomTextInputFormik from '../../../components/CustomTextInputFormik';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PartyData = [
  'BJP',
  'Congress',
  'AAP',
  'Samajwadi Party',
  'BSP',
  'JDU',
  'RJD',
  'TMC',
  'Shiv Sena',
  'NCP',
];

const PartySelect = () => {
  const [checked, setChecked] = React.useState('BJP');
  const politicalFormik = useFormik({
    initialValues: {
      party: '',
      state: '',
      district: '',
      constituency: '',
    },
    validationSchema: Yup.object({
      party: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      district: Yup.string().required('Required'),
      constituency: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.Background,
        }}>
        {/* party selection */}
        <Text
          style={{fontSize: 20, marginTop: 20, margin: 5, color: Colors.TEXT1}}>
          Select Party
        </Text>
        <View style={styles.partySelection_container}>
          {PartyData.map((item, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
                <RadioButton
                  value={item}
                  status={checked === item ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(item);
                    politicalFormik.setFieldValue('party', item);
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: Colors.TEXT1,
                  }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.label}>State</Text>
        <CustomTextInputFormik
          formik={politicalFormik}
          name={'state'}
          placeholder={'State'}
        />
      </ScrollView>
    </>
  );
};

export default PartySelect;

const styles = StyleSheet.create({
  partySelection_container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.TEXT1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
