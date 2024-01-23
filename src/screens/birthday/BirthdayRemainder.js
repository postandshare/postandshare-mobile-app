import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import Images from '../../constants/images';
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
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
      },
      {
        id: '1',
        day: 1,
        time: '10:00 AM',
        name: 'Rajesh',
        date: '12/12/2021',
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
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
        image: Images.profile_placeholder1,
      },
    ],
  },
];

const BirthdayRemainder = ({navigation}) => {
  return (
    <>
      <TopHeader
        titile={'Birthday Remainder'}
        icon={Images.add_birthday_icon}
        onPress={() => navigation.navigate('AddRemainder')}
      />
      
      <ScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}
      >
      <Text style={styles.title}>Today</Text>
      {/* carousel for today birthday remainders */}
      <View style={styles.today_carousel}>
        <CustomCarousel />
      </View>

        {/* flat list for upcoming birthday list for the current month or further month list*/}
        <View style={styles.container}>
          <Text
            style={
              styles.title
            }>{`Upcomig Birthday on ${new Date().toLocaleString('default', {
            month: 'long',
          })}`}</Text>

          {BirthdayRemainder_Data?.map((item, index) => {
            if (
              item?.monthName ===
              new Date().toLocaleString('default', {month: 'long'})
            ) {
              return item?.data?.map((it, idx) => (
                <BirthRemaiderCard item={it} key={idx} />
              ));
            }
          })}

          {/* <FlatList
            data={BirthdayRemainder_Data}
            renderItem={({item}) => (
              <View>
                <Text style={styles.title}>{item?.monthName}</Text>
                <FlatList
                  data={item?.data}
                  renderItem={({item}) => (
                    <View style={styles.item_container}>
                      <View style={styles.item_image_container}>
                        <Image
                          source={item?.image}
                          style={styles.item_image}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={styles.item_details_container}>
                        <Text style={styles.item_name}>{item?.name}</Text>
                        <Text style={styles.item_date}>{item?.date}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item?.id}
                />
              </View>
            )}
            keyExtractor={item => item}
          /> */}
        </View>
      </ScrollView>
    </>
  );
};

export default BirthdayRemainder;
