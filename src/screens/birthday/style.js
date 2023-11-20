import Colors from "../../constants/Colors";

const { StyleSheet } = require("react-native");



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
        marginBottom: 200
        
      },
      today_carousel: {
        alignSelf:'center',
      },
      title: {
        flex: 1, 
        fontSize: 15,
        fontWeight: '500',
        color: Colors.TEXT1,
        margin: 10,
      },
});


export default styles;

