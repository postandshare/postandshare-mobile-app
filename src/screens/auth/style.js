import {StyleSheet} from 'react-native';
import Sizes from '../../constants/Sizes';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  upperImage: {
    height: Sizes.hp('35%'),
    justifyContent: 'flex-end',
    paddingHorizontal: Sizes.wp('5%'),
    paddingVertical: Sizes.hp('3%'),
  },
  topImgSec: {
    height: Sizes.hp('8%'),
    width: Sizes.hp('8%'),
    borderRadius: Sizes.hp('4%'),
    backgroundColor: '#FAFAFA',
    border: 0.8,
    borderStyle: 'solid',
    borderColor: ' rgba(11, 73, 119, 0.17)',
    marginBottom: 10,
  },
  welcomeText: {
    color: COLORS.white,
    letterSpacing: 2,
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 5,
  },
  signin_text: {
    color: COLORS.white,
    letterSpacing: 3,
    fontSize: 18,
    fontWeight: '600',
  },
  bottom_content_root: {
    paddingHorizontal: Sizes.wp('5%'),
    paddingVertical: Sizes.hp('3%'),
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
export default styles;
