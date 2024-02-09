import {Text, View } from 'react-native'
import React from 'react'
import TopHeader from '../../components/TopHeader'
import NavigationScreenName from '../../constants/NavigationScreenName'

const PhotoStatus = ({navigation , route}) => {
  const {picData} = route.params;
  console.log(picData, 'photoStatus');
  return (
   <>
    <TopHeader titile={'Photo Status'} />
    <View>
      <Text>PhotoStatus</Text>
    </View>
   </>
  )
}

export default PhotoStatus

