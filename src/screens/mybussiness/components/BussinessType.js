import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/CustomButton';

const BussinessType = ({bussinessTypeFormik}) => {
  const [formStep, setFormStep] = React.useState(1);
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        {/* bussiness type */}
        <View style={{alignItems: 'center'}}>
          <View
            style={[
              formStep === 1 ? {backgroundColor: Colors.PRIMARY} : null,
              styles.container,
            ]}>
            <Entypo name="user" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>
        {/* bussiness profile */}
        <View style={{alignItems: 'center'}}>
          <View style={[
              formStep === 2 ? {backgroundColor: Colors.PRIMARY} : null,
              styles.container,
            ]}>
            <FontAwesome5 name="hand-holding-usd" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>

        {/* patner */}
        <View style={{alignItems: 'center'}}>
          <View style={[
              formStep === 3 ? {backgroundColor: Colors.PRIMARY} : null,
              styles.container,
            ]}>
            <Ionicons name="people" size={20} />
          </View>
          <Text>BussinessType</Text>
        </View>
      </View>

      {formStep == 1 && (
        <View>
          <Text>Form 1</Text>
          <CustomButton title={'Next'} onPress={() => setFormStep(2)} />
        </View>
      )}
      {formStep == 2 && (
        <View>
          <Text>Form 2</Text>
          <CustomButton title={'Next'} onPress={() => setFormStep(3)} />
        </View>
      )}
      {formStep == 3 && (
        <View>
          <Text>Form 3</Text>
          <CustomButton
            title={'Next'}
            onPress={() => bussinessTypeFormik.handleSubmit()}
          />
        </View>
      )}
    </>
  );
};

export default BussinessType;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.TEXT1,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
