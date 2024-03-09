import {
  Alert,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteUserPost,
  getUserPost,
} from '../../../services/userServices/userpost.services';
import Colors from '../../../constants/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import ImageView from 'react-native-image-zoom-viewer';
import Loader from '../../../components/Loader';
import moment from 'moment';
import Sizes from '../../../constants/Sizes';

const PhotoPost = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]); // Changed from img to images

  const {
    isLoading: getUserPostLoading,
    isFetching: getUserPostFetching,
    refetch: getUserPostRefetch,
    data: getUserPost_Data,
    isError: getUserPost_isError,
  } = useQuery({
    queryKey: ['getUserPost'],
    queryFn: () => getUserPost(),
    onSuccess: async success => {
      // console.log(success?.data, 'in success');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {mutate: deleteUserPostMuatate, isLoading: deleteUserPostLoading} =
    useMutation(deleteUserPost, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
        getUserPostRefetch();
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

  useFocusEffect(
    useCallback(() => {
      getUserPostRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserPostRefetch, navigation]),
  );

  return (
    <>
      <Loader open={deleteUserPostLoading} text="Deleting Post..." />
      {/* model for viewing the image in zoom */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            setImages([]); // Clear images when modal is dismissed
          }}
          dismissable={true}
          dismissableBackButton={true}
          contentContainerStyle={{flex: 1}}>
          <ImageView
            imageUrls={images.map(url => ({url}))} // Map images to required format
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
          />
        </Modal>
      </Portal>

      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5f5',
        }}
        contentContainerStyle={{
          alignSelf: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={getUserPostFetching || getUserPostLoading}
            onRefresh={() => {
              getUserPostRefetch();
            }}
          />
        }>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            padding: 10,
          }}>
          {getUserPost_Data?.data?.list?.map((item, index) => {
            return (
              <>
                <TouchableOpacity
                  key={index}
                  onLongPress={() => {
                    Alert.alert(
                      'Post and Share App',
                      'Are you sure you want to delete this post?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            deleteUserPostMuatate({postDocId: item?._id});
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  onPress={() => {
                    setImages([item?.postLink]);
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
                      {moment(item?.createdAt).format('DD-MM-YYYY')}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default PhotoPost;

const styles = StyleSheet.create({});
