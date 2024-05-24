import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    margin: 5,
  },
  imageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default styles;
