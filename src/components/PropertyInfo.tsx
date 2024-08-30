/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
import { Book1 } from 'iconsax-react-native';
import { useNavigation } from '../utils/NavigationContext';

const { height, width } = Dimensions.get('window');

const PropertyInfo = () => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate('PropertyDetails')} style={{ width: width * 0.85, alignSelf: 'center', position: 'relative' }}>
            <View style={{ backgroundColor: Color('propertyPrice'), position: 'absolute', zIndex: 1, paddingHorizontal: width * 0.05, top: height * 0.02, paddingTop: height * 0.004 }}>
                <Small style={{ fontFamily: 'Poppins-SemiBold' }}>$125K</Small>
            </View>
            <View style={{ borderRadius: 100, backgroundColor: Color('gray'), position: 'absolute', zIndex: 1, padding: width * 0.02, top: height * 0.015, right: width * 0.035 }}>
                <Book1 size="20" color={Color('textColor')} />
            </View>
            <Image style={{
                width: width * 0.85,
                height: height * 0.3,
                borderRadius: 20,
                shadowColor: Color('btnText'),
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
            }} source={{ uri: 'https://www.investopedia.com/thmb/bfHtdFUQrl7jJ_z-utfh8w1TMNA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/houses_and_land-5bfc3326c9e77c0051812eb3.jpg' }} resizeMode="cover" />
            <View style={{ paddingHorizontal: width * 0.03, paddingTop: height * 0.02 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Pera style={{ fontFamily: 'Jost-SemiBold' }}>Regal Ridge Estates</Pera>
                    <Small style={{
                        fontFamily: 'Jost-SemiBold',
                        paddingVertical: height * 0.005,
                        paddingHorizontal: width * 0.06,
                        backgroundColor: Color('btnBackground'),
                        borderRadius: 10,
                    }}>House</Small>
                </View>
                <Br space={0.03} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/bed.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular' }}>4 Beds</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/bath.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular' }}>4 Baths</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/size.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular' }}>1642 Sq</Small>
                    </View>
                </View>
                <Br space={0.015} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/location.png')} resizeMode="contain" />
                    <Small style={{ fontFamily: 'Jost-Regular' }}>39 West Street Johannesburg, 2198, SA</Small>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PropertyInfo;
