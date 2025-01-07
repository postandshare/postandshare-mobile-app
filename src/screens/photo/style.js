import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.transparent,
  },
  container: {
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    margin: 10,
  },
  Image: {
    height: Sizes.hp('40%'),
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  uploadpic_container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  uploadpic_container_image_view: {
    height: 100,
    width: 100,
    aspectRatio: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3D398930',
    justifyContent: 'center',
    margin: 5,
  },
  uploadpic_container_image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 5,
    padding: 1,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: Colors.PRIMARY,
    textAlign: 'center',
    padding: 10,
  },
});

export default styles;
