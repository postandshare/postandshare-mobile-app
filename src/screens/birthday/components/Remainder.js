/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const Remainder = ({
  item,
  onDeletePress = () => {},
  handleDateChange = () => {},
  handleTimeChange = () => {},
  index,
  showTittle = true,
  showDelete = true,
  handleChange = true,
}) => {
  const [dateVisible, setDateVisible] = React.useState(false);
  const [timeVisible, setTimeVisible] = React.useState(false);

  return (
    <>
      <DatePicker
        textColor="black"
        modal
        open={dateVisible}
        date={item?.date ? new Date(item?.date) : new Date()}
        onConfirm={date => {
          handleDateChange(date);
          setDateVisible(false);
        }}
        onCancel={() => {
          setDateVisible(false);
        }}
        mode="date"
      />
      <DatePicker
        textColor="black"
        modal
        open={timeVisible}
        date={item?.time ? new Date(item?.time) : new Date()}
        onConfirm={date => {
          handleTimeChange(date);
          setTimeVisible(false);
        }}
        onCancel={() => {
          setTimeVisible(false);
        }}
        mode="time"
      />
      {showTittle && showDelete && (
        <View
          style={{
            flexDirection: 'row',
            gap: 250,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{`Remainder ${index}`}</Text>
          <TouchableOpacity onPress={() => onDeletePress()}>
            <AntDesign name="delete" size={24} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          width: Sizes.wp('90%'),
          alignSelf: 'center',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: Colors.borderColor,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          elevation: 1,
          backgroundColor: Colors.white,
        }}>
        {/* remainder date */}
        <View>
          <Text style={{color: Colors.TEXT1}}>Date</Text>
          <TouchableOpacity
            onPress={() => {
              if (handleChange) setDateVisible(true);
            }}
            activeOpacity={handleChange ? 0.5 : 1}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.borderColor,
              padding: 5,
              width: Sizes.wp('40%'),
            }}>
            <Text style={{color: Colors.TEXT1}}>
              {moment(item?.date).format('DD-MM-YYYY')}
            </Text>

            <AntDesign name="calendar" size={24} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
        {/* remainder time */}
        <View>
          <Text style={{color: Colors.TEXT1}}>Time</Text>
          <TouchableOpacity
            onPress={() => {
              if (handleChange) setTimeVisible(true);
            }}
            activeOpacity={handleChange ? 0.5 : 1}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.borderColor,
              padding: 5,
              width: Sizes.wp('40%'),
            }}>
            <Text style={{color: Colors.TEXT1}}>
              {moment(item?.time).format('hh:mm A')}
            </Text>
            <AntDesign name="clockcircle" size={24} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Remainder;

const styles = StyleSheet.create({});
