import {Image, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  EditLeaderInPoliticalProfileScreen,
  EditVolunteerScreen,
  EditAddressPoliticalProfileScreen,
} from '../Index';
import {useQuery} from '@tanstack/react-query';
import {getPoliticalProfile} from '../../../services/userServices/political.services';
import {Text} from 'react-native-paper';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';
const Tab = createMaterialTopTabNavigator();
const EditPoliticalProfile = ({navigation, route}) => {
  const [state, setState] = useState({profielData: {}});
  const {isFetching: getPoliticalProfileFetching} = useQuery({
    queryKey: ['getPoliticalProfile'],
    queryFn: () =>
      getPoliticalProfile({profileDocId: route.params?.data?.profileDocId}),
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
    onSuccess: success => {
      setState(prev => ({...prev, profielData: success?.data?.obj}));
    },
    enabled: route.params?.data?.profileDocId ? true : false,
  });
  return (
    <View style={styles.root}>
      {/* party Card */}
      {state.profielData?.partyDocId && (
        <>
          <View style={[styles.white_box, styles.card_wrap]}>
            <View style={styles.party_card_wrapper}>
              {state.profielData?.partyDocId?.electionSymbol ? (
                <Image
                  source={{
                    uri: state.profielData?.partyDocId?.electionSymbol,
                  }}
                  style={styles.logo}
                />
              ) : (
                <View style={styles.logo} />
              )}
              <View>
                <Text style={styles.party_label}>Party Name</Text>
                <Text style={styles.party_text}>
                  {state.profielData?.partyDocId?.partyFullName}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: '#000',
                tabBarLabelStyle: {
                  fontWeight: '700',
                  fontSize: 15,
                },
                tabBarIndicatorStyle: {
                  borderColor: Colors.PRIMARY,
                  borderWidth: 1,
                },
              }}
              style={styles.tab_style}>
              <Tab.Screen
                name="Party"
                component={EditAddressPoliticalProfileScreen}
                initialParams={{
                  data: state.profielData,
                }}
              />
              <Tab.Screen
                name="Leader"
                component={EditLeaderInPoliticalProfileScreen}
                initialParams={{
                  data: state.profielData,
                }}
              />
              <Tab.Screen
                name="Volunteer"
                component={EditVolunteerScreen}
                initialParams={{
                  data: state.profielData,
                }}
              />
            </Tab.Navigator>
          </View>
        </>
      )}
    </View>
  );
};

export default EditPoliticalProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card_wrap: {
    marginVertical: 5,
    marginHorizontal: Sizes.wp('3%'),
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
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    opacity: 0.7,
  },
  party_text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
  },
  tab_style: {
    backgroundColor: '#fff',
    marginHorizontal: Sizes.wp('2%'),
    borderRadius: 10,
    elevation: 3,
  },
});
