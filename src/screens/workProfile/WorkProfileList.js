/* eslint-disable react-hooks/exhaustive-deps */
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import styles from './style';
import CustomButton from '../../components/CustomButton';
import {useQuery} from '@tanstack/react-query';
import images from '../../constants/images';
import globalStyles from '../../styles/globalStyles';
import {Menu, Portal, TextInput, Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ViewBussinessModal from './components/modal/ViewBussinessModal';
import NavigationScreenName from '../../constants/NavigationScreenName';
import {getProfileListForContent} from '../../services/userServices/profile.services';
import ShowProfileCard from '../../components/ShowProfileCard';
import {useIsFocused} from '@react-navigation/native';

const WorkProfileList = ({navigation, route}) => {
  const {picData} = route.params || {};
  const isFocused = useIsFocused();
  const [state, setState] = useState({viewModal: false, selectedItem: {}});
  const [searchQuery, setSearchQuery] = useState('');

  const [visible, setVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Newest');
  const [bussinessList, setBussinessList] = useState([]);
  const handleOnPressCard = item => {
    if (picData) {
      navigation.navigate(NavigationScreenName.SDK_SCREEN, {
        picData: picData,
        profileDetail: item,
      });
      return;
    }
    setState(prev => ({...prev, selectedItem: item, viewModal: true}));
  };
  const {
    isLoading: getProfileListForContentLoading,
    isFetching: getProfileListForContentFetching,
    refetch: getProfileListForContentRefetch,
  } = useQuery({
    queryKey: ['getProfileListForContent', isFocused],
    queryFn: () => getProfileListForContent(),
    onSuccess: success => {
      setBussinessList(success?.data?.list);
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  const filteredBusinesses = bussinessList?.filter(business =>
    business?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedBusinesses = [...(filteredBusinesses || [])].sort((a, b) => {
    switch (sortOption) {
      case 'AtoZ':
        return a?.name?.localeCompare(b?.name);
      case 'ZtoA':
        return b?.name?.localeCompare(a?.name);
      case 'Newest':
        return new Date(b?.createdOn) - new Date(a?.createdOn);
      case 'Oldest':
        return new Date(a?.createdOn) - new Date(b?.createdOn);
      default:
        return 0;
    }
  });

  return (
    <>
      <Portal>
        <ViewBussinessModal
          refetch={getProfileListForContentRefetch}
          item={state.selectedItem}
          open={state.viewModal}
          onClose={() =>
            setState(prev => ({...prev, selectedItem: {}, viewModal: false}))
          }
          handleEdit={() => {
            if (state.selectedItem?.categoryGroup === 'politics') {
              navigation.navigate(NavigationScreenName.EDIT_POLITICAL_PROFILE, {
                data: state.selectedItem,
              });
            } else if (state.selectedItem?.categoryGroup === 'business') {
              navigation.navigate(
                NavigationScreenName.ADD_EDIT_BUSINESS_STEP1,
                {
                  businessDocId: state.selectedItem?.profileDocId,
                },
              );
            } else {
              navigation.navigate(NavigationScreenName.PROFILE);
            }
          }}
        />
      </Portal>

      <ImageBackground
        source={images.background}
        style={globalStyles.backgroundImage}>
        <TopHeader
          titile={'Work Profile List'}
          add
          onPress={() =>
            navigation.navigate(NavigationScreenName.SELECT_WORK_PROFILE)
          }
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                getProfileListForContentFetching ||
                getProfileListForContentLoading
              }
              onRefresh={() => getProfileListForContentRefetch()}
            />
          }
          contentContainerStyle={styles.root}>
          <View style={styles.container}>
            {/* search option for bussineess */}
            <View style={styles.row_container}>
              <TextInput
                mode="outlined"
                label={'Search'}
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
              />
              <Menu
                visible={visible}
                contentStyle={{
                  backgroundColor: Colors.Background,
                }}
                onDismiss={() => setVisible(false)}
                anchor={
                  <TouchableOpacity
                    style={styles.sortButtonContainer}
                    onPress={() => setVisible(true)}>
                    <FontAwesome name="sort" size={15} color={Colors.white} />
                    <Text style={styles.sortText}>
                      {sortOption === 'Newest' ? 'Newest' : sortOption}
                    </Text>
                  </TouchableOpacity>
                }>
                <Menu.Item
                  title="A to Z"
                  onPress={() => {
                    setSortOption('AtoZ');
                    setVisible(false);
                  }}
                  icon={sortOption === 'AtoZ' ? 'check' : 'none'}
                />
                <Menu.Item
                  title="Z to A"
                  onPress={() => {
                    setSortOption('ZtoA');
                    setVisible(false);
                  }}
                  icon={sortOption === 'ZtoA' ? 'check' : 'none'}
                />
                <Menu.Item
                  title="Newest"
                  onPress={() => {
                    setSortOption('Newest');
                    setVisible(false);
                  }}
                  icon={sortOption === 'Newest' ? 'check' : 'none'}
                />
                <Menu.Item
                  title="Oldest"
                  onPress={() => {
                    setSortOption('Oldest');
                    setVisible(false);
                  }}
                  icon={sortOption === 'Oldest' ? 'check' : 'none'}
                />
              </Menu>
            </View>

            {searchQuery.length > 0 && sortedBusinesses.length === 0 && (
              <View style={styles.padded}>
                <CustomButton
                  title={'No Business Found'}
                  secondary={false}
                  customStyle={styles.premium_Buttton}
                />
              </View>
            )}

            {sortedBusinesses?.map((item, index) => (
              <ShowProfileCard
                key={index}
                item={item}
                onPress={() => handleOnPressCard(item)}
              />
            ))}

            {/* card for the bussiness name and update */}
            {!searchQuery &&
              !sortedBusinesses?.length &&
              bussinessList?.map((item, index) => (
                <ShowProfileCard
                  key={index}
                  item={item}
                  onPress={() => handleOnPressCard(item)}
                />
              ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default WorkProfileList;
