import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getPoliticalProfile,
  updateLeaderInProfile,
} from '../../../services/userServices/political.services';
import CustomButton from '../../../components/CustomButton';
import ChooseLeaderForProfile from './ChooseLeaderForProfile';
import Loader from '../../../components/Loader';
import NavigationScreenName from '../../../constants/NavigationScreenName';

const AddLeaderInProfile = ({navigation, route}) => {
  const params = route.params;
  const [state, setState] = useState({
    profileData: {},
    leadersList: [],
    selectedLeaderList: [],
    showChooseLeader: false,
    leaderChange: false,
  });
  const onSubmit = () => {
    updateLeaderInProfileMutate({
      profileDocId: params?.data?._id,
      leaderDocIds: state.selectedLeaderList?.map(item => item?._id),
    });
  };
  useQuery({
    queryKey: ['getPoliticalProfile'],
    queryFn: () => getPoliticalProfile({profileDocId: params?.data?._id}),
    onSuccess: success => {
      setState(prev => ({...prev, profileData: success?.data?.obj}));
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: params?.data?._id ? true : false,
  });
  const {
    mutate: updateLeaderInProfileMutate,
    isLoading: updateLeaderInProfileLoading,
  } = useMutation({
    mutationKey: ['updateLeaderInProfile'],
    mutationFn: updateLeaderInProfile,
    onSuccess: success => {
      navigation.navigate(NavigationScreenName.MY_BUSSINESS);
      ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  useEffect(() => {
    if (state.leadersList?.length > 0) {
      const selected = [];
      for (let res of state.leadersList) {
        for (let ld of res?.leaders) {
          if (ld?.checked) {
            selected.push(ld);
          }
        }
      }
      setState(prev => ({
        ...prev,
        selectedLeaderList: selected,
      }));
    }
  }, [state.leaderChange, state.leadersList]);

  return (
    <>
      <Loader open={updateLeaderInProfileLoading} text="Submitting..." />
      {state.showChooseLeader ? (
        <ChooseLeaderForProfile
          prevState={state}
          setPrevState={setState}
          partyDocId={state?.profileData?.partyDocId?._id}
        />
      ) : (
        <View style={styles.root}>
          {state.profileData?.partyDocId && (
            <View style={styles.white_box}>
              <View style={styles.party_card_wrapper}>
                {state?.profileData?.partyDocId?.electionSymbol ? (
                  <Image
                    source={{
                      uri: state?.profileData?.partyDocId?.electionSymbol,
                    }}
                    style={styles.logo}
                  />
                ) : (
                  <View style={styles.logo} />
                )}
                <View>
                  <Text style={styles.party_label}>Party Name</Text>
                  <Text style={styles.party_text}>
                    {state?.profileData?.partyDocId?.partyFullName}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <Text style={styles.title}>Selected Leader</Text>
          <View style={[styles.scrollview_wrap]}>
            <ScrollView
              nestedScrollEnabled
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}>
              <View style={[styles.white_box, styles.image_wrap]}>
                {state.selectedLeaderList?.map((res, i) => (
                  <View style={styles.leader_img_wrap} key={i}>
                    <View style={styles.show_count}>
                      <Text style={styles.count_text}>{i}</Text>
                    </View>
                    <Image
                      style={styles.leader_img}
                      source={{uri: res?.leaderPhoto}}
                    />
                  </View>
                ))}
              </View>
              <CustomButton
                title={'Choose Leader'}
                customStyle={{backgroundColor: '#fff', color: '#000'}}
                titleColor="#000"
                onPress={() =>
                  setState(prev => ({...prev, showChooseLeader: true}))
                }
              />
            </ScrollView>
          </View>
          <View style={styles.submit_button}>
            <CustomButton title={'Submit'} onPress={onSubmit} />
          </View>
        </View>
      )}
    </>
  );
};

export default AddLeaderInProfile;

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
  //   party card
  party_card_wrapper: {
    flexDirection: 'row',

    gap: 10,
    alignItems: 'center',
  },
  party_label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    opacity: 0.7,
  },
  party_text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
  },
  scrollview_wrap: {
    flex: 1,
  },
  leader_img_wrap: {
    position: 'relative',
  },
  leader_img: {
    height: 100,
    width: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  show_count: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.PRIMARY,
    minHeight: 10,
    minWidth: 10,
    borderRadius: 5,
  },
  count_text: {
    color: '#fff',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  image_wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    flexWrap: 'wrap',
  },
});
