import {ImageBackground, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import styles from './style';

const FrameSelection = ({
  setState,
  state,
  item,
  imgData,
  index,
  initialState,
}) => {
  const isSelected = state.selectFrameIndex === index;
  const handleSetInitial = async () => {
    return new Promise(async (resolve, rej) => {
      await setState(initialState);
      resolve(null);
    });
  };
  const handleFrameSelection = async () => {
    await handleSetInitial();
    setState(prev => ({
      ...prev,
      fetch: !prev.fetch,
      showFrameImg: true,
      frameImg: item?.framePic,
      selectFrameIndex: index,
      address: true,
      mobile: true,
      email: true,
      whatsApp: true,
      logo: true,
      website: true,
      business: true,
      logo_content: item?.contentLocation?.logo,
      mobile_content: item?.contentLocation?.mobileNumber,
      email_content: item?.contentLocation?.email,
      address_content: item?.contentLocation?.address,
      whatsApp_content: item?.contentLocation?.whatsAppNumber,
      website_content: item?.contentLocation?.website,
      business_content: {
        x_axis: 60,
        y_axis: 3,
        fontColor: '#fff',
        fontSize: 18,
        fontWeight: '700',
        numberOfLines: 2,
        width: 300,
        textAlign: 'right',
      },
    }));
  };

  return (
    <ImageBackground
      source={{uri: imgData?.contentUrl}}
      style={[
        styles.frame,
        {overflow: 'hidden'},
        isSelected && state.showFrameImg
          ? {
              backgroundColor: Colors.transparent,
              borderColor: Colors.PRIMARY,
              borderWidth: 2,
              elevation: 5,
            }
          : {backgroundColor: Colors.transparent},
      ]}>
      <TouchableOpacity style={[styles.frame]} onPress={handleFrameSelection}>
        <Image
          source={{uri: item?.framePic}}
          style={{
            height: 60,
            width: 60,
            borderRadius: 5,
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default FrameSelection;
