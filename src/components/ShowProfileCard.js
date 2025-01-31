import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import images from '../constants/images';
import {Text} from 'react-native-paper';
const ShowProfileCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.root_container} onPress={onPress}>
      <View style={styles.top_card_wrap}>
        <View
          style={[
            styles.top_card,
            {
              backgroundColor:
                item?.categoryGroup === 'business'
                  ? Colors.PRIMARY
                  : item?.categoryGroup === 'politics'
                  ? '#9AA6B2'
                  : '#72BF78',
            },
          ]}>
          <Text style={[styles.top_card_text]}>
            {item?.categoryGroup === 'business'
              ? 'Business Profile'
              : item?.categoryGroup === 'politics'
              ? 'Political Profile'
              : 'Personal Profile'}
          </Text>
        </View>
      </View>
      {/* profile image */}
      <View style={styles.profile_container}>
        {item?.logo ? (
          <Image
            source={item?.logo ? {uri: item?.logo} : images?.profilePlaceholder}
            style={{
              height: Sizes.hp('8%'),
              width: Sizes.hp('8%'),
              borderRadius: Sizes.hp('8%') / 2,
            }}
          />
        ) : (
          <FontAwesome
            style={{color: Colors.PRIMARY}}
            name={'user-circle'}
            size={Sizes.hp('8%')}
          />
        )}
      </View>

      <View style={styles.name_container}>
        <Text style={styles.bussinessName}>{item?.name}</Text>
        {item?.description && (
          <Text style={styles.bussinessdescription}>{item?.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ShowProfileCard;

const styles = StyleSheet.create({
  root_container: {
    position: 'relative',
    width: Sizes.wp('95%'),
    minHeight: Sizes.hp('10%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3D398945',
    backgroundColor: Colors.white,
    marginVertical: 5,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  top_card_wrap: {
    position: 'absolute',
    top: -15,
    right: 0,
    left: 0,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  top_card: {
    paddingHorizontal: 3,
    minWidth: 140,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  top_card_text: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#fff',
  },
  name_container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bussinessName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.PRIMARY,
    textAlign: 'justify',
    marginVertical: 3,
  },
  bussinessdescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'justify',
  },
  est_date: {
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
