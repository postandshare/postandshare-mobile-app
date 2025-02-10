import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import DragDrop from '../../components/DragDrop';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ShowAddMoreText = ({
  item,
  onPress,
  active,
  onPressEdit,
  onPressDelete,
  index,
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
      intialX={item?.x_axis}
      intialY={item?.y_axis}>
      <View style={{position: 'absolute'}}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            {position: 'relative'},
            active && {
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 5,
              padding: 2,
              backgroundColor: '#999',
            },
          ]}>
          <Text
            style={{
              color: item?.fontColor,
              fontSize: item?.fontSize,
              fontWeight: item?.fontWeight,
              fontFamily: item?.fontFamily,
              fontStyle: item?.fontStyle,
            }}>
            {item?.text}
          </Text>
          {active && (
            <View style={styles.icon_container}>
              <TouchableOpacity
                style={styles.icon_wrap}
                onPress={() => onPressDelete(index)}>
                <AntDesign name="delete" style={styles.delete_icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon_wrap}
                onPress={() => onPressEdit(index)}>
                <FontAwesome name="edit" style={styles.edit_icon} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </DragDrop>
  );
};

export default ShowAddMoreText;
const styles = StyleSheet.create({
  icon_container: {
    flexDirection: 'row',
    gap: 5,
    position: 'absolute',
    top: -30,
    left: 5,
  },
  icon_wrap: {
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 4,
  },
  delete_icon: {
    color: '#fff',
    fontSize: 25,
  },
  edit_icon: {
    color: '#fff',
    fontSize: 25,
  },
});
