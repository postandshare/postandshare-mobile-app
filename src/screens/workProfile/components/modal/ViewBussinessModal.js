/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Divider, Modal} from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import Sizes from '../../../../constants/Sizes';
import CustomButton from '../../../../components/CustomButton';
import {Text} from 'react-native-paper';
import {useMutation} from '@tanstack/react-query';
import {deleteBusiness} from '../../../../services/userServices/bussiness.servies';

import Loader from '../../../../components/Loader';
import {deletePoliticalProfile} from '../../../../services/userServices/political.services';

const ViewBussinessModal = ({
  onClose,
  open,
  item,
  handleEdit = () => {},
  refetch,
}) => {
  const hideModal = () => {
    onClose();
  };
  const handleDelete = () => {
    console.log(item);
    if (item?.categoryGroup === 'business') {
      deleteBusinessMutate(item?.profileDocId);
    } else if (item?.categoryGroup === 'politics') {
      deletePoliticalProfileMutate(item?.profileDocId);
    }
  };
  const {isLoading: deleteBusinessLoading, mutate: deleteBusinessMutate} =
    useMutation({
      mutationFn: deleteBusiness,
      mutationKey: ['deleteBusiness'],
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
        hideModal();
        refetch();
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });
  const {
    isLoading: deletePoliticalProfileLoading,
    mutate: deletePoliticalProfileMutate,
  } = useMutation({
    mutationFn: deletePoliticalProfile,
    mutationKey: ['deletePoliticalProfile'],
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
      hideModal();
      refetch();
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });
  return (
    <>
      <Loader
        text="Deleting..."
        open={deletePoliticalProfileLoading || deleteBusinessLoading}
      />
      <Modal
        visible={open}
        contentContainerStyle={{
          ...styles.container,
          justifyContent: 'flex-start',
        }}
        onDismiss={hideModal}>
        {/* contains image and bussiness users */}
        {item?.categoryGroup === 'politics' ? (
          <>
            <View style={styles.party_card_wrap}>
              <Image
                source={{
                  uri: item?.logo,
                }}
                style={styles.party_image}
              />
              <View>
                <Text style={styles.label}>Party Name</Text>
                <Text style={styles.value}>{item?.name}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.title}>Volunteer Detail</Text>
            <View style={styles.party_card_wrap}>
              {item?.ownerDetail?.photo && (
                <Image
                  source={{
                    uri: item?.ownerDetail?.photo,
                  }}
                  style={styles.party_image}
                />
              )}
              <View>
                <View>
                  <Text style={styles.label}> Name</Text>
                  <Text style={styles.value}>{item?.ownerDetail?.name}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Designation</Text>
                  <Text style={styles.value}>
                    {item?.ownerDetail?.designation}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : item?.categoryGroup === 'business' ? (
          <>
            <View style={styles.party_card_wrap}>
              <Image
                source={{
                  uri: item?.logo,
                }}
                style={styles.party_image}
              />
              <View>
                <Text style={styles.label}>Business Name</Text>
                <Text style={styles.value}>{item?.name}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.party_card_wrap}>
              <View>
                <View>
                  <Text style={styles.label}>Category</Text>
                  <Text style={styles.value}>{item?.category}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Sub Category</Text>
                  <Text style={styles.value}>{item?.subCategory}</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.party_card_wrap}>
              <Image
                source={{
                  uri: item?.ownerPhoto,
                }}
                style={styles.party_image}
              />
              <View>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{item?.ownerName}</Text>
              </View>
            </View>
            {/* <Divider style={styles.divider} /> */}
            {/* <View style={styles.party_card_wrap}>
              <View>
                <View>
                  <Text style={styles.label}>Category</Text>
                  <Text style={styles.value}>{item?.category}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Sub Category</Text>
                  <Text style={styles.value}>{item?.subCategory}</Text>
                </View>
              </View>
            </View> */}
          </>
        )}
        <Divider style={styles.divider} />
        {item?.categoryGroup !== 'selfProfile' && (
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.delete_text}>
              Want to Delete This Profile ?
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignSelf: 'center',
            padding: 10,
          }}>
          <CustomButton
            title={'Edit'}
            onPress={() => {
              hideModal();
              handleEdit();
            }}
            width="35%"
            customStyle={{
              backgroundColor: '#404040',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          />
          <CustomButton
            title={'Close'}
            onPress={() => {
              hideModal();
            }}
            width="35%"
            customStyle={{
              borderColor: '#404040',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}
            titleColor="#000"
          />
        </View>
      </Modal>
    </>
  );
};

export default ViewBussinessModal;

const styles = StyleSheet.create({
  container: {
    maxHeight: Sizes.hp('60%'),
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: Sizes.wp('2%'),
  },
  divider: {
    borderColor: Colors.TEXT1,
    height: 1,
    marginVertical: 7,
  },
  detailedCard: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
  party_card_wrap: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  party_image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    color: '#999',
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  delete_text: {
    color: 'red',
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationColor: 'red',

    textAlign: 'center',
  },
});
