import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Images from '../../constants/images';
import authStyle from './authStyle';
import Colors from '../../constants/Colors';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSelectedRegionalLanguages, upsertRegionalLanguage } from '../../services/userServices/profile.services';
import { useFocusEffect } from '@react-navigation/native';

const ReginalLanguage = [
  {
    _id: 1,
    name: 'English',
    language: 'en',
  },
  {
    _id: 2,
    name: 'Hindi',
    language: 'hi',
  },
  {
    _id: 3,
    name: 'Marathi',
    language: 'mr',
  },
  {
    _id: 4,
    name: 'Gujarati',
    language: 'gu',
  },
  {
    _id: 5,
    name: 'Tamil',
    language: 'ta',
  },
  {
    _id: 6,
    name: 'Telugu',
    language: 'te',
  },
  {
    _id: 7,
    name: 'Kannada',
    language: 'kn',
  },
  {
    _id: 8,
    name: 'Malayalam',
    language: 'ml',
  },
  {
    _id: 9,
    name: 'Bengali',
    language: 'bn',
  },
  {
    _id: 10,
    name: 'Punjabi',
    language: 'pa',
  },
  {
    _id: 11,
    name: 'Odia',
    language: 'or',
  },
];

const LanguageSelection = ({navigation, route}) => {
  const [loginStateData, setLoginStateData] = useState(route?.params?.loginStateData);
  console.log(loginStateData, 'loginStateData');
  const [selectReginalLan, setRiginalLan] = useState('en');
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
    onSuccess: success => {
      console.log(success?.data , "success");
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {mutate: upsertRegionalLanguageMuatate, isLoading: upsertRegionalLanguageLoading} =
    useMutation(upsertRegionalLanguage, {
      onSuccess: async success => {
       
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });


  useFocusEffect(
    useCallback(() => {
      getSelectedRegionalLanguagesRefetch();
    }
  , []));



  return (
    <>
      {/* upper card */}
      <ImageBackground source={Images.loginTop} style={authStyle.upperImage}>
        <View style={authStyle.topImgSec}>
          <Image source={Images.otp_icon} style={authStyle.otp_icon_img} />
        </View>
        <Text style={authStyle.welcomeText}>Select Language</Text>
        <Text style={authStyle.otp_send_text}>
          Select your preferred language
        </Text>
      </ImageBackground>

      {/* flatlist for rendering the regional language */}
      <FlatList
        numColumns={2}
        contentContainerStyle={{justifyContent: 'space-between', marginHorizontal: 10}}
    
        data={ReginalLanguage}
        keyExtractor={(item) => item?._id}
        ListHeaderComponent={
          <View style={authStyle.middleContainer}>
            <Text style={[authStyle.input, {fontSize: 20, fontWeight: '500'}]}>
              Regional Language:-
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setRiginalLan(item?.language)}
            style={{flex: 1}}>
            <Text
              style={
                selectReginalLan === item?.language
                  ? authStyle.selectedLanguage
                  : authStyle.unSelectedLanguage
              }>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={authStyle.bottom_content_root}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? Colors.PRIMARY
                    : Colors.SECONDRY,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                },
                
              ]}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  // navigation.navigate('Login');
                }, 1000);
              }}>
              <Text style={authStyle.signin_text}>
                {loading ? 'Please wait...' : 'Continue'}
              </Text>
            </Pressable>
          </View>
        }
      />
    </>
  );
};

export default LanguageSelection;
