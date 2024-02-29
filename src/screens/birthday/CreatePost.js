/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import {RadioButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TextSms_Data = [
  {
    id: '1',
    number: '+918957339512',
    text:
      'Wish you a very happy birthday' +
      '\n' +
      'May your all dreams come true' +
      '\n' +
      'Stay blessed' +
      '\n' +
      'Stay happy',
  },
  {
    id: '2',
    number: '+918957339512',
    text:
      'Wish you a very happy birthday' +
      '\n' +
      'May your all dreams come true' +
      '\n' +
      'Stay blessed' +
      '\n' +
      'Stay happy',
  },
  {
    id: '3',
    number: '+918957339512',
    text:
      'Wish you a very happy birthday' +
      '\n' +
      'May your all dreams come true' +
      '\n' +
      'Stay blessed' +
      '\n' +
      'Stay happy',
  },
  {
    id: '4',
    number: '+918957339512',
    text:
      'Wish you a very happy birthday' +
      '\n' +
      'May your all dreams come true' +
      '\n' +
      'Stay blessed' +
      '\n' +
      'Stay happy',
  },
  {
    id: '5',
    number: '+918957339512',
    text:
      'Wish you a very happy birthday' +
      '\n' +
      'May your all dreams come true' +
      '\n' +
      'Stay blessed' +
      '\n' +
      'Stay happy',
  },
];

const CreatePost = () => {
  const [checked, setChecked] = React.useState('textsms');
  return (
    <>
      <TopHeader titile={'Create Post'} />

      <ScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        {/* container for text and whatsapp option */}
        <View style={styles.container_textsms}>
          <View style={styles.view_container}>
            <RadioButton
              value="textsms"
              status={checked === 'textsms' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('textsms')}
            />
            <Text style={styles.title}>Text SMS</Text>
          </View>
          <View style={styles.view_container}>
            <RadioButton
              value="whatsapp"
              status={checked === 'whatsapp' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('whatsapp')}
            />
            <Text style={styles.title}>Whatsapp</Text>
          </View>
        </View>

        {/* text sms container*/}
        {checked === 'textsms' ? (
          <>
            {/* border for selection of the nnumber that would used for sending */}
            <View style={styles.textsms_container}>
              <View style={styles.textsms_option_border}>
                <AntDesign name="message1" size={24} color="black" />
                <Text style={styles.textsms_text}>+918957339512</Text>
              </View>
            </View>

            {/* text sms data */}
            {TextSms_Data.map((item, index) => {
              return (
                <View
                  style={[styles.textsms_container, {marginVertical: 10}]}
                  key={index}>
                  <View style={styles.textsms_view}>
                    <Text style={styles.textsms_text}>{item.text}</Text>
                    <AntDesign name="edit" size={24} color="black" />
                  </View>
                </View>
              );
            })}

            <CustomButton title={'Save'} customStyle={{bottom: 10}} />
          </>
        ) : null}
        {/* whatsapp container */}
        {checked === 'whatsapp' ? (
          <>
            {/* border for selection of the nnumber that would used for sending */}
            <View style={styles.textsms_container}>
              <View style={styles.textsms_option_border}>
                <FontAwesome name="whatsapp" size={24} color="black" />
                <Text style={styles.textsms_text}>+918957339512</Text>
              </View>
            </View>

            {/* text sms data */}
            {TextSms_Data.map((item, index) => {
              return (
                <View
                  style={[styles.textsms_container, {marginVertical: 10}]}
                  key={index}>
                  <View style={styles.textsms_view}>
                    <Text style={styles.textsms_text}>{item.text}</Text>
                    <AntDesign name="edit" size={24} color="black" />
                  </View>
                </View>
              );
            })}

            <CustomButton title={'Save'} customStyle={{bottom: 10}} />
          </>
        ) : null}
      </ScrollView>
    </>
  );
};

export default CreatePost;
