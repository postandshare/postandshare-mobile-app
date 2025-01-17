import {StyleSheet, View} from 'react-native';
import React from 'react';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

const IconText = ({icon, text}) => {
  return (
    <View style={styles.iconContainer}>
      <MaterialCommunityIcon name={icon} size={30} color={Colors.PRIMARY} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const SocialMediaDetails = ({data}) => {
  console.log(data, 'in data');
  return (
    <View style={styles.container}>
      <IconText
        icon={'facebook'}
        text={data?.facebookLink === '' ? '--' : data?.facebookLink}
      />
      <IconText
        icon={'twitter'}
        text={data?.twitterLink === '' ? '--' : data?.twitterLink}
      />
      <IconText
        icon={'phone'}
        text={data?.mobileNumber === '' ? '--' : data?.mobileNumber}
      />
      <IconText
        icon={'whatsapp'}
        text={data?.whatsAppNumber === '' ? '--' : data?.whatsAppNumber}
      />
    </View>
  );
};

export default SocialMediaDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('90%'),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 6,
    marginTop: 5,
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: Colors.TEXT1,
    fontSize: 16,
    fontWeight: '400',
  },
});
