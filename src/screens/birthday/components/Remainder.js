import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const Remainder = ({
  item,
  onDeletePress,
  handleDateChange,
  handleTimeChange,
  index,
}) => {
  const [dateVisible, setDateVisible] = React.useState(false);
  const [timeVisible, setTimeVisible] = React.useState(false);

  return (
    <>
      <DatePicker
        textColor="black"
        modal
        open={dateVisible}
        date={item?.remainderDate ? new Date(item?.remainderDate) : new Date()}
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
        date={item?.remainderTime ? new Date(item?.remainderTime) : new Date()}
        onConfirm={date => {
          handleTimeChange(date);
          setTimeVisible(false);
        }}
        onCancel={() => {
          setTimeVisible(false);
        }}
        mode="time"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 5,
        }}>
        <Text style={styles.title}>{`Remainder ${index}`}</Text>
        <TouchableOpacity onPress={() => onDeletePress()}>
          <AntDesign name="delete" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
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
        }}>
        {/* remainder date */}
        <View>
          <Text style={{color: Colors.TEXT1}}>Remainder Date</Text>
          <TouchableOpacity
            onPress={() => {
              setDateVisible(true);
            }}
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
              {moment(item?.remainderDate).format('DD-MM-YYYY')}
            </Text>

            <AntDesign name="calendar" size={24} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
        {/* remainder time */}
        <View>
          <Text style={{color: Colors.TEXT1}}>Remainder Time</Text>
          <TouchableOpacity
            onPress={() => setTimeVisible(true)}
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
              {moment(item?.remainderTime).format('hh:mm A')}
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
