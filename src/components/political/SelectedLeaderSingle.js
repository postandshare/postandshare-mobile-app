import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'moti';
import Colors from '../../constants/Colors';

const SelectedLeaderSingle = ({item, getIndex, drag}) => {
  return (
    <>
      <TouchableOpacity style={styles.leader_img_wrap} onLongPress={drag}>
        <Image style={styles.leader_img} source={{uri: item?.leaderPhoto}} />
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.leader_name_text}>
          {item?.leaderName}
        </Text>
        <View style={styles.show_count}>
          <Text style={styles.count_text}>{getIndex() + 1}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SelectedLeaderSingle;

const styles = StyleSheet.create({
  leader_img_wrap: {
    position: 'relative',
  },
  show_count: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.PRIMARY,
    minHeight: 20,
    minWidth: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leader_img: {
    height: 100,
    width: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  count_text: {
    color: '#fff',
  },
  leader_name_text: {
    width: 100,
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});
