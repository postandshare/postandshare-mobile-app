/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import globalStyles from '../../../styles/globalStyles';
import Images from '../../../constants/images';
import DeleteAlert from '../../../components/DeleteAlert';

const PhotoPost = ({navigation}) => {
  const [postData, setPostData] = useState({
    page: 1,
    pages: 1,
    list: [],
    count: 0,
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [deletePostDocId, setDeletePostDocId] = useState('');
  const {
    isLoading: getUserPostLoading,
    isFetching: getUserPostFetching,
    refetch: getUserPostRefetch,
    data: getUserPost_Data,
    isError: getUserPost_isError,
  } = useQuery({
    queryKey: ['getUserPost'],
    queryFn: () =>
      getUserPost({
        page: postData?.page,
      }),
    onSuccess: async success => {
      setPostData(prev => ({
        ...prev,
        page: success?.data?.currentPage,
        pages: success?.data?.totalPages,
        list: [...prev?.list, ...success?.data?.list],
        count: prev?.count + success?.data?.count,
      }));
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: postData?.pages > postData?.page ? false : true, //please recheck it
  });

  const {mutate: deleteUserPostMuatate, isLoading: deleteUserPostLoading} =
    useMutation(deleteUserPost, {
      onSuccess: success => {
        setDeleteAlertVisible(false);
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
        getUserPostRefetch();
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

  // useFocusEffect(
  //   useCallback(() => {
  //     getUserPostRefetch();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [getUserPostRefetch, navigation]),
  // );

  const fetchMore = () => {
    if (postData.page < postData.pages) {
      setPostData(prev => ({...prev, page: prev.page + 1}));
    }
  };

  console.log(postData?.page);

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setPostData(prev => ({...prev, list: [], page: 1, count: 0}));
    });
    return () => {
      unsubscribeBlur();
    };
  }, [navigation]);

  const ListEndLoader = () => {
    return (
      <View
        style={{
          height: 40,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {getUserPostFetching && <ActivityIndicator color={Colors.PRIMARY} />}
      </View>
    );
  };

  const scrollViewRef = useRef(null);

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

        {/* model for deleting the image */}
        <DeleteAlert
          visible={deleteAlertVisible}
          onDismiss={() => {
            setDeleteAlertVisible(false);
          }}
          onPress={() => {
            deleteUserPostMuatate({postDocId: deletePostDocId});
          }}
          tittle="Are you sure you want to delete this post?"
        />
      </Portal>

      <ImageBackground
        source={Images?.background}
        style={globalStyles.backgroundImage}>
        <Text>Count: {postData?.count}</Text>
        <FlatList
          ref={scrollViewRef}
          contentContainerStyle={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          refreshControl={
            <RefreshControl
              refreshing={getUserPostLoading || getUserPostFetching}
              onRefresh={() => {
                setPostData(prev => ({
                  ...prev,
                  list: [],
                  page: 1,
                  count: 0,
                  pages: 1,
                }));
                getUserPostRefetch();
              }}
            />
          }
          data={postData?.list}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                ref={scrollViewRef}
                key={index}
                onLongPress={() => {
                  setDeleteAlertVisible(true);
                  setDeletePostDocId(item?._id);
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
                    {moment(item?.createdOn).format('DD-MM-YYYY')}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <Text
              style={{alignSelf: 'center', fontSize: 15, fontWeight: '500'}}>
              There is no post.....
            </Text>
          )}
          keyExtractor={(item, index) => index?.toString()}
          onEndReached={postData.page < postData.pages ? fetchMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListEndLoader}
          numColumns={2}
        />
      </ImageBackground>
    </>
  );
};

export default PhotoPost;

const styles = StyleSheet.create({});
