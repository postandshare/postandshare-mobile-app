import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import images from '../../../constants/images';
import Sizes from '../../../constants/Sizes';
import moment from 'moment';

const LabelText = ({label, value}) => {
  return (
    <View style={styles.textinputView}>
      <Text style={{color: Colors.TEXT1, fontSize: 10, fontWeight: '300'}}>
        {label}
      </Text>
      <Text style={{color: Colors.TEXT1, fontSize: 13, fontWeight: '500'}}>
        {value}
      </Text>
    </View>
  );
};

const ProfileDetails = ({data}) => {
  return (
    <View style={styles.container}>
      {/* profile image */}
      <Image
        source={
          data?.profilePic ? {uri: data?.profilePic} : images.akSchoolIcon
        }
        style={styles.profile_pic}
      />
      {/* name */}
      <Text style={styles.name_text}>
        {data?.firstName} {data?.middle} {data?.lastName}
      </Text>

      {/* name of the user */}
      <View style={styles.other_details}>
        <LabelText label={'First Name'} value={data?.firstName ?? '--'} />
        <LabelText label={'Middle Name'} value={data?.middle ?? '--'} />
        <LabelText label={'Last Name'} value={data?.lastName ?? '--'} />
      </View>
      {/* other details */}
      <View style={styles.other_details}>
        <LabelText
          label={'DOB'}
          value={data?.DOB ? moment(data?.DOB).format('LL') : '--'}
        />
        <LabelText label={'Mail Id'} value={data?.email ?? '--'} />
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('90%'),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 6,
    marginTop: 30,
    alignItems: 'center',
  },
  profile_pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'center',
    top: -30,
  },
  name_text: {
    color: Colors.PRIMARY,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -10,
  },
  textinputView: {
    flex: 1,
    marginVertical: 4,
  },
  other_details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
