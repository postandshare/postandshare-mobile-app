/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import authStyle from './authStyle';
import Colors from '../../constants/Colors';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteRegionalLanguage,
  getSelectedRegionalLanguages,
  upsertRegionalLanguage,
} from '../../services/userServices/profile.services';
import {getRegionalLanguages} from '../../services/userServices/misc.services';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {useSelector} from 'react-redux';
import TopHeader from '../../components/TopHeader';
import {Checkbox} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import images from '../../constants/images';
import Sizes from '../../constants/Sizes';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LanguageSelection = ({navigation}) => {
  const {isProfileUpdated} = useSelector(store => store.commonStore);
  const [selectReginalLan, setRiginalLan] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    isLoading: getSelectedRegionalLanguagesLoading,
    isFetching: getSelectedRegionalLanguagesFetching,
    refetch: getSelectedRegionalLanguagesRefetch,
  } = useQuery({
    queryKey: ['getSelectedRegionalLanguages'],
    queryFn: () => getSelectedRegionalLanguages(),
    onSuccess: success => {
      const selectedLanguages = [];
      success?.data?.list?.map(item => {
        selectedLanguages.push(item?.languageDocId);
      });
      setRiginalLan(selectedLanguages);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  const {
    isLoading: getRegionalLanguagesLoading,
    isFetching: getRegionalLanguagesFetching,
    refetch: getRegionalLanguagesRefetch,
    data: getRegionalLanguages_Data,
  } = useQuery({
    queryKey: ['getRegionalLanguages'],
    queryFn: () => getRegionalLanguages(),
    onSuccess: success => {},
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const {
    mutate: upsertRegionalLanguageMuatate,
    isLoading: upsertRegionalLanguageLoading,
  } = useMutation(upsertRegionalLanguage, {
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });
  const {
    mutate: deleteRegionalLanguageMuatate,
    isLoading: deleteRegionalLanguageLoading,
  } = useMutation(deleteRegionalLanguage, {
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    },
  });

  return (
    <>
      {/* imagebackground */}
      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader titile={'Select Language'} logout={true} />
        <View style={styles.container}>
          <View style={styles.upper_part}>
            {/* flatlist for rendering the regional language */}
            <FlatList
              contentContainerStyle={{
                justifyContent: 'space-between',
                padding: 10,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={
                    getRegionalLanguagesFetching ||
                    getSelectedRegionalLanguagesFetching ||
                    upsertRegionalLanguageLoading ||
                    deleteRegionalLanguageLoading ||
                    getSelectedRegionalLanguagesLoading ||
                    getRegionalLanguagesLoading ||
                    loading
                  }
                  onRefresh={
                    getSelectedRegionalLanguagesRefetch &&
                    getRegionalLanguagesRefetch
                  }
                />
              }
              data={getRegionalLanguages_Data?.data?.list}
              keyExtractor={item => item?._id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.text_wrapper}
                  activeOpacity={0.5}
                  onPress={async () => {
                    if (selectReginalLan.includes(item?._id)) {
                      setRiginalLan(
                        selectReginalLan.filter(id => id !== item?._id),
                      );
                      deleteRegionalLanguageMuatate({
                        languageDocId: item?._id,
                      });
                    } else {
                      setRiginalLan([...selectReginalLan, item?._id]);
                      upsertRegionalLanguageMuatate({
                        languageDocId: item?._id,
                      });
                    }
                  }}>
                  <Checkbox
                    status={
                      selectReginalLan.includes(item?._id)
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                  <Text style={styles.check_box_text}>
                    {item?.languageName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={authStyle.bottom_content_root_Language}>
            <Button
              disabled={selectReginalLan?.length === 0 ? true : false}
              mode="contained"
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  navigation.navigate(NavigationScreenName?.MAIN_NAVIGATOR);
                }, 1000);
              }}>
              {loading ? 'Please wait...' : 'Save'}
            </Button>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default LanguageSelection;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',

    marginVertical: 10,
  },

  upper_part: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: Colors.white,
    borderColor: '#4141412F',
    width: '90%',
    maxHeight: Sizes.hp('70%'),
  },
  text_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  check_box_text: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
