/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, TextInput, View } from 'react-native';
import Background from '../utils/Background';
import { H6, Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import Backbtn from '../components/Backbtn';
import { Refresh2 } from 'iconsax-react-native';
import { Button } from '../components/Button';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';
import Dropdown from '../components/Dropdown';

const { width, height } = Dimensions.get('window');
const Filters = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [ filterOptions, setFilterOptions ] = useState();
    const [ amenity, setAmenity ] = useState('');
    const [ propertyType, setPropertyType ] = useState('');
    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');
    const [ min, setMin ] = useState(0);
    const [ max, setMax ] = useState(0);
    const [ beds, setBeds ] = useState(1);
    const [ baths, setBaths ] = useState(1);
    const [ areaMin, setAreaMin ] = useState(0);
    const [ areaMax, setAreaMax ] = useState(0);

    useEffect(() => {
        if (isFocused) {loadData();}
    }, [isFocused]);

    const loadData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/filter/data', {headers: {Authorization: `Bearer ${token}`}});
            setFilterOptions(res.data?.data);
        } catch(err) {
            await errHandler(err);
        }
    };

    const resetFilters = () => {
        setAmenity('');
        setPropertyType('');
        setState('');
        setCity('');
        setMin(0);
        setMax(0);
        setBeds(1);
        setBaths(1);
        setAreaMin(0);
        setAreaMax(0);
    }

    if (!filterOptions) {
        return <Loading />;
    }

    const propertyTypes = filterOptions[0];
    const amenities = filterOptions[1];
    const states = filterOptions[2];
    const cities = filterOptions[3];

    const arr = [];
    amenities.map(val => {
        arr.push(val?.tags);
    });
    const amentitiesList = arr.join(', ').split(', ');
    const uniqueAmentitiesList = [...new Set(amentitiesList)];

    return (
        <Background noBackground>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Backbtn style={{ flex: 1 }} dark position="static" onPress={() => navigation.goBack()} />
                <H6 style={{ flex: 4, textAlign: 'center', fontFamily: 'Inter_28pt-Regular' }} theme="dark">Filter</H6>
                <Pressable onPress={resetFilters}>
                    <Pera style={{flex: 1, textAlign: 'center', fontFamily: 'Inter_28pt-Regular', paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30, backgroundColor: Color('darkTheme')}}>Clear</Pera>
                </Pressable>
            </View>
            <Br space={0.03} />
            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Property Type</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <Pressable onPress={() => setPropertyType('')} style={{ borderWidth: 1, backgroundColor: propertyType === '' ? Color('btnBackground') : null, borderColor: propertyType === '' ? Color('btnBackground') : Color('gray'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={propertyType === '' ? null : 'dark'}>Any</Small>
                </Pressable>
                {
                    propertyTypes.map((val, index) => {
                        const isActive = propertyType.includes(val?.label.toLowerCase());
                        return (
                            <Pressable onPress={() => setPropertyType(val?.label.toLowerCase())} key={index} style={{ borderWidth: 1, borderColor: isActive ? Color('btnBackground') : Color('gray'), backgroundColor: isActive ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                                <Small style={{ fontFamily: 'Inter_28pt-Regular', textTransform: 'capitalize' }} theme={isActive ? null : 'dark'}>{val?.label}</Small>
                            </Pressable>
                        );
                    })
                }
            </View>
            <Br space={0.03} />
            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Location</H6>
            <Br space={0.02} />
            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular', fontWeight: 'bold' }}>State</Pera>
            <Br space={0.01} />
            <Dropdown
                data={states}
                selectedValue={state}
                onValueChange={(value) => setState(value)}
                style={undefined}
                defaultStyle
                label={undefined}
                icon={undefined}
            />
            <Br space={0.02} />
            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular', fontWeight: 'bold' }}>City</Pera>
            <Br space={0.01} />
            <Dropdown
                data={cities}
                selectedValue={city}
                onValueChange={(value) => setCity(value)}
                style={undefined}
                defaultStyle
                label={undefined}
                icon={undefined}
            />
            <Br space={0.03} />

            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Price Range</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                    <TextInput value={min} onChangeText={(value) => setMin(parseFloat(value))} keyboardType="numeric" placeholder="$300" style={{borderColor: Color('gray'), color: Color('darkTheme'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Min</H6>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TextInput value={max} onChangeText={(value) => setMax(parseFloat(value))} keyboardType="numeric" placeholder="$300" style={{borderColor: Color('gray'), color: Color('darkTheme'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Max</H6>
                </View>
            </View>
            <Br space={0.05} />

            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Bedroom</Pera>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <Pressable onPress={() => setBeds(1)} style={{ borderWidth: 1, borderColor: beds === 1 ? Color('btnBackground') : Color('gray'), backgroundColor: beds === 1 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={beds === 1 ? null : 'dark'}>1</Small>
                </Pressable>
                <Pressable onPress={() => setBeds(2)} style={{ borderWidth: 1, borderColor: beds === 2 ? Color('btnBackground') : Color('gray'), backgroundColor: beds === 2 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={beds === 2 ? null : 'dark'}>2</Small>
                </Pressable>
                <Pressable onPress={() => setBeds(3)} style={{ borderWidth: 1, borderColor: beds === 3 ? Color('btnBackground') : Color('gray'), backgroundColor: beds === 3 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={beds === 3 ? null : 'dark'}>3</Small>
                </Pressable>
                <Pressable onPress={() => setBeds(4)} style={{ borderWidth: 1, borderColor: beds === 4 ? Color('btnBackground') : Color('gray'), backgroundColor: beds === 4 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={beds === 4 ? null : 'dark'}>4</Small>
                </Pressable>
                <Pressable onPress={() => setBeds(5)} style={{ borderWidth: 1, borderColor: beds === 5 ? Color('btnBackground') : Color('gray'), backgroundColor: beds === 5 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={beds === 5 ? null : 'dark'}>5</Small>
                </Pressable>
                <Pressable onPress={() => setBeds(6)} style={{ borderWidth: 1, borderColor: beds === 6 ? Color('btnBackground') : Color('gray'), backgroundColor: beds === 6 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={beds === 6 ? null : 'dark'}>6</Small>
                </Pressable>
            </View>
            <Br space={0.03} />

            <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Bathroom</Pera>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                <Pressable onPress={() => setBaths(1)} style={{ borderWidth: 1, borderColor: baths === 1 ? Color('btnBackground') : Color('gray'), backgroundColor: baths === 1 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={baths === 1 ? null : 'dark'}>1</Small>
                </Pressable>
                <Pressable onPress={() => setBaths(2)} style={{ borderWidth: 1, borderColor: baths === 2 ? Color('btnBackground') : Color('gray'), backgroundColor: baths === 2 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={baths === 2 ? null : 'dark'}>2</Small>
                </Pressable>
                <Pressable onPress={() => setBaths(3)} style={{ borderWidth: 1, borderColor: baths === 3 ? Color('btnBackground') : Color('gray'), backgroundColor: baths === 3 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={baths === 3 ? null : 'dark'}>3</Small>
                </Pressable>
                <Pressable onPress={() => setBaths(4)} style={{ borderWidth: 1, borderColor: baths === 4 ? Color('btnBackground') : Color('gray'), backgroundColor: baths === 4 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={baths === 4 ? null : 'dark'}>4</Small>
                </Pressable>
                <Pressable onPress={() => setBaths(5)} style={{ borderWidth: 1, borderColor: baths === 5 ? Color('btnBackground') : Color('gray'), backgroundColor: baths === 5 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={baths === 5 ? null : 'dark'}>5</Small>
                </Pressable>
                <Pressable onPress={() => setBaths(6)} style={{ borderWidth: 1, borderColor: baths === 6 ? Color('btnBackground') : Color('gray'), backgroundColor: baths === 6 ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 10 }}>
                    <Small style={{ fontFamily: 'Inter_28pt-Regular' }} theme={baths === 6 ? null : 'dark'}>6</Small>
                </Pressable>
            </View>
            <Br space={0.05} />

            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Area Range (Sqft)</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                    <TextInput value={areaMin} onChangeText={(value) => setAreaMin(parseFloat(value))} keyboardType="numeric" placeholder="$300" style={{borderColor: Color('gray'), color: Color('darkTheme'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Min</H6>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TextInput value={areaMax} onChangeText={(value) => setAreaMax(parseFloat(value))} keyboardType="numeric" placeholder="$300" style={{borderColor: Color('gray'), color: Color('darkTheme'), borderRadius: 10, borderWidth: 1, paddingVertical: height * 0.015, paddingHorizontal: width * 0.05}} />
                    <Br space={0.01} />
                    <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Max</H6>
                </View>
            </View>
            <Br space={0.05} />

            <H6 theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Amenities</H6>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 15}}>
                {
                    uniqueAmentitiesList.map((val, index) => {
                        const isActive = amenity.includes(val.toLowerCase());
                        return (
                            <Pressable onPress={() => setAmenity(val.toLowerCase())} key={index} style={{ borderWidth: 1, borderColor: isActive ? Color('btnBackground') : Color('gray'), backgroundColor: isActive ? Color('btnBackground') : null, paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                                <Small style={{ fontFamily: 'Inter_28pt-Regular', textTransform: 'capitalize' }} theme={isActive ? null : 'dark'}>{val}</Small>
                            </Pressable>
                        );
                    })
                }
            </View>
            <Br space={0.05} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable onPress={resetFilters} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Refresh2
                        size="25"
                        color={Color('btnBackground')}
                    />
                    <Pera theme="dark" style={{ fontFamily: 'Inter_28pt-Regular' }}>Reset all</Pera>
                </Pressable>
                <Button style={{backgroundColor: Color('darkTheme')}} onPress={() => navigation.navigate('ListedProperties')}>
                    Search Properties
                </Button>
            </View>
            <Br space={0.05} />
        </Background>
    );
};

export default Filters;
