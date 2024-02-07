import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableRipple} from 'react-native-paper';
import Colors from '../constants/Colors';

const Dropdown = ({
  label = 'Select',
  value = '',
  onChangeValue = () => {},
  data = [],
  refetch = () => {},
}) => {
  const [state, setState] = useState({
    show: false,
  });
  const onPressSelect = (res, item) => {
    setState(prev => ({...prev, show: false}));
    onChangeValue(res, item);
  };
  return (
    <View
      style={{
        borderColor: 'rgba(22, 75, 146, 0.15)',
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          refetch();
          setState(prev => ({...prev, show: !prev.show}));
        }}
        activeOpacity={0.5}
        style={{
          height: 40,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            opacity: value ? 1 : 0.6,
            flex: 1,
            color: Colors.TEXT1,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {data?.find(item => item.value === value)?.label ?? label}
        </Text>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <MaterialIcons
            name={state.show ? 'arrow-drop-up' : 'arrow-drop-down'}
            style={{fontSize: 26, color: Colors.PRIMARY}}
          />
        </View>
      </TouchableOpacity>
      {state.show && (
        <>
          <View
            style={{
              borderWidth: 0.5,
              borderStyle: 'solid',
              borderColor: '#000',
            }}
          />
          <View
            style={{
              paddingVertical: 10,
              borderRadius: 10,
              maxHeight: 200,
            }}>
            <ScrollView nestedScrollEnabled>
              {data?.map((item, i) => (
                <TouchableRipple
                  onPress={() => onPressSelect(item?.value, item)}
                  key={i}
                  style={{
                    padding: 5,
                    backgroundColor:
                      value === item?.value ? 'rgba(0, 0, 0, 0.35)' : null,
                  }}
                  rippleColor="rgba(0, 0, 0, 0.35)">
                  <Text style={{fontSize: 14, color: Colors.TEXT1}}>
                    {item?.label}
                  </Text>
                </TouchableRipple>
              ))}
            </ScrollView>
          </View>
        </>
      )}
      {/* dropdown item */}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
