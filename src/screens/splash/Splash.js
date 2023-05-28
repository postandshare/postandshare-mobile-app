import {Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
