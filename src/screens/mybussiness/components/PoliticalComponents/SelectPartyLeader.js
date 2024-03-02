import {
  Image,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import TopHeader from '../../../../components/TopHeader';
import Colors from '../../../../constants/Colors';
import ProfilePic from '../../../../components/ProfilePic';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomButton from '../../../../components/CustomButton';
import Loader from '../../../../components/Loader';
import {useQuery} from '@tanstack/react-query';
import {getAllPartyDetails} from '../../../../services/userServices/political.services';
import {useFocusEffect} from '@react-navigation/native';

const SelectedLeader = [
  {
    _id: 1,
    date: '2021-05-01',
    pic: require('../../../../assets/uploadPic/pic1.png'),
    name: 'Rahul Gandhi',
  },
  {
    _id: 2,
    date: '2021-05-02',
    pic: require('../../../../assets/uploadPic/pic2.png'),
    name: 'Narendra Modi',
  },
  {
    _id: 3,
    date: '2021-05-03',
    pic: require('../../../../assets/uploadPic/pic7.png'),
    name: 'Amit Shah',
  },
  {
    _id: 4,
    date: '2021-05-04',
    pic: require('../../../../assets/uploadPic/pic4.png'),
    name: 'Sonia Gandhi',
  },
  {
    _id: 5,
    date: '2021-05-05',
    pic: require('../../../../assets/uploadPic/pic5.png'),
    name: 'Manmohan Singh',
  },
  {
    _id: 6,
    date: '2021-05-06',
    pic: require('../../../../assets/uploadPic/pic6.png'),
    name: 'Rajnath Singh',
  },
  {
    _id: 7,
    date: '2021-05-07',
    pic: require('../../../../assets/uploadPic/pic7.png'),
    name: 'Arun Jaitley',
  },
];

const SelectPartyLeader = ({route, navigation}) => {
  const {partyDocId} = route?.params || {};
  console.log(partyDocId, 'in select party leader');
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

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
      // bussinessTypeFormik.setValues(prev => ({
      //   ...prev,
      //   logo: uplode?.fileURL,
      // }));
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

  const {
    isLoading: getAllPartyDetailsLoading,
    isFetching: getAllPartyDetailsFetching,
    refetch: getAllPartyDetailsRefetch,
    data: getAllPartyDetails_Data,
    isError: getAllPartyDetails_isError,
  } = useQuery({
    queryKey: ['getAllPartyDetails'],
    queryFn: () =>
      getAllPartyDetails({
        // params
        partyDocId: partyDocId,
      }),
    onSuccess: async success => {
      setprofilePic(success?.data?.obj?.fetchParty?.electionSymbol);
      // console.log(success?.data, 'in success');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    useCallback(
      () => {
        getAllPartyDetailsRefetch();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  );

  return (
    <>
      <TopHeader titile={'Select Party Leader'} />
      <Loader open={imageUploading} text="Uploading Image" />
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={getAllPartyDetailsFetching}
            onRefresh={getAllPartyDetailsRefetch}
          />
        }
        contentContainerStyle={styles.root}>
        {/* party selection name */}
        <View style={styles.partyLogoContainer}>
          <ProfilePic
            imageUrl={profilePic}
            TakePhotofromGallery={TakePhotofromGallery}
          />
          <View style={styles.partyNameCotainer}>
            <Text style={styles.label}>Party Name</Text>
            <Text style={styles.title}>
              {getAllPartyDetails_Data?.data?.obj?.fetchParty?.partyName}
            </Text>
            {/* from the prev screen */}
          </View>
        </View>

        {/* selected leader details which are upto max 8 */}
        <View style={styles.partyLeaderContainer}>
          <View style={styles.row_text_container}>
            <Text style={styles.title}>Selected Leader</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Change Leader', {
                  partyDocId: partyDocId,
                });
              }}>
              <Text style={styles.changeLeader_text}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageWrap}>
            {getAllPartyDetails_Data?.data?.obj?.fetchAllPoliticalLeader?.map(
              (item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      margin: 5,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item?.leaderPhoto}}
                      style={{
                        height: 100,
                        width: 100,
                        //backgroundColor: 'red'
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: Colors.TEXT1,
                      }}>
                      {item?.leaderName}
                    </Text>
                  </View>
                );
              },
            )}
          </View>
        </View>

        <CustomButton
          title={'Next'}
          onPress={() => {
            navigation.navigate('PoliticalVolunteer');
          }}
        />
      </ScrollView>
    </>
  );
};

export default SelectPartyLeader;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
  },
  partyLogoContainer: {
    margin: 10,
    flexDirection: 'row',
    gap: 10,
  },
  partyNameCotainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: Colors.TEXT1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  partyLeaderContainer: {
    margin: 10,
  },
  row_text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeLeader_text: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontStyle: 'italic',
  },
  imageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
});
