import React, {useState} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Sizes from '../../../constants/Sizes';
import {useNavigation} from '@react-navigation/native';
import {Badge, Button, Dialog, Portal, Text} from 'react-native-paper';
import {Pressable, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../constants/Colors';
import styles from '../style';

const NotificationCard = ({
  item,
  updateReadStatusMutate,
  scrollViewRef,
  deleteNotificationMutate,
}) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const TRANSLATE_X_THRESHOLD = Sizes.wp('15%');
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        Math.abs(translateX.value) > TRANSLATE_X_THRESHOLD ? 1 : 0,
      ),
    };
  });
  const ITEM_HEIGHT = 100;
  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      if (Math.abs(event.translationX) < 100 && event.translationX < 4) {
        translateX.value = event.translationX;
      }
    },
    onEnd: event => {
      if (Math.abs(event.translationX) < 90) {
        translateX.value = withTiming(0);
        opacity.value = withTiming(0);
      }
    },
  });
  const navigation = useNavigation();

  const handlePress = () => {
    const screenName = item.data?.screen;
    if (screenName) {
      navigation.navigate(screenName);
      updateReadStatusMutate({
        notificationDocId: item?._id,
        read: true,
      });
    }
    console.log('press');
  };
  return (
    <>
      {/* dialouge box for deleting the notification */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>EkalSutra Parent App</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are You Sure Want To Delete ?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                deleteNotificationMutate(item?._id);
                hideDialog();
              }}>
              Delete
            </Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Animated.View
        style={[
          {
            position: 'absolute',
            right: Sizes.wp('9%'),
            height: ITEM_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          },
          rIconContainerStyle,
        ]}>
        <TouchableOpacity
          onPress={() =>
            updateReadStatusMutate({
              notificationDocId: item?._id,
              read: true,
            })
          }>
          <Feather name="eye" size={26} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(item?._id)}>
          <Feather name="trash" size={26} color="red" />
        </TouchableOpacity>
      </Animated.View>

      {/* card for the notification */}
      {/* <PanGestureHandler onGestureEvent={panGesture} waitFor={scrollViewRef}> */}
      <Animated.View
        selected
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
          rStyle,
        ]}>
        <Pressable
          onPress={() => handlePress()}
          onLongPress={() => {
            return setVisible(true);
          }}
          style={[styles.notificationCardContainer]}>
          {/* icon */}
          <View style={styles.notificationCardIconContainer}>
            <Feather name="bell" size={26} color="white" />
            {item?.read === false ? (
              <Badge
                size={10}
                style={{position: 'absolute', right: 8, top: 5}}
              />
            ) : null}
          </View>
          {/* content */}
          <View style={styles.notificationContentContainer}>
            <Text style={styles.notificationCardTitle}>
              {item?.notificationTitle}
            </Text>
            <Text style={styles.notificationCardSubtitle}>{item.content}</Text>
          </View>
        </Pressable>
      </Animated.View>
      {/* </PanGestureHandler> */}
    </>
  );
};

export default NotificationCard;
