import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
  },
  container: {
    // flex: 1,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    margin: 10,
  },
  premium_Buttton: {
    backgroundColor: Colors.yellow,
    marginBottom: 10,
  },


  // moti container styles
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  padded: {
    padding: 16,
  },
});

export default styles;
