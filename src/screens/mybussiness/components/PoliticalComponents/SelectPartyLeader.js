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
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../../../components/TopHeader';
import Colors from '../../../../constants/Colors';
import ProfilePic from '../../../../components/ProfilePic';
import uploadFile from '../../../../utils/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomButton from '../../../../components/CustomButton';
import Loader from '../../../../components/Loader';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAllPartyDetails,
  getPoliticalPartyDetails,
  updatePoliticalBusinessLogo,
} from '../../../../services/userServices/political.services';
import {useFocusEffect} from '@react-navigation/native';

const SelectPartyLeader = ({route, navigation}) => {
  const {partyDocId, PoliticalBussinessDocId, politicalData, businessId} =
    route?.params || {};

  // bussinessDetails and businessId is for the updating the bussiness details

  // console.log(businessId, 'bussinessId');
  const [profilePic, setprofilePic] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState([]);
  const [selectedLeaderDocId, setSlectedLeaderDocId] = useState([]);
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
      updatePoliticalBusinessLogoMuatate({
        politicalBusinessDocId: businessId,
        partyLogo: uplode?.fileURL,
      });
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
      // eslint-disable-next-line no-lone-blocks
      {
        await success?.data?.obj?.fetchAllPoliticalLeader?.map(item => {
          setSelectedLeader(prev => {
            // Check if the item already exists in the array based on _id
            if (!prev.some(existingItem => existingItem._id === item._id)) {
              return [...prev, item]; // If it doesn't exist, add it to the array
            } else {
              return prev; // If it exists, return the previous array
            }
          });
        });
      }
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useEffect(() => {
    const fetchData = () => {
      const ids = [];
      getAllPartyDetails_Data?.data?.obj?.fetchAllPoliticalLeader?.forEach(
        item => {
          ids.push(item._id);
        },
      );
      setSlectedLeaderDocId([...new Set(ids)]);
    };
    fetchData();
  }, [getAllPartyDetails_Data]);

  const {
    mutate: updatePoliticalBusinessLogoMuatate,
    isLoading: updatePoliticalBusinessLogoLoading,
  } = useMutation(updatePoliticalBusinessLogo, {
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
      getPoliticalPartyDetailsRefetch();
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });

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

  useFocusEffect(
    useCallback(() => {
      businessId
        ? getPoliticalPartyDetailsRefetch()
        : getAllPartyDetailsRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <TopHeader titile={'Select Party Leader'} />
      <Loader
        open={imageUploading || updatePoliticalBusinessLogoLoading}
        text="Uploading Image"
      />
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
            imageUrl={
              businessId
                ? getPoliticalPartyDetails_Data?.data?.obj
                    ?.fetchExistingPoliticalBusiness?.partyLogo
                : profilePic
            }
            TakePhotofromGallery={
              businessId
                ? TakePhotofromGallery
                : () =>
                    ToastAndroid.show(
                      'You can not change the logo' +
                        '\n' +
                        'until the bussiness is registered.',
                      ToastAndroid.LONG,
                    )
            }
          />
          <View style={styles.partyNameCotainer}>
            <Text style={styles.label}>Party Name</Text>
            <Text style={styles.title}>
              {businessId
                ? getPoliticalPartyDetails_Data?.data?.obj
                    ?.fetchExistingPoliticalBusiness?.partyName ?? 'Party Name'
                : getAllPartyDetails_Data?.data?.obj?.fetchParty?.partyName}
            </Text>
            {/* from the prev screen */}
          </View>
        </View>

        {/* selected leader details which are upto max 8 */}
        <View style={styles.partyLeaderContainer}>
          <View style={styles.row_text_container}>
            <Text style={styles.title}>Selected Leader</Text>
            {businessId && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Change Leader', {
                    partyDocId: partyDocId,
                    bussinessDocId: businessId,
                    buinessDtata: politicalData,
                  });
                }}>
                <Text style={styles.changeLeader_text}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.imageWrap}>
            {businessId
              ? getPoliticalPartyDetails_Data?.data?.obj?.fetchPoliticalLeaders?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          margin: 5,
                          color: Colors.TEXT1,
                          width: 100,
                          textAlign: 'center',
                        }}>
                        <Image
                          source={{uri: item?.leaderDocId?.leaderPhoto}}
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
                            width: 100,
                          }}>
                          {item?.leaderDocId?.leaderName}
                        </Text>
                      </View>
                    );
                  },
                )
              : selectedLeader?.map((item, index) => {
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
                          width: 100,
                          textAlign: 'center',
                        }}>
                        {item?.leaderName}
                        {item?.leaderName}
                      </Text>
                    </View>
                  );
                })}
          </View>
        </View>

        <CustomButton
          title={'Next'}
          onPress={() => {
            navigation.navigate('PoliticalVolunteer', {
              partyDocId: partyDocId,
              selectedLeaderDocId: selectedLeaderDocId,
              politicalData: politicalData,
              partyLogo: profilePic,
              businessId: businessId,
            });
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
    justifyContent: 'center',
  },
});
