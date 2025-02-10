import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import FontFamily from '../../constants/FontFamily';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
const FontFamilyModal = ({
  open = false,
  onClose = () => {},
  handleChangeFontFamily,
  prevFamily = '',
}) => {
  const [fontFamily, setFontFamily] = useState(prevFamily);
  const handlePressOkay = () => {
    handleChangeFontFamily(fontFamily);
  };
  return (
    <Portal>
      {/* font family dialogue */}
      <Dialog visible={open} onDismiss={onClose}>
        <Dialog.Title>Please Select Font Family</Dialog.Title>
        <Dialog.Content>
          <Dialog.ScrollArea>
            <FlatList
              data={FontFamily}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setFontFamily(item);
                  }}
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    style={[
                      fontFamily === item
                        ? {color: Colors.PRIMARY}
                        : {
                            color: Colors.TEXT1,
                          },
                      {fontFamily: item},
                      styles.item_content,
                    ]}>
                    Tap to Select
                  </Text>
                  {fontFamily === item && (
                    <AntDesign name="check" size={20} color={Colors.PRIMARY} />
                  )}
                </TouchableOpacity>
              )}
            />
          </Dialog.ScrollArea>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
          <Button onPress={handlePressOkay}>Done</Button>
        </Dialog.Actions>
      </Dialog>
      {/* modal for color picker */}
    </Portal>
  );
};

export default FontFamilyModal;

const styles = StyleSheet.create({
  item_content: {
    marginVertical: 10,
    alignItems: 'center',
    fontSize: 18,
  },
});
