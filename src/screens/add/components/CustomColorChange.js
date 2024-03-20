import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import Colors from '../../../constants/Colors';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
} from 'reanimated-color-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomColorChange = ({
  data,
  setShowBorderBox,
  showBorderBox,
  colorProps,
}) => {
  const [color, setColor] = useState(colorProps?.color ?? '#fff');
  const [showModal, setShowModal] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontSize, setFontSize] = useState(14);
  const [textAlign, setTextAlign] = useState('left');
  const [showTools, setShowTools] = useState(false);

  const onSelectColor = ({hex}) => {
    console.log(hex);
    setColor(hex);
  };
  return (
    <View>
      <Portal>
        {/* modal for color picker */}
        <Dialog
          visible={showModal}
          animationType="slide"
          contentContainerStyle={{}}>
          <Dialog.Title>Choose Color</Dialog.Title>
          <Dialog.Content
            style={{alignContent: 'center', alignItems: 'center'}}>
            {/* text which is going to be editiable */}
            <Text
              style={{
                color: color,
                marginVertical: 10,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textAlign: textAlign,
              }}>
              {data}
            </Text>
            {/* color picker */}
            <ColorPicker
              style={{width: '70%'}}
              value={color}
              onComplete={onSelectColor}>
              {/* <Preview /> */}
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              {/* <Swatches /> */}
            </ColorPicker>
            {/* font size and font weight and many more change able here by showing tools */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '70%',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => setFontSize(prev => prev + 1)}
                style={{
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 5,
                  padding: 5,
                }}>
                <MaterialCommunityIcons
                  name="format-font-size-increase"
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFontSize(prev => prev - 1)}
                style={{
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 5,
                  padding: 5,
                }}>
                <MaterialCommunityIcons
                  name="format-font-size-decrease"
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowModal(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {showTools ? (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'red',
          }}>
          <Text
            onLongPress={() => setShowModal(true)}
            onPress={() => setShowTools(!showTools)}
            style={{color: color, fontSize: fontSize, fontWeight: fontWeight}}>
            {data}
          </Text>
        </View>
      ) : (
        <Text
          onLongPress={() => setShowModal(true)}
          // onPress={() => setShowTools(!showTools)}
          style={{color: color, fontSize: fontSize, fontWeight: fontWeight}}>
          {data}
        </Text>
      )}
    </View>
  );
};

export default CustomColorChange;
