import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../../constants/images';

const SMSTemplate = ({
  onPress,
  item,
  isSelected,
  onEditPress,
  width = '90%',
  showEdit = true,
  msgImage,
}) => {
  console.log(item);
  return (
    <View style={[styles.template, {width: width}]}>
      {item?.templetType === 'WhatsApp' && (
        <ImageBackground
          source={
            msgImage
              ? {uri: msgImage}
              : item?.messageThumbnail
              ? {uri: item?.messageThumbnail}
              : images?.coupleAniverssary
          }
          style={{width: '100%', height: 160}}
          resizeMode="contain">
          {/* edit icon for edit image */}
          {showEdit && (
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 10}}
              onPress={onEditPress}>
              <Icon name="edit" size={25} color="red" />
            </TouchableOpacity>
          )}
        </ImageBackground>
      )}
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={onPress}>
        <View style={{flex: 1}}>
          <Text style={styles.templateText}>{item?.messageGreeting}</Text>
          <Text style={styles.templateText}>{item?.messageText}</Text>
          <Text style={styles.templateText}>{item?.messageComplimantory}</Text>
        </View>
        {isSelected && <Icon name="check" size={25} color="green" />}
      </TouchableOpacity>
    </View>
  );
};

export default SMSTemplate;

const styles = StyleSheet.create({
  template: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignSelf: 'center',
    elevation: 1,
  },
  templateText: {
    color: 'black',
    fontSize: 16,
  },
});
