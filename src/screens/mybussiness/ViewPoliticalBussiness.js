import {
  Alert,
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
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {getPoliticalPartyDetails} from '../../services/userServices/political.services';
import {useQuery} from '@tanstack/react-query';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import CustomButton from '../../components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import uploadFile from '../../utils/uploadFile';
import {useFocusEffect} from '@react-navigation/native';

const ViewPoliticalBussiness = ({route, navigation}) => {
  const {businessId, businessType} = route?.params;
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const {
    isLoading: getPoliticalPartyDetailsLoading,
    isFetching: getPoliticalPartyDetailsFetching,
    refetch: getPoliticalPartyDetailsRefetch,
    data: getPoliticalPartyDetails_Data,
    isError: getPoliticalPartyDetails_isError,
  } = useQuery({
    queryKey: ['getPoliticalPartyDetails'],
    queryFn: () =>
      getPoliticalPartyDetails({
        politicalBusinessDocId: businessId,
      }),
    onSuccess: success => {
      //console.log(success?.data , "success in my bussiness")
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

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
      //   changeBusinessLogo({
      //     businessDocId: businessId,
      //     logo: uplode?.fileURL,
      //   });

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

  useFocusEffect(
    React.useCallback(() => {
      getPoliticalPartyDetailsRefetch();
    }, [getPoliticalPartyDetailsRefetch, navigation]),
  );

  return (
    <>
      <TopHeader
        titile={
          getPoliticalPartyDetails_Data?.data?.obj
            ?.fetchExistingPoliticalBusiness?.volunteerName ?? 'Party Name'
        }
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              getPoliticalPartyDetailsFetching ||
              getPoliticalPartyDetailsLoading
            }
            onRefresh={() => getPoliticalPartyDetailsRefetch()}
          />
        }
        style={{
          flex: 1,
        }}>
        {/* logo view */}
        <View style={styles.logo_view}>
          <View style={styles.logo_container}>
            <Image
              // source={images.profilePlaceholder}
              source={{
                uri:
                  getPoliticalPartyDetails_Data?.data?.obj
                    ?.fetchExistingPoliticalBusiness?.volunteerPhoto ?? '',
              }}
              style={styles.logo}
            />
          </View>
          <View style={{flex: 0.6}}>
            <Text style={styles.logo_text}>
              {getPoliticalPartyDetails_Data?.data?.obj
                ?.fetchExistingPoliticalBusiness?.volunteerName ?? '--'}
            </Text>
            {/* <Text style={styles.logo_text_subtitle}>
              {getPoliticalPartyDetails_Data?.data?.obj?.category ?? '--'} ||{' '}
              {getPoliticalPartyDetails_Data?.data?.obj?.subCategory ?? '--'} ||{' '}
              <Text style={{color: 'green', fontStyle: 'italic'}}>
                {getPoliticalPartyDetails_Data?.data?.obj?.businessStatus ??
                  '--'}
              </Text> */}
            {/* </Text> */}
          </View>
          <TouchableOpacity
            onPress={() => TakePhotofromGallery()}
            style={{flex: 0.1, justifyContent: 'center', left: 30}}>
            <FontAwesome style={{color: '#26A9E1'}} name={'edit'} size={25} />
          </TouchableOpacity>
        </View>

        {/* card for the ownner name */}
        <View style={styles.card_container}>
          <AntDesign name={'user'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.volunteerName ?? '--'}{' '}
            (
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.designation ?? '--'}
            )
          </Text>
        </View>
        {/* mobile number */}
        <View style={styles.card_container}>
          <AntDesign name={'mobile1'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.mobileNumber ?? '--'}
          </Text>
        </View>
        {/* whatsapp number */}
        <View style={styles.card_container}>
          <FontAwesome name={'whatsapp'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.whatsappNumber ?? '--'}
          </Text>
        </View>
        {/* mail */}
        {/* <View style={styles.card_container}>
          <AntDesign name={'mail'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj?.email ?? '--'}
          </Text>
        </View> */}
        {/* address */}
        <View style={styles.card_container}>
          <Entypo name={'location'} size={25} color={Colors.PRIMARY} />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.legislativeAssembly ?? '--'}
            {'\n'}
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.dist ?? '--'}
            {'\n'}
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.state ?? '--'}
          </Text>
        </View>
        {/* website */}
        {/* <View style={styles.card_container}>
          <MaterialCommunityIcons
            name={'web'}
            size={25}
            color={Colors.PRIMARY}
          />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj?.website ?? '--'}
          </Text>
        </View> */}
        {/* description */}
        <View style={styles.card_container}>
          <MaterialIcons
            name={'description'}
            size={25}
            color={Colors.PRIMARY}
          />
          <Text style={styles.card_text}>
            {getPoliticalPartyDetails_Data?.data?.obj
              ?.fetchExistingPoliticalBusiness?.volunteerDetail ?? '--'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.bussinessPartnerText}>Bussiness Partner</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Change Leader' ,{
                bussinessDocId: businessId,
                partyDocId: getPoliticalPartyDetails_Data?.data?.obj?.fetchExistingPoliticalBusiness?.partyDocId,
              });
            }}>
            <Text
              style={{
                color: 'blue',
                fontStyle: 'italic',
                marginHorizontal: 10,
              }}>
              Change Leader
            </Text>
          </TouchableOpacity>
        </View>
        {getPoliticalPartyDetails_Data?.data?.obj?.fetchPoliticalLeaders?.map(
          (item, index) => (
            <View style={styles.bussinessPartnerView}>
              <Image
                source={{uri: item?.leaderDocId?.leaderPhoto ?? ''}}
                style={{height: 60, width: 60, borderRadius: 50}}
              />
              <View style={{flex: 0.8}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: Colors.TEXT1,
                  }}>
                  {item?.leaderDocId?.leaderName ?? '--'}
                </Text>
                <Text
                  style={{
                    color: Colors.TEXT1,
                  }}>
                  {item?.leaderDocId?.designation}
                </Text>
              </View>
            </View>
          ),
        )}

        {/* add bussiness partner more
        <TouchableOpacity
          style={{
            marginBottom: 10,
          }}
          onPress={() => {
            actionSheetRef?.current?.show();
          }}>
          <Text
            style={{
              color: 'blue',
              fontStyle: 'italic',
              marginHorizontal: 10,
              textDecorationLine: 'underline',
            }}>
            Add more bussiness
          </Text>
        </TouchableOpacity> */}

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CustomButton
            title={'Delete'}
            onPress={() => {
              Alert.alert(
                'Delete Bussiness',
                'Are you sure you want to delete this bussiness?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      //   deleteBusinessMutate({bussinessDocId: businessId});
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            width="40%"
            customStyle={{backgroundColor: '#EA1C1C'}}
          />
          <CustomButton
            title={'Edit'}
            onPress={() => {
              navigation.navigate('Add Bussiness', {
                businessId: businessId,
                bussinessDetails: getPoliticalPartyDetails_Data?.data?.obj,
              });
            }}
            width="40%"
            customStyle={{marginBottom: 30}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ViewPoliticalBussiness;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  logo_view: {
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '',
    backgroundColor: '#9CDEFB60',
    padding: 10,
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  logo_container: {
    flex: 0.2,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  logo_text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3D3989',
    alignSelf: 'center',
  },
  logo_text_subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.TEXT1,
    alignSelf: 'center',
  },
  card_container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F0FBFF',
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    borderColor: '#3D398945',
    gap: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  card_text: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.TEXT1,
  },
  bussinessPartnerText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.TEXT1,
  },
  bussinessPartnerView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F0FBFF',
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    borderColor: '#3D398945',
    gap: 10,
    marginVertical: 5,
  },
});
