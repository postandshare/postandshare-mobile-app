/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  ImageBackground,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput as NativeInput,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useRef, useState} from 'react';
import styles from './style';
import TopHeader from '../../components/TopHeader';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import Images from '../../constants/images';
import DragDrop from '../../components/DragDrop';
import ViewShot from 'react-native-view-shot';
import {ActivityIndicator} from 'react-native-paper';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getOrgFrame} from '../../services/userServices/frame.services';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../components/Loader';
import uploadFile from '../../utils/uploadFile';
import {addUserPost} from '../../services/userServices/userpost.services';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import FrameSelection from './FrameSelection';
import ShowText from './ShowText';
import ColorPickerModal from './ColorPickerModal';
import AddMoreTextModal from './AddMoreTextModal';
import ShowAddMoreText from './ShowAddMoreText';
import ImageEditor from './ImageEditor';
import FontFamilyModal from './FontFamilyModal';
const initialState = {
  fetch: false,
  address: false,
  logo: false,
  mobile: false,
  email: false,
  website: false,
  whatsApp: false,
  showBusiness_name: false,
  showBusiness_description: false,
  text: '',
  showText: false,
  logo_content: {},
  mobile_content: {},
  email_content: {},
  address_content: {},
  whatsApp_content: {},
  website_content: {},
  business_name: {},
  business_description: {},
  showFrameImg: false,
  frameImg: '',
  selectFrameIndex: 0,
  activeContent: '',
};
const CustomSDK = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const {picData, profileDetail} = route.params || {};
  const imgData = picData;
  const [imageUploading, setImageUploading] = React.useState(false);
  const [showFontFamily, setShowFontFamily] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [moreText, setMoreText] = useState({
    modal: false,
    textArray: [],
    edit: false,
    editData: {},
    active: false,
    activeIndex: 0,
  });
  const [moreImage, setMoreImage] = useState([]);
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
      const {assets} = await launchImageLibrary({
        maxWidth: 300,
        maxHeight: 400,
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (assets) {
        setMoreImage(prev => [...prev, {uri: assets[0]?.uri, selected: true}]);
      }
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
    handlePressFrame();
    const uri = await viewShotRef.current.capture();
    uploadePhoto(uri, 'image/png');
  };
  const handleChangeFontSize = fontSize => {
    if (moreText.active) {
      moreText.textArray[moreText.activeIndex].fontSize = Number(fontSize);
    } else {
      state[state.activeContent].fontSize = Number(fontSize);
    }
    setMoreText(prev => ({...prev}));
  };
  const handleChangeFontSizeByPressingButtons = value => {
    if (moreText.active) {
      moreText.textArray[moreText.activeIndex].fontSize =
        Number(moreText.textArray[moreText.activeIndex].fontSize) + value;
    } else {
      state[state.activeContent].fontSize =
        Number(state[state.activeContent].fontSize) + value;
    }
    setMoreText(prev => ({...prev}));
  };
  const handleChangeColor = color => {
    if (state.activeContent) {
      setState(prev => ({
        ...prev,
        [state.activeContent]: {
          ...prev[state.activeContent],
          fontColor: color,
        },
      }));
    } else {
      if (moreText.active) {
        moreText.textArray[moreText.activeIndex].fontColor = color;
        setMoreText(prev => ({
          ...prev,
        }));
      } else {
        setState(prev => ({
          ...prev,
          logo_content: {...prev.logo_content, fontColor: color},
          mobile_content: {...prev.mobile_content, fontColor: color},
          email_content: {...prev.email_content, fontColor: color},
          address_content: {...prev.address_content, fontColor: color},
          whatsApp_content: {...prev.whatsApp_content, fontColor: color},
          website_content: {...prev.website_content, fontColor: color},
          business_name: {...prev.business_name, fontColor: color},
          business_description: {
            ...prev.business_description,
            fontColor: color,
          },
        }));
        setMoreText(prev => ({
          ...prev,
          textArray: prev.textArray.map(item => ({...item, fontColor: color})),
        }));
      }
    }
    setColorPickerModal(false);
  };
  const handleChangeFontFamily = fontFamily => {
    if (state.activeContent) {
      setState(prev => ({
        ...prev,
        [state.activeContent]: {
          ...prev[state.activeContent],
          fontFamily: fontFamily,
        },
      }));
    } else {
      if (moreText.active) {
        moreText.textArray[moreText.activeIndex].fontFamily = fontFamily;
        setMoreText(prev => ({
          ...prev,
        }));
      } else {
        setState(prev => ({
          ...prev,
          logo_content: {...prev.logo_content, fontFamily: fontFamily},
          mobile_content: {...prev.mobile_content, fontFamily: fontFamily},
          email_content: {...prev.email_content, fontFamily: fontFamily},
          address_content: {...prev.address_content, fontFamily: fontFamily},
          whatsApp_content: {...prev.whatsApp_content, fontFamily: fontFamily},
          website_content: {...prev.website_content, fontFamily: fontFamily},
          business_name: {...prev.business_name, fontFamily: fontFamily},
          business_description: {
            ...prev.business_description,
            fontFamily,
          },
        }));
        setMoreText(prev => ({
          ...prev,
          textArray: prev.textArray.map(item => ({
            ...item,
            fontFamily,
          })),
        }));
      }
    }
    setShowFontFamily(false);
  };
  const handleAddMoreText = text => {
    if (moreText.edit) {
      moreText.textArray[moreText.activeIndex].text = text;
      setMoreText(prev => ({
        ...prev,
        modal: false,
        edit: false,
        editData: {},
      }));
    } else {
      setMoreText(prev => ({
        ...prev,
        modal: false,
        edit: false,
        editData: {},
        textArray: [
          ...prev.textArray,
          {
            text,
            fontColor: '#fff',
            fontSize: 20,
            textAlign: 'center',
            x_axis: 200,
            y_axis: 200,
          },
        ],
      }));
    }
  };
  const handlePressFrame = () => {
    setMoreText(prev => ({...prev, activeIndex: '', active: false}));
    setState(prev => ({...prev, activeContent: ''}));
    setMoreImage(prev => prev.map(item => ({...item, selected: false})));
  };
  const handlePressDeleteImage = index => {
    setMoreImage(prev => prev.filter((_, i) => i !== index));
  };
  const handlePressEditText = () => {
    setMoreText(prev => ({
      ...prev,
      editData: prev.textArray[prev.activeIndex],
      edit: true,
    }));
  };
  const handlePressDeleteText = index => {
    setMoreText(prev => ({
      ...prev,
      textArray: prev.textArray.filter((_, i) => i !== index),
    }));
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
  useEffect(() => {
    if (state.activeContent) {
      setMoreText(prev => ({...prev, activeIndex: '', active: false}));
    }
  }, [state.activeContent]);
  useEffect(() => {
    if (moreText.active) {
      setState(prev => ({...prev, activeContent: ''}));
    }
  }, [moreText.active]);
  console.log(state.business_name, 'in state');
  return (
    <>
      <Loader open={imageUploading || addUserPostLoading} text="Loading..." />
      <Loader
        open={getOrgFrameLoading || getOrgFrameFetching}
        text="Loading..."
      />
      {/* dialogue for adding the text on the image */}
      <AddMoreTextModal
        open={moreText.modal || moreText.edit}
        onClose={() =>
          setMoreText(prev => ({
            ...prev,
            modal: false,
            edit: false,
            editData: {},
          }))
        }
        handleChangeText={handleAddMoreText}
        edit={moreText.edit}
        editData={moreText.editData}
      />
      {/* select font family modal */}
      <FontFamilyModal
        open={showFontFamily}
        onClose={() => setShowFontFamily(false)}
        handleChangeFontFamily={handleChangeFontFamily}
        prevFamily={
          state.activeContent ? state[state.activeContent]?.fontFamily : ''
        }
      />
      {/* color picker modal */}
      <ColorPickerModal
        color={state[state.activeContent]?.fontColor}
        open={colorPickerModal}
        onClose={() => setColorPickerModal(false)}
        handleChangeColor={handleChangeColor}
      />

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
                <TouchableOpacity activeOpacity={1} onPress={handlePressFrame}>
                  <ImageBackground
                    source={imgData ? {uri: imgData?.contentUrl} : null}
                    style={{
                      zIndex: 1,
                      height: 375,
                      width: 375,
                    }}>
                    <View style={{zIndex: 3}}>
                      {moreText.textArray?.map((item, i) => (
                        <ShowAddMoreText
                          item={item}
                          active={i === moreText.activeIndex ? true : false}
                          onPress={() =>
                            setMoreText(prev => ({
                              ...prev,
                              active: true,
                              activeIndex: i,
                            }))
                          }
                          onPressEdit={handlePressEditText}
                          onPressDelete={handlePressDeleteText}
                          index={i}
                        />
                      ))}
                      {moreImage.length > 0 &&
                        moreImage.map((item, i) => (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            key={i}
                            onPress={() => {
                              item.selected = true;
                              setState(prev => ({...prev}));
                            }}>
                            <ImageEditor
                              item={item}
                              onPresDelete={handlePressDeleteImage}
                              index={i}
                            />
                          </TouchableOpacity>
                        ))}
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
                      {profileDetail?.categoryGroup === 'business' && (
                        <>
                          {state.showBusiness_name && (
                            <>
                              <ShowText
                                content={state.business_name}
                                numberOfLines={2}
                                text={profileDetail?.name}
                                activeContent={
                                  state.activeContent === 'business_name'
                                    ? true
                                    : false
                                }
                                showDelete={true}
                                onPressDelete={() =>
                                  setState(prev => ({
                                    ...prev,
                                    showBusiness_name: false,
                                  }))
                                }
                                onPress={() =>
                                  setState(prev => ({
                                    ...prev,
                                    activeContent: 'business_name',
                                  }))
                                }
                              />
                            </>
                          )}
                          {state.showBusiness_description && (
                            <>
                              <ShowText
                                content={state.business_description}
                                numberOfLines={3}
                                text={profileDetail?.description}
                                activeContent={
                                  state.activeContent === 'business_description'
                                    ? true
                                    : false
                                }
                                showDelete={true}
                                onPressDelete={() =>
                                  setState(prev => ({
                                    ...prev,
                                    showBusiness_description: false,
                                  }))
                                }
                                onPress={() =>
                                  setState(prev => ({
                                    ...prev,
                                    activeContent: 'business_description',
                                  }))
                                }
                              />
                            </>
                          )}
                        </>
                      )}

                      {state?.mobile ? (
                        <ShowText
                          content={state.mobile_content}
                          numberOfLines={2}
                          text={profileDetail?.mobileNumber}
                          activeContent={
                            state.activeContent === 'mobile_content'
                              ? true
                              : false
                          }
                          onPress={() =>
                            setState(prev => ({
                              ...prev,
                              activeContent: 'mobile_content',
                            }))
                          }
                        />
                      ) : null}
                      {state?.whatsApp ? (
                        <ShowText
                          content={state.whatsApp_content}
                          text={profileDetail?.whatsAppNumber}
                          activeContent={
                            state.activeContent === 'whatsApp_content'
                              ? true
                              : false
                          }
                          onPress={() =>
                            setState(prev => ({
                              ...prev,
                              activeContent: 'whatsApp_content',
                            }))
                          }
                        />
                      ) : null}
                      {state?.email ? (
                        <ShowText
                          content={state.email_content}
                          text={profileDetail?.email}
                          activeContent={
                            state.activeContent === 'email_content'
                              ? true
                              : false
                          }
                          onPress={() =>
                            setState(prev => ({
                              ...prev,
                              activeContent: 'email_content',
                            }))
                          }
                        />
                      ) : null}
                      {state?.website ? (
                        <ShowText
                          content={state.website_content}
                          text={profileDetail?.website}
                          activeContent={
                            state.activeContent === 'website_content'
                              ? true
                              : false
                          }
                          onPress={() =>
                            setState(prev => ({
                              ...prev,
                              activeContent: 'website_content',
                            }))
                          }
                        />
                      ) : null}
                      {state?.address ? (
                        <ShowText
                          content={state.address_content}
                          text={
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
                          activeContent={
                            state.activeContent === 'address_content'
                              ? true
                              : false
                          }
                          onPress={() =>
                            setState(prev => ({
                              ...prev,
                              activeContent: 'address_content',
                            }))
                          }
                        />
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
                            source={
                              state.frameImg ? {uri: state.frameImg} : null
                            }
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
                </TouchableOpacity>
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
              contentContainerStyle={{gap: 5}}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.frame1}
                onPress={TakePhotofromGallery}>
                <MaterialIcons
                  name="library-add"
                  size={20}
                  color={Colors.TEXT1}
                />
                <Text style={styles.frameText}>Add Pic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.frame1}
                onPress={() => setMoreText(prev => ({...prev, modal: true}))}>
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
                onPress={() => setColorPickerModal(true)}
                style={styles.frame1}>
                <Foundation name="text-color" size={25} color={Colors.TEXT1} />
                <Text style={styles.frameText}>Text Color</Text>
              </TouchableOpacity>
              {(state.activeContent || moreText.active) && (
                <>
                  <View style={{}}>
                    <Text style={{fontSize: 14, fontWeight: '700'}}>
                      Font Size
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#999',
                        height: 40,
                        backgroundColor: '#f5f5f5',
                        flexDirection: 'row',
                        width: 60,
                      }}>
                      <NativeInput
                        value={Number(state[state.activeContent]?.fontSize)}
                        onChangeText={text => handleChangeFontSize(text)}
                        style={{
                          width: 35,
                          backgroundColor: '#fff',
                          fontSize: 11,
                        }}
                        keyboardType="number-pad"
                      />
                      <View
                        style={{
                          width: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginVertical: 2,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            handleChangeFontSizeByPressingButtons(1)
                          }>
                          <MaterialIcons name="arrow-drop-up" size={16} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleChangeFontSizeByPressingButtons(-1)
                          }>
                          <MaterialIcons name="arrow-drop-down" size={16} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '700'}}>
                      Alignment
                    </Text>
                    <View style={{flexDirection: 'row', gap: 4}}>
                      <TouchableOpacity
                        onPress={() =>
                          setState(prev => ({
                            ...prev,
                            [state.activeContent]: {
                              ...prev[state.activeContent],
                              textAlign: 'left',
                            },
                          }))
                        }>
                        <Feather name="align-left" size={30} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setState(prev => ({
                            ...prev,
                            [state.activeContent]: {
                              ...prev[state.activeContent],
                              textAlign: 'center',
                            },
                          }))
                        }>
                        <Feather name="align-center" size={30} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setState(prev => ({
                            ...prev,
                            [state.activeContent]: {
                              ...prev[state.activeContent],
                              textAlign: 'right',
                            },
                          }))
                        }>
                        <Feather name="align-right" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CustomSDK;
