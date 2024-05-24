import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Sizes from '../../../constants/Sizes';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../../constants/Colors';
import moment from 'moment';

const PhotoPostCard = ({
  scrollViewRef,
  index,
  setDeleteAlertVisible,
  setDeletePostDocId,
  item,
  setImageIndexId,
  setModalVisible,
  isLoading,
  setIsLoading,
}) => {
  return (
    <TouchableOpacity
      ref={scrollViewRef}
      key={index}
      onLongPress={() => {
        setDeleteAlertVisible(true);
        setDeletePostDocId(item?._id);
      }}
      onPress={() => {
        setImageIndexId(item?._id);
        // setImages([item?.postLink]);
        setModalVisible(true);
      }}
      style={{
        width: Sizes.wp('45%'),
        height: 180,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
      }}>
      {isLoading && (
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
      <ImageBackground
        onLoadEnd={() => setIsLoading(false)}
        source={{uri: item?.postLink}}
        style={{
          width: '100%',
          zIndex: 1,
          height: '100%',
        }}
        borderRadius={10}
        resizeMode="contain">
        <Text
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            width: '100%',
            padding: 5,
            textAlign: 'center',
          }}>
          {moment().diff(moment(item?.createdOn), 'days') < 1
            ? `${moment().diff(moment(item?.createdOn), 'hours')} hours ago`
            : `${moment().diff(moment(item?.createdOn), 'days')} days ago`}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PhotoPostCard;
