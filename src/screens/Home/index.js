/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
  const [value, setValue] = React.useState('photo');
  const [screenName, setScreenName] = useState('photo');
  const onPressMenu = () => {
    navigation.openDrawer();
    navigation.getParent('leftDrawer').openDrawer();
  };
  const onPressNotification = () => {};
  const onPresProfile = () => {
    navigation.navigate('ProfileNavigator');
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
          {/* card for the  photo and evnet and wallpaper */}
          <View style={styles.box_card_wrapper}>
            {/* box for the photos and video */}
            <View style={styles.box_root}>
              <TouchableOpacity
                style={[
                  styles.box,
                  screenName === 'photo'
                    ? {backgroundColor: '#FFB33920', borderColor: '#FFB339'}
                    : null,
                ]}
                onPress={() => setScreenName('photo')}>
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
                  screenName === 'remainder'
                    ? {backgroundColor: '#20B2FB20', borderColor: '#20B2FB'}
                    : null,
                ]}
                onPress={() => setScreenName('remainder')}>
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
                  screenName === 'wallpaper'
                    ? {backgroundColor: '#D6363520', borderColor: '#D63635'}
                    : null,
                ]}
                onPress={() => setScreenName('wallpaper')}>
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

          {screenName === 'photo' ? (
            <>
              {/* container for photo and video status */}
              <View
                style={{
                  height: Sizes.hp('6%'),
                  width: Sizes.wp('90%'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#DADADA',
                  backgroundColor: Colors.PRIMARY,
                }}>
                <TouchableOpacity
                  onPress={() => setValue('photo')}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: value === 'photo' ? Colors.white : Colors.TEXT1,
                      fontSize: 16,
                    }}>
                    Photos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setValue('video')}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: value === 'video' ? Colors.white : Colors.text1,
                      fontSize: 16,
                    }}>
                    Videos
                  </Text>
                </TouchableOpacity>
              </View>

              {value === 'photo' ? (
                <>
                  {/* carousel for the photos */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: Colors.TEXT1,
                    }}>
                    Trending
                  </Text>
                  <View style={{padding: 5}}>
                    <CustomCarousel width={'98%'} />
                  </View>

                  {/* here carousel for the add offer details whenever there is add offer docid is setup*/}
                  {/* <Text>carousel for the add offeres</Text> */}

                  {/* navigation card for birthday remainder */}
                  {/* <TouchableOpacity style={styles.navigation_box}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.navigation_box_content}>
                        <Image
                          source={Images.bell_icon}
                          style={styles.birthday_icon}
                        />
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
                  </TouchableOpacity> */}

                  {/* container for showing the uploaded photo */}
                  <View style={styles.uploadpic_container}>
                    {/* text part of the container */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.uploadpic_container_headerText}>
                        This Month
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('MonthPhoto')}>
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
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(
                              NavigationScreenName.PHOTO_NAVIGATOR,
                              {
                                initialRouteName: item,
                              },
                            )
                          }
                          style={styles.uploadpic_container_image_view}>
                          <View style={styles.uploadpic_container_dateview}>
                            <Text style={styles.uploadpic_container_date}>
                              {moment().format('MMM Do')}
                            </Text>
                          </View>
                          <Image
                            source={item?.pic}
                            style={styles.uploadpic_container_image}
                          />
                        </TouchableOpacity>
                      )}
                      keyExtractor={index => index._id}
                      extraData={uploadedImages}
                    />
                  </View>
                </>
              ) : (
                <Text
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    fontWeight: '500',
                    marginVertical: 10,
                    color: Colors.TEXT1,
                  }}>
                  This Featue will come in future release
                </Text>
              )}
            </>
          ) : screenName === 'remainder' ? (
            <Text style={styles.box_tittle}>
              This Feature is release in future release
            </Text>
          ) : screenName === 'wallpaper' ? (
            <Text style={styles.box_tittle}>
              This Feature is release in future release
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
