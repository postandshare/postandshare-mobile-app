import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
  },
  chooseImageContainer: {
    height: Sizes.height * 0.4,
    width: Sizes.width * 0.9,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  additionalDetailsContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  additionalDetails: {
    height: 50,
    width: 50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    margin: 10,
  },
    additionalDetailsText: {
        color: Colors.white,
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
        backgroundColor: Colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        margin: 10,
    },
    frameText: {
        fontSize: 10,
        color: Colors.SECONDRY,
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

});

export default styles;
