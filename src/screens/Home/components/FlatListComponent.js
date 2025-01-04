/* eslint-disable react-native/no-inline-styles */
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../style';
import {FlatList} from 'react-native-actions-sheet';
import {uploadedImages} from '../../../constants/images';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import moment from 'moment';
import Colors from '../../../constants/Colors';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from 'react-native-paper';

const FlatListComponent = ({navigation, data, byLabel}) => {
  const [loading, setIsLoading] = React.useState(false);
  return (
    <>
      {/* container for showing the uploaded photo */}
      <View style={styles.uploadpic_container}>
        {/* text part of the container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.uploadpic_container_headerText}>{byLabel}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MonthPhoto', {
                data,
                byLabel,
              })
            }>
            <Text style={styles.uploadpic_container_viewText}>see more</Text>
          </TouchableOpacity>
        </View>

        {/* flatlist for rendering the photos */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(NavigationScreenName.PHOTO_NAVIGATOR, {
                    initialRouteName: item,
                  })
                }
                style={styles.uploadpic_container_image_view}>
                {loading && (
                  <ActivityIndicator
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      alignSelf: 'center',
                      top: '40%',
                    }}
                    size="small"
                    color={Colors.PRIMARY}
                  />
                )}
                <Image
                  onLoadEnd={() => setIsLoading(false)}
                  source={
                    item?.contentUrl ? {uri: item?.contentUrl} : item?.pic
                  }
                  style={styles.uploadpic_container_image}
                />
              </TouchableOpacity>
              <View style={styles.uploadpic_container_eventview}>
                <Text style={styles.uploadpic_container_eventname}>
                  {item?.name ?? null}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.TEXT1,
                    fontWeight: '400',
                  }}>
                  {moment(item?.createdOn).format('MMM Do')}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={index => index._id}
          extraData={uploadedImages}
        />
      </View>
    </>
  );
};

export default FlatListComponent;
