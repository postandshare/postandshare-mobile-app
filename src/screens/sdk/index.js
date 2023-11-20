import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import * as ImagePicker from 'react-native-image-picker';
import {PESDK} from 'react-native-photoeditorsdk';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';


const openPhotoFromCameraRollExample = async () => {
  try {
    // Select a photo from the camera roll.
    let pickerResult = await ImagePicker.launchImageLibrary({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      mediaType: 'photo',
    });

    // Return if the image selection has been cancelled.
    if (pickerResult.cancelled) {
      return;
    }

    const uriImg = pickerResult?.assets.map((item, idx) => item?.uri);

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(uriImg[0]);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const PhotoSDK = () => {
  return (
    <>
        <TopHeader titile={"Photo SDK EDITOR"} />

       <CustomButton onPress={openPhotoFromCameraRollExample} title={"Open Photo Editor"} />
        
    </>
  );
};

export default PhotoSDK;

