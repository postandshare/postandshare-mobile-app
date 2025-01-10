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
  getLeaderListByProfile,
  updateLeaderInProfile,
} from '../../../services/userServices/political.services';
import CustomButton from '../../../components/CustomButton';
import ChooseLeaderForProfile from './ChooseLeaderForProfile';
import Loader from '../../../components/Loader';
import ShowSelectedLeaders from '../../../components/political/ShowSelectedLeaders';
import NavigationScreenName from '../../../constants/NavigationScreenName';

const EditLeaderInPoliticalProfile = ({navigation, route}) => {
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

  const {
    mutate: updateLeaderInProfileMutate,
    isLoading: updateLeaderInProfileLoading,
  } = useMutation({
    mutationKey: ['updateLeaderInProfile'],
    mutationFn: updateLeaderInProfile,
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
      navigation.replace(NavigationScreenName.WORK_PROFILE_LIST);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  useQuery({
    queryKey: ['getLeaderListByProfile'],
    queryFn: () => getLeaderListByProfile({profileDocId: params?.data?._id}),
    onSuccess: success => {
      setState(prev => ({...prev, selectedLeaderList: success?.data?.list}));
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: params?.data?._id ? true : false,
  });
  useEffect(() => {
    const selectedLeadersId = state.selectedLeaderList?.map(res => res?._id);
    if (state.leadersList?.length > 0) {
      const selected = [];
      for (let res of state.leadersList) {
        for (let ld of res?.leaders) {
          if (ld?.checked) {
            if (!selectedLeadersId.includes(ld?._id)) {
              selected.push(ld);
            }
          }
        }
      }
      setState(prev => ({
        ...prev,
        selectedLeaderList: [...selected, ...prev.selectedLeaderList],
      }));
    }
  }, [state.leaderChange]);

  return (
    <>
      <Loader open={updateLeaderInProfileLoading} text="Submitting..." />
      {state.showChooseLeader ? (
        <ChooseLeaderForProfile
          prevState={state}
          setPrevState={setState}
          partyDocId={route.params?.data?.partyDocId?._id}
        />
      ) : (
        <View style={styles.root}>
          <Text style={styles.title}>Selected Leader</Text>
          <View style={[styles.scrollview_wrap]}>
            <ScrollView
              nestedScrollEnabled
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}>
              <View style={[styles.white_box, styles.image_wrap]}>
                <ShowSelectedLeaders list={state.selectedLeaderList} />
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

export default EditLeaderInPoliticalProfile;

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
  show_count: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.PRIMARY,
    minHeight: 20,
    minWidth: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leader_img: {
    height: 100,
    width: 100,
    borderRadius: 5,
    resizeMode: 'cover',
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
