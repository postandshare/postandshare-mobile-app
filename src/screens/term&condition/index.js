import {Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import NavigationScreenName from '../../constants/NavigationScreenName';
import { ScrollView } from 'react-native-gesture-handler';


const TermAndCondtion = () => {
  return (
    <>
      <TopHeader
        titile={'Term & Condition'}
        path={NavigationScreenName.BOTOOM_TAB_NAVIGATOR}
      />
      {/* stack wala dekh lena bcz abhi back hard button history ke hisab se back le rha hai lein goback se jahan ka path set kroge wahan jayega so check out history configuration along with hard press intergration in the topheader components */}

      <ScrollView
        contentContainerStyle={styles.root}
      >


      <View style={styles.container}>
        {/* something */}
        <View style={styles.sub_container}>
          <Text style={styles.textTitle}>Lorem Ipsum</Text>
          {/* subtitle */}
          <Text style={styles.text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum
          </Text>
        </View>

        <View style={styles.sub_container}>
          <Text style={styles.textTitle}>Lorem Ipsum</Text>
          {/* subtitle */}
          <Text style={styles.text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum There
            are many variations of passages of Lorem Ipsum available, but the
            majority have suffered alteration in some form, by injected humour,
            or randomised words which don't look even slightly believable. If
            you are going to use a passage of Lorem Ipsum
          </Text>
        </View>

        {/* blue box for special condtion */}
        <View style={styles.specail_subcontainer}>
          <Text style={styles.text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration.
          </Text>
        </View>
      </View>




      <View style={styles.container}>
        {/* something */}
        <View style={styles.sub_container}>
          <Text style={styles.textTitle}>Lorem Ipsum</Text>
          {/* subtitle */}
          <Text style={styles.text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum
          </Text>
        </View>

        <View style={styles.sub_container}>
          <Text style={styles.textTitle}>Lorem Ipsum</Text>
          {/* subtitle */}
          <Text style={styles.text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum There
            are many variations of passages of Lorem Ipsum available, but the
            majority have suffered alteration in some form, by injected humour,
            or randomised words which don't look even slightly believable. If
            you are going to use a passage of Lorem Ipsum
          </Text>
        </View>

        {/* blue box for special condtion */}
        <View style={styles.specail_subcontainer}>
          <Text style={styles.text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration.
          </Text>
        </View>
      </View>


      </ScrollView>
    </>
  );
};

export default TermAndCondtion;
