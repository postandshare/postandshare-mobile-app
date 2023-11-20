import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const BirthRemaiderCard = ({item}) => {
  return (
    <>
      <TouchableOpacity style={styles.item_container}>
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
      </TouchableOpacity>
    </>
  );
};

export default BirthRemaiderCard;

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    backgroundColor: Colors.Background,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: Sizes.wp('95%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#3D398920',
    maxHeight: 80,
    
  },
  item_image_container: {
    flex: 0.2,
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
    flex: 1,
    marginVertical: 2,
    justifyContent: 'center',
  },
  item_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  item_date: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
});
