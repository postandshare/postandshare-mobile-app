import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  notificationCardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
    marginVertical: 5,
    borderWidth: 0.6,
    borderColor: '#0C0D3130',
    width: '90%',
    alignSelf: 'center',
  },
  notificationCardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
    backgroundColor: Colors.PRIMARY,
  },
  notificationContentContainer: {
    flex: 1,
  },
  notificationCardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  notificationCardSubtitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
  },
});

export default styles;
