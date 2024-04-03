import { ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../constants/images';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';


const NoInternet = ({setIsConnected}) => {
  return (
    <View style={styles.root}>
      <View style={{flex: 1 , marginTop: Sizes.hp('30%')}}>
        <ImageBackground
          source={images.error}
          style={styles.image}/>
        <Text
          style={
            styles.errorText
          }>{`Sorry looks like you have no internet connection`}</Text>
      </View>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  errorText: {
    flex: 1,
    color: Colors.TEXT1,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
  },
});
