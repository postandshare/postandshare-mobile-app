import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: Sizes.width,
    justifyContent: 'space-between',
  },
  top_image_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text_wrapper: {
    paddingHorizontal: Sizes.width * 0.05,
    marginVertical: 10,
  },
  common: {
    fontSize: Sizes.width * 0.11,
  },
  easyText: {
    color: COLORS.text1,
    fontWeight: '600',
  },
  wayText: {
    color: COLORS.text2,
    fontWeight: '600',
  },
  createText: {
    color: COLORS.text1,
    fontWeight: '700',
  },
  yourText: {
    color: COLORS.text1,
    fontWeight: '600',
  },
  postText: {
    color: COLORS.text3,
    fontWeight: '600',
  },
  subtitle_text: {
    color: COLORS.text1,
    opacity: 0.7,
    letterSpacing: 0.5,
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '600',
  },
  bottomImage_root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  startButton_cont: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 160,
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton_text_wrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  startButton_text: {
    color: COLORS.text1,
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
  },
  startButton_icon: {
    color: COLORS.text1,
    fontWeight: '700',
    fontSize: 20,
    marginBottom: -5,
  },
});
export default styles;
