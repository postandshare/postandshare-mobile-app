import React, {useState} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Swatches,
} from 'reanimated-color-picker';

const ColorPickerModal = ({
  color,
  open,
  onClose,
  handleChangeColor = () => {},
}) => {
  const [state, setState] = useState({color: color ?? '#000000'});

  return (
    <Portal>
      {/* modal for color picker */}
      <Dialog visible={open} animationType="slide" contentContainerStyle={{}}>
        <Dialog.Title>Choose Color</Dialog.Title>
        <Dialog.Content style={{alignContent: 'center', alignItems: 'center'}}>
          <ColorPicker
            style={{width: '70%'}}
            value={state.color}
            onComplete={({hex}) => setState(prev => ({...prev, color: hex}))}>
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>
          {/* font size and font weight and many more change able here by showing tools */}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
          <Button onPress={() => handleChangeColor(state.color)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ColorPickerModal;
