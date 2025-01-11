import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'moti';
import Colors from '../../constants/Colors';

const ShowSelectedLeaders = ({list = []}) => {
  return (
    <>
      {list?.map((res, i) => (
        <View style={styles.leader_img_wrap} key={i}>
          <Image style={styles.leader_img} source={{uri: res?.leaderPhoto}} />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.leader_name_text}>
            {res?.leaderName}
          </Text>
          <View style={styles.show_count}>
            <Text style={styles.count_text}>{i + 1}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default ShowSelectedLeaders;

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
