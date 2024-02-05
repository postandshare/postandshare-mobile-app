import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import images from '../../constants/images';

const ProfileView = () => {
  return (
    <>
      <TopHeader titile={'Profile'} />
      <ScrollView contentContainerStyle={styles.root}>
        {/* image of the profile */}
        <View style={styles.image_wrap}>
          <Image
            source={
              // loggedInUserProfile?.obj?.profilePic
              //   ? {uri: loggedInUserProfile?.obj?.profilePic}
              //   :
              images.akSchoolIcon
            }
            style={styles.profile_pic}
          />
        </View>

        {/* name of the profile */}
        <Text style={styles.name_text}>
          {/* {loggedInUserProfile?.obj?.firstName}{' '}
          {loggedInUserProfile?.obj?.middle}{' '}
          {loggedInUserProfile?.obj?.lastName} */}
          Dr. A.K.Public Inter College
        </Text>

        {/* other details of the profile */}
        <View style={styles.other_details}>
          
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileView;
