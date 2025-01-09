import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getGroupedLeaderDetail} from '../../../services/userServices/political.services';
import CustomButton from '../../../components/CustomButton';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ChooseLeaderForProfile = ({partyDocId, prevState, setPrevState}) => {
  console.log(partyDocId);
  const {} = useQuery({
    queryKey: ['getGroupedLeaderDetail'],
    queryFn: () => getGroupedLeaderDetail({partyDocId}),
    onSuccess: success => {
      setPrevState(prev => ({...prev, leadersList: success?.data?.list}));
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: partyDocId ? true : false,
  });
  return (
    <>
      <View style={styles.root}>
        <ScrollView>
          {prevState.leadersList?.map((item, i) => (
            <View key={i}>
              <Text style={styles.title}>{item?.leaderCategory}</Text>
              <View style={[styles.white_box, styles.leader_box_wrap]}>
                {item?.leaders?.map((res, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.image_wrap}
                    onPress={() => {
                      res.checked = !res?.checked;
                      setPrevState(prev => ({
                        ...prev,
                        leaderChange: !prev?.leaderChange,
                      }));
                    }}>
                    <Image
                      source={{uri: res?.leaderPhoto}}
                      style={[
                        styles.leader_image,
                        res?.checked ? styles.checked_img : null,
                      ]}
                    />
                    {res?.checked && (
                      <View style={styles.ok_circle}>
                        <AntDesign
                          name="checkcircle"
                          style={styles.circle_icon}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.submit_button}>
        <CustomButton
          title={'Confirm'}
          onPress={() =>
            setPrevState(prev => ({...prev, showChooseLeader: false}))
          }
        />
      </View>
    </>
  );
};

export default ChooseLeaderForProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: Sizes.wp('5%'),
    paddingBottom: Sizes.hp('10%'),
    paddingTop: 10,
  },
  submit_button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },

  title: {
    fontSize: 17,
    marginVertical: 7,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  white_box: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
  },
  leader_box_wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  image_wrap: {
    position: 'relative',
  },
  leader_image: {
    height: Sizes.wp('26%'),
    width: Sizes.wp('26%'),
    resizeMode: 'cover',
    borderRadius: 5,
  },
  ok_circle: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle_icon: {
    color: Colors.PRIMARY,
    fontSize: 40,
  },
  checked_img: {
    opacity: 0.5,
  },
});
