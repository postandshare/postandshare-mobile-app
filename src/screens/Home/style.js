import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f5f5f5',
    minHeight: Sizes.hp('86%'),
  },
  box_card_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.wp('2%'),
    marginVertical: Sizes.hp('5%'),
  },
  box: {
    height: Sizes.hp('12%'),
    width: Sizes.wp('25%'),
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  box_image: {
    height: Sizes.hp('10%'),
    width: Sizes.wp('10%'),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  box_tittle: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  box_root: {
    marginVertical: 5,
    justifyContent: 'center',
    height: Sizes.hp('12%'),
    width: Sizes.wp('25%'),
  },
  navigation_box: {
    width: Sizes.wp('94%'),
    height: Sizes.hp('8%'),
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#3D398915',
    borderColor: '#3D398930',
  },
  navigation_box_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TEXT1,
    marginLeft: Sizes.wp('5%'),
  },
  birthday_icon: {
    height: Sizes.hp('5%'),
    width: Sizes.wp('10%'),
    marginLeft: Sizes.wp('2%'),
  },
  navigation_box_content: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  uploadpic_container: {
    height: Sizes.hp('20%'),
    width: Sizes.wp('94%'),
    alignSelf: 'center',
    marginVertical: 10,
  },
  uploadpic_container_headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  uploadpic_container_viewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    fontStyle: 'italic',
  },
  uploadpic_container_image_view: {
    height: Sizes.hp('15%'),
    width: Sizes.wp('30%'),
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D398930',
    justifyContent: 'center',
    marginVertical: 5,
  },
  uploadpic_container_image: {
    height: Sizes.hp('15%'),
    width: Sizes.wp('30%'),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  uploadpic_container_dateview: {
    height: Sizes.hp('3%'),
    width: Sizes.wp('15%'),
    backgroundColor: Colors.PRIMARY,
     zIndex: 1,
    position: 'absolute',
    top: 12,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  uploadpic_container_date: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.white,
    textAlign: 'center',
  },
});

export default styles;
