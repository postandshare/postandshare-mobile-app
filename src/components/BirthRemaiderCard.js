/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

const Colors_Card = [
  '#FFC0CB',
  '#FFA07A',
  '#FFD700',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8A2BE2',
  '#FF1493',
  '#FF6347',
  '#FF4500',
  '#FF0000',
  '#800000',
];

const LightColors_Card = [
  '#FFC0CB20',
  '#FFA07A20',
  '#FFD70020',
  '#00FF0020',
  '#00FFFF20',
  '#0000FF20',
  '#8A2BE220',
  '#FF149320',
  '#FF634720',
  '#FF450020',
  '#FF000020',
  '#80000020',
];

const BirthRemaiderCard = ({
  item,
  onPress,
  handleSendSms = () => {},
  handleWhatsAppSend = () => {},
  handleDeleteEvent = () => {},
}) => {
  const randomColor =
    Colors_Card[Math.floor(Math.random() * Colors_Card.length)];

  return (
    <TouchableOpacity
      style={styles.item_container}
      onPress={onPress}
      onLongPress={handleDeleteEvent}>
      <View style={styles.item_image_container}>
        <Image
          source={{uri: item?.personDetails[0]?.profilePic}}
          style={styles.item_image}
        />
      </View>
      <View style={styles.item_details_container}>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.item_name}>
            {item?.personDetails[0]?.personName}
          </Text>
          <Text style={styles.item_date}>
            {moment(new Date(item?.eventDate)).format('LL')}
          </Text>
        </View>
        {/* remaindee  */}
        <View>
          <View
            style={[
              styles.event_container,
              {
                borderColor:
                  item?.eventType === 'Birthday'
                    ? '#CD40FF'
                    : item?.eventType === 'Anniversary'
                    ? '#E9EEFE20'
                    : randomColor,
                backgroundColor:
                  item?.eventType === 'Birthday'
                    ? '#CD40FF20'
                    : item?.eventType === 'Anniversary'
                    ? '#E9EEFE'
                    : randomColor,
              },
            ]}>
            <Text
              style={[
                styles.event_text,
                {
                  color:
                    item?.eventType === 'Birthday'
                      ? '#CD40FF'
                      : item?.eventType === 'Anniversary'
                      ? Colors.TEXT1
                      : randomColor,
                },
              ]}>
              {item?.eventType}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
            {item?.smsTemplet && (
              <TouchableOpacity onPress={handleWhatsAppSend}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={30}
                  color={Colors.TEXT1}
                />
              </TouchableOpacity>
            )}
            {item?.whatsAppTemplet && (
              <TouchableOpacity onPress={handleSendSms}>
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={30}
                  color={Colors.TEXT1}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BirthRemaiderCard;

const styles = StyleSheet.create({
  item_container: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: Sizes.wp('95%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#3D398920',
    minHeight: 80,
    padding: 10,
    alignItems: 'center',
    marginVertical: 12,
    elevation: 5,
  },
  item_image_container: {
    height: 55,
    width: 55,
    borderRadius: 50,
    alignSelf: 'center',
    margin: 5,
  },
  item_image: {
    height: 55,
    width: 55,
    borderRadius: 50,
    alignSelf: 'center',
  },
  item_details_container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  item_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    width: Sizes.wp('40%'),
  },
  item_date: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
  event_container: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.1,
    padding: 5,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 2,
    bottom: 0,
  },
  event_text: {
    fontSize: 12,
    fontWeight: '500',
  },
  event_remainder_container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
  },
  event_remainder_text: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
});
