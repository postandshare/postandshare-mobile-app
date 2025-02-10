import {Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const AddMoreTextModal = ({
  open,
  onClose,
  handleChangeText,
  edit = false,
  editData = {},
}) => {
  const [state, setState] = useState({text: ''});
  const onDone = () => {
    setState(prev => ({...prev, text: ''}));
    handleChangeText(state.text);
  };
  useEffect(() => {
    if (edit) {
      setState(prev => ({...prev, text: editData?.text}));
    }
  }, [edit]);

  return (
    <Portal>
      <Dialog dismissable={false} visible={open} onDismiss={handleChangeText}>
        <Dialog.Title>Add Text</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Type text"
            value={state?.text}
            mode="outlined"
            numberOfLines={3}
            multiline
            onBlur={() => Keyboard.dismiss()}
            onChangeText={text => setState(prev => ({...prev, text}))}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={onDone}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddMoreTextModal;
