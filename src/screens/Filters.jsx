/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import Background from '../utils/Background';
import { H6, Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import Backbtn from '../components/Backbtn';
import { Refresh2 } from 'iconsax-react-native';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');
const Filters = ({ navigation }) => {
    return (
        <Background noBackground>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Backbtn style={{ flex: 1 }} dark position="static" onPress={() => navigation.goBack()} />
                <H6 style={{ flex: 4, textAlign: 'center', fontFamily: 'Inter_28pt-Regular' }} theme="dark">Filter</H6>
                <Pera style={{flex: 1, textAlign: 'center', fontFamily: 'Inter_28pt-Regular', paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30, backgroundColor: Color('darkTheme')}}>Clear</Pera>
            </View>
            <Br space={0.03} />
            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Property Type</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Any</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnBackground'), backgroundColor: Color('btnBackground'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }}>House</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Office</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Hotel</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Whole Building</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Town House</Small>
                </View>
            </View>
            <Br space={0.03} />
            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Location</H6>
            <Br space={0.02} />
            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular', fontWeight: 'bold' }}>City</Pera>
            <Br space={0.01} />
            <TextInput style={{borderColor: Color('btnOutline'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} placeholder="Lorem ipsum dolor sit init" />
            <Br space={0.02} />
            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular', fontWeight: 'bold' }}>State</Pera>
            <Br space={0.01} />
            <TextInput style={{borderColor: Color('btnOutline'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} placeholder="Lorem ipsum dolor sit init" />
            <Br space={0.03} />

            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Price Range</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                    <TextInput placeholder="$300" style={{borderColor: Color('btnOutline'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Min</H6>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TextInput placeholder="$300" style={{borderColor: Color('btnOutline'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Max</H6>
                </View>
            </View>
            <Br space={0.05} />

            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Bedroom</Pera>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">1</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnBackground'), backgroundColor: Color('btnBackground'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }}>2</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">3</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">4</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">5</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">6</Small>
                </View>
            </View>
            <Br space={0.03} />

            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Bathroom</Pera>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">1</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnBackground'), backgroundColor: Color('btnBackground'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }}>2</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">3</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">4</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">5</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">6</Small>
                </View>
            </View>
            <Br space={0.05} />

            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Area Range (Sqft)</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                    <TextInput placeholder="300 Sqft" style={{borderColor: Color('btnOutline'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Min</H6>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TextInput placeholder="300 Sqft" style={{borderColor: Color('btnOutline'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Max</H6>
                </View>
            </View>
            <Br space={0.05} />

            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Amenities</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Laundry</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnBackground'), backgroundColor: Color('btnBackground'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }}>Parking</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">Dryer</Small>
                </View>
                <View style={{ borderWidth: 1, borderColor: Color('btnOutline'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme="dark">WiFi</Small>
                </View>
            </View>
            <Br space={0.05} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Refresh2
                        size="25"
                        color={Color('btnBackground')}
                    />
                    <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Reset all</Pera>
                </View>
                <Button style={{backgroundColor: Color('darkTheme')}} onPress={() => navigation.navigate('ListedProperties')}>
                    Search Properties
                </Button>
            </View>
            <Br space={0.05} />
        </Background>
    );
};

export default Filters;
