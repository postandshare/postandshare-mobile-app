import React from 'react';
import {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Home from '../screens/Home';
import {Text} from 'react-native-paper';
import MyPost from '../screens/mypost';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BirthdayRemainderNavigator from '../screens/birthday';
import ProfileNavigator from '../screens/profile/index';
import Choose from '../screens/add/pages/Choose';
import Add from '../screens/Add';
import AddNavigatior from '../screens/add';

const CurvedBottomTab = ({navigation}) => {
  const tabRef = React.useRef(null);
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home-outline';
        break;
      case 'events':
        icon = 'calendar-outline';
        break;
      case 'Profile':
        icon = 'person-circle-sharp';
        break;
    }

    return (
      <View style={routeName === selectedTab ? styles.selectedIcon : null}>
        {routeName === 'MyPost' ? (
          <AntDesign
            name="picture"
            size={25}
            color={routeName === selectedTab ? Colors.PRIMARY : 'gray'}
          />
        ) : (
          <Ionicons
            name={icon}
            size={25}
            color={routeName === selectedTab ? Colors.PRIMARY : 'gray'}
          />
        )}
      </View>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
        <Text
          style={{color: routeName === selectedTab ? Colors.PRIMARY : 'gray'}}>
          {routeName}
        </Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (tabRef.current) {
          tabRef.current.setVisible(false);
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (tabRef.current) {
          tabRef.current.setVisible(true);
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <CurvedBottomBarExpo.Navigator
      ref={tabRef}
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor={Colors?.white}
      initialRouteName="Home"
      borderTopLeftRight
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
      }}
      renderCircle={({selectedTab, navigate}) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Choose')}>
            <Ionicons name={'add-circle-outline'} color="#404040" size={45} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBarExpo.Screen
        name="Home"
        position="LEFT"
        component={Home}
      />
      <CurvedBottomBarExpo.Screen
        name="MyPost"
        position="LEFT"
        component={MyPost}
      />
      <CurvedBottomBarExpo.Screen
        name="events"
        component={BirthdayRemainderNavigator}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="Profile"
        component={ProfileNavigator}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen name="Choose" component={Choose} />
    </CurvedBottomBarExpo.Navigator>
  );
};

export default CurvedBottomTab;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    elevation: 10,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
});
