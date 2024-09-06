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
const UploadedProperties = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [ keywords, setKeywords ] = useState('');
    const [ list, setlist ] = useState();

    useEffect(() => {
        if (isFocused) {loadProperties();}
    }, [isFocused]);

    const loadProperties = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/own', {headers: {Authorization: `Bearer ${token}`}});
            setlist(res.data?.data);
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
                    label="Uploaded Properties"
                    navigation={navigation}
                    setKeywords={setKeywords}
                    noFilters
                />
                <Br space={0.03} />
                {
                    list.length === 0
                    ?
                    <Pera style={{textAlign: 'center'}}>You haven't uploaded a property</Pera>
                    :
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: height * 0.1}}>
                        {
                            list.filter(val => {
                                if (
                                    val?.title?.toLowerCase()?.includes(keywords)
                                ) {
                                    return true;
                                }else {
                                    return false;
                                }
                            }).map((val, index) => {
                                return (
                                    <View key={index} style={{flexBasis: '50%'}}>
                                        <PropertyListing onPress={() => navigation.navigate('PropertyDetails', { data: val })} style={{ marginBottom: height * 0.01 }} data={val} />
                                    </View>
                                );
                            })
                        }
                    </View>
                }
            </Background>
            <NavigationBar />
        </>
    );
};

export default UploadedProperties;
