import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import images from '../../constants/images';
import styles from './style';
import CustomCarousel from '../../components/CustomCarousel';
import BirthRemaiderCard from '../../components/BirthRemaiderCard';

const BirthdayRemainder_Data = [
  {
    monthName: 'January',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
    ],
    id: '1',
  },
  {
    id: '2',
    monthName: 'February',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '3',
    monthName: 'March',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '4',
    monthName: 'April',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/13/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '5',
    monthName: 'May',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '1/12/2022',
        image: images.profile_placeholder1,
      },
    ],
  },

  {
    id: '6',
    monthName: 'June',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '7',
    monthName: 'July',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '8',
    monthName: 'August',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/13/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '9',
    monthName: 'September',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '1/12/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    id: '10',
    monthName: 'October',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    monthName: 'November',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
  {
    monthName: 'December',
    data: [
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/13/2022',
        image: images.profile_placeholder1,
      },
    ],
  },
];

const BirthdayRemainder = ({navigation}) => {
  return (
    <>
      <TopHeader
        titile={'Birthday Remainder'}
        icon={images.add_birthday_icon}
        onPress={() => navigation.navigate('AddRemainder')}
      />

      <ScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Today</Text>
        {/* carousel for today birthday remainders */}
        <View style={styles.today_carousel}>
          <CustomCarousel />
        </View>

        <Text >Upcoming</Text>


      </ScrollView>
    </>
  );
};

export default BirthdayRemainder;
