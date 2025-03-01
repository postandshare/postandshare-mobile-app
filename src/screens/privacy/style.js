import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.transparent,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    margin: 10,
  },
  sub_container: {
    flex: 1,
  },
  textTitle: {
    color: Colors.TEXT1,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    padding: 5,
  },
  text: {
    color: Colors.TEXT1,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'justify',
  },
  specail_subcontainer: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('96%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#BBE3F1',
    backgroundColor: '#F0FBFF',
    padding: 6,
    marginVertical: 5,
  },
  boxContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderColor: Colors.borderColor,
  },
});

export default styles;
