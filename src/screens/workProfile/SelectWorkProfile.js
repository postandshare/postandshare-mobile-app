import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import Colors from '../../constants/Colors';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import {Text} from 'react-native-paper';
import Sizes from '../../constants/Sizes';
import NavigationScreenName from '../../constants/NavigationScreenName';
const SelectWorkProfile = ({navigation}) => {
  const handleNavigateToBussinessProfile = () => {
    navigation.navigate(NavigationScreenName.ADD_EDIT_BUSINESS_STEP1);
  };
  const handleNavigateToPoliticalProfile = () => {
    navigation.navigate(NavigationScreenName.ADD_EDIT_POLITICAL_STEP1);
  };
  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader titile={'Create Work Profile'} />
        <View style={styles.wrappper}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleNavigateToBussinessProfile}>
            <Text style={styles.button_text}>Business Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleNavigateToPoliticalProfile}>
            <Text style={styles.button_text}>Political Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default SelectWorkProfile;
const styles = StyleSheet.create({
  wrappper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.wp('5%'),
    paddingBottom: Sizes.hp('10%'),
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 10,
    marginBottom: 15,
  },
  button_text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    margin: 5,
    color: Colors.TEXT1,
  },
});
