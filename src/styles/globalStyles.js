import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
const globalStyles = StyleSheet.create({
  modal_root: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 10,
  },
  input_label: {
    color: '#0C2F49',
    opacity: 0.75,
    fontSize: scale(15),
    fontWeight: '500',
    marginLeft: Sizes.wp('1%'),
  },
  input_box: {
    backgroundColor: '#fff',
    borderColor: 'rgba(22, 75, 146, 0.15)',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: 'rgba(61, 57, 137,0.4)',
    height: 50,
    elevation: 6,
    fontSize: scale(16),
    color: '#0C2F49',
    paddingHorizontal: Sizes.wp('5%'),
  },
  input_errorText: {
    marginLeft: Sizes.wp('1%'),
    color: 'red',
    marginTop: 2,
  },
  no_data: {
    color: 'rgba(0,0,0,0.3)',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    color: '#0C2F49',
    opacity: 0.75,
    fontSize: scale(15),
    fontWeight: '500',
    marginLeft: Sizes.wp('1%'),
  },
  // dropdown select
  dropdown_root: {
    height: Sizes.hp('30%'),
    paddingHorizontal: Sizes.wp('2%'),
    backgroundColor: 'rgba(12, 47, 73, 0.05)',
    marginTop: Sizes.hp('1%'),
    borderRadius: 5,
    paddingBottom: Sizes.hp('1%'),
  },
  dropdown_label_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown_close_icon_cont: {
    backgroundColor: 'rgba(12, 47, 73, 1)',
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown_close_icon: {
    color: '#fff',
  },
  dropdown_label: {
    color: 'rgba(12, 47, 73, 1)',
    fontWeight: '600',
    marginVertical: 5,
  },
  dropdown_item: {
    paddingVertical: Sizes.hp('1%'),
    alignItems: 'center',
    marginVertical: Sizes.hp('0.7%'),
    borderRadius: 5,
  },
  // custom text Field
  textfield_icon: {
    color: 'rgba(12, 47, 73, 0.5)',
    opacity: 0.75,
    fontSize: scale(30),
    fontWeight: '500',
  },
  textfield_input_wrap: {
    backgroundColor: '#fff',
    borderColor: 'rgba(22, 75, 146, 0.15)',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: 'rgba(61, 57, 137,0.4)',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    fontSize: scale(16),
    color: '#0C2F49',
    paddingHorizontal: Sizes.wp('5%'),
  },
  textfield_placheholder: {
    color: 'rgba(12, 47, 73, 1)',
    opacity: 0.75,
    fontSize: scale(15),
    fontWeight: '500',
  },

  textfield_errorText: {
    marginLeft: Sizes.wp('1%'),
    color: 'red',
    marginTop: 2,
  },
  error_text: {
    color: 'red',
  },


  //action sheet styles
  actionSheet_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sizes.hp('2%'),
    paddingHorizontal: Sizes.wp('5%'),
  },
  actionSheet_header_left_text: {
    color: Colors.PRIMARY,
    fontSize: scale(20),
    fontWeight: '700',
  },
  actionSheet_header_right: {
    height: 25,
    width: 25,

    borderColor: '#130F26',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSheet_header_right_text: {
    color: '#130F26',
    fontWeight: '600',
    fontSize: scale(18),
  },
  divider_studentDetails: {
    width: Sizes.wp('100%'),
    height: 2,
    background: '#FFFFFF',

    borderColor: ' rgba(22, 75, 146, 0.15)',
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    shadowColor: 'rgba(61, 57, 137, 0.05)',
  },
});
export default globalStyles;
