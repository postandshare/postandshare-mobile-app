/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {MotiScrollView, MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import Sizes from '../../../constants/Sizes';
import styles from '../style';
import Colors from '../../../constants/Colors';

const SkeletonLoading = () => {
  const Spacer = ({width = 16, height = 10}) => (
    <View style={{width, height}} />
  );
  return (
    <MotiScrollView>
      <MotiView
        transition={{
          type: 'timing',
        }}
        style={[styles.container, {}]}
        animate={{backgroundColor: Colors.transparent}}>
        {/* boxes for the navigation */}
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
            margin: 10,
          }}>
          <View
            style={{
              height: Sizes.hp('13%'),
              width: Sizes.wp('25%'),
              marginHorizontal: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.borderColor,
              justifyContent: 'center',
              marginVertical: 5,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Skeleton
              colorMode={'light'}
              radius="round"
              height={45}
              width={45}
            />
            <View style={{height: 15, width: Sizes.wp('29%')}} />
            <Skeleton
              height={Sizes.hp('2%')}
              width={Sizes.wp('15%')}
              colorMode="light"
            />
          </View>
          <View
            style={{
              height: Sizes.hp('13%'),
              width: Sizes.wp('25%'),
              marginHorizontal: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.borderColor,
              justifyContent: 'center',
              marginVertical: 5,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Skeleton
              colorMode={'light'}
              radius="round"
              height={45}
              width={45}
            />
            <View style={{height: 15, width: Sizes.wp('29%')}} />
            <Skeleton
              height={Sizes.hp('2%')}
              width={Sizes.wp('15%')}
              colorMode="light"
            />
          </View>
          <View
            style={{
              height: Sizes.hp('13%'),
              width: Sizes.wp('25%'),
              marginHorizontal: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.borderColor,
              justifyContent: 'center',
              marginVertical: 5,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Skeleton
              colorMode={'light'}
              radius="round"
              height={45}
              width={45}
            />
            <View style={{height: 15, width: Sizes.wp('29%')}} />
            <Skeleton
              height={Sizes.hp('2%')}
              width={Sizes.wp('15%')}
              colorMode="light"
            />
          </View>
        </View>
        <Spacer />

        {/* trending part */}
        <Skeleton
          height={Sizes.hp('25%')}
          width={Sizes.wp('90%')}
          colorMode="light"
        />
        <Spacer width={30} height={5} />
        <View style={{flexDirection: 'row', gap: 30, margin: 10}}>
          <Skeleton height={15} width={15} colorMode="light" radius={'round'} />
          <Skeleton height={15} width={15} colorMode="light" radius={'round'} />
          <Skeleton height={15} width={15} colorMode="light" radius={'round'} />
          <Skeleton height={15} width={15} colorMode="light" radius={'round'} />
        </View>

        {/* name of the list */}
        <View
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <Skeleton
            height={Sizes.hp('1%')}
            width={Sizes.wp('30%')}
            colorMode="light"
          />
        </View>
        <Spacer />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            margin: 1,
            left: 20,
            padding: 10,
          }}>
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
        </View>
        <Spacer />
        {/* name of the list */}
        <View
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <Skeleton
            height={Sizes.hp('1%')}
            width={Sizes.wp('30%')}
            colorMode="light"
          />
        </View>
        <Spacer />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            margin: 1,

            left: 20,
            padding: 10,
            marginBottom: 10,
          }}>
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
          <Skeleton
            height={Sizes.hp('15%')}
            width={Sizes.wp('32%')}
            colorMode="light"
          />
        </View>
      </MotiView>
    </MotiScrollView>
  );
};

export default SkeletonLoading;
