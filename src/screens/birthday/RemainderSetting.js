import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import Dropdown from '../../components/Dropdown';

const RemainderDateContainer = () => {
  const {beforeDays, setBeforeDays} = React.useState('1');

  return (
    <View style={{}}>
      <View style={{}}>
        <Text style={styles.title}>Remainder</Text>
        <Text style={styles.title}>On</Text>
      </View>
      <View style={{}}>
        <Text style={styles.title}>Before Days</Text>
        <Dropdown
          data={[
            {label: '1 Day', value: '1'},
            {label: '2 Days', value: '2'},
            {label: '3 Days', value: '3'},
            {label: '4 Days', value: '4'},
            {label: '5 Days', value: '5'},
          ]}
          value={beforeDays}
          onChangeValue={value => {
            return setBeforeDays(value);
          }}
        />
      </View>
    </View>
  );
};

const RemainderSetting = () => {
  return (
    <>
      <TopHeader titile={'Remainder Setting'} />
      <ScrollView contentContainerStyle={styles.root}>
        <View
          style={[
            styles.textsms_container,
            {marginTop: 10, padding: 10, marginVertical: 10},
          ]}>
          <Text style={[styles.textsms_text, {alignSelf: 'center'}]}>
            At the Date
          </Text>
        </View>

        {/* <RemainderDateContainer /> */}
      </ScrollView>
    </>
  );
};

export default RemainderSetting;
