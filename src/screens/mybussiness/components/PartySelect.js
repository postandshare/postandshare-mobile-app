import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Colors from '../../../constants/Colors';
import {RadioButton} from 'react-native-paper';
import CustomTextInputFormik from '../../../components/CustomTextInputFormik';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/CustomButton';
import Sizes from '../../../constants/Sizes';
import Dropdown from '../../../components/Dropdown';
import {DISTRICTS, STATES} from '../../../constants';
import globalStyles from '../../../styles/globalStyles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getAllPartyDetails} from '../../../services/userServices/political.services';

const PartySelect = ({route, businessId, bussinessDetails}) => {
  // bussinessDetails and businessId is for the updating the bussiness details

  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('Bharatiya Janata Party');
  const [partyDocId, setPartyDocId] = useState('');

  const politicalFormik = useFormik({
    initialValues: {
      party: 'Bharatiya Janata Party',
      state: businessId
        ? bussinessDetails?.fetchExistingPoliticalBusiness?.state
        : '',
      district: businessId
        ? bussinessDetails?.fetchExistingPoliticalBusiness?.district
        : '',
      constituency: businessId
        ? bussinessDetails?.fetchExistingPoliticalBusiness?.legislativeAssembly
        : '',
    },
    validationSchema: Yup.object({
      party: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      district: Yup.string().required('Required'),
      constituency: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      console.log(values, 'values');
      navigation.navigate('Political Leader', {
        partyDocId: partyDocId,
        politicalData: values,
        // bussinessDetails: bussinessDetails,
        businessId: businessId,
      });
    },
  });

  const {
    isLoading: getAllPartyDetailsLoading,
    isFetching: getAllPartyDetailsFetching,
    refetch: getAllPartyDetailsRefetch,
    data: getAllPartyDetails_Data,
    isError: getAllPartyDetails_isError,
  } = useQuery({
    queryKey: ['getAllPartyDetails'],
    queryFn: () => getAllPartyDetails(),
    onSuccess: async success => {
      // console.log(success?.data, 'in success');
    },
    onError: err => {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      getAllPartyDetailsRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={getAllPartyDetailsFetching}
            onRefresh={getAllPartyDetailsRefetch}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.Background,
          bottom: 10,
        }}
        style={{
          alignSelf: 'center',
        }}>
        {/* party selection */}
        <Text
          style={{fontSize: 20, marginTop: 20, margin: 5, color: Colors.TEXT1}}>
          Select Party
        </Text>
        <View style={styles.partySelection_container}>
          {getAllPartyDetails_Data?.data?.list?.map((item, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
                <RadioButton
                  value={item}
                  status={checked === item ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(item);
                    setPartyDocId(item?._id);
                    politicalFormik.setFieldValue('party', item?.partyName);
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: Colors.TEXT1,
                  }}>
                  {item?.partyName}
                </Text>
              </View>
            );
          })}
        </View>

        {/* for selecting the state for current address */}
        <View
          style={{
            marginVertical: 5,
            width: Sizes.wp('91%'),
            marginHorizontal: 8,
          }}>
          <Text style={{color: Colors.TEXT1}}>Select State</Text>
          <Dropdown
            value={politicalFormik.values.state}
            label="Select State*"
            data={STATES?.map(item => ({label: item, value: item}))}
            onChangeValue={res => {
              console.log(res);
              politicalFormik.setValues(prev => ({
                ...prev,
                state: res,
              }));
            }}
          />
        </View>

        {politicalFormik.errors.state && politicalFormik.touched.state && (
          <Text style={globalStyles.error_text}>
            {politicalFormik.errors.state}
          </Text>
        )}

        {/* for district */}
        <View
          style={{
            marginVertical: 5,
            width: Sizes.wp('91%'),
            marginHorizontal: 8,
          }}>
          <Text style={{color: Colors.TEXT1}}>Select District</Text>
          <Dropdown
            value={politicalFormik.values.district}
            label="Select District*"
            data={DISTRICTS[
              STATES.indexOf(politicalFormik.values.state) + 1
            ]?.map(item => ({label: item, value: item}))}
            onChangeValue={res => {
              politicalFormik.setValues(prev => ({
                ...prev,
                district: res,
              }));
            }}
          />
        </View>
        {politicalFormik.errors.district &&
          politicalFormik.touched.district && (
            <Text style={globalStyles.error_text}>
              {politicalFormik.errors.district}
            </Text>
          )}

        <Text style={styles.label}>Constituency</Text>
        <View style={{marginHorizontal: 10}}>
          <CustomTextInputFormik
            formik={politicalFormik}
            name={'constituency'}
            label={'Constituency'}
          />
        </View>

        <CustomButton
          title={'Submit'}
          onPress={() => {
            politicalFormik?.handleSubmit();
          }}
        />
      </ScrollView>
    </>
  );
};

export default PartySelect;

const styles = StyleSheet.create({
  partySelection_container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.TEXT1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
