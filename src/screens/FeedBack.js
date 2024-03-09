import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../components/TopHeader';
import StarRating from 'react-native-star-rating';
import {Button, TextInput} from 'react-native-paper';
import Colors from '../constants/Colors';

const FeedBack = () => {
  const [onPressRating, setOnPressRating] = useState(0);
  const [feedback, setFeedback] = useState('');

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
    // rateComplaintSolutionMutate({
    //   complaintDocId: complainId,
    //   satisfactionRating: String(onPressRating),
    //   feedbackRemarks: feedback,
    // });
  };
  return (
    <>
      <TopHeader titile="FeedBack" />
      <View style={styles.root}>
        {/* box for putting rating */}
        <View style={styles.box_rate}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: Colors.PRIMARY,
              }}>
              Rate Your Experience
            </Text>

            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: Colors.PRIMARY,
              }}>
              How was your overall experience?
            </Text>
          </View>
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
        <View style={styles.feedback_container}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: Colors.PRIMARY}}>
            Feedback
          </Text>
          <Text style={{fontSize: 15, color: Colors.PRIMARY}}>
            Please write your feedback
          </Text>
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
    </>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  rate_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  rate_star: {
    marginRight: 5,
  },
  box_rate: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  feedback_container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});
