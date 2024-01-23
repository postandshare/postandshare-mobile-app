import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './style';
import DashboardTopHeader from '../../components/DashboardTopHeader';
import Images, {uploadedImages} from '../../constants/images';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import NavigationScreenName from '../../constants/NavigationScreenName';
import CustomCarousel from '../../components/CustomCarousel';

const Home = ({navigation}) => {
  const onPressMenu = () => {
    // navigation.openDrawer();
    //navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {};
  const onPresProfile = () => {
    //navigation.getParent('rightDrawer').openDrawer();
  };
  return (
    <>
      <DashboardTopHeader
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
        onPresProfile={onPresProfile}
      />
      <ScrollView nestedScrollEnabled>
        <View style={styles.root}>
          {/* carousel for the photos */}
          <View style={{ marginVertical: 10, padding: 5 }}>
            <CustomCarousel width={'98%'}/>
          </View>
         
          {/* card for the  photo and evnet and wallpaper */}
          <View style={styles.box_card_wrapper}>
            {/* box for the photos and video */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  {backgroundColor: '#FFB33920', borderColor: '#FFB339'},
                ]}
                onPress={() => navigation.navigate(NavigationScreenName.PHOTOS_STATUS)}
              >
                <Image
                  source={Images.photo_video_icon}
                  style={styles.box_image}
                />
              </TouchableOpacity>
              <View style={{height: Sizes.hp('4%')}}>
                <Text style={styles.box_tittle}>Photos and Status</Text>
              </View>
            </View>

            {/* box for the remainder */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  {backgroundColor: '#20B2FB20', borderColor: '#20B2FB'},
                ]}
                onPress={() => navigation.navigate(NavigationScreenName.EVENTS)}
              >
                <Image
                  source={Images.remainder_icon}
                  style={styles.box_image}
                />
              </TouchableOpacity>
              <View style={{height: Sizes.hp('4%')}}>
                <Text style={styles.box_tittle}>Events Reminder</Text>
              </View>
            </View>

            {/* box for the wallpaper */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  {backgroundColor: '#D6363520', borderColor: '#D63635'},
                ]}
                onPress={() => navigation.navigate(NavigationScreenName.WALLPAPER)}
              >
                <Image
                  source={Images.wallpaper_icon}
                  style={styles.box_image}
                />
              </TouchableOpacity>
              <View style={{height: Sizes.hp('4%')}}>
                <Text style={styles.box_tittle}>Wallpaper</Text>
              </View>
            </View>
          </View>

          {/* here carousel for the add offer details whenever there is add offer docid is setup*/}
          {/* <Text>carousel for the add offeres</Text> */}

          {/* navigation card for birthday remainder */}
          <TouchableOpacity style={styles.navigation_box}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.navigation_box_content}>
                <Image source={Images.bell_icon} style={styles.birthday_icon} />
                <Text style={styles.navigation_box_text}>
                  Birthday Remainder
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <AntDesign
                  name="right"
                  size={20}
                  color={Colors.TEXT1}
                  style={{marginRight: 5}}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* container for showing the uploaded photo */}
          <View style={styles.uploadpic_container}>
            {/* text part of the container */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.uploadpic_container_headerText}>
                This Month
              </Text>
              <TouchableOpacity>
                <Text style={styles.uploadpic_container_viewText}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {/* flatlist for rendering the photos */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={uploadedImages}
              renderItem={({item}) => (
                <View style={styles.uploadpic_container_image_view}>
                  <View style={styles.uploadpic_container_dateview}>
                    <Text style={styles.uploadpic_container_date}>{moment().format("MMM Do")}</Text>
                  </View>
                  <Image
                    source={item?.pic}
                    style={styles.uploadpic_container_image}
                  />
                </View>
              )}
              keyExtractor={index => index._id}
              extraData={uploadedImages}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
