import {
  View,
  Text,
  ToastAndroid,
  PermissionsAndroid,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import DashboardTopHeader from '../../../components/DashboardTopHeader';
import {addUserPost} from '../../../services/userServices/userpost.services';
import {useMutation, useQuery} from '@tanstack/react-query';
import uploadFile from '../../../utils/uploadFile';
import {launchImageLibrary} from 'react-native-image-picker';
import {getOrgFrame} from '../../../services/userServices/frame.services';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../components/Loader';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper';
import Colors from '../../../constants/Colors';
import FontFamily from '../../../constants/FontFamily';
import styles from '../style';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from 'reanimated-color-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ViewShot from 'react-native-view-shot';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FrameSelection from '../components/FrameSelection';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DragDrop from '../../../components/DragDrop';
import CustomColorChange from '../components/CustomColorChange';
import {getUserProfile} from '../../../services/userServices/profile.services';

const Add = ({navigation, route}) => {
  const {picData, businessDetails} = route.params || {};
  const [logoPosition, setLogoPosition] = useState({
    x: 0,
    y: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  });
  const [mobileNumPosition, setMobileNumPosition] = useState({
    x: 0,
    y: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  });
  const [emailPosition, setEmailPosition] = useState({
    x: 0,
    y: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  });
  const [whatsAppPosition, setWhatsAppPosition] = useState({
    x: 0,
    y: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  });
  const [locationPosition, setLocationPosition] = useState({
    x: 0,
    y: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  });
  const onPressMenu = () => {
    navigation.getParent('leftDrawer').openDrawer();
  };

  const onPressNotification = () => {
    // navigation.navigate('Notification');
  };

  const onPresProfile = () => {
    navigation.getParent('rightDrawer').openDrawer();
  };

  const [showBorderBox, setShowBorderBox] = useState(false);
  const imgData = picData;
  const BusinessData = businessDetails;
  const [selectedIndex, setSelectedIndex] = useState(null);
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
  const [showFrame3, setShowFrame3] = useState(false);
  // from backend image it should be shown
  const [framImg, setFrameImg] = useState('');
  const [showFrameImg, setShowFrameImg] = useState(false);
  const [textAlignment, setTextAlignment] = useState('left');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [showFontFamily, setShowFontFamily] = useState(false);
  const [showCross, setShowCross] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  const {mutate: addUserPostMuatate, isLoading: addUserPostLoading} =
    useMutation(addUserPost, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

  const uploadePhoto = async (path, mime) => {
    try {
      setImageUploading(true);
      const uplode = await uploadFile({
        filePath: {path: path},
        fileLocation: `public/${Date.now()}`,
        contentType: mime,
      });
      addUserPostMuatate({
        postLink: uplode.fileURL,
        businessDocId: businessDetails?._id,
        businessType: businessDetails?.businessType,
      });
      setImageUploading(false);
        navigation.navigate('ShareSave', {picUrl: path});
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
    // console.log('Dragging', x, y);
  };

  const drop = (x, y) => {
    if (y > Dimensions.get('screen').height - 150) {
      console.log('Drop in the pit');
    }
    // console.log('Dropping', x, y);
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

  const {
    isLoading: getUserProfileLoading,
    isFetching: getUserProfileFetching,
    refetch: getUserProfileRefetch,
    data: getUserProfile_Data,
    isError: getUserProfile_isError,
  } = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: () => getUserProfile(),
    onSuccess: success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      getUserProfileRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserProfileRefetch, navigation]),
  );

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
    uploadePhoto(uri, 'image/png');
  };

  const hideDialog = () => setVisible(false);
  const hideDialogFontFamily = () => setShowFontFamily(false);
  const onSelectColor = ({hex}) => {
    setTextColor(hex);
    setSDKTextColor(hex);
  };

  const {
    isLoading: getOrgFrameLoading,
    isFetching: getOrgFrameFetching,
    refetch: getOrgFrameRefetch,
    data: getOrgFrame_Data,
    isError: getOrgFrame_isError,
  } = useQuery({
    queryKey: ['getOrgFrame'],
    queryFn: () => getOrgFrame(),
    onSuccess: async success => {
      // console.log(success?.data, 'in success');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      getOrgFrameRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <DashboardTopHeader
        onPressMenu={onPressMenu}
        onPressNotification={onPressNotification}
        onPresProfile={onPresProfile}
        title="ADD"
        next={'Next'}
        onPress={onCapture}
      />
      <Loader open={imageUploading || addUserPostLoading} text="Loading..." />
      <Loader
        open={getOrgFrameLoading || getOrgFrameFetching}
        text="Loading..."
      />

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
        refreshControl={
          <RefreshControl
            refreshing={getOrgFrameFetching || getOrgFrameLoading}
            onRefresh={getOrgFrameRefetch}
          />
        }
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        {/* choose image area */}
        {picUrl ? (
          <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
            <View style={styles.chooseImageContainer}>
              <ImageBackground
                source={{uri: picUrl}}
                resizeMode="contain"
                style={{
                  zIndex: 1,
                  height: 375,
                  width: 375,
                  justifyContent: 'center',
                }}>
                {/* logo and other things that needs to be implemented */}
                <View style={{zIndex: 3}}>
                  {state?.logo ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      intialX={logoPosition?.x}
                      intialY={logoPosition?.y}>
                      <Image
                        source={
                          getUserProfile_Data?.data?.obj?.profilePic
                            ? {
                                uri: getUserProfile_Data?.data?.obj?.profilePic,
                              }
                            : ToastAndroid.show(
                                'Logo is not available',
                                ToastAndroid.LONG,
                              )
                        }
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
                      intialX={mobileNumPosition?.x}
                      intialY={mobileNumPosition?.y}>
                      <View
                        style={{
                          position: 'absolute',
                        }}>
                        <CustomColorChange
                          colorProps={mobileNumPosition}
                          setShowBorderBox={setShowBorderBox}
                          showBorderBox={showBorderBox}
                          data={
                            getUserProfile_Data?.data?.obj?.mobileNumber ??
                            ToastAndroid.show(
                              'Mobile Number is not available',
                              ToastAndroid.LONG,
                            )
                          }
                        />
                      </View>
                    </DragDrop>
                  ) : null}
                  {state?.whatsApp ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      intialX={whatsAppPosition?.x}
                      intialY={whatsAppPosition?.y}>
                      <Text
                        style={{
                          // color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        <CustomColorChange
                          setShowBorderBox={setShowBorderBox}
                          showBorderBox={showBorderBox}
                          colorProps={whatsAppPosition}
                          data={
                            getUserProfile_Data?.data?.obj?.whatsappNumber ??
                            ToastAndroid.show(
                              'Whatsapp Number is not available',
                              ToastAndroid.LONG,
                            )
                          }
                        />
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.email ? (
                    <DragDrop
                      onDrag={drag}
                      onDrop={drop}
                      intialX={emailPosition?.x}
                      intialY={emailPosition?.y}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                        }}>
                        <CustomColorChange
                          setShowBorderBox={setShowBorderBox}
                          showBorderBox={showBorderBox}
                          colorProps={whatsAppPosition}
                          data={
                            getUserProfile_Data?.data?.obj?.email ??
                            ToastAndroid.show(
                              'Email is not available',
                              ToastAndroid.LONG,
                            )
                          }
                        />
                      </Text>
                    </DragDrop>
                  ) : null}
                  {state?.location ? (
                    <DragDrop
                      intialX={locationPosition?.x}
                      intialY={locationPosition?.y}
                      onDrag={drag}
                      onDrop={drop}>
                      <Text
                        style={{
                          // color: textColor,
                          fontSize: 18,
                          fontWeight: '700',
                          position: 'absolute',
                          textAlign: 'center',
                        }}>
                        <CustomColorChange
                          setShowBorderBox={setShowBorderBox}
                          showBorderBox={showBorderBox}
                          colorProps={locationPosition}
                          data={
                            getUserProfile_Data?.data?.obj?.currentAddress
                              ? getUserProfile_Data?.data?.obj?.currentAddress
                                  ?.address +
                                ' ' +
                                '||' +
                                getUserProfile_Data?.data?.obj?.currentAddress
                                  ?.dist +
                                ' ' +
                                '\n' +
                                getUserProfile_Data?.data?.obj?.currentAddress
                                  ?.state +
                                ' ' +
                                '\n' +
                                getUserProfile_Data?.data?.obj?.currentAddress
                                  ?.pinCode +
                                ' '
                              : ToastAndroid.show(
                                  'Address is not available',
                                  ToastAndroid.LONG,
                                )
                          }
                        />
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
                {/* frames of the images */}
                <View style={{zIndex: 2}}>
                  {showFrameImg ? (
                    <>
                      {isLoading && (
                        <ActivityIndicator
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '45%',
                          }}
                          size="large"
                          color={Colors.PRIMARY}
                        />
                      )}
                      <Image
                        loadingIndicatorSource={
                          <ActivityIndicator
                            size="large"
                            color={Colors.PRIMARY}
                          />
                        }
                        onLoad={() => setIsLoading(false)}
                        source={
                          framImg
                            ? {uri: framImg}
                            : ToastAndroid.show(
                                'Frame is not available please provide better link',
                                ToastAndroid.LONG,
                              )
                        }
                        resizeMode="contain"
                        style={{
                          alignSelf: 'center',
                          height: 375,
                          width: 375,
                        }}
                        res
                      />
                    </>
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
        </ScrollView>

        {/* for frame selection  */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.frameContainer}
          showsHorizontalScrollIndicator={false}>
          {getOrgFrame_Data?.data?.list?.map((item, index) => (
            <FrameSelection
              setFrameImg={setFrameImg}
              setShowFrameImg={setShowFrameImg}
              showFrameImg={showFrameImg}
              item={item}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              index={index}
              setShowFrame1={setShowFrame1}
              setShowFrame2={setShowFrame2}
              setShowFrame3={setShowFrame3}
              setFrame={setFrame}
              key={index}
              setLogoPosition={setLogoPosition}
              state={state}
              setState={setState}
              setMobileNumPosition={setMobileNumPosition}
              setEmailPosition={setEmailPosition}
              setLocationPosition={setLocationPosition}
              setWhatsAppPosition={setWhatsAppPosition}
            />
          ))}
        </ScrollView>

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

export default Add;
