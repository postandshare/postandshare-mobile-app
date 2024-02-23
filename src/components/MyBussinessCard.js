import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import images from '../constants/images';

const MyBussinessCard = ({
  name,
  EstblishmentDate,
  image,
  userDocId,
  lastUpdated,
  onPress,
  edit,
  onPressEdit,
  onPressForPhotoEdit,
}) => {
  return (
    <TouchableOpacity style={styles.root_container} onPress={
      onPressForPhotoEdit ?? onPress
    }>
      {/* profile image */}
      <View style={styles.profile_container}>
        {image ? (
          <Image
            source={image ? {uri: image} : images.profilePlaceholder}
            style={{
              height: Sizes.hp('8%'),
              width: Sizes.hp('8%'),
              borderRadius: Sizes.hp('8%') / 2,
            }}
          />
        ) : (
          <FontAwesome
            style={{color: '#26A9E1'}}
            name={'user-circle'}
            size={Sizes.hp('8%')}
          />
        )}
      </View>

      {/* bussiness name and est date */}
      <View style={styles.name_container}>
        <Text style={styles.bussinessName}>{name}</Text>
        <Text style={styles.est_date}>{moment(EstblishmentDate).format('LL')}</Text>
      </View>

      {/* edit button */}
      {edit ? (
        <TouchableOpacity style={styles.edit_button} onPress={onPressEdit}>
          <FontAwesome style={{color: '#26A9E1'}} name={'edit'} size={25} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default MyBussinessCard;

const styles = StyleSheet.create({
  root_container: {
    flex: 1,
    width: Sizes.wp('95%'),
    maxHeight: Sizes.hp('10%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3D398945',
    backgroundColor: '#9CDEFB60',
    marginVertical: 5,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name_container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bussinessName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.TEXT1,
    textAlign: 'justify',
    marginVertical: 5,
  },
  est_date: {
    flex: 1,
    color: Colors.TEXT1,
    fontSize: 14,
    fontWeight: '500',
  },
  edit_button: {
    flex: 0.2,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  profile_container: {
    flex: 0.3,
    alignSelf: 'center',
  },
});
