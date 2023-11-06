import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
} from 'react-native';
import React from 'react';
import images from '../../constants/images';
import styles from './style';
import globalStyles from '../../styles/globalStyles';
import CustomTextInput from '../../components/CustomTextInput';
import {useState} from 'react';
const Login = () => {
  const [state, setState] = useState({
    name: '',
  });
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground source={images.loginTop} style={styles.upperImage}>
        <View style={styles.topImgSec} />
        <Text style={styles.welcomeText}>Welcome !</Text>
        <Text style={styles.signin_text}>Sign in to Continue</Text>
      </ImageBackground>
      <View style={styles.bottom_content_root}>
        <CustomTextInput
          label="Enter Mobile Number / Email"
          placeholder="Type email/mobile Number"
          value={state.name}
          onChangeText={text => setState(prev => ({...prev, name: text}))}
        />
      </View>
    </>
  );
};

export default Login;
