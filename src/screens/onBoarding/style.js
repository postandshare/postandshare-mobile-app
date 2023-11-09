import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';



const styles = StyleSheet.create({
  // splash style
  root: {
    width: Sizes.width,
    height: '100%',
    resizeMode: 'stretch',
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Sizes.wp('90%'),
    resizeMode: 'contain',
  },
  //   onboarding style
  onboarding_root: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    position: 'relative',
    width: Sizes.width,
  },

  paginatorContainer: {
    position: 'absolute',
    bottom: Sizes.hp('8%'),
    paddingHorizontal: Sizes.wp('5%'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  buttonContainer: {
    marginTop: Sizes.hp('4%'),
  },
  skip_button: {
   // color: Colors.TEXT1,
    fontSize: scale(15),
    fontWeight: '400',
    letterSpacing: 0.7,
  },
  onboarding_relative_upper: {
    flex: 1,
  },
  onboarding_relative_bottom: {
    backgroundColor: '#fff',
    flex: 1,

    borderTopLeftRadius: Sizes.wp('10%'),
    borderTopRightRadius: Sizes.wp('10%'),
  },
  onboarding_flatlist_root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    zIndex: 2,
  },
  onboarding_flatlist_wrap: {
    width: Sizes.width,
  },
  onboarding_flatlist_upper_card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboarding_flatlist_upper_card_img: {
    height: Sizes.hp('45%'),
    resizeMode: 'contain',
    width: Sizes.wp('90%'),
  },
  onboarding_flatlist_lower_card: {
    flex: 1,
    alignItems: 'center',
  },
  onboarding_flatlist_lower_card_wrap: {
    paddingTop: Sizes.hp('5%'),
  },
  onboarding_flatlist_lower_card_title: {
    color: Colors.TEXT1,
    fontSize: scale(22),
    fontWeight: '700',
    textAlign: 'center',
  },
  onboarding_flatlist_lower_card_text: {
    color: Colors.TEXT1,
    fontSize: scale(15),
    lineHeight: scale(22),
    fontWeight: '400',
    opacity: 0.75,
    textAlign: 'center',
    marginTop: Sizes.hp('3%'),
    marginHorizontal: Sizes.wp('10%'),
  },
});
export default styles;
