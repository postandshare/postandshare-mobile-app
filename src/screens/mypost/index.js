import {View, Text} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';

const MyPost = () => {
  return (
    <>
      <TopHeader titile={'My Post'} />
      <View>
        <Text>My Post</Text>
      </View>
    </>
  );
};

export default MyPost;
