import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Images from '../../constants/images';
import authStyle from './authStyle';

const ReginalLanguage = [
  'English',
  'हिंदी',
  'ગુજરાતી',
  'ਪੰਜਾਬੀ',
  'বাঙালি',
  'नेपाली',
  'मैथिली',
  'भोजपुरी',
  'अवधी',
  'अंगिका',
  'बगेली',
  'ब्रजभाषा',
  'चट्टीसगढ़ी',
  'गोंडी',
  'हरियाणवी',
  'कॉशुर',
  'कोंकणी',
  'मागही',
  'मारवाड़ी',
  'माराठी',
  'नागपुरी',
  'निमाड़ी',
  'ओड़िया',
  'पाली',
  'पंजाबी',
  'राजस्थानी',
  'साँई',
];

const AppLanguage = ['English', 'हिंदी'];

const LanguageSelection = ({navigation}) => {
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

      <ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled>
        <Pressable style={{flex: 1}}>
          <View style={authStyle.middleContainer}>
            <Text style={authStyle.input}>App Language</Text>
            {AppLanguage.map((item, index) => (
              <View style={authStyle.input} key={index}>
                <Text style={authStyle.input}>{item}</Text>
              </View>
            ))}
            <Text style={authStyle.input}>Regional Language</Text>
            <View>
              {/* flatlist for rendering the regional language */}
              <FlatList
                numColumns={2}
                contentContainerStyle={{justifyContent: 'space-between'}}
                data={ReginalLanguage}
                renderItem={({item}) => (
                  <View style={{flex: 1 , }}>
                    <Text style={authStyle.input}>{item}</Text>
                  </View>
                )}
                keyExtractor={index => index._id}
                extraData={ReginalLanguage}
              />
            </View>
          </View>
          <View style={authStyle.submitBtnContainer}>
            <TouchableOpacity
              style={authStyle.submitBtn}
              // onPress={() => handleSubmit()}
            >
              <Text style={authStyle.submitBtnTxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default LanguageSelection;
