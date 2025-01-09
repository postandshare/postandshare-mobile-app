/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Divider, Modal} from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import Sizes from '../../../../constants/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../../components/CustomButton';
import {Text} from 'react-native-paper';

const ViewBussinessModal = ({
  showBussiness,
  setShowBussiness,
  detailedBussiness,
  handleEdit = () => {},
  handleDelailedView = () => {},
}) => {
  const hideModal = () => {
    setShowBussiness({
      ...showBussiness,
      show: false,
    });
  };

  const maxDisplay = 2;

  return (
    <>
      <Modal
        visible={showBussiness}
        contentContainerStyle={{
          ...styles.container,
          justifyContent: 'flex-start',
        }}
        onDismiss={hideModal}>
        {/* contains image and bussiness users */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.6,
            }}>
            <Image
              source={{
                uri:
                  detailedBussiness?.logo ??
                  detailedBussiness?.fetchExistingPoliticalBusiness?.partyLogo,
              }}
              style={styles.image}
            />
          </View>

          {detailedBussiness?.fetchPoliticalLeaders && (
            <View
              style={{
                flex: 0.4,
                height: Sizes.hp('7%'),
                flexDirection: 'row',
                gap: 5,
                padding: 10,
              }}>
              {detailedBussiness?.fetchPoliticalLeaders
                ?.slice(0, maxDisplay)
                .map(item => {
                  return (
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        backgroundColor: Colors.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                      }}
                      key={item?._id}>
                      <Image
                        source={{
                          uri: item?.leaderDocId?.leaderPhoto,
                        }}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  );
                })}
              {detailedBussiness?.fetchPoliticalLeaders?.length >
                maxDisplay && (
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: Colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: Colors.borderColor,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: Colors.TEXT1,
                    }}>
                    +
                    {detailedBussiness?.fetchPoliticalLeaders?.length -
                      maxDisplay}
                  </Text>
                </View>
              )}
            </View>
          )}
          {!detailedBussiness?.fetchPoliticalLeaders && (
            <View
              style={{
                flex: 0.4,
                height: Sizes.hp('7%'),
                flexDirection: 'row',
                gap: 5,
                padding: 10,
              }}>
              {detailedBussiness?.businessPartner
                ?.slice(0, maxDisplay)
                .map(item => {
                  return (
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        backgroundColor: Colors.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                      }}
                      key={item?._id}>
                      <Image
                        source={{
                          uri: item?.photo,
                        }}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  );
                })}
              {detailedBussiness?.businessPartner?.length > maxDisplay && (
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: Colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: Colors.borderColor,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: Colors.TEXT1,
                    }}>
                    +{detailedBussiness?.businessPartner?.length - maxDisplay}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        {/* contains bussiness details */}
        <View
          style={{
            padding: 10,
          }}>
          {/* bussiness name */}
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: Colors.PRIMARY}}>
            {detailedBussiness?.businessName ??
              detailedBussiness?.fetchExistingPoliticalBusiness?.partyDocId
                ?.partyName}
            {detailedBussiness?.subCategory === '' ||
            detailedBussiness?.subCategory === 'null'
              ? ''
              : `${detailedBussiness?.subCategory ?? ''}`}
          </Text>
          {/* bussiness details */}
          <Text style={{fontSize: 15, color: Colors.TEXT1}}>
            {detailedBussiness?.description ??
              detailedBussiness?.fetchExistingPoliticalBusiness
                ?.volunteerDetail ??
              '--'}
          </Text>
        </View>
        <Divider style={{borderColor: Colors.TEXT1, height: 1}} />
        {/* bussiness contact details */}
        <View
          style={{
            padding: 10,
          }}>
          <View style={styles.detailedCard}>
            <AntDesign name="phone" size={24} color={Colors.PRIMARY} />
            <Text style={{fontSize: 15, color: Colors.TEXT1}}>
              {detailedBussiness?.mobileNumber ??
                detailedBussiness?.fetchExistingPoliticalBusiness
                  ?.mobileNumber ??
                '--'}
            </Text>
          </View>
          <View style={styles.detailedCard}>
            <AntDesign name="mail" size={24} color={Colors.PRIMARY} />
            <Text style={{fontSize: 15, color: Colors.TEXT1}}>
              {detailedBussiness?.email ??
                detailedBussiness?.fetchExistingPoliticalBusiness?.email ??
                '--'}
            </Text>
          </View>
          <View style={styles.detailedCard}>
            <Foundation name="web" size={24} color={Colors.PRIMARY} left={2} />
            <Text style={{fontSize: 15, color: Colors.TEXT1}}>
              {detailedBussiness?.website ??
                detailedBussiness?.fetchExistingPoliticalBusiness?.web ??
                '--'}
            </Text>
          </View>
          <View style={styles.detailedCard}>
            <Entypo name="location-pin" size={24} color={Colors.PRIMARY} />
            <Text
              style={{
                fontSize: 15,
                color: Colors.TEXT1,
                width: Sizes.wp('60%'),
              }}>
              {detailedBussiness?.address?.address ??
                detailedBussiness?.fetchExistingPoliticalBusiness
                  ?.legislativeAssembly ??
                '--'}{' '}
              {detailedBussiness?.address?.dist ??
                detailedBussiness?.fetchExistingPoliticalBusiness?.district ??
                '--'}{' '}
              {detailedBussiness?.address?.state ??
                detailedBussiness?.fetchExistingPoliticalBusiness?.state ??
                '--'}{' '}
              {detailedBussiness?.address?.pinCode ??
                detailedBussiness?.fetchExistingPoliticalBusiness?.pinCode ??
                ' '}
            </Text>
          </View>
        </View>
        <Divider style={{borderColor: Colors.TEXT1, height: 1}} />

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignSelf: 'center',
            padding: 10,
          }}>
          <CustomButton
            title={'View'}
            onPress={() => {
              hideModal();
              handleDelailedView();
            }}
            titleColor="black"
            width="35%"
            customStyle={{
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: '#404040',
              padding: 10,
              borderRadius: 10,
            }}
          />
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
        </View>
      </Modal>
    </>
  );
};

export default ViewBussinessModal;

const styles = StyleSheet.create({
  container: {
    maxHeight: Sizes.hp('60%'),
    minWidth: Sizes.wp('90%'),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  image: {
    height: 100,
    width: 100,
    position: 'absolute',
    borderRadius: 100,
    top: -50,
    left: 20,
  },
  detailedCard: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
});
