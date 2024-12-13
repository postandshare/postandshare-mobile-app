/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Sizes from '../../../../constants/Sizes';
import Colors from '../../../../constants/Colors';
import Dropdown from '../../../../components/Dropdown';
import {STATES} from '../../../../constants';
import {Text} from 'react-native-paper';
import ControllerInputOutlined from '../../../../components/ControllerInputOutlined';
import {Controller} from 'react-hook-form';
import globalStyles from '../../../../styles/globalStyles';
const AddressEdit = ({control, districtList}) => {
  return (
    <View style={styles.container}>
      <ControllerInputOutlined
        rules={{
          required: 'Address required',
        }}
        control={control}
        name={'caddress'}
        label={'Address'}
        width="95%"
      />
      {/* Drop Down for Selecting State in Current Address */}
      <View
        style={{
          position: 'relative',
          marginVertical: 10,
          width: '95%',
          alignSelf: 'center',
        }}>
        <Controller
          control={control}
          name="cstate"
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <>
              <Dropdown
                data={STATES?.map(item => ({label: item, value: item}))}
                value={value}
                label="State *"
                onChangeValue={res => onChange(res)}
              />
              {!!error && (
                <Text style={globalStyles?.error_text}>{error?.message}</Text>
              )}
            </>
          )}
        />
      </View>

      {/* Drop Down For Selecting the District once the state is selected in Current Address*/}
      <View
        style={{
          position: 'relative',
          marginVertical: 5,
          width: '95%',
          alignSelf: 'center',
        }}>
        <Controller
          rules={{
            required: 'District required',
          }}
          control={control}
          name="cdist"
          render={({field: {value, onChange}, fieldState: {error}}) => {
            return (
              <>
                <Dropdown
                  data={districtList?.map(item => ({
                    label: item,
                    value: item,
                  }))}
                  value={value}
                  label="District *"
                  onChangeValue={res => onChange(res)}
                />
                {!!error && (
                  <Text style={globalStyles?.error_text}>{error?.message}</Text>
                )}
              </>
            );
          }}
        />
      </View>

      <ControllerInputOutlined
        rules={{
          required: 'Pin code required',
          minLength: {
            value: 6,
            message: 'Pin code should be 6 digit',
          },
        }}
        control={control}
        name={'cpinCode'}
        label={'Pin Code'}
        width="95%"
        maxLength={6}
        keyboardType="number-pad"
      />
    </View>
  );
};

export default AddressEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Sizes.wp('95%'),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 6,
  },
});
