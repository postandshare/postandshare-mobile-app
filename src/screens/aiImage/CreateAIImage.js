import {Image, StyleSheet, TextInput, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import Sizes from '../../constants/Sizes';
import {Button} from 'react-native-paper';
import {dalleImageGenerator} from '../../services/thirdParty';
import Loader from '../../components/Loader';
import NavigationScreenName from '../../constants/NavigationScreenName';

const CreateAIImage = ({navigation}) => {
  const [state, setState] = useState({
    value: '',
    image: '',
    loading: false,
  });
  const handlePressGenerateImage = async () => {
    setState(prev => ({...prev, loading: true}));
    try {
      const res = await dalleImageGenerator({
        text: state.value,
        width: 375,
        height: 375,
      });
      console.log(res?.data, 'in data');
      setState(prev => ({...prev, image: res?.data?.generated_image}));
    } catch (error) {
      console.log(error?.response, 'in eror');
      ToastAndroid.show('Something Wrong', ToastAndroid.SHORT);
    }
    setState(prev => ({...prev, loading: false}));
  };
  const handleNext = () => {
    navigation.navigate(NavigationScreenName.ADD_NAVIGATOR, {
      pic: state.image,
    });
  };
  const handleRemove = () => {
    setState(prev => ({...prev, image: ''}));
  };
  return (
    <>
      <Loader open={state.loading} text="Generating image" />

      <View style={styles.container}>
        <TopHeader titile={'Create Image With AI'} />
        <View style={styles.wrapper}>
          {/* showing image section */}
          {state.image && (
            <View style={styles.image_wrapper}>
              <Image source={{uri: state.image}} style={styles.image} />
              <View style={styles.next_buttton}>
                <Button
                  onPress={handleNext}
                  mode="contained"
                  style={styles.button}>
                  Use This Image
                </Button>
                <Button
                  onPress={handleRemove}
                  mode="outlined"
                  style={styles.button}>
                  Remove
                </Button>
              </View>
            </View>
          )}
          {/* input text section */}
          <View>
            <TextInput
              style={styles.input}
              placeholder="Write Something About Your Image to Generate"
              numberOfLines={5}
              textAlignVertical="top"
              value={state.value}
              onChangeText={text => setState(prev => ({...prev, value: text}))}
            />
            <View style={styles.button_wrapper}>
              <Button
                onPress={handlePressGenerateImage}
                mode="contained"
                style={styles.button}
                disabled={state.value ? false : true}>
                Generate
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateAIImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    padding: Sizes.wp('5%'),
  },
  image_wrapper: {
    alignItems: 'center',
  },
  image: {
    height: 375,
    width: 375,
    resizeMode: 'cover',
  },
  next_buttton: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#900',
    fontSize: 16,
    borderRadius: 5,
  },
  button_wrapper: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: Sizes.wp('40%'),
  },
});
