import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import TopHeader from '../../../../components/TopHeader';
import Colors from '../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/CustomButton';
import ActionSheet from 'react-native-actions-sheet';
import AddLeaderSheet from '../actionsheets/AddLeaderSheet';

const SelectedLeader = [
  {
    _id: 1,
    date: '2021-05-01',
    pic: require('../../../../assets/uploadPic/pic1.png'),
    name: 'Rahul Gandhi',
  },
  {
    _id: 2,
    date: '2021-05-02',
    pic: require('../../../../assets/uploadPic/pic2.png'),
    name: 'Narendra Modi',
  },
  {
    _id: 3,
    date: '2021-05-03',
    pic: require('../../../../assets/uploadPic/pic7.png'),
    name: 'Amit Shah',
  },
  {
    _id: 4,
    date: '2021-05-04',
    pic: require('../../../../assets/uploadPic/pic4.png'),
    name: 'Sonia Gandhi',
  },
  {
    _id: 5,
    date: '2021-05-05',
    pic: require('../../../../assets/uploadPic/pic5.png'),
    name: 'Manmohan Singh',
  },
  {
    _id: 6,
    date: '2021-05-06',
    pic: require('../../../../assets/uploadPic/pic6.png'),
    name: 'Rajnath Singh',
  },
  {
    _id: 7,
    date: '2021-05-07',
    pic: require('../../../../assets/uploadPic/pic7.png'),
    name: 'Arun Jaitley',
  },
];

const LocalLeader = [
  {
    _id: 1,
    date: '2021-05-01',
    pic: require('../../../../assets/uploadPic/pic1.png'),
    name: 'Rahul Gandhi',
  },
  {
    _id: 2,
    date: '2021-05-02',
    pic: require('../../../../assets/uploadPic/pic2.png'),
    name: 'Narendra Modi',
  },
  {
    _id: 3,
    date: '2021-05-03',
    pic: require('../../../../assets/uploadPic/pic7.png'),
    name: 'Amit Shah',
  },
  {
    _id: 4,
    date: '2021-05-03',
    pic: require('../../../../assets/uploadPic/pic7.png'),
    name: 'Rajiv Gandhi',
  },
];

const ChangeLeader = () => {
  const actionSheetRef = useRef(null);
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };
  return (
    <>
      <ActionSheet ref={actionSheetRef}>
        <AddLeaderSheet onPressCross={onPressCross}/>
      </ActionSheet>
      <TopHeader titile={'Change Leader'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.root}
        nestedScrollEnabled={true}>
        <Text style={styles.label}>Please Select 8 Photos only from below</Text>

        {/* Great Person */}
        <Text style={styles.label}>Great Person</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {SelectedLeader.map((item, index) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  <View style={styles.image}>
                    <Image source={item.pic} style={styles.imageStyle} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Senior Leader in country */}
        <Text style={styles.label}>Senior Leader in Country</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {SelectedLeader.map((item, index) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  <View style={styles.image}>
                    <Image source={item.pic} style={styles.imageStyle} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Senior Leader in State */}
        <Text style={styles.label}>Senior Leader in State</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {SelectedLeader.map((item, index) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  <View style={styles.image}>
                    <Image source={item.pic} style={styles.imageStyle} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Leader's in your area */}
        <Text style={styles.label}>Leader's in your area</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {LocalLeader.map((item, index) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  <View style={styles.image}>
                    <Image source={item.pic} style={styles.imageStyle} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              );
            })}
            <View style={styles.uploadView}>
              <TouchableOpacity
                style={styles.uploadContainer}
                onPress={() => {
                    actionSheetRef?.current?.show();
                }}>
                <AntDesign name="upload" size={30} color={Colors.TEXT1} />
              </TouchableOpacity>
              <Text style={styles.label}>Upload Here</Text>
            </View>
          </View>
        </ScrollView>

        <CustomButton title={'Confirm'} onPress={() => {}} />
      </ScrollView>
    </>
  );
};

export default ChangeLeader;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
    bottom: 10,
  },
  label: {
    color: Colors.TEXT1,
    fontSize: 16,
    margin: 10,
  },
  imgScrollContainer: {
    maxHeight: 300,
  },
  imageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    margin: 13,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
  uploadContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    boorderWidth: 1,
    borderColor: Colors.TEXT1,
  },
  uploadView: {
    alignItems: 'center',
  },
});