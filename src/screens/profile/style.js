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
    resizeMode: 'center',
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
    padding: 10,
    marginVertical: 5,
    width: Sizes.wp('90%'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.SECONDRY
  },
  view_box_title: {
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  view_box_value: {
    color: Colors.SECONDRY,
    fontWeight: '700',
  },
  textinputView: {
    width: '95%',
    backgroundColor: '#f5f5f5',
    // elevation: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
  },
  customInput: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  button: {
    width: '100%',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
  margin: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'white',
    elevation: 5,
  },


  // moti container styles
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;
