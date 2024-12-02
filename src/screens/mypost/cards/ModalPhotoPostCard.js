import {
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import moment from 'moment';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ModalPhotoPostCard = ({
  scrollViewRef,
  index,
  setDeleteAlertVisible,
  setDeletePostDocId,
  item,
  isLoading,
  setIsLoading,
  handlePostLike = () => {},
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  return (
    <>
      {/* modal showing the image */}
      <Portal>
        {/* imagers */}
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContainer}>
            <Image source={{uri: item?.postLink}} style={styles.modalImage} />
            {/* row container */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 10,
              }}>
              <View>
                <Text style={{fontSize: 16, color: Colors.text1}}>
                  {item?.title ?? 'No Title'}
                </Text>
                <Text style={{fontSize: 16, color: Colors.text1}}>
                  Created On:-{' '}
                  {moment().diff(moment(item?.createdOn), 'days') < 1
                    ? `${moment().diff(
                        moment(item?.createdOn),
                        'hours',
                      )} hours ago`
                    : `${moment().diff(
                        moment(item?.createdOn),
                        'days',
                      )} days ago`}
                </Text>
                <Text style={{fontSize: 16, color: Colors.text1}}>
                  Modified On:- {moment(item?.modifiedOn).format('DD-MM-YYYY')}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  height: 50,
                  backgroundColor: '#FFDAD9',
                  borderWidth: 1,
                  borderColor: '#FF0A00',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await setModalVisible(false);
                  setDeleteAlertVisible(true);
                  setDeletePostDocId(item?._id);
                }}>
                <AntDesign
                  name="delete"
                  size={24}
                  color={'red'}
                  alignSelf={'center'}
                />
              </TouchableOpacity>
            </View>

            {/* custom buttons for close and share */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <CustomButton
                title="Close"
                titleColor={Colors.TEXT1}
                onPress={hideModal}
                customStyle={{
                  backgroundColor: Colors.white,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: Colors.TEXT1,
                  borderRadius: 10,
                }}
                width="40%"
              />

              <CustomButton
                title="Share"
                onPress={() => {
                  Share.share({
                    message: item?.postLink,
                  });
                }}
                customStyle={{
                  backgroundColor: '#404040',
                  padding: 10,
                  borderRadius: 10,
                }}
                width="40%"
              />
            </View>
          </View>
        </Modal>
      </Portal>

      <View
        style={{
          marginVertical: 10,
        }}>
        <TouchableOpacity
          ref={scrollViewRef}
          key={index}
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.imageContainer}>
          {isLoading && (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="small"
              color={Colors.PRIMARY}
            />
          )}
          <ImageBackground
            onLoadEnd={() => setIsLoading(false)}
            source={{uri: item?.postLink}}
            style={styles.image}>
            {/* heart icon for like the post */}
            <TouchableOpacity activeOpacity={0.7} onPress={handlePostLike}>
              <AntDesign
                name="heart"
                size={24}
                color={item?.favorite ? 'red' : 'white'}
                style={{position: 'absolute', top: 10, right: 5}}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <Text style={{textAlign: 'center', fontSize: 12, color: Colors.text1}}>
          {moment().diff(moment(item?.createdOn), 'days') < 1
            ? `${moment().diff(moment(item?.createdOn), 'hours')} hours ago`
            : `${moment().diff(moment(item?.createdOn), 'days')} days ago`}
        </Text>
      </View>
    </>
  );
};

export default ModalPhotoPostCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    zIndex: 1,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  activityIndicator: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    top: '40%',
  },
  imageContainer: {
    width: Sizes.wp('30%'),
    height: Sizes.hp('20%'),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    opacity: 1,
    overflow: 'hidden',
    marginHorizontal: 5,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Sizes.hp('80%'),
    width: Sizes.wp('90%'),
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  modalImage: {
    width: Sizes.wp('80%'),
    height: Sizes.hp('50%'),
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
