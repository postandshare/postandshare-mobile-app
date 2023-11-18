import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TutorailNavCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.card_box_container}>
      <Text style={styles.title}>{item?.titile}</Text>
      <AntDesign name="right" size={20} color={Colors.text1} />
    </TouchableOpacity>
  );
};

export default TutorailNavCard;

const styles = StyleSheet.create({
  card_box_container: {
    flex: 1,
    width: Sizes.wp('95%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#020C0A10',
    backgroundColor: Colors.white,
    padding: 10,
    alignSelf: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text1,
    textAlign: 'justify',
  },
});
