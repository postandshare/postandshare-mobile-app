import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import Colors from '../../../../constants/Colors';
import globalStyles from '../../../../styles/globalStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../../../components/CustomButton';

const AddLeaderSheet = ({onPressCross}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [profilePic, setprofilePic] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderDesingation, setLeaderDesingation] = useState('');
  const uploadePhoto = async (path, mime) => {
    try {
      console.log(path, 'in uploade photo');
      setImageUploading(true);
      const uplode = await uploadFile({
        filePath: {path: path},
        fileLocation: `profile/${Date.now()}`,
        contentType: mime,
      });
      setImageUploading(false);
      console.log(uplode?.fileURL, 'uplode file url');
      //   updateSelfPhotoMutate({
      //     profilePic: uplode?.fileURL,
      //   //   });
      //   bussinessTypeFormik.setValues(prev => ({
      //     ...prev,
      //     bussinessPartnerPhoto: uplode?.fileURL,
      //   }));
      setprofilePic(uplode?.fileURL);
    } catch (error) {
      setImageUploading(false);
    }
  };

  // profile pic image picker
  const TakePhotofromGallery = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Post And Share App',
          message:
            'We want to access your photos' +
            'so you can take awesome pictures.',
        },
      );
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          console.log(image, 'imgae in the edit profile');
          uploadePhoto(image.path, image.mime);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Permission Denied', ToastAndroid.LONG);
    }
  };
  return (
    <>
      {/* header */}
      <View style={globalStyles.actionSheet_header}>
        <Text style={globalStyles.actionSheet_header_left_text}>
          Add Leader
        </Text>
        <View>
          <TouchableOpacity
            style={globalStyles.actionSheet_header_right}
            onPress={onPressCross}>
            <Entypo
              style={globalStyles.actionSheet_header_right_text}
              name="cross"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={globalStyles.divider_studentDetails} />

      {/* body */}
      <View style={styles.container}>
        {/* leader desingation */}
        <View style={styles.textInputField}>
          <Text color={Colors.TEXT1}>Leader Desingation</Text>
          <TextInput
            mode="outlined"
            style={{backgroundColor: 'white'}}
            placeholder="Leader Desingation"
            value={leaderDesingation}
            onChange={text => {
              () => setLeaderDesingation(text);
            }}
          />
        </View>

        <View style={styles.textInputField}>
          <Text color={Colors.TEXT1}>Leader Name</Text>
          <TextInput
            mode="outlined"
            style={{backgroundColor: 'white'}}
            placeholder="Leader Name"
            value={leaderName}
            onChange={text => {
              () => setLeaderName(text);
            }}
          />
        </View>

        {/* photo */}
        <TouchableOpacity
          style={styles.photoInput}
          onPress={() => {
            TakePhotofromGallery();
          }}>
          {profilePic ? (
            <Image
              source={{uri: profilePic}}
              style={{width: '100%', height: '100%', borderRadius: 10}}
            />
          ) : (
            <Text color={Colors.TEXT1}>Add Photo</Text>
          )}
        </TouchableOpacity>

        <CustomButton title={'Add'} onPress={() => {}} />
      </View>
    </>
  );
};

export default AddLeaderSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 10,
  },

  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputField: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
  },
  photoInput: {
    width: '25%',
    marginTop: 10,
    height: 90,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
