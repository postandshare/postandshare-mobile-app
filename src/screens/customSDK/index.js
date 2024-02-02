import {
  Dimensions,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  Share,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  openPhotoFromCameraRollExample,
  photoStickerConfigurationExample,
} from '../sdk';
import {launchImageLibrary} from 'react-native-image-picker';
import Images from '../../constants/images';
import {PESDK, Tool} from 'react-native-photoeditorsdk';
import {PanResponder, Animated} from 'react-native';
import DragDrop from '../../components/DragDrop';
import {TextInput} from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const CustomSDK = () => {
  const [picUrl, setPicUrl] = React.useState('');
  const [imageUploading, setImageUploading] = React.useState(false);
  const [whatsApp, setWhatsApp] = React.useState(false);
  const [facebook, setFacebook] = React.useState(false);
  const [mail, setMail] = React.useState(false);
  const [facebookPosition, setFacebookPosition] = useState({x: 0, y: 0});
  const [whatsappPosition, setWhatsappPosition] = useState({x: 0, y: 0});
  const [text, setText] = useState('');
  const [showFrame, setFrame] = useState(false);
  const [showFrame1, setShowFrame1] = useState(false);
  const [showFrame2, setShowFrame2] = useState(false);
  const [state, setState] = useState({
    location: false,
    logo: false,
    mobile: false,
    email: false,
    whatsApp: false,
    text: false,
  });
  const viewShotRef = useRef();
  const facebookPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      setFacebookPosition({
        x: gesture.moveX,
        y: gesture.moveY,
      });
    },
  });

  const whatsappPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      setWhatsappPosition({
        x: gesture.moveX,
        y: gesture.moveY,
      });
    },
  });
  console.log(picUrl, 'in pic url');
  const uploadePhoto = async (path, mime) => {
    try {
      setImageUploading(true);
      // const uplode = await uploadFile({
      //   filePath: {path: path},
      //   fileLocation: `public/${Date.now()}`,
      //   contentType: mime,
      // });
      // setImageUploading(false);

      // setPicUrl(uplode.fileURL);
      // console.log(uplode.fileURL, 'in file url');

      //await updateUserProfile({profilePic: uplode.fileURL});
      // personalInfoFormik.setValues(prev => ({
      //   ...prev,
      //   imageUploading: false,
      //   profilePic: uplode.fileURL,
      // }));
    } catch (error) {
      setImageUploading(false);
    }
  };

  const TakePhotofromGallery = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Post and Share App',
          message:
            'We want to access the photo gallery' +
            'To perform the desired function',
        },
      );
      const image = await launchImageLibrary({
        maxWidth: 300,
        maxHeight: 400,
        mediaType: 'photo',
      });
      console.log(image.assets[0].uri);
      setState(prev => ({
        ...prev,
        location: true,
        mobile: true,
        email: true,
        whatsApp: true,
        logo: true,
      }));
      setPicUrl(image.assets[0].uri);
      // uploadePhoto(image.assets[0].uri, image.assets[0].type);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };

  const photoAnnotationExample = async () => {
    // Add a photo from the assets directory.
    const photo = picUrl;

    // Create a `Configuration` object.
    const configuration = {
      // For this example only the sticker, text, and brush tool are enabled.
      // tools: [Tool.STICKER, Tool.TEXT, Tool.BRUSH],
      singleToolMode: true,
      tools: [Tool.STICKER],

      theme: 'light',
      custom: {
        // Provide all available themes.
        themes: {
          dark: {
            toolbarBackground: '#1c1c1c',
            menuBackground: '#1c1c1c',
            background: '#121212',
          },
          light: {
            toolbarBackground: Colors.PRIMARY,
            menuBackground: '#f7f7f7',
            background: '#ebebeb',
          },
        },
      },

      // For this example only stickers suitable for annotations are enabled.
      sticker: {
        categories: [
          {
            identifier: 'annotation_stickers',
            name: 'Annotation',
            thumbnailURI: Images.bell_icon,
            items: [
              {identifier: 'imgly_sticker_shapes_arrow_02'},
              {identifier: 'imgly_sticker_shapes_arrow_03'},
              {identifier: 'imgly_sticker_shapes_badge_11'},
              {identifier: 'imgly_sticker_shapes_badge_12'},
              {identifier: 'imgly_sticker_shapes_badge_36'},
            ],
          },
        ],
      },
    };
    try {
      // Open the photo editor and handle the export as well as any occurring errors.
      const result = await PESDK.openEditor(photo, configuration);
      console.log(result, 'in result');
      if (result != null) {
        // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
        setPicUrl(result?.image);
      } else {
        // The user tapped on the cancel button within the editor.
        return;
      }
    } catch (error) {
      // There was an error generating the photo.
      console.log(error);
    }
  };

  const drag = (x, y) => {
    console.log('Dragging', x, y);
  };
  const drop = (x, y) => {
    if (y > Dimensions.get('screen').height - 150) {
      console.log('Drop in the pit');
    }
    console.log('Dropping', x, y);
  };

  const onCapture = async () => {
    const uri = await viewShotRef.current.capture();
    console.log('Image URI:', uri);
    setPicUrl(uri);
    const path = `${RNFS.DocumentDirectoryPath}/myImage.jpg`;

    // Convert the image uri to base64
    const imageBase64 = await RNFS.readFile(uri, 'base64');

    // Write the image file
    await RNFS.writeFile(path, imageBase64, 'base64');

    console.log('Image saved to', path);
    // Now you can use the uri to display the image or save it to the device
  };

  return (
    <>
      <TopHeader titile={'Custom SDK'} />
      <ScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        {/* choose image area */}
        {picUrl ? (
          <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
            <View style={styles.chooseImageContainer}>
              <ImageBackground
                source={{uri: picUrl}}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                {state?.logo ? (
                  <DragDrop onDrag={drag} onDrop={drop}>
                    <Image
                      source={Images.add_birthday_icon}
                      style={{
                        height: 50,
                        width: 50,

                        left: 50,
                      }}
                    />
                  </DragDrop>
                ) : null}
                {state?.mobile ? (
                  <DragDrop onDrag={drag} onDrop={drop}>
                    <Text
                      style={{color: 'red', fontSize: 18, fontWeight: '700', position: 'absolute'}}>
                      9876543210
                    </Text>
                  </DragDrop>
                ) : null}
                {state?.whatsApp ? (
                  <DragDrop onDrag={drag} onDrop={drop}>
                    <Text
                      style={{color: 'red', fontSize: 18, fontWeight: '700'}}>
                      8957339512
                    </Text>
                  </DragDrop>
                ) : null}
                {state?.email ? (
                  <DragDrop onDrag={drag} onDrop={drop}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 18,
                        fontWeight: '700',
                        position: 'absolute',
                      }}>
                      postandshare@gamilc.com
                    </Text>
                  </DragDrop>
                ) : null}
                {state?.location ? (
                  <DragDrop onDrag={drag} onDrop={drop}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 18,
                        fontWeight: '700',
                        zIndex: 1,
                      }}>
                      123, xyz street, abc city
                    </Text>
                  </DragDrop>
                ) : null}
                {showFrame ? (

                  <Image
                    source={Images.frame}
                    style={{
                      zIndex: 1,
                      transform: [{rotate: '90deg'}],
                    }}
                  />
                ) : null}
                {showFrame1 ? (
                  <Image
                    source={Images.frame_1}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                ) : null}
                {showFrame2 ? (
                  <ImageBackground
                    source={Images.frame_2}
                    style={{
                      height: '100%',
                      width: '100%',
                      top: -20,
                    }}
                  />
                ) : null}
              </ImageBackground>
            </View>
          </ViewShot>
        ) : (
          <TouchableOpacity
            style={styles.chooseImageContainer}
            onPress={TakePhotofromGallery}>
            <AntDesign name="upload" size={30} color={Colors.PRIMARY} />
            <Text>Choose Image</Text>
          </TouchableOpacity>
        )}

        {/* aditional details like logo, location etc */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.additionalDetailsContainer}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.additionalDetails}
            onPress={() =>
              setState(prev => ({...prev, location: !state?.location}))
            }>
            <Entypo name="location-pin" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalDetails}>
            <Text
              style={[styles.additionalDetailsText, {fontStyle: 'italic'}]}
              onPress={() =>
                setState(prev => ({
                  ...prev,
                  logo: !state?.logo,
                }))
              }>
              LOGO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalDetails}>
            <Feather name="image" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.additionalDetails}
            onPress={() =>
              setState(prev => ({...prev, mobile: !state?.mobile}))
            }>
            <AntDesign name="mobile1" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.additionalDetails}
            onPress={() =>
              setState(prev => ({...prev, whatsApp: !state?.whatsApp}))
            }>
            <FontAwesome name="whatsapp" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.additionalDetails}
            onPress={() => setState(prev => ({...prev, email: !state?.email}))}>
            <AntDesign name="mail" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalDetails}>
            <Entypo name="facebook" size={30} color={Colors.white} />
          </TouchableOpacity>
        </ScrollView>

        {/* for frame selection  */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.frameContainer}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.frame}
            onPress={() => {
              setFrame(!showFrame);
              setShowFrame1(false);
              setShowFrame2(false);
            }}>
            <Text style={styles.frameText}>Frame 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.frame}
            onPress={() => {
              setFrame(false);
              setShowFrame1(!showFrame1);
              setShowFrame2(false);
            }}>
            <Text style={styles.frameText}>Frame 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.frame}
            onPress={() => {
              setFrame(false);
              setShowFrame1(false);
              setShowFrame2(!showFrame2);
            }}>
            <Text style={styles.frameText}>Frame 3</Text>
          </TouchableOpacity>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 4</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 5</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 6</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 7</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 8</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 9</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Frame 10</Text>
          </View>
        </ScrollView>
        {/* effects on screen */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.frameContainer}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.frame}>
            <MaterialCommunityIcons
              name="text-recognition"
              size={20}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Add Text</Text>
          </TouchableOpacity>
          <View style={styles.frame}>
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={20}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Sticker</Text>
          </View>
          <View style={styles.frame}>
            <MaterialCommunityIcons
              name="draw"
              size={30}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Draw</Text>
          </View>
          <View style={styles.frame}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={20}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Glow</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Effect 5</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Effect 6</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Effect 7</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Effect 8</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Effect 9</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.frameText}>Effect 10</Text>
          </View>
        </ScrollView>

        {/* buttons for sae and share */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={onCapture}
            // onPress={() => async () => {
            //   await MediaLibrary.requestPermissionsAsync();
            //   // Then, save the image to the library.
            //   await MediaLibrary.saveToLibraryAsync(result.image);

            //   // Delete the temporary export file only after the saving process has finished,
            //   // to be able to access it again in case anything went wrong while uploading
            //   // the photo.
            //   return FileSystem.deleteAsync(result.image);
            // }}
          >
            <Text style={[styles.buttonText, {color: Colors.SECONDRY}]}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                title: 'Post and Share App',
                message: 'This is the message',
                url: picUrl,
              })
            }
            style={[styles.button, {backgroundColor: Colors.SECONDRY}]}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default CustomSDK;
