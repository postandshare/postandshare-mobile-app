/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  Share,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteUserPost,
  getUserPost,
  updateUserPost,
} from '../../../services/userServices/userpost.services';
import Colors from '../../../constants/Colors';
import {
  ActivityIndicator,
  Menu,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import ImageView from 'react-native-image-zoom-viewer';
import Loader from '../../../components/Loader';
import Sizes from '../../../constants/Sizes';
import globalStyles from '../../../styles/globalStyles';
import Images from '../../../constants/images';
import DeleteAlert from '../../../components/DeleteAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import ModalPhotoPostCard from '../cards/ModalPhotoPostCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';

const SearchSortFilter = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  width = '75%',
  favorite,
  handleHeartPress = () => {},
}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.row_container}>
      <TextInput
        mode="outlined"
        label={'Search'}
        style={[styles.searchInput, {width: width}]}
        placeholder="Search"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      {/* heart buton */}
      <TouchableOpacity
        onPress={handleHeartPress}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: Colors.borderColor,
          padding: 5,
          backgroundColor: Colors.white,
          alignSelf: 'center',
        }}>
        <AntDesign
          name="heart"
          size={20}
          color={favorite ? Colors.SECONDRY : 'grey'}
          alignSelf={'center'}
        />
      </TouchableOpacity>
      <Menu
        visible={visible}
        contentStyle={{
          backgroundColor: Colors.Background,
        }}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.sortButtonContainer}
            onPress={() => setVisible(true)}>
            <FontAwesome name="sort" size={15} color={Colors.white} />
            <Text style={styles.sortText}>
              {sortOption === 'Newest' ? 'Newest' : sortOption}
            </Text>
          </TouchableOpacity>
        }>
        <Menu.Item
          title="A to Z"
          onPress={() => {
            setSortOption('AtoZ');
            setVisible(false);
          }}
          icon={sortOption === 'AtoZ' ? 'check' : 'none'}
        />
        <Menu.Item
          title="Z to A"
          onPress={() => {
            setSortOption('ZtoA');
            setVisible(false);
          }}
          icon={sortOption === 'ZtoA' ? 'check' : 'none'}
        />
        <Menu.Item
          title="Newest"
          onPress={() => {
            setSortOption('Newest');
            setVisible(false);
          }}
          icon={sortOption === 'Newest' ? 'check' : 'none'}
        />
        <Menu.Item
          title="Oldest"
          onPress={() => {
            setSortOption('Oldest');
            setVisible(false);
          }}
          icon={sortOption === 'Oldest' ? 'check' : 'none'}
        />
      </Menu>
    </View>
  );
};

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
  const [imageIndexId, setImageIndexId] = useState();
  const [favorite, setFavorite] = useState(false);

  /******************************************************************************* */
  /*****************************SearchSortFilterWork****************************** */
  /******************************************************************************* */
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest');

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
        ...(favorite && {favorite: true}),
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

  const {mutate: updateUserPostMuatate, isLoading: updateUserPostLoading} =
    useMutation(updateUserPost, {
      onSuccess: async success => {
        await HandleRefresh();
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
      enabled: false,
    });
  const {mutate: deleteUserPostMuatate, isLoading: deleteUserPostLoading} =
    useMutation(deleteUserPost, {
      onSuccess: success => {
        setPostData(prev => ({
          ...prev,
          list: prev?.list?.filter(post => post?._id !== deletePostDocId),
          count: prev?.count - 1,
        }));
        setDeleteAlertVisible(false);
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
        getUserPostRefetch();
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

  const fetchMore = () => {
    if (postData.page < postData.pages) {
      setPostData(prev => ({...prev, page: prev.page + 1}));
    }
  };

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

  const HandleRefresh = () => {
    setPostData(prev => ({
      ...prev,
      list: [],
      page: 1,
      count: 0,
      pages: 1,
    }));
  };

  useEffect(() => {
    if (postData.page === 1 && postData.list.length === 0) {
      getUserPostRefetch();
    }
  }, [getUserPostRefetch, postData]);

  // use this when the post name from the server would come
  const filteredPostData = postData?.list?.filter(post =>
    post?.postName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedBusinesses = [...(postData?.list || [])].sort((a, b) => {
    switch (sortOption) {
      case 'AtoZ':
        return a?.postName?.localeCompare(b?.postName);
      case 'ZtoA':
        return b?.postName?.localeCompare(a?.postName);
      case 'Newest':
        return new Date(b?.createdOn) - new Date(a?.createdOn);
      case 'Oldest':
        return new Date(a?.createdOn) - new Date(b?.createdOn);
      default:
        return 0;
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      getUserPostRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorite]),
  );

  // Map all post images to required format
  const allImages =
    postData?.list?.map(post => {
      return {
        url: post?.postLink,
      };
    }) || [];

  // Find the index of the selected image
  const selectedIndex = postData?.list?.findIndex(
    post => post?._id === imageIndexId,
  );

  const shareImage = async imageUrl => {
    try {
      const localImageUrl = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: `${RNFS.DocumentDirectoryPath}/temp.jpg`,
      }).promise;

      await Share.share({
        url: `file://${localImageUrl}`,
        title: 'Share image',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader open={deleteUserPostLoading} text="Deleting Post..." />
      {/* model for viewing the image in zoom */}
      <Portal>
        <Modal
          visible={modalVisible}
          transparent={true}
          onDismiss={() => {
            setModalVisible(false);
            setImages([]); // Clear images when modal is dismissed
          }}
          dismissable={true}
          dismissableBackButton={true}
          contentContainerStyle={{flex: 1}}>
          <ImageView
            imageUrls={allImages}
            index={selectedIndex} // Show the selected image first
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
            useNativeDriver={true}
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
        {/* <Text>Count: {postData?.count}</Text> */}
        <SearchSortFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          favorite={favorite}
          handleHeartPress={() => {
            setFavorite(!favorite);
            HandleRefresh();
          }}
          setSortOption={setSortOption}
          width="60%"
        />
        <FlatList
          ref={scrollViewRef}
          data={sortedBusinesses || []}
          contentContainerStyle={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 200,
          }}
          renderItem={({item, index}) => (
            <ModalPhotoPostCard
              item={item}
              scrollViewRef={scrollViewRef}
              index={index}
              setDeleteAlertVisible={setDeleteAlertVisible}
              setDeletePostDocId={setDeletePostDocId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handlePostLike={() => {
                updateUserPostMuatate({
                  userPostDocId: item?._id,
                  favorite: !item?.favorite,
                });
              }}
            />
            // for gallery view
            // <PhotoPostCard
            //   scrollViewRef={scrollViewRef}
            //   index={index}
            //   setDeleteAlertVisible={setDeleteAlertVisible}
            //   setDeletePostDocId={setDeletePostDocId}
            //   item={item}
            //   setImageIndexId={setImageIndexId}
            //   setModalVisible={setModalVisible}
            //   isLoading={isLoading}
            //   setIsLoading={setIsLoading}
            // />
          )}
          ListEmptyComponent={() => (
            <Text
              style={{alignSelf: 'center', fontSize: 15, fontWeight: '500'}}>
              There is no post.....
            </Text>
          )}
          keyExtractor={(item, index) => index?.toString()}
          onEndReached={postData.page < postData.pages ? fetchMore : null}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={getUserPostLoading || getUserPostFetching}
              onRefresh={async () => {
                HandleRefresh();
              }}
            />
          }
          ListFooterComponent={ListEndLoader}
          numColumns={3}
        />
      </ImageBackground>
    </>
  );
};

export default PhotoPost;

const styles = StyleSheet.create({
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    width: '75%',
    borderRadius: 10,
    height: 40,
    alignSelf: 'center',
    margin: 5,
  },
  sortButtonContainer: {
    backgroundColor: Colors.PRIMARY,
    // padding: 7,
    height: Sizes.height * 0.04,
    width: Sizes.width * 0.2,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  sortText: {
    color: Colors.white,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
