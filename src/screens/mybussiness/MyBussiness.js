import {Pressable, ScrollView, Text, View} from 'react-native';
import React, {useReducer} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import MyBussinessCard from '../../components/MyBussinessCard';
import Images from '../../constants/images';
import CustomButton from '../../components/CustomButton';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';

const MyBussiness_Data = [
  {
    id: 1,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder1,
    userDocId: '1',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 2,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder2,
    userDocId: '2',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 3,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder1,
    userDocId: '3',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 4,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder2,
    userDocId: '4',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 5,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder1,
    userDocId: '5',
    lastUpdated: '20, Mar 2023',
  },
  {
    id: 6,
    name: 'Dr A K Group of Institutions B.A|B.SC|B.COM|M.SC| M.COM| CBSE BOARD| UP BOARD| ANM',
    EstblishmentDate: '20, Mar 2023',
    image: Images.profile_placeholder2,
    userDocId: '6',
    lastUpdated: '20, Mar 2023',
  },
];

const Spacer = ({height = 16}) => <View style={{height}} />;

const MyBussiness = ({navigation, route}) => {
  const [dark, toggle] = useReducer(s => !s, true);
  const colorMode = dark ? 'dark' : 'light';
  const {picData} = route.params || {};
  const PhotoData = picData;
  console.log(picData, 'editDateForPhoto');
  return (
    <>
      <TopHeader
        titile={'MyBussiness'}
        add
        onPress={() => navigation.navigate('Add Bussiness')}
      />
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
                edit={true}
                onPress={() =>
                  picData
                    ? navigation.navigate('CustomSDK', {
                        picData: PhotoData,
                      })
                    : navigation.navigate('Edit Bussiness')
                }
              />
          ))}
        </View>

        <CustomButton
          title={'Premium'}
          secondary={false}
          customStyle={styles.premium_Buttton}
        />
      </ScrollView>
    </>
  );
};

export default MyBussiness;

{
  /* <Button onPress={()=> navigation.navigate('Add Bussiness')}>Add Bussiness</Button>
<Button onPress={()=> navigation.navigate('Edit Bussiness')}>Edit Bussiness</Button> */
}
