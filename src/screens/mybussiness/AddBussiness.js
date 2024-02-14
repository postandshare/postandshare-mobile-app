import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import BussinessSelect from './components/BussinessSelect';
import CustomButton from '../../components/CustomButton';
import BussinessType from './components/BussinessType';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AddBussiness = () => {
  const [bussinessType, setBussinessType] = React.useState('Bussiness');
  const [orgBussinessType, setOrgBussinessType] = useState('');

  const bussinessTypeFormik = useFormik({
    initialValues: {
      logo: '',
      bussinessCategory: '',
      bussinessSubCategory: '',

      // bussinessName: '',
      // bussinessDetail: '',
      // bussinessEmail: '',
      // bussinessWebsite: '',
      // bussinessAddress: '',
      // yourName: '',
      // yourDesignation: '',
      // yourMobile: '',
      // yourEmail: '',
      // yourwhatsapp: '',

      // isbussinessPatner: '',
      // bussinessPartnerName: '',
      // bussinessPartnerDesignation: '',
      // bussinessPartnerMobile: '',
      // bussinessPartnerEmail: '',
      // bussinessPartnerProfilePic: '',

    },
    validationSchema: yup.object({
      logo: yup
        .string()
        .required('Transport using is required'),

      bussinessCategory: yup.string().required('Bussiness Category is required'),
      bussinessSubCategory: yup.string().required('Bussiness Sub Category is required'),
    }),
    onSubmit: formValues => {
      console.log(formValues, 'in addbussiness formik');
    },
  });




  return (
    <>
      <TopHeader titile={'AddBussiness'} />

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
        <BussinessType bussinessTypeFormik={bussinessTypeFormik}/>
      ) : orgBussinessType == 'Political' ? (
        <View>
          <Text>This is political bussiness</Text>
        </View>
      ) : null}
    </>
  );
};

export default AddBussiness;
