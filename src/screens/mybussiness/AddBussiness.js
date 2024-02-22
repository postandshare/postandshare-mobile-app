import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import BussinessSelect from './components/BussinessSelect';
import CustomButton from '../../components/CustomButton';
import BussinessType from './components/BussinessType';
import Colors from '../../constants/Colors';

const AddBussiness = () => {
  const [bussinessType, setBussinessType] = React.useState('Bussiness');
  //org bussiness type is for orginal bussiness type
  const [orgBussinessType, setOrgBussinessType] = useState('');
  return (
    <>
      <TopHeader titile={'AddBussiness'} />
      <View style={{backgroundColor: Colors.Background, flex: 1}}>
        {/* bussiness selection */}
        {!orgBussinessType && (
          <>
            {/* selection for bussiness */}
            <View style={{flex: 0.91}}>
              <Text style={{fontSize: 20, marginTop: 20, margin: 5}}>
                Select Bussiness Type
              </Text>
              <BussinessSelect
                setBussinessType={setBussinessType}
                bussinessType={bussinessType}
              />
            </View>

            <CustomButton
              title={'Next'}
              onPress={() => setOrgBussinessType(bussinessType)}
            />
          </>
        )}

        {orgBussinessType == 'Bussiness' ? (
          <BussinessType/>
        ) : orgBussinessType == 'Political' ? (
          <View>
            <Text>This is political bussiness</Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default AddBussiness;
