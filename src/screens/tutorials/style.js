import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';




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
});

export default styles;
