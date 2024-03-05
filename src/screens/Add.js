import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DragDrop from '../components/DragDrop';
import DashboardTopHeader from '../components/DashboardTopHeader';

const Add = ({navigation}) => {
  const [dropInThePit, setDropInThePit] = React.useState(false);
  const drag = (x, y) => {
    console.log('Dragging', x, y);
  };
  const drop = (x, y) => {
    if (y > Dimensions.get('screen').height - 150) {
      console.log('Drop in the pit');
    }
    console.log('Dropping', x, y);
  };

  const onPressMenu = () => {
    navigation.getParent('leftDrawer').openDrawer();
  };

  const onPressNotification = () => {
    // navigation.navigate('Notification');
  };

  const onPresProfile = () => {
    navigation.getParent('rightDrawer').openDrawer();
  };
  return (
    <>
      <DashboardTopHeader
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
        onPresProfile={onPresProfile}
      />
      <SafeAreaView style={styles.screen}>
        <DragDrop onDrag={drag} onDrop={drop}>
          <View style={styles.balls} />
        </DragDrop>
        <DragDrop onDrag={drag} onDrop={drop}>
          <Text>Hi I am Alok Rawat</Text>
        </DragDrop>
        <View style={styles.pit}>
          <Text style={styles.text}>pit</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Add;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pit: {
    zIndex: 1,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'black',
  },
  balls: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
