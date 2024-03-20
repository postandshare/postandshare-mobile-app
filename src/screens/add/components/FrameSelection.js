import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../constants/Colors';
import styles from '../style';

const FrameSelection = ({
  setFrameImg,
  setShowFrameImg,
  state,
  setState,
  item,
  setSelectedIndex,
  selectedIndex,
  showFrameImg,
  index,
  position,
  setPosition,
  logoPosition,
  setLogoPosition,
  setMobileNumPosition,
  setEmailPosition,
  setLocationPosition,
  setWhatsAppPosition,
}) => {
  const [laoding, setLoading] = useState(false);
  const isSelected = selectedIndex === index;

  return (
    <TouchableOpacity
      style={[
        isSelected && showFrameImg
          ? {backgroundColor: Colors.PRIMARY}
          : {backgroundColor: Colors.white},
        styles.frame,
      ]}
      onPress={async () => {
        setLoading(true);
        await setLogoPosition({
          x: item?.contentLocation?.logo?.x_axis ?? 0,
          y: item?.contentLocation?.logo?.y_axis ?? 0,
          color: item?.contentLocation?.logo?.fontColor ?? '#fff',
          fontSize: item?.contentLocation?.logo?.fontSize ?? 18,
        });
        await setMobileNumPosition({
          x: item?.contentLocation?.mobileNumber?.x_axis ?? 100,
          y: item?.contentLocation?.mobileNumber?.y_axis ?? 200,
          color: item?.contentLocation?.mobileNumber?.fontColor ?? '#fff',
          fontSize: item?.contentLocation?.mobileNumber?.fontSize ?? 18,
        });
        await setEmailPosition({
          x: item?.contentLocation?.email?.x_axis ?? 50,
          y: item?.contentLocation?.email?.y_axis ?? 100,
          color: item?.contentLocation?.email?.fontColor ?? '#7160c7',
          fontSize: item?.contentLocation?.email?.fontSize ?? 18,
        });
        await setLocationPosition({
          x: item?.contentLocation?.address?.x_axis ?? 80,
          y: item?.contentLocation?.address?.y_axis ?? 100,
          color: item?.contentLocation?.address?.fontColor ?? '#2d235f',
          fontSize: item?.contentLocation?.address?.fontSize ?? 18,
        });
        await setWhatsAppPosition({
          x: item?.contentLocation?.whatsappNumber?.x_axis ?? 120,
          y: item?.contentLocation?.whatsappNumber?.y_axis ?? 100,
          color: item?.contentLocation?.whatsappNumber?.fontColor ?? '#fff',
          fontSize: item?.contentLocation?.whatsappNumber?.fontSize ?? 18,
        });

        setState(prev => ({
          ...prev,
          location: false,
          mobile: false,
          email: false,
          whatsApp: false,
          logo: false,
        }));
        setShowFrameImg(true);
        setFrameImg(item?.framePic);
        setSelectedIndex(index);

        setState(prev => ({
          ...prev,
          location: true,
          mobile: true,
          email: true,
          whatsApp: true,
          logo: true,
        }));
        setLoading(false);
      }}>
      <Image
        source={{uri: item?.framePic}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 5,
        }}
      />

      {/* <Text style={styles.frameText}>{item?.frameCode}</Text> */}
    </TouchableOpacity>
  );
};

export default FrameSelection;
