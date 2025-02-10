import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DragDrop from '../../components/DragDrop';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ShowText = ({
  text,
  content,
  numberOfLines,
  onPress,
  activeContent = false,
  showDelete = false,
  onPressDelete = () => {},
}) => {
  const drag = (x, y) => {};

  const drop = (x, y) => {
    if (y > Dimensions.get('screen').height - 150) {
    }
  };
  return (
    <DragDrop
      onDrag={drag}
      onDrop={drop}
      intialX={content?.x_axis}
      intialY={content?.y_axis}>
      <TouchableOpacity
        style={[
          {
            position: 'absolute',
          },
          activeContent && {
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: '#999',
            borderRadius: 5,
          },
        ]}
        onPress={onPress}>
        <View
          style={
            content?.width ? {width: content.width, position: 'relative'} : null
          }>
          <Text
            numberOfLines={numberOfLines ?? 1}
            ellipsizeMode="tail"
            style={{
              color: content?.fontColor,
              fontSize: content?.fontSize,
              fontWeight: content?.fontWeight,
              textAlign: content?.textAlign,
              fontStyle: content?.fontStyle,
              fontFamily: content?.fontFamily,
            }}>
            {text}
          </Text>

          {/* delete icon */}
          {activeContent && showDelete && (
            <TouchableOpacity
              style={styles.deleteIcon_container}
              onPress={onPressDelete}>
              <AntDesign name="delete" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </DragDrop>
  );
};

export default ShowText;

const styles = StyleSheet.create({
  deleteIcon_container: {
    position: 'absolute',
    top: -20,
    lef: -20,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    fontSize: 20,
    color: '#fff',
  },
});
