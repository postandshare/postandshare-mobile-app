import React from 'react';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';
import PhotoPost from './components/PhotoPost';

const MyPost = ({navigation}) => {
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {
    navigation.navigate(NavigationScreenName.NOTIFICATION);
  };
  return (
    <>
      <DashboardTopHeader
        title="My Post"
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
      />
      <PhotoPost navigation={navigation} />
    </>
  );
};

export default MyPost;
