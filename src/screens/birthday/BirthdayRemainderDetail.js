import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import images from '../../constants/images';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BirthdayRemainderDetail = ({data, navigation}) => {
  const EVENT_DATA = {
    id: '1',
    day: 1,
    time: '10:00 AM',
    name: 'Rajesh',
    date: '12/12/2021',
    image: images.profile_placeholder1,
    event: 'Birthday',
  };
  return (
    <>
      <TopHeader titile={'Birthday Remainder'}/>

      <ScrollView style={{}}>
        <View style={{}}>
          <View style={styles.event_detail_container}>
            <Text style={styles.title}>{EVENT_DATA?.event}</Text>
            <Text style={styles.title}>{EVENT_DATA?.day} Days</Text>
            <Text style={styles.title}>{EVENT_DATA?.date}</Text>
          </View>

          <View style={{}}>
            <Image source={EVENT_DATA?.image} style={styles.image} />
          </View>

          <View style={styles.event_detail_container}>
            <Text style={styles.title}>{EVENT_DATA?.name}</Text>
            <Text style={styles.title}>{EVENT_DATA?.time}</Text>
          </View>


          <View style={styles.textsms_container}>
            <View style={styles.textsms_view}>
              <Entypo name="message" size={24} color="black" />
              <Text style={styles.textsms_text}>+918957339512</Text>
              <FontAwesome name='edit' size={24} color="black" />
            </View>
          </View>

          <View style={{}}>

          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default BirthdayRemainderDetail;
