import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.transparent,
  },
  chooseImageContainer: {
    height: 375,
    width: 375,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  additionalDetailsContainer: {
    marginVertical: 0,
    alignItems: 'center',
  },
  additionalDetails: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    margin: 10,
  },
  additionalDetailsText: {
    fontWeight: 'bold',
  },
  frameContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  frame: {
    height: 60,
    width: 70,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  frame1: {
    height: 50,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    margin: 10,
  },
  frameText: {
    fontSize: 10,
    color: Colors.TEXT1,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.SECONDRY,
    margin: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  scroller: {},
  item_content: {
    marginVertical: 10,
    alignItems: 'center',
    fontSize: 18,
  },
});

export default styles;
