/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
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
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper';
import FontFamily from '../../constants/FontFamily';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getOrgFrame} from '../../services/userServices/frame.services';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import uploadFile from '../../utils/uploadFile';
import {addUserPost} from '../../services/userServices/userpost.services';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import FrameSelection from './FrameSelection';
import CustomColorChange from './CustomColorChange';
const initialState = {
  fetch: false,
  address: false,
  logo: false,
  mobile: false,
  email: false,
  website: false,
  whatsApp: false,
  business: false,
  text: '',
  showText: false,
  logo_content: {},
  mobile_content: {},
  email_content: {},
  address_content: {},
  whatsApp_content: {},
  website_content: {},
  business_content: {},
  showFrameImg: false,
  frameImg: '',
  selectFrameIndex: 0,
};
const CustomSDK = ({route, navigation}) => {
  const {picData, businessDetails, profileType} = route.params || {};

  const [showBorderBox, setShowBorderBox] = useState(false);
  const imgData = picData;
  const BusinessData = businessDetails;

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
  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useState(initialState);
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
        postName: `Post ${Date.now()}`,
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

      setState(prev => ({
        ...prev,
        address: true,
        mobile: true,
        email: true,
        whatsApp: true,
        logo: true,
        website: true,
      }));
      setShowFrame1(true);
      setPicUrl(image.assets[0].uri);
      // uploadePhoto(image.assets[0].uri, image.assets[0].type);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };

  const drag = (x, y) => {};

  const drop = (x, y) => {
    if (y > Dimensions.get('screen').height - 150) {
    }
  };

  const onCapture = async () => {
    setShowCross(false);
    const uri = await viewShotRef.current.capture();

    setPicUrl(uri);
    setState(prev => ({
      ...prev,
      address: false,
      mobile: false,
      email: false,
      whatsApp: false,
      logo: false,
      website: false,
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
  } = useQuery({
    queryKey: ['getOrgFrame'],
    queryFn: () => getOrgFrame(),
    onSuccess: async success => {},
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
                        fontFamily === item
                          ? {color: Colors.PRIMARY}
                          : {
                              color: Colors.TEXT1,
                            },
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

      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader
          titile={picData?.name ?? 'Custom SDK'}
          next={'Next'}
          onPress={onCapture}
        />
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
                    <View>
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
                      {state.business && profileType === 'business' && (
                        <DragDrop onDrag={drag} onDrop={drop}>
                          <Text sx={{color: '#fff'}}>
                            {businessDetails?.name}
                          </Text>
                        </DragDrop>
                      )}
                    </View>
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
                    {state?.address ? (
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
                  source={imgData ? {uri: imgData?.contentUrl} : null}
                  resizeMode="cover"
                  style={{
                    zIndex: 1,
                    height: 375,
                    width: 375,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                  }}>
                  <View style={{zIndex: 3}}>
                    {state?.logo ? (
                      <DragDrop
                        onDrag={drag}
                        onDrop={drop}
                        intialX={state.logo_content?.x_axis}
                        intialY={state.logo_content?.y_axis}>
                        <Image
                          source={
                            BusinessData
                              ? {
                                  uri:
                                    BusinessData?.logo ??
                                    businessDetails?.partyLogo ??
                                    BusinessData?.profilePic,
                                }
                              : Images.akSchoolIcon
                          }
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </DragDrop>
                    ) : null}
                    {state.business && profileType === 'business' && (
                      <DragDrop
                        onDrag={drag}
                        onDrop={drop}
                        intialX={state.business_content?.x_axis}
                        intialY={state.business_content?.y_axis}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '700',
                            position: 'absolute',
                          }}>
                          <CustomColorChange
                            setShowBorderBox={setShowBorderBox}
                            showBorderBox={showBorderBox}
                            content={state.business_content}
                            data={BusinessData?.name}
                            width={state.business_content.width}
                            numberOfLines={2}
                          />
                        </Text>
                      </DragDrop>
                    )}

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
                        intialX={state.mobile_content?.x_axis}
                        intialY={state.mobile_content?.y_axis}>
                        <View
                          style={{
                            position: 'absolute',
                          }}>
                          <CustomColorChange
                            content={state.mobile_content}
                            setShowBorderBox={setShowBorderBox}
                            showBorderBox={showBorderBox}
                            data={BusinessData?.mobileNumber}
                          />
                        </View>
                      </DragDrop>
                    ) : null}
                    {state?.whatsApp ? (
                      <DragDrop
                        onDrag={drag}
                        onDrop={drop}
                        intialX={state.whatsApp_content?.x_axis}
                        intialY={state.whatsApp_content?.y_axis}>
                        <View
                          style={{
                            position: 'absolute',
                          }}>
                          <CustomColorChange
                            setShowBorderBox={setShowBorderBox}
                            showBorderBox={showBorderBox}
                            content={state.whatsApp_content}
                            data={BusinessData?.whatsAppNumber}
                          />
                        </View>
                      </DragDrop>
                    ) : null}
                    {state?.email ? (
                      <DragDrop
                        onDrag={drag}
                        onDrop={drop}
                        intialX={state.email_content?.x_axis}
                        intialY={state.email_content?.y_axis}>
                        <View
                          style={{
                            position: 'absolute',
                          }}>
                          <CustomColorChange
                            setShowBorderBox={setShowBorderBox}
                            showBorderBox={showBorderBox}
                            content={state.email_content}
                            data={BusinessData?.email}
                          />
                        </View>
                      </DragDrop>
                    ) : null}
                    {state?.website ? (
                      <DragDrop
                        onDrag={drag}
                        onDrop={drop}
                        intialX={state.website_content?.x_axis}
                        intialY={state.website_content?.y_axis}>
                        <View
                          style={{
                            position: 'absolute',
                          }}>
                          <CustomColorChange
                            setShowBorderBox={setShowBorderBox}
                            showBorderBox={showBorderBox}
                            content={state.website_content}
                            data={BusinessData?.website}
                          />
                        </View>
                      </DragDrop>
                    ) : null}
                    {state?.address ? (
                      <DragDrop
                        intialX={state.address_content?.x_axis}
                        intialY={state.address_content?.y_axis}
                        onDrag={drag}
                        onDrop={drop}>
                        <View
                          style={{
                            position: 'absolute',
                          }}>
                          <CustomColorChange
                            setShowBorderBox={setShowBorderBox}
                            showBorderBox={showBorderBox}
                            content={state.address_content}
                            data={
                              BusinessData?.address
                                ? BusinessData?.address?.address +
                                  ', ' +
                                  BusinessData?.address?.dist +
                                  ' ' +
                                  BusinessData?.address?.state
                                : BusinessData?.state
                                ? BusinessData?.state +
                                  ',' +
                                  BusinessData?.district +
                                  ' ' +
                                  BusinessData?.legislativeAssembly
                                : BusinessData?.currentAddress
                                ? BusinessData?.currentAddress?.address +
                                  ', ' +
                                  BusinessData?.currentAddress?.dist +
                                  ' ' +
                                  BusinessData?.currentAddress?.state
                                : null
                            }
                          />
                        </View>
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
                    {state.showFrameImg ? (
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
                          source={state.frameImg ? {uri: state.frameImg} : null}
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
          {state.showFrameImg && (
            <ScrollView
              horizontal
              contentContainerStyle={styles.additionalDetailsContainer}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[
                  state?.address ? {backgroundColor: Colors.PRIMARY} : {},
                  styles.additionalDetails,
                ]}
                onPress={() =>
                  setState(prev => ({...prev, address: !state?.address}))
                }>
                <Entypo
                  name="location-pin"
                  size={25}
                  color={state?.address ? Colors.white : Colors.TEXT1}
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
              {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
                  size={25}
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
                  size={25}
                  color={state?.whatsApp ? Colors.white : Colors.TEXT1}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  state?.email ? {backgroundColor: Colors.PRIMARY} : {},
                  styles.additionalDetails,
                ]}
                onPress={() =>
                  setState(prev => ({...prev, email: !state?.email}))
                }>
                <AntDesign
                  name="mail"
                  size={25}
                  color={state?.email ? Colors.white : Colors.TEXT1}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
            style={[
              state?.facebook ? {backgroundColor: Colors.PRIMARY} : {},
              styles.additionalDetails,
            ]}>
            <Entypo
              name="facebook"
              size={25}
              color={state?.facebook ? Colors.white : Colors.TEXT1}
            />
          </TouchableOpacity> */}
            </ScrollView>
          )}

          {/* for frame selection  */}
          <ScrollView
            horizontal
            contentContainerStyle={state.showFrameImg && styles.frameContainer}
            showsHorizontalScrollIndicator={false}>
            {getOrgFrame_Data?.data?.list?.map((item, index) => (
              <FrameSelection
                item={item}
                index={index}
                key={index}
                state={state}
                imgData={imgData}
                setState={setState}
                initialState={initialState}
              />
            ))}
          </ScrollView>

          {/* effects on screen */}
          {state.showFrameImg && (
            <ScrollView
              horizontal
              contentContainerStyle={styles.frameContainer}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.frame1}
                onPress={() => setVisible(true)}>
                <MaterialCommunityIcons
                  name="text-recognition"
                  size={20}
                  color={Colors.TEXT1}
                />
                <Text style={styles.frameText}>Add Text</Text>
              </TouchableOpacity>
              {/* sticker */}
              {/* <TouchableOpacity
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
              color={Colors.TEXT1}
            />
            <Text style={styles.frameText}>Sticker</Text>
          </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => setShowFontFamily(true)}
                style={styles.frame1}>
                <MaterialCommunityIcons
                  name="draw"
                  size={30}
                  color={Colors.TEXT1}
                />
                <Text style={styles.frameText}>Font Style</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={styles.frame1}>
                <MaterialCommunityIcons
                  name="star-four-points-outline"
                  size={20}
                  color={Colors.TEXT1}
                />
                <Text style={styles.frameText}>Glow</Text>
              </TouchableOpacity>
              {/* <View style={styles.frame1}>
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
              </View> */}
            </ScrollView>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CustomSDK;
