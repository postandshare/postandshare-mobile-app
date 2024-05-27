import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../components/TopHeader';
import StarRating from 'react-native-star-rating';
import {Button, TextInput} from 'react-native-paper';
import Colors from '../constants/Colors';
import images from '../constants/images';
import globalStyles from '../styles/globalStyles';
import Sizes from '../constants/Sizes';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getRatingBySelf,
  upsertRatingBySelf,
} from '../services/userServices/profile.services';

const FeedBack = ({navigation}) => {
  const [onPressRating, setOnPressRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedFeatureFeedback, setSelectedFeatureFeedback] =
    useState('Features');

  const {
    data: getRatingBySelf_data,
    isLoading: getRatingBySelfLoading,
    isFetching: getRatingBySelfFetching,
    refetch: getRatingBySelf_refetch,
  } = useQuery({
    queryKey: ['getRatingBySelf'],
    queryFn: () => getRatingBySelf(),
    onSuccess: ({data}) => {},
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: false,
  });

  const {
    mutate: upsertRatingBySelfMutate,
    isLoading: upsertRatingBySelfLoading,
  } = useMutation(upsertRatingBySelf, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      Alert.alert('Thank you for your feedback', '', [
        {
          text: 'OK',
          onPress: () => {
            setOnPressRating(0);
            setFeedback('');
            setSelectedFeatureFeedback('Features');
            navigation.goBack();
          },
        },
      ]);
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: false,
  });

  const handleRatingSubmitted = () => {
    if (!feedback.trim()) {
      alert('Please write feedback');
      return;
    }
    if (!onPressRating) {
      alert('Please give rating');
      return;
    }

    console.log('rating', onPressRating, 'feedback', feedback);
    upsertRatingBySelfMutate({
      ratingCategory: selectedFeatureFeedback,
      ratings: String(onPressRating),
      description: feedback,
    });
  };
  return (
    <>
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader titile="Rate Us" />
        <View style={styles.root}>
          {/* box for putting rating */}
          <Text
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: Colors.TEXT1,
            }}>
            Are You Satisfied With Our Service?
          </Text>
          <View style={styles.box_rate}>
            <View style={styles.rate_container}>
              <StarRating
                style={{}}
                disabled={false}
                maxStars={5}
                rating={onPressRating}
                selectedStar={rating => setOnPressRating(rating)}
                fullStarColor={'#FFA031'}
                starSize={30}
                starStyle={{marginRight: 7}}
              />
            </View>
          </View>
          {/* container for typing */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              color: Colors.TEXT1,
            }}>
            Tell us about your experience
          </Text>
          <View
            style={{
              margin: 10,
              borderRadius: 10,
              elevation: 5,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                flexWrap: 'wrap',
              }}>
              {['Features', 'SDK EDIT', 'FRAME', 'TEMPLATE'].map(
                (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        {
                          borderRadius: 5,
                          borderWidth: 0.7,
                          elevation: 5,
                          backgroundColor: '#fff',
                          borderColor: Colors.borderColor,
                        },
                        selectedFeatureFeedback === item && {
                          backgroundColor: Colors.PRIMARY,
                          borderColor: Colors.PRIMARY,
                        },
                      ]}
                      onPress={() => setSelectedFeatureFeedback(item)}>
                      <Text
                        style={[
                          {
                            fontSize: 15,
                            padding: 5,
                            fontWeight: '400',
                            color: Colors.TEXT1,
                          },
                          selectedFeatureFeedback === item && {
                            color: Colors.white,
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
            <TextInput
              style={{
                height: 100,
                width: '100%',
                backgroundColor: '#fff',
              }}
              label="Feedback"
              placeholder="Write your feedback here..."
              multiline
              mode="outlined"
              numberOfLines={4}
              onChangeText={text => setFeedback(text)}
              value={feedback}
            />
          </View>

          {/* button for submit*/}
          <View style={{alignItems: 'center'}}>
            <Button
              mode="contained"
              onPress={handleRatingSubmitted}
              style={{
                backgroundColor: Colors.PRIMARY,
                width: '90%',
                padding: 10,
                borderRadius: 10,
                margin: 10,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: '500', alignSelf: 'center'}}>
                Submit
              </Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.transparent,
    padding: 10,
  },
  rate_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  rate_star: {
    marginRight: 5,
  },
  box_rate: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    width: Sizes.wp('90%'),
    alignSelf: 'center',
  },
});
