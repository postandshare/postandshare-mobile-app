import React from 'react';
import {PESDK} from 'react-native-photoeditorsdk';
import * as ImagePicker from 'react-native-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Routes from './src/routes';
import "react-native-gesture-handler";
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

const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <PaperProvider
          theme ={{
            colors: {
              ...DefaultTheme.colors,
              primary: '#00CC8C',
              secondary: '#184D41',
              placeholder: '#fff',
              outline: 'rgba(24,77,65,0.5)',
              surface: 'rgba(24,77,65,0.5)',
              surfaceVariant: 'rgba(24,77,65,0.5)',
              background: '#fff',
            }
          }}
        >
          <Routes/>
        </PaperProvider>
      </GestureHandlerRootView>
      
      
      
      
      
      
      
      
      {/* <Routes /> */}
      {/* <StatusBar translucent={true}  barStyle={'default'} />
      <View style={{flex: 1, marginTop: 30, backgroundColor: '#f5f5f5'}}>
        <Text>this is the post and share app</Text>

        <Button
          title="Select Image From Gallery"
          onPress={() => {
            openPhotoFromCameraRollExample();
          }}
        />
      </View> */}
    </>
  );
};

export default App;

