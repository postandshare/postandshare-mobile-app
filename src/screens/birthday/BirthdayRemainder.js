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
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Anniversary',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Death Anniversary',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
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
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Anniversary',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Death Anniversary',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Jaynti',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
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
        event: 'Birthday',
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
        event: 'Birthday',
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
        event: 'Social Event',
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
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Social Event',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Celebtration',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Ecological Event',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Social Event',
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
        event: 'Birthday',
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
        event: 'Birthday',
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
        event: 'Social Event',
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
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Social Event',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Social Event',
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: images.profile_placeholder1,
        event: 'Birthday',
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
        event: 'Birthday',
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
        event: 'Birthday',
      },
    ],
  },
];

const BirthdayRemainder = ({navigation}) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonthIndex = new Date().getMonth();

  // Sort the data so that the current month comes first and the following months come after
  const sortedData = [...BirthdayRemainder_Data].sort((a, b) => {
    const aIndex = monthNames.indexOf(a?.monthName);
    const bIndex = monthNames.indexOf(b?.monthName);

    if (aIndex >= currentMonthIndex && bIndex < currentMonthIndex) {
      return -1;
    }
    if (bIndex >= currentMonthIndex && aIndex < currentMonthIndex) {
      return 1;
    }
    return aIndex - bIndex;
  });

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

        {/* list for the upcoming birthday details or events */}
        <ScrollView contentContainerStyle={{}}>
          {sortedData?.map((item, index) => {
            return (
              <View key={index} style={{marginVertical: 10}}>
                <Text style={styles.title}>{item?.monthName}</Text>
                <ScrollView contentContainerStyle={styles.root}>
                  {item?.data?.map((item, index) => {
                    return <BirthRemaiderCard key={index} item={item} navigation={navigation} />;
                  })}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default BirthdayRemainder;
