import {Dimensions} from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';


const {height, width} = Dimensions.get('window');

export default {
  height,
  width,
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,
};
