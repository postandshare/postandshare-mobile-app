import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import BussinessSelect from './components/BussinessSelect';
import CustomButton from '../../components/CustomButton';
import BussinessType from './components/BussinessType';
import Colors from '../../constants/Colors';
import PartySelect from './components/PartySelect';

const AddBussiness = ({route}) => {
  const {businessId, bussinessDetails} = route.params ?? {};
  // console.log(bussinessDetails?.businessType, 'bussinessId');
  const [bussinessType, setBussinessType] = React.useState(
    bussinessDetails?.businessType === 'bussiness' ? 'Bussiness' : 'Political',
  );
  console.log(bussinessDetails?.fetchExistingPoliticalBusiness?.businessType);
  //org bussiness type is for orginal bussiness type
  const [orgBussinessType, setOrgBussinessType] = useState(
    bussinessDetails?.fetchExistingPoliticalBusiness?.businessType ? bussinessDetails?.fetchExistingPoliticalBusiness?.businessType : '',
  );
  return (
    <>
      <TopHeader titile={'AddBussiness'} />
      <View style={{backgroundColor: Colors.Background, flex: 1}}>
        {/* bussiness selection */}
        {!orgBussinessType && (
          <>
            {/* selection for bussiness */}
            <View style={{flex: 0.91}}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  margin: 5,
                  color: Colors.TEXT1,
                }}>
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
          <BussinessType bussinessDetails={bussinessDetails} />
        ) : orgBussinessType == 'political' ? (
          <PartySelect
            businessId={businessId}
            bussinessDetails={bussinessDetails}
          />
        ) : null}
      </View>
    </>
  );
};

export default AddBussiness;
