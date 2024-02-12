import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../../constants/Colors';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"

const BussinessType = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        {/* bussiness type */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.TEXT1,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo name="user" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>
        {/* bussiness profile */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.TEXT1,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5 name="hand-holding-usd" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>

        {/* patner */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.TEXT1,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="people" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>
      </View>
    </>
  );
};

export default BussinessType;

const styles = StyleSheet.create({});
