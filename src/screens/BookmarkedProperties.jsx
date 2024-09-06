/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
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
import { Pera } from '../utils/Text';

const { width, height } = Dimensions.get('window');
const BookmarkedProperties = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [ keywords, setKeywords ] = useState('');
    const [ list, setlist ] = useState();
    const [ User, setUser ] = useState();

    useEffect(() => {
        if (isFocused) {loadProperties();}
    }, [isFocused]);

    const loadProperties = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/bookmarked', {headers: {Authorization: `Bearer ${token}`}});
            setUser(res.data?.data[1]);
            setlist(res.data?.data[0]);
        } catch(err) {
            await errHandler(err);
        }
    };

    if (!list) {
        return <Loading />;
    }
    return (
        <>
            <Background>
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
                    label="Bookmarks"
                    navigation={navigation}
                    setKeywords={setKeywords}
                    noFilters
                />
                <Br space={0.03} />
                {
                    list.length === 0
                    ?
                    <Pera style={{textAlign: 'center'}}>You haven't bookmarked a property</Pera>
                    :
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            list.filter(val => {
                                if (
                                    val?.tbl_property?.title?.toLowerCase()?.includes(keywords)
                                ) {
                                    return true;
                                }else {
                                    return false;
                                }
                            }).map((val, index) => {
                                const isBookmarked = parseInt(val.user_id) === parseInt(User);
                                return (
                                    <View key={index} style={{flexBasis: '50%'}}>
                                        <PropertyListing isBookmarked={isBookmarked} onPress={() => navigation.navigate('PropertyDetails', { data: val?.tbl_property })} style={{ marginBottom: height * 0.01 }} data={val?.tbl_property} />
                                    </View>
                                );
                            })
                        }
                    </View>
                }
                <Br space={0.1} />
            </Background>
            <NavigationBar />
        </>
    );
};

export default BookmarkedProperties;
