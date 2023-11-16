import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, { runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import usePath from '../../hooks/usePath';
import { getPathXCenter } from '../../utils';
import SVG , {Path, Svg} from 'react-native-svg';
import { interpolatePath } from 'react-native-redash';

import AnimatedCircle from './AnimatedCircle';
import TabItem from './TabItem';


const {height, width} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}) => {
 
   const {containerPath, curvedPaths, tHeight} = usePath();
   const circleXCoordinate = useSharedValue(0);
   const progress = useSharedValue(1);
  const handleMoveCircle = (currentPath) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
   };
  const selectIcon = (routeName) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Video':
        return 'Video';
      case 'Add':
        return 'Add';
      case 'Custom':
        return 'Custom';
      default:
        return 'Home';
    }
  };


 
  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({length: curvedPaths.length}, (_, index) => index + 1),
      curvedPaths,
    );
    if (typeof containerPath === 'undefined' || typeof currentPath === 'undefined') {
      console.error('containerPath or currentPath is undefined');
    } else {
      // continue with your code
      runOnJS(handleMoveCircle)(currentPath);
     
      return {
        d: `${containerPath} ${currentPath}`,
      };
    }
  });

  const handleTabPress = (index, tab) => {
    navigation.navigate(tab);
    progress.value = withTiming(index);
  };

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={height} height={tHeight} style={styles.shadowMd}>
        <AnimatedPath fill={'white'} animatedProps={animatedProps} />
      </Svg>
      <AnimatedCircle circleX={circleXCoordinate} />
      <View
        style={[
          styles.tabItemsContainer,
          {
           height: tHeight,
          },
        ]}>
        {state?.routes?.map((route, index) => {
          const {options} = descriptors[route?.key];
          const label = options?.tabBarLabel ? options?.tabBarLabel : route.name;
          return (
            <TabItem
              key={index.toString()}
             label={label}
             icon={selectIcon(route?.name)}
              activeIndex={state?.index - 1}
              index={index}
              onTabPress={() => handleTabPress(index + 1, route.name)}
            />
          );
        })}

      </View>
    </View>
  );
};
export default CustomBottomTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  tabItemsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
  },
  shadowMd: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 3},
  },
});
