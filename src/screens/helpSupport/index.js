import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import globalStyles from '../../styles/globalStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';

const HelpSupport = ({navigation}) => {
  const actionSheetRef = useRef(null);
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };
  useFocusEffect(
    useCallback(() => {
      actionSheetRef?.current?.show();
      return () => {
        actionSheetRef?.current?.hide();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );
  return (
    <>
      <ActionSheet ref={actionSheetRef} closeOnTouchBackdrop={false}>
        {/* header */}
        <View style={globalStyles.actionSheet_header}>
          <Text style={globalStyles.actionSheet_header_left_text}>
            Help & Support
          </Text>
          <View>
            <TouchableOpacity
              style={globalStyles.actionSheet_header_right}
              onPress={onPressCross}>
              <Entypo
                style={globalStyles.actionSheet_header_right_text}
                name="cross"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={globalStyles.divider_studentDetails} />

        {/* body */}
        <View style={styles.container}></View>
      </ActionSheet>
    </>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 10,
  },
});
