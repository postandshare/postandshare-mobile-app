/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import TopHeader from '../../components/TopHeader';
import Colors from '../../constants/Colors';
import {Tray} from './BirthdayRemainder';
import Remainder from './components/Remainder';
import Sizes from '../../constants/Sizes';

const CreateEvent = ({navigation, route}) => {
  const {eventsAddFormik, eventDocId} = route?.params || {};
  const eventDate = new Date(eventsAddFormik.eventDate);
  console.log(eventDocId, 'eventDate');
  const [selectedFilter, setSelectedFilter] = React.useState('Remainder');

  const [eventRemainder, setEventRemainder] = React.useState([]);

  const AddRemainder = () => {
    setEventRemainder([
      ...eventRemainder,
      {
        remainderDate: new Date(),
        remainderTime: new Date(),
      },
    ]);
  };
  const DeleteRemainder = index => {
    let temp = eventRemainder;
    temp.splice(index, 1);
    setEventRemainder([...temp]);
  };

  const onDeletePress = index => {
    DeleteRemainder(index);
  };

  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles?.backgroundImage}>
        <TopHeader titile={'Create Event'} />

        {/* image  */}
        <ImageBackground
          source={images.coupleAniverssary}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              bottom: 0,
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {eventsAddFormik?.eventName === 'Anniversary'
                ? `${eventsAddFormik?.personDetails[0]?.personName} & ${eventsAddFormik?.personDetails[1]?.personName}`
                : `${eventsAddFormik?.personDetails[0]?.personName}`}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                textAlign: 'center',
              }}>
              {eventDate?.toDateString()}
            </Text>
          </View>
        </ImageBackground>

        {/* filter tray */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 100,
            width: '100%',
            marginVertical: 10,
          }}>
          <Tray
            backgroundColor={
              selectedFilter === 'Remainder' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={
              selectedFilter === 'Remainder' ? Colors.white : Colors.TEXT1
            }
            title="Remainder"
            onPress={() => {
              setSelectedFilter('Remainder');
            }}
          />
          <Tray
            backgroundColor={
              selectedFilter === 'SMS' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={selectedFilter === 'SMS' ? Colors.white : Colors.TEXT1}
            title="SMS"
            onPress={() => {
              setSelectedFilter('SMS');
            }}
          />
          <Tray
            backgroundColor={
              selectedFilter === 'WhatsApp' ? Colors.PRIMARY : '#E9EEFE'
            }
            textColor={
              selectedFilter === 'WhatsApp' ? Colors.white : Colors.TEXT1
            }
            title="WhatsApp"
            onPress={() => {
              setSelectedFilter('WhatsApp');
            }}
          />
        </ScrollView>

        {/* remaider */}
        {selectedFilter === 'Remainder' ? (
          <FlatList
            contentContainerStyle={{
              padding: 10,
              width: '100%',
              alignItems: 'center',

              paddingBottom: 100,
            }}
            data={eventRemainder}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}>
                <Text style={styles.title}>No Remainder Added</Text>
              </View>
            }
            ListFooterComponent={
              <TouchableOpacity
                onPress={() => AddRemainder()}
                style={{
                  backgroundColor: Colors.PRIMARY,
                  width: 120,
                  height: 40,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginVertical: 10,
                }}>
                <Text style={{color: Colors.white}}>Add Remainder</Text>
              </TouchableOpacity>
            }
            renderItem={({item, index}) => (
              <Remainder
                item={item}
                onDeletePress={() => onDeletePress(index)}
                handleDateChange={date => {
                  let temp = [...eventRemainder];
                  temp[index].remainderDate = date;
                  setEventRemainder(temp);
                }}
                index={index}
                handleTimeChange={time => {
                  let temp = [...eventRemainder];
                  temp[index].remainderTime = time;
                  setEventRemainder(temp);
                }}
              />
            )}
          />
        ) : null}
      </ImageBackground>
    </>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TEXT1,
    marginVertical: 10,
  },
});
