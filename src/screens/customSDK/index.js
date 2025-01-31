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
import {useIsFocused} from '@react-navigation/native';
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
  const isFocused = useIsFocused();
  const {picData, profileDetail} = route.params || {};
  const [showBorderBox, setShowBorderBox] = useState(false);
  const imgData = picData;
  const [textColor, setTextColor] = useState('#fff');
  const [sdkTextColor, setSDKTextColor] = useState('#fff');
  const [showModal, setShowModal] = useState(false);
  const [imageUploading, setImageUploading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [textAlignment, setTextAlignment] = useState('left');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [showFontFamily, setShowFontFamily] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const viewShotRef = useRef();
  const uploadePhoto = async (path, mime) => {
    try {
      setImageUploading(true);
      const upload = await uploadFile({
        filePath: {path: path},
        fileLocation: `postAndShare/${Date.now()}`,
        contentType: mime,
      });
      addUserPostMuatate({
        postName: `Post ${Date.now()}`,
        postLink: upload.fileURL,
        businessDocId: profileDetail?._id,
        businessType: profileDetail?.businessType,
      });
      setImageUploading(false);

      setState(initialState);

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
      await launchImageLibrary({
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
    const uri = await viewShotRef.current.capture();
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
    queryKey: ['getOrgFrame', isFocused],
    queryFn: () => getOrgFrame(),
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  const {mutate: addUserPostMuatate, isLoading: addUserPostLoading} =
    useMutation(addUserPost, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

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
          {imgData ? (
            <View style={styles.chooseImageContainer}>
              <ViewShot
                ref={viewShotRef}
                options={{format: 'jpg', quality: 0.9}}>
                <ImageBackground
                  source={imgData ? {uri: imgData?.contentUrl} : null}
                  style={{
                    zIndex: 1,
                    height: 375,
                    width: 375,
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
                            profileDetail
                              ? {
                                  uri:
                                    profileDetail?.logo ??
                                    profileDetail?.partyLogo ??
                                    profileDetail?.profilePic,
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
                    {state.business &&
                      profileDetail?.categoryGroup === 'business' && (
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
                              data={profileDetail?.name}
                              width={state.business_content.width}
                              numberOfLines={2}
                            />
                          </Text>
                        </DragDrop>
                      )}

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
                            data={profileDetail?.mobileNumber}
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
                            data={profileDetail?.whatsAppNumber}
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
                            data={profileDetail?.email}
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
                            data={profileDetail?.website}
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
                              profileDetail?.address
                                ? profileDetail?.address?.address +
                                  ', ' +
                                  profileDetail?.address?.dist +
                                  ' ' +
                                  profileDetail?.address?.state
                                : profileDetail?.state
                                ? profileDetail?.state +
                                  ',' +
                                  profileDetail?.district +
                                  ' ' +
                                  profileDetail?.legislativeAssembly
                                : profileDetail?.currentAddress
                                ? profileDetail?.currentAddress?.address +
                                  ', ' +
                                  profileDetail?.currentAddress?.dist +
                                  ' ' +
                                  profileDetail?.currentAddress?.state
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
                </ImageBackground>
              </ViewShot>
            </View>
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
            </ScrollView>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CustomSDK;
