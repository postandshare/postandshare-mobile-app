import {StyleSheet, View} from 'react-native';
import React from 'react';
import DashboardTopHeader from '../../../components/DashboardTopHeader';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import {Text} from 'react-native-paper';
const Choose = ({navigation}) => {
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    navigation.navigate(NavigationScreenName.NOTIFICATION);
  };
  return (
    <View style={styles.container}>
      <DashboardTopHeader
        title="Create Post"
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
      />
      <View style={styles.container}>
        <Text>Choose</Text>
      </View>
    </View>
  );
};

export default Choose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
