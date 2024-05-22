import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import moment from 'moment';

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

const BirthRemaiderCard = ({item, navigation}) => {
  const randomColor =
    Colors_Card[Math.floor(Math.random() * Colors_Card.length)];
  return (
    <>
      <TouchableOpacity
        style={styles.item_container}
        onPress={() => {
          navigation.navigate('BirthdayRemainderDetail');
        }}>
        <View style={styles.item_image_container}>
          <Image
            source={{uri: item?.personDetails[0]?.profilePic}}
            style={styles.item_image}
            // resizeMode="cover"
          />
        </View>
        <View style={styles.item_details_container}>
          <View style={{width: '50%'}}>
            <Text style={styles.item_name}>
              {item?.personDetails[0]?.personName}
            </Text>
            <Text style={styles.item_date}>
              {moment(new Date(item?.eventDate)).format('LLL')}
            </Text>
          </View>
          {/* remaindee  */}
          <View
            style={[
              styles.event_container,
              {
                borderColor: randomColor,
                backgroundColor: randomColor + '20',
              },
            ]}>
            <Text
              style={[
                styles.event_text,
                {
                  color: randomColor,
                },
              ]}>
              {item?.eventType}
            </Text>
          </View>
        </View>

        {/* no of days remaining from the todays date */}
        {/* <View style={styles.event_remainder_container}>
          <Text style={styles.event_remainder_text}>
            {item?.day - new Date().getDay()}
          </Text>
          <Text style={styles.event_remainder_text}>Days</Text>
        </View> */}
      </TouchableOpacity>
    </>
  );
};

export default BirthRemaiderCard;

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: Sizes.wp('95%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#3D398920',
    maxHeight: 80,
    marginVertical: 12,
  },
  item_image_container: {
    height: 55,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    margin: 10,
  },
  item_image: {
    height: 55,
    width: 60,
    borderRadius: 10,
    alignSelf: 'center',
  },
  item_details_container: {
    alignSelf: 'center',
    gap: 50,
    flexDirection: 'row',
  },
  item_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  item_date: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
  event_container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: Sizes.wp('20%'),
    height: 30,
    alignSelf: 'center',
    borderRadius: 10,
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
