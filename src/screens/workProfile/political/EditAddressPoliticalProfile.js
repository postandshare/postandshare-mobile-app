import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import Sizes from '../../../constants/Sizes';
import Colors from '../../../constants/Colors';
import {useForm} from 'react-hook-form';
import ControllerSingleInput from '../../../components/common/ControllerSingleInput';
import ControllerDropdown from '../../../components/common/ControllerDropdown';
import {useMutation, useQuery} from '@tanstack/react-query';
import {updatePoliticalProfileAddress} from '../../../services/userServices/political.services';
import CustomButton from '../../../components/CustomButton';
import {
  getDistrictListByStateName,
  getStateList,
} from '../../../services/userServices/misc.services';
import Loader from '../../../components/Loader';
import NavigationScreenName from '../../../constants/NavigationScreenName';

const EditAddressPoliticalProfile = ({navigation, route}) => {
  const [state, setState] = useState({
    fetch: false,
    partyList: [],
    stateList: [],
    districtList: [],
  });
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {
      profileDocId: route.params?.data?._id,
      address: {
        address: route.params?.data?.address?.address,
        dist: route.params?.data?.address?.dist,
        state: route.params?.data?.address?.state,
        tehsil: route.params?.data?.address?.tehsil,
        pinCode: route.params?.data?.address?.pinCode,
      },
    },
  });
  const watchState = watch('address.state');
  const onSubmit = data => {
    console.log(data, 'in params');
    updatePoliticalProfileAddressMutate(data);
  };
  const {
    mutate: updatePoliticalProfileAddressMutate,
    isLoading: updatePoliticalProfileAddressLoading,
  } = useMutation({
    mutationKey: ['updatePoliticalProfileAddress'],
    mutationFn: updatePoliticalProfileAddress,
    onSuccess: success => {
      ToastAndroid.show(success?.data?.message, ToastAndroid.LONG);
      navigation.replace(NavigationScreenName.WORK_PROFILE_LIST);
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
  });
  useQuery({
    queryKey: ['getStateList'],
    onSuccess: success => {
      setState(prev => ({
        ...prev,
        stateList: success?.data?.stateList?.map(res => ({
          value: res,
          label: res,
        })),
      }));
    },
    queryFn: getStateList,
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
  });

  useQuery({
    queryKey: ['getDistrictList', watchState],
    queryFn: () => getDistrictListByStateName({stateName: watchState}),
    onSuccess: success => {
      setState(prev => ({
        ...prev,
        districtList: success?.data?.districtList?.map(res => ({
          value: res,
          label: res,
        })),
      }));
    },
    onError: error => {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG);
    },
    enabled: watchState ? true : false,
  });
  return (
    <>
      <Loader
        open={updatePoliticalProfileAddressLoading}
        text="Submitting Form"
      />
      <View style={styles.root}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Political Address </Text>
          <View style={styles.white_box}>
            <View>
              {/* address */}
              <ControllerSingleInput
                name="address.address"
                control={control}
                label="Address"
                placeholder="Type Address"
                rules={{
                  required: 'Address required',
                }}
              />
              {/* tehsil */}
              <ControllerSingleInput
                name="address.tehsil"
                control={control}
                label="Legislative Assembly / Tehsil"
                placeholder="Type assembly / tehsil"
                rules={{
                  required: 'Assembly/Tehsil required',
                }}
              />
              {/* state */}
              <ControllerDropdown
                name="address.state"
                control={control}
                label="State"
                placeholder="Select State"
                data={state.stateList}
                mode={'modal'}
                rules={{
                  required: 'State required',
                }}
              />
              {/* dist */}
              <ControllerDropdown
                rules={{required: 'District required'}}
                name="address.dist"
                control={control}
                label="District"
                placeholder="Select District"
                data={state.districtList}
                disabled={watchState ? false : true}
              />
              {/* pin code */}
              <ControllerSingleInput
                name="address.pinCode"
                control={control}
                label="Pin Code"
                placeholder="Type pin code"
                keyboardType="number-pad"
                maxLength={6}
                rules={{
                  required: 'Pin Code required',
                  minLength: {
                    value: 6,
                    message: 'Pin code should be 6 digit',
                  },
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.submit_button}>
          <CustomButton title={'Update'} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </>
  );
};

export default EditAddressPoliticalProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: Sizes.wp('5%'),
    paddingBottom: Sizes.hp('10%'),
  },
  submit_button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 17,
    marginVertical: 7,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  white_box: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  party_select_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT,
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 3,
  },
  part_img_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  party_icon: {
    height: Sizes.hp('6%'),
    width: Sizes.hp('6%'),
    borderRadius: Sizes.hp('3%'),
    resizeMode: 'cover',
  },
  party_select_text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  second_sroll_box: {
    maxHeight: Sizes.hp('35%'),
  },
  second_sroll_container: {
    paddingVertical: 5,
  },
});
