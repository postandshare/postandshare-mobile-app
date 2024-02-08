import React from 'react';
import TopHeader from '../../components/TopHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Colors from '../../constants/Colors';
import {scale} from 'react-native-size-matters';
import PhotoPost from './components/PhotoPost';
import VideoPost from './components/VideoPost';
import { Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const MyPost = () => {
  return (
    <>
      <TopHeader titile={'My Post'} />
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: Colors.PRIMARY,
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: Dimensions.get('window').width/2
          },

          tabBarLabelStyle: {
            color: Colors.PRIMARY,
            fontSize: scale(14),
            fontWeight: '600',
            textTransform: 'capitalize',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
          },
        }}>
        <Tab.Screen name="Photos" component={PhotoPost} initialParams={{}} />
        <Tab.Screen name="Video" component={VideoPost} />
      </Tab.Navigator>
    </>
  );
};

export default MyPost;
