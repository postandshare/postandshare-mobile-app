import {ImageBackground, View} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './style';
import NavigationScreenName from '../../constants/NavigationScreenName';
import TutorailNavCard from '../../components/TutorailNavCard';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';

const TutorialCardNavData = [
  {
    id: 1,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 2,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 3,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 4,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 5,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 6,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 7,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 8,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
  {
    id: 9,
    titile: 'How to use this app',
    path: NavigationScreenName.TUTORIAL,
  },
];

const Tutorial = () => {
  return (
    <>
      <TopHeader titile="Tutorials" />
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <ScrollView style={styles.root}>
          <View style={styles.container}>
            {TutorialCardNavData?.map((item, idx) => (
              <TutorailNavCard key={idx} item={item} />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Tutorial;
