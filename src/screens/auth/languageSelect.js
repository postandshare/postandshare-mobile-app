/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import authStyle from './authStyle';
import Colors from '../../constants/Colors';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteRegionalLanguage,
  getSelectedRegionalLanguages,
  upsertRegionalLanguage,
} from '../../services/userServices/profile.services';
import {useFocusEffect} from '@react-navigation/native';
import {getRegionalLanguages} from '../../services/userServices/monitoring.services';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {useSelector} from 'react-redux';
import TopHeader from '../../components/TopHeader';
import {Checkbox} from 'react-native-paper';
import Sizes from '../../constants/Sizes';

const LanguageSelection = ({navigation}) => {
  const {isProfileUpdated} = useSelector(store => store.commonStore);
  const [selectReginalLan, setRiginalLan] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    isLoading: getSelectedRegionalLanguagesLoading,
    isFetching: getSelectedRegionalLanguagesFetching,
    refetch: getSelectedRegionalLanguagesRefetch,
    data: getSelectedRegionalLanguages_Data,
    isError: getSelectedRegionalLanguages_isError,
  } = useQuery({
    queryKey: ['getSelectedRegionalLanguages'],
    queryFn: () => getSelectedRegionalLanguages(),
    onSuccess: async success => {
      const selectedLanguages = [];
      await success?.data?.list?.map(item => {
        selectedLanguages.push(item?.languageDocId);
      });
      setRiginalLan(selectedLanguages);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });
  const {
    isLoading: getRegionalLanguagesLoading,
    isFetching: getRegionalLanguagesFetching,
    refetch: getRegionalLanguagesRefetch,
    data: getRegionalLanguages_Data,
    isError: getRegionalLanguages_isError,
  } = useQuery({
    queryKey: ['getRegionalLanguages'],
    queryFn: () => getRegionalLanguages(),
    onSuccess: success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    mutate: upsertRegionalLanguageMuatate,
    isLoading: upsertRegionalLanguageLoading,
  } = useMutation(upsertRegionalLanguage, {
    onSuccess: success => {
      console.log(success?.data, 'success');
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });
  const {
    mutate: deleteRegionalLanguageMuatate,
    isLoading: deleteRegionalLanguageLoading,
  } = useMutation(deleteRegionalLanguage, {
    onSuccess: success => {
      console.log(success?.data, 'success');
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });

  useFocusEffect(
    useCallback(() => {
      getRegionalLanguagesRefetch();
      getSelectedRegionalLanguagesRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      {/* upper card */}
      {/* <ImageBackground source={Images.loginTop} style={authStyle.upperImage}>
        <View style={authStyle.topImgSec}>
          <Image source={Images.otp_icon} style={authStyle.otp_icon_img} />
        </View>
        <Text style={authStyle.welcomeText}>Select Language</Text>
        <Text style={authStyle.otp_send_text}>
          Select your preferred language
        </Text>
      </ImageBackground> */}
      <TopHeader titile={'Select Language'} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          top: Sizes.hp('8%'),
        }}>
        <Text
          style={[
            authStyle.input,
            {fontSize: 15, fontWeight: '500', color: Colors.TEXT1},
          ]}>
          Post Languages:-
        </Text>
        {/* <Text
          style={[
            authStyle.input,
            {
              fontSize: 10,
              fontWeight: '300',
              color: Colors.TEXT1,
              alignSelf: 'center',
            },
          ]}>
          select atleast three
        </Text> */}
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 6,
          backgroundColor: Colors.white,
          borderColor: '#4141412F',
          width: '90%',
          alignSelf: 'center',
          top: Sizes.hp('2%'),
        }}>
        {/* flatlist for rendering the regional language */}
        <FlatList
          contentContainerStyle={{
            justifyContent: 'space-between',
            padding: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={
                getRegionalLanguagesFetching ||
                getSelectedRegionalLanguagesFetching ||
                upsertRegionalLanguageLoading ||
                deleteRegionalLanguageLoading ||
                getSelectedRegionalLanguagesLoading ||
                getRegionalLanguagesLoading ||
                loading
              }
              onRefresh={
                getSelectedRegionalLanguagesRefetch &&
                getRegionalLanguagesRefetch
              }
            />
          }
          data={getRegionalLanguages_Data?.data?.list}
          keyExtractor={item => item?._id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 1,
              }}>
              <Checkbox
                status={
                  selectReginalLan.includes(item?._id) ? 'checked' : 'unchecked'
                }
                onPress={async () => {
                  if (selectReginalLan.includes(item?._id)) {
                    setRiginalLan(
                      selectReginalLan.filter(id => id !== item?._id),
                    );
                    deleteRegionalLanguageMuatate({
                      languageDocId: item?._id,
                    });
                  } else {
                    setRiginalLan([...selectReginalLan, item?._id]);
                    upsertRegionalLanguageMuatate({
                      languageDocId: item?._id,
                    });
                  }
                }}
              />
              <Text
                style={
                  selectReginalLan.includes(item._id)
                    ? authStyle.selectedLanguage
                    : authStyle.unSelectedLanguage
                }>
                {item?.languageName}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={authStyle.bottom_content_root_Language}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: Colors.PRIMARY,
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              isProfileUpdated === false
                ? navigation.navigate('ProfileNavigator')
                : navigation.navigate(NavigationScreenName.DRWAER_NAVIGATOR);
            }, 1000);
          }}>
          <Text style={authStyle.signin_text_Language}>
            {loading ? 'Please wait...' : 'Save'}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default LanguageSelection;
