import {Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../style';
import {FlatList} from 'react-native-actions-sheet';
import {uploadedImages} from '../../../constants/images';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import moment from 'moment';
import Colors from '../../../constants/Colors';
import {ActivityIndicator} from 'react-native-paper';

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
            <Text style={styles.uploadpic_container_viewText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* flatlist for rendering the photos */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavigationScreenName.PHOTO_NAVIGATOR, {
                  initialRouteName: item,
                })
              }
              style={styles.uploadpic_container_image_view}>
              <View style={styles.uploadpic_container_dateview}>
                <Text style={styles.uploadpic_container_date}>
                  {moment(item?.date).format('MMM Do')}
                </Text>
              </View>
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
                source={item?.photo ? {uri: item?.photo} : item?.pic}
                style={styles.uploadpic_container_image}
              />
            </TouchableOpacity>
          )}
          keyExtractor={index => index._id}
          extraData={uploadedImages}
        />
      </View>
    </>
  );
};

export default FlatListComponent;
