import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

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
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  uploadpic_container_image_view: {
    height: Sizes.hp('5%'),
    width: '30%',
    aspectRatio: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D398930',
    justifyContent: 'center',
    margin: 15,

  },
  uploadpic_container_image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    padding: 10,
  },
});

export default styles;
