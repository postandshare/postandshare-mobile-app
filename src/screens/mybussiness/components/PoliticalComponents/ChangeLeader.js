import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import TopHeader from '../../../../components/TopHeader';
import Colors from '../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/CustomButton';
import ActionSheet from 'react-native-actions-sheet';
import AddLeaderSheet from '../actionsheets/AddLeaderSheet';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  addPoliticalLeader,
  getLeaderDetail,
  updatePoliticalBusinessLeader,
} from '../../../../services/userServices/political.services';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../components/Loader';

const ChangeLeader = ({route, navigation}) => {
  const {
    partyDocId,
    bussinessDocId,
    politicalData,
    state,
    district,
    legislativeAssembly,
  } = route?.params || {};

  const [choosenLeader, setChoosenLeader] = useState([]);
  const [choosenLeaderDocId, setChoosenLeaderDocId] = useState([]);
  const actionSheetRef = useRef(null);
  const onPressCross = () => {
    actionSheetRef?.current?.hide();
  };

  const handleImagePress = item => {
    if (choosenLeader.length >= 8) {
      return ToastAndroid.show(
        'You can select only 8 leaders',
        ToastAndroid.LONG,
      );
    }

    if (choosenLeader.includes(item?._id)) {
      setChoosenLeader(choosenLeader.filter(i => i !== item?._id));
      setChoosenLeaderDocId(choosenLeaderDocId.filter(i => i !== item?._id));
    } else {
      setChoosenLeaderDocId([...choosenLeaderDocId, item?._id]);
      setChoosenLeader([...choosenLeader, item?._id]);
    }
  };

  const {
    isLoading: getLeaderDetailLoading,
    isFetching: getLeaderDetailFetching,
    refetch: getLeaderDetailRefetch,
    data: getLeaderDetail_Data,
    isError: getLeaderDetail_isError,
  } = useQuery({
    queryKey: ['getLeaderDetail'],
    queryFn: () =>
      getLeaderDetail({
        // params
        partyDocId: partyDocId,
      }),
    onSuccess: async success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  const {
    mutate: updatePoliticalBusinessLeaderMutate,
    isLoading: updatePoliticalBusinessLeaderLoading,
  } = useMutation(updatePoliticalBusinessLeader, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      navigation.goBack();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  const {
    mutate: addPoliticalLeaderMutate,
    isLoading: addPoliticalLeaderLoading,
  } = useMutation(addPoliticalLeader, {
    onSuccess: ({data}) => {
      ToastAndroid.show(data?.message, ToastAndroid.LONG);
      navigation.goBack();
    },
    onError: err => {
      console.log(err?.response?.data?.message, 'err');
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      getLeaderDetailRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <ActionSheet ref={actionSheetRef}>
        <AddLeaderSheet
          onPressCross={onPressCross}
          addPoliticalLeaderMutate={addPoliticalLeaderMutate}
          partyDocId={partyDocId}
          state={state}
          district={district}
          legislativeAssembly={legislativeAssembly}
        />
      </ActionSheet>
      <TopHeader titile={'Change Leader'} />
      <Loader open={updatePoliticalBusinessLeaderLoading} text="Updating..." />
      <Loader open={addPoliticalLeaderLoading} text="Adding..." />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getLeaderDetailFetching}
            onRefresh={getLeaderDetailRefetch}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.root}
        nestedScrollEnabled={true}>
        <Text style={styles.label}>Please Select 8 Photos only from below</Text>

        {/* Great Person */}
        <Text style={styles.label}>Great Person</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {getLeaderDetail_Data?.data?.list?.greatLeader?.length > 0 &&
              getLeaderDetail_Data?.data?.list?.greatLeader?.map(
                (item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleImagePress(item)}
                      key={index}
                      style={styles.imageContainer}>
                      <View
                        style={[
                          styles.image,
                          choosenLeader.includes(item?._id)
                            ? {borderColor: 'green'}
                            : {},
                        ]}>
                        <Image
                          source={{uri: item?.leaderPhoto}}
                          style={styles.imageStyle}
                        />
                      </View>
                      <Text
                        style={[
                          styles.name,
                          choosenLeader.includes(item?._id)
                            ? {color: 'green'}
                            : {color: Colors.TEXT1},
                        ]}>
                        {item?.leaderName}
                      </Text>
                    </TouchableOpacity>
                  );
                },
              )}
          </View>
        </ScrollView>

        {/* Senior Leader in country */}
        <Text style={styles.label}>Senior Leader in Country</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {getLeaderDetail_Data?.data?.list?.seniorLeaderInCountry?.map(
              (item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleImagePress(item)}
                    key={index}
                    style={styles.imageContainer}>
                    <View style={styles.image}>
                      <Image
                        source={{uri: item?.leaderPhoto}}
                        style={styles.imageStyle}
                      />
                    </View>
                    <Text
                      style={[
                        styles.name,
                        choosenLeader.includes(item?._id)
                          ? {color: 'green'}
                          : {},
                      ]}>
                      {item?.leaderName}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </ScrollView>

        {/* Senior Leader in State */}
        <Text style={styles.label}>Senior Leader in State</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {getLeaderDetail_Data?.data?.list?.seniorLeaderInState?.map(
              (item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleImagePress(item)}
                    key={index}
                    style={styles.imageContainer}>
                    <View style={styles.image}>
                      <Image
                        source={{uri: item?.leaderPhoto}}
                        style={styles.imageStyle}
                      />
                    </View>
                    <Text
                      style={[
                        styles.name,
                        choosenLeader.includes(item?._id)
                          ? {color: 'green'}
                          : {},
                      ]}>
                      {item?.leaderName}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </ScrollView>

        {/* Leader's in your area */}
        <Text style={styles.label}>Leader's in your area</Text>
        <ScrollView style={styles.imgScrollContainer} nestedScrollEnabled>
          <View style={styles.imageWrap}>
            {getLeaderDetail_Data?.data?.list?.localLeader?.map(
              (item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleImagePress(item)}
                    key={index}
                    style={styles.imageContainer}>
                    <View style={styles.image}>
                      <Image
                        source={{uri: item?.leaderPhoto}}
                        style={styles.imageStyle}
                      />
                    </View>
                    <Text
                      style={[
                        styles.name,
                        choosenLeader.includes(item?._id)
                          ? {color: 'green'}
                          : {},
                      ]}>
                      {item?.leaderName}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
            <View style={styles.uploadView}>
              <TouchableOpacity
                style={styles.uploadContainer}
                onPress={() => {
                  actionSheetRef?.current?.show();
                }}>
                <AntDesign name="upload" size={30} color={Colors.TEXT1} />
              </TouchableOpacity>
              <Text style={styles.label}>Upload Here</Text>
            </View>
          </View>
        </ScrollView>

        <CustomButton
          title={'Confirm'}
          onPress={() => {
            updatePoliticalBusinessLeaderMutate({
              politicalBusinessDocId: bussinessDocId,
              politicalLeaderDetail: choosenLeaderDocId,
            });
          }}
        />
      </ScrollView>
    </>
  );
};

export default ChangeLeader;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.Background,
    bottom: 10,
  },
  label: {
    color: Colors.TEXT1,
    fontSize: 16,
    margin: 10,
  },
  imgScrollContainer: {
    maxHeight: 300,
  },
  imageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    margin: 8,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT1,
    width: 100,
    textAlign: 'center',
  },
  uploadContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    boorderWidth: 1,
    borderColor: Colors.TEXT1,
  },
  uploadView: {
    alignItems: 'center',
  },
});
