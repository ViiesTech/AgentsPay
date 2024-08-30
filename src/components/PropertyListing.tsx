/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Small, XSmall } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
// import { Book1 } from 'iconsax-react-native';

const { height, width } = Dimensions.get('window');

const PropertyListing = ({ style }: { style?: any }) => {
    return (
        <View style={[{ alignSelf: 'center', borderRadius: 10, position: 'relative', backgroundColor: Color('textColor'), padding: width * 0.015 }, style]}>
            {/* <View style={{ borderRadius: 100, backgroundColor: Color('danger'), position: 'absolute', zIndex: 1, padding: width * 0.02, top: height * 0.015, right: width * 0.035 }}>
                <Book1 size="10" color={Color('textColor')} />
            </View> */}
            <View style={{ left: width * 0.015, backgroundColor: Color('propertyPrice'), position: 'absolute', zIndex: 1, paddingHorizontal: width * 0.05, top: height * 0.02, paddingTop: height * 0.004 }}>
                <XSmall style={{ fontFamily: 'Poppins-SemiBold' }}>$125K</XSmall>
            </View>
            <Image style={{
                width: width * 0.41,
                height: height * 0.12,
                borderRadius: 10,
                shadowColor: Color('btnText'),
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
            }} source={{ uri: 'https://www.investopedia.com/thmb/bfHtdFUQrl7jJ_z-utfh8w1TMNA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/houses_and_land-5bfc3326c9e77c0051812eb3.jpg' }} resizeMode="cover" />
            <View style={{ paddingVertical: height * 0.015 }}>
                <Small numberOfLines={1} style={{ width: width * 0.4, color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>Regal Ridge Estates</Small>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <XSmall style={{ color: Color('gray') }}>Type</XSmall>
                    <XSmall style={{ color: Color('gray') }}>|</XSmall>
                    <XSmall style={{ color: Color('gray') }}>Penthouse</XSmall>
                </View>
                <Br space={0.003} />
                <View style={{
                    flexDirection: 'row',
                    rowGap: 10,
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bed_2.png')} resizeMode="contain" />
                        <XSmall style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>4 Beds</XSmall>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bath_2.png')} resizeMode="contain" />
                        <XSmall style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>4 Baths</XSmall>
                    </View>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/location_2.png')} resizeMode="contain" />
                    <XSmall numberOfLines={1} style={{ fontFamily: 'Jost-Regular', color: Color('gray'), width: width * 0.25 }}>39 West Street Johannesburg, 2198, SA</XSmall>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/size_2.png')} resizeMode="contain" />
                    <XSmall style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>1642 Sq</XSmall>
                </View>
            </View>
        </View>
    );
};

export default PropertyListing;
