import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

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
});

export default styles;
