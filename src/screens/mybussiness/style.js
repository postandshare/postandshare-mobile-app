import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.transparent,
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
  padded: {
    padding: 16,
  },
  searchInput: {
    width: '75%',
    borderRadius: 10,
    height: 40,
    alignSelf: 'center',
    margin: 5,
  },
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortButtonContainer: {
    backgroundColor: Colors.PRIMARY,
    // padding: 7,
    height: Sizes.height * 0.04,
    width: Sizes.width * 0.2,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  sortText: {
    color: Colors.white,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;
