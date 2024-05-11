import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Modal, Portal} from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import {useQuery} from '@tanstack/react-query';
import {getAllBusinessList} from '../../../../services/userServices/bussiness.servies';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Sizes from '../../../../constants/Sizes';

const ViewBussinessModal = ({
  showBussiness,
  setShowBussiness,
  detailedBussiness,
}) => {
  const [profilePic, setprofilePic] = useState('');
  const showModal = () => {
    setShowBussiness({
      ...showBussiness,
      show: true,
    });
  };
  const hideModal = () => {
    setShowBussiness({
      ...showBussiness,
      show: false,
    });
  };
  console.log(detailedBussiness, 'detail');

  return (
    <>
      <Modal
        visible={showBussiness}
        contentContainerStyle={styles.container}
        onDismiss={hideModal}>
        <Image
          source={{uri: detailedBussiness?.fetchBusiness?.ownerPhoto}}
          style={{
            height: 60,
            width: 60,
            borderRadius: 100,
          }}
        />
      </Modal>
    </>
  );
};

export default ViewBussinessModal;

const styles = StyleSheet.create({
  container: {
    height: Sizes.hp('60%'),
    width: Sizes.wp('80%'),
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
});
