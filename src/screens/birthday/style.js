import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    margin: 10,
    marginBottom: 200,
  },
  today_carousel: {
    alignSelf: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.TEXT1,
    margin: 10,
  },
  textInputField: {
    width: '95%',
    marginTop: 5,
    alignSelf: 'center',
  },
  date_container: {
    width: '95%',
    marginTop: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderColor: Colors.PRIMARY,
    justifyContent: 'space-between',
  },
  placeHolder: {
    color: Colors.TEXT1,
    fontSize: 15,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  photo_container: {
    flex: 1,
    width: Sizes.wp('95%'),
    height: Sizes.hp('20%'),
    backgroundColor: '#3D398910',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10 , 
    borderColor: 'grey',
    marginVertical: 5,
  },
  photo_button_container:{
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10 , 
    borderColor: Colors.PRIMARY,
    padding: 10,
  },
  photo_button_text:{
    color: Colors.PRIMARY,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default styles;
