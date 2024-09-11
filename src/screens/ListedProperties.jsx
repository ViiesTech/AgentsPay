/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import Notificationbtn from '../components/Notificationbtn';
import Br from '../components/Br';
import Search from '../components/Search';
import NavigationBar from '../components/NavigationBar';
import Backbtn from '../components/Backbtn';
import PropertyListing from '../components/PropertyListing';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';
import { Pera, Small, XSmall } from '../utils/Text';

const { width, height } = Dimensions.get('window');
const ListedProperties = ({ navigation, route }) => {
    const params = route?.params;
    const isFocused = useIsFocused();

    const [ keywords, setKeywords ] = useState('');
    const [ list, setlist ] = useState();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        if (isFocused) {loadProperties();}
    }, [isFocused, page]);

    const loadProperties = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/listing?page=' + page, {headers: {Authorization: `Bearer ${token}`}});
            setlist(res.data?.data[0]);
            setMaxPage(res.data?.data[1]);
        } catch(err) {
            await errHandler(err, () => loadProperties());
        }
    };

    const loadMore = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/listing?page=' + page, {headers: {Authorization: `Bearer ${token}`}});
            setlist([...list, ...res.data?.data]);
            setPage(page + 1);
        } catch(err) {
            await errHandler(err, () => loadMore());
        }
    };

    if (!list) {
        return <Loading />;
    }

    return (
        <>
            <Background
                detectScrollEnd
                onScrollEnd={loadMore}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width * 0.9,
                }}>
                    <Backbtn position="static" onPress={() => navigation.goBack()} />
                    <Notificationbtn unSeen position="static" style={{marginTop: height * 0.01}} />
                </View>
                <Br space={0.03} />
                <Search
                    label="Property Listing"
                    navigation={navigation}
                    setKeywords={setKeywords}
                    noFilters
                />
                <Br space={0.03} />
                {
                    list.length === 0
                    ?
                    <Pera style={{textAlign: 'center'}}>No Property Listed</Pera>
                    :
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            list.filter(val => {
                                const property_type = val?.tbl_property_type?.label?.toLowerCase();
                                const search_property_type = params?.propertyType || '';

                                const state = val?.state?.toLowerCase();
                                const search_state = params?.state || '';

                                const city = val?.city?.toLowerCase();
                                const search_city = params?.city || '';

                                const value = val?.property_value;
                                const search_min = params?.min || 0;
                                const search_max = params?.max || 0;

                                const no_of_bedrooms = val?.no_of_bedrooms;
                                const search_no_of_bedrooms = params?.beds || 0;

                                const no_of_bathrooms = val?.no_of_bathrooms;
                                const search_no_of_bathrooms = params?.baths || 0;

                                const area = val?.property_size;
                                const search_area_min = params?.areaMin || 0;
                                const search_area_max = params?.areaMax || 0;

                                if (
                                    val?.title?.toLowerCase()?.includes(keywords) &&
                                    property_type?.includes(search_property_type) &&
                                    state?.includes(search_state) &&
                                    city?.includes(search_city) &&
                                    value >= search_min &&
                                    no_of_bedrooms >= search_no_of_bedrooms &&
                                    no_of_bathrooms >= search_no_of_bathrooms &&
                                    area >= search_area_min
                                ) {
                                    if (search_max > 0 && value > search_max) {
                                        return false;
                                    }
                                    if (search_area_max > 0 && area > search_area_max) {
                                        return false;
                                    }
                                    return true;
                                }else {
                                    return false;
                                }
                            }).map((val, index) => {
                                return (
                                    <View key={index} style={{flexBasis: '50%'}}>
                                        <PropertyListing route={route} routeShouldBe="ListedProperties" onPress={() => navigation.navigate('PropertyDetails', { data: val })} style={{ marginBottom: height * 0.01 }} data={val} />
                                    </View>
                                );
                            })
                        }
                    </View>
                }
                <View style={{flexDirection: 'row', width: width * 0.75, flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', gap: 10, marginTop: height * 0.02}}>
                    {
                        Array.from({ length: maxPage }, (_, i) => i).map((_, index) => {
                            return (
                                <TouchableOpacity onPress={() => setPage(index + 1)}>
                                    <View style={{ lineHeight: 1, alignItems: 'center' }}>
                                        <Pera style={{fontWeight: 'bold'}}>{index + 1}</Pera>
                                        <XSmall>Page</XSmall>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
                <Br space={0.1} />
            </Background>
            <NavigationBar />
        </>
    );
};

export default ListedProperties;
