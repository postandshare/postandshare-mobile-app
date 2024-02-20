import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  PermissionsAndroid,
  Platform,
  ScrollView,
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
import {launchImageLibrary} from 'react-native-image-picker';
import Images from '../../constants/images';
import DragDrop from '../../components/DragDrop';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import FontFamily from '../../constants/FontFamily';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

const CustomSDK = ({route, navigation}) => {
  const {picData} = route.params;
  const imgData = picData;
  const [showSticker, setShowSticker] = useState(false);
  const [stickers, setStickers] = useState();
  const [picUrl, setPicUrl] = React.useState('');
  const [textColor, setTextColor] = useState('#fff');
  const [sdkTextColor, setSDKTextColor] = useState('#fff');
  const [showModal, setShowModal] = useState(false);
  const [imageUploading, setImageUploading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showFrame, setFrame] = useState(false);
  const [showFrame1, setShowFrame1] = useState(true);
  const [showFrame2, setShowFrame2] = useState(false);
  const [textAlignment, setTextAlignment] = useState('left');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [showFontFamily, setShowFontFamily] = useState(false);
  const [showCross, setShowCross] = useState(true);
  const [tools, setTools] = useState({
    rotate: '',
    flip: '',
    fontSize: 10,
    fontFamily: 'normal',
    color: '',
    fontWeight: '',
    fontStyle: '',
  });
  const [controls, setControls] = useState({
    open: false,
  });

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [borderBox, setBorderBox] = useState(false);
  const [state, setState] = useState({
    location: false,
    logo: false,
    mobile: false,
    email: false,
    whatsApp: false,
    text: '',
    showText: false,
  });
  const viewShotRef = useRef();

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
      setShowFrame1(true);
      setPicUrl(image.assets[0].uri);
      // uploadePhoto(image.assets[0].uri, image.assets[0].type);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  const TakeStickerfromGallery = async () => {
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
        maxWidth: 30,
        maxHeight: 40,
        mediaType: 'photo',
      });
      console.log(image.assets[0].uri);
      setStickers(image.assets[0].uri);
      // uploadePhoto(image.assets[0].uri, image.assets[0].type);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
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

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const onCapture = async () => {
    setShowCross(false);
    const uri = await viewShotRef.current.capture();
    console.log('Image URI:', uri);
    setPicUrl(uri);
    setState(prev => ({
      ...prev,
      location: false,
      mobile: false,
      email: false,
      whatsApp: false,
      logo: false,
    }));
    setShowFrame1(false);
    navigation.navigate('ShareSave', {picUrl: uri});
  };

  // const shareImage = async () => {
  //   const shareOptions = {
  //     title: 'Share via',
  //     message: 'some message',
  //     url: picUrl,
  //     social: Share.Social.WHATSAPP,
  //   };
  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch (error) {
  //     console.log('Error =>', error);
  //   }
  // };

  const hideDialog = () => setVisible(false);
  const hideDialogFontFamily = () => setShowFontFamily(false);
  const onSelectColor = ({hex}) => {
    // do something with the selected color.
    console.log(hex);
    setTextColor(hex);
    setSDKTextColor(hex);
  };
  return (
    <>
      <TopHeader titile={'Custom SDK'} next={'Next'} onPress={onCapture} />

      {/* dialogue for adding the text on the image */}
      <Portal>
        <Dialog dismissable={false} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Add Text</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Add Text"
              value={state?.text}
              mode="outlined"
              numberOfLines={3}
              multiline
              style={{
                textAlign: textAlignment,
              }}
              onBlur={() => Keyboard.dismiss()}
              onChangeText={text => setState(prev => ({...prev, text}))}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setTextAlignment('left')}
                style={{
                  backgroundColor:
                    textAlignment === 'left' ? Colors.PRIMARY : Colors.white,
                  borderWidth: 1,
                  borderColor:
                    textAlignment === 'left' ? Colors.PRIMARY : Colors.text2,
                  borderRadius: 5,
                  width: 30,
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Feather name="align-left" size={20} color={Colors.text1} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTextAlignment('center')}
                style={{
                  backgroundColor:
                    textAlignment === 'center' ? Colors.PRIMARY : Colors.white,
                  borderWidth: 1,
                  borderColor:
                    textAlignment === 'center' ? Colors.PRIMARY : Colors.text2,
                  borderRadius: 5,
                  width: 30,
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Feather name="align-center" size={20} color={Colors.text1} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTextAlignment('right')}
                style={{
                  backgroundColor:
                    textAlignment === 'right' ? Colors.PRIMARY : Colors.white,
                  borderWidth: 1,
                  borderColor:
                    textAlignment === 'right' ? Colors.PRIMARY : Colors.text2,
                  borderRadius: 5,
                  width: 30,
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Feather name="align-right" size={20} color={Colors.text1} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTextAlignment('justify')}
                style={{
                  backgroundColor:
                    textAlignment === 'justify' ? Colors.PRIMARY : Colors.white,
                  borderWidth: 1,
                  borderColor:
                    textAlignment === 'justify' ? Colors.PRIMARY : Colors.text2,
                  borderRadius: 5,
                  width: 30,
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Feather name="align-justify" size={20} color={Colors.text1} />
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                setState(prev => ({...prev, showText: true}));
                setVisible(false);
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* font family dialogue */}
        <Dialog visible={showFontFamily} onDismiss={hideDialogFontFamily}>
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
                      setShowFontFamily(false);
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
                        fontFamily === item ? {color: Colors.PRIMARY} : null,
                        {fontFamily: item},
                        styles.item_content,
                      ]}>
                      {item}
                    </Text>
                    {fontFamily === item && (
                      <AntDesign
                        name="check"
                        size={20}
                        color={Colors.PRIMARY}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </Dialog.ScrollArea>
          </Dialog.Content>
        </Dialog>

        {/* modal for color picker */}
        <Dialog
          visible={showModal}
          animationType="slide"
          contentContainerStyle={{}}>
          <Dialog.Title>Choose Color</Dialog.Title>
          <Dialog.Content
            style={{alignContent: 'center', alignItems: 'center'}}>
            <ColorPicker
              style={{width: '70%'}}
              value="red"
              onComplete={onSelectColor}>
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowModal(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        {/* choose image area */}
        {picUrl ? (
          <ViewShot
            ref={viewShotRef}
            options={{format: 'png', quality: 1.0, result: 'base64'}}>
            <View style={styles.chooseImageContainer}>
              <ImageBackground
                source={{uri: picUrl}}
                resizeMode="center"
                style={{
                  zIndex: 1,
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <View style={{zIndex: 3}}>
                  {state?.logo ? (
                    <DragDrop onDrag={drag} onDrop={drop}>
                      <Image
                        source={Images.akSchoolIcon}
                        style={{
                          height: 50,
                          width: 50,
                          // left: 50,
                        }}
                      />
                    </DragDrop>
                  ) : null}
                  {showSticker ? (
                    <DragDrop onDrag={drag} onDrop={drop}>
                      <Image
                        source={{uri: stickers}}
                        style={{
                          height: 50,
                          width: 50,
                          // left: 50,
                        }}
                      />
                    </DragDrop>
                  ) : null}
                  {state?.mobile ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        9876543210
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.whatsApp ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        8957339512
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.email ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        postandshare@gamilc.com
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.location ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        123, xyz street, abc city
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.text && state?.showText ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                          textAlign: textAlignment,
                          fontFamily: fontFamily,
                        }}>
                        {state?.text}
                      </Text>
                    </DragDrop>
                  ) : null}
                </View>

                <View style={{zIndex: 2}}>
                  {showFrame ? (
                    <Image
                      source={Images.frame_1}
                      style={{
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
                </View>
              </ImageBackground>
              {showCross ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    zIndex: 4,
                    top: -10,
                    right: -15,
                    position: 'absolute',
                  }}>
                  <AntDesign name="closecircleo" size={30} color={'red'} />
                </TouchableOpacity>
              ) : null}
            </View>
          </ViewShot>
        ) : imgData ? (
          <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
            <View style={styles.chooseImageContainer}>
              <ImageBackground
                source={imgData}
                resizeMode="cover"
                style={{
                  zIndex: 1,
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <View style={{zIndex: 3}}>
                  {state?.logo ? (
                    <DragDrop onDrag={drag} onDrop={drop}>
                      <Image
                        source={Images.akSchoolIcon}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                    </DragDrop>
                  ) : null}
                  {showSticker ? (
                    <DragDrop onDrag={drag} onDrop={drop}>
                      <Image
                        source={{uri: stickers}}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                    </DragDrop>
                  ) : null}
                  {state?.mobile ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}
                      setBorderBox={setBorderBox}>
                      {borderBox ? (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderColor: Colors.PRIMARY,
                            padding: 5,
                            borderRadius: 5,
                            width: 120,
                            height: 40,
                            left: x,
                            top: y,
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: textColor,
                              fontSize: tools.fontSize,
                              fontWeight: '700',
                              position: 'absolute',
                            }}>
                            9876543210
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text
                          style={{
                            color: textColor,
                            fontSize: 18,
                            fontWeight: '700',
                            position: 'absolute',
                          }}>
                          9876543210
                        </Text>
                      )}
                    </DragDrop>
                  ) : null}
                  {state?.whatsApp ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        8957339512
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.email ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        postandshare@gamilc.com
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.location ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        123, xyz street, abc city
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.text && state?.showText ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      setShowModal={setShowModal}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                          textAlign: textAlignment,
                          fontFamily: fontFamily,
                        }}>
                        {state?.text}
                      </Text>
                    </DragDrop>
                  ) : null}
                </View>

                <View style={{zIndex: 2}}>
                  {showFrame ? (
                    <Image
                      source={Images.frame1}
                      style={{
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
                </View>
                {showCross ? (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      zIndex: 4,
                      top: -10,
                      right: -15,
                      position: 'absolute',
                    }}>
                    <AntDesign name="closecircleo" size={30} color={'red'} />
                  </TouchableOpacity>
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
            style={[
              state?.location ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}
            onPress={() =>
              setState(prev => ({...prev, location: !state?.location}))
            }>
            <Entypo
              name="location-pin"
              size={30}
              color={state?.location ? Colors.white : Colors.TEXT1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setState(prev => ({
                ...prev,
                logo: !state?.logo,
              }))
            }
            style={[
              state?.logo ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}>
            <Text
              style={[
                state?.logo ? {color: Colors.white} : {color: Colors.TEXT1},
                styles.additionalDetailsText,
                {fontStyle: 'italic'},
              ]}>
              LOGO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              state?.image ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}>
            <Feather
              name="image"
              size={30}
              color={
                state?.image ? {color: Colors.white} : {color: Colors.TEXT1}
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              state?.mobile ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}
            onPress={() =>
              setState(prev => ({...prev, mobile: !state?.mobile}))
            }>
            <AntDesign
              name="mobile1"
              size={30}
              color={state?.mobile ? Colors.white : Colors.TEXT1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              state?.whatsApp ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}
            onPress={() =>
              setState(prev => ({...prev, whatsApp: !state?.whatsApp}))
            }>
            <FontAwesome
              name="whatsapp"
              size={30}
              color={state?.whatsApp ? Colors.white : Colors.TEXT1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              state?.email ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}
            onPress={() => setState(prev => ({...prev, email: !state?.email}))}>
            <AntDesign
              name="mail"
              size={30}
              color={state?.email ? Colors.white : Colors.TEXT1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              state?.facebook ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}>
            <Entypo
              name="facebook"
              size={30}
              color={state?.facebook ? Colors.white : Colors.TEXT1}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* for frame selection  */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.frameContainer}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              showFrame
                ? {backgroundColor: Colors.PRIMARY}
                : {backgroundColor: Colors.white},
              styles.frame,
            ]}
            onPress={() => {
              setFrame(!showFrame);
              setShowFrame1(false);
              setShowFrame2(false);
            }}>
            <Text style={styles.frameText}>Frame 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              showFrame1
                ? {backgroundColor: Colors.PRIMARY}
                : {backgroundColor: Colors.white},
              styles.frame,
            ]}
            onPress={() => {
              setFrame(false);
              setShowFrame1(!showFrame1);
              setShowFrame2(false);
            }}>
            <Text style={styles.frameText}>Frame 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              showFrame2
                ? {backgroundColor: Colors.PRIMARY}
                : {backgroundColor: Colors.white},
              styles.frame,
            ]}
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

        {borderBox ? (
          <>
            <ScrollView
              horizontal
              contentContainerStyle={styles.frameContainer}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setControls(prev => ({
                    ...prev,
                    open: !prev.open,
                  }));
                }}>
                <Text>Controls</Text>
              </TouchableOpacity>
            </ScrollView>

            <View>
              {controls.open ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {/* up and down */}
                  <View>
                    <TouchableOpacity
                      onPress={() => setY(y - 10)}
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        width: 50,
                      }}>
                      <AntDesign
                        name="upcircleo"
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setY(y + 10)}
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        width: 50,
                      }}>
                      <AntDesign
                        name="downcircleo"
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* right and left */}
                  <View>
                    <TouchableOpacity
                      onPress={() => setX(x + 10)}
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        width: 50,
                      }}>
                      <AntDesign
                        name="rightcircleo"
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setX(x - 10)}
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        width: 50,
                      }}>
                      <AntDesign
                        name="leftcircleo"
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* font size up and down */}
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        setTools(prev => ({
                          ...prev,
                          fontSize: prev.fontSize + 2,
                        }))
                      }
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        width: 50,
                      }}>
                      <MaterialCommunityIcons
                        name="format-font-size-increase"
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setTools(prev => ({
                        ...prev,
                        fontSize: prev.fontSize - 2,
                      }))}
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        width: 50,
                      }}>
                      <MaterialCommunityIcons
                        name="format-font-size-decrease"
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>


                  {/* font color */}
                  <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    style={{
                      backgroundColor: Colors.PRIMARY,
                      padding: 10,
                      borderRadius: 5,
                      margin: 10,
                      width: 50,
                    }}>
                    <MaterialCommunityIcons
                      name="select-color"
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </>
        ) : null}

        {/* effects on screen */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.frameContainer}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.frame}
            onPress={() => setVisible(true)}>
            <MaterialCommunityIcons
              name="text-recognition"
              size={20}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Add Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (stickers) {
                setShowSticker(!showSticker);
              } else {
                TakeStickerfromGallery();
              }
            }}
            style={styles.frame}>
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={20}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Sticker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFontFamily(true)}
            style={styles.frame}>
            <MaterialCommunityIcons
              name="draw"
              size={30}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Font Style</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.frame}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={20}
              color={Colors.SECONDRY}
            />
            <Text style={styles.frameText}>Glow</Text>
          </TouchableOpacity>
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
      </ScrollView>
    </>
  );
};

export default CustomSDK;
