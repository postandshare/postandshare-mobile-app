import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  image_wrap: {
    alignItems: 'center',
    marginTop: 20,
  },
  profile_pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name_text: {
    color: Colors.TEXT1,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  other_details: {
    marginTop: 20,
  },
  view_box: {
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 5,
    width: Sizes.wp('90%'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SECONDRY
  },
  view_box_title: {
    color: Colors.TEXT1,
    marginTop: 5,
  },
  view_box_value: {
    color: Colors.TEXT1,
    fontWeight: '700',
  },
});

export default styles;
