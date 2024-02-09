import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyBussinessCard from '../../components/MyBussinessCard';
import images from '../../constants/images';
import styles from './style';
import TopHeader from '../../components/TopHeader';

const MyBussiness_Data = [
  {
    id: 1,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: images.profile_placeholder1,
    userDocId: '1',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 2,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: images.profile_placeholder2,
    userDocId: '2',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 3,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: images.profile_placeholder1,
    userDocId: '3',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 4,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: images.profile_placeholder2,
    userDocId: '4',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 5,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: images.profile_placeholder1,
    userDocId: '5',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 6,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: images.profile_placeholder2,
    userDocId: '6',
    lastUpdated: '20, Mar 2023',
  },
];

const SelectBussiness = ({route, navigation}) => {
  const {picData} = route.params;
  console.log(picData, 'selectbussiness');
  return (
    <>
      <TopHeader titile={'Select Bussiness'} />
      <ScrollView contentContainerStyle={styles.root}>
        {/* card for the bussiness name and update */}
        <View style={styles.container}>
          {MyBussiness_Data?.map((item, index) => (
            <MyBussinessCard
              key={index}
              name={item?.name}
              EstblishmentDate={item?.EstblishmentDate}
              image={item?.image}
              userDocId={item?.userDocId}
              lastUpdated={item?.lastUpdated}
              onPressForPhotoEdit={() => navigation.navigate('PhotoStatus')}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SelectBussiness;
