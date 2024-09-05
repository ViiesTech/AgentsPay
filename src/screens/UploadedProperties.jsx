/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
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
    const [ properties, setProperties ] = useState();
    const [ list, setlist ] = useState();

    useEffect(() => {
        if (isFocused) {loadProperties();}
    }, [isFocused]);

    const loadProperties = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/own', {headers: {Authorization: `Bearer ${token}`}});
            const arr = [];
            for (let x = 0; x < res.data?.data.length; x++) {
                arr.push(<PropertyListing onPress={() => navigation.navigate('PropertyDetails', { data: res.data?.data[x] })} style={{ marginBottom: height * 0.02 }} data={res.data?.data[x]} />);
                if ((x + 1) === res.data?.data.length) {
                    arr.push(<Br space={0.1} />);
                }
            }
            setProperties(arr);
            setlist(res.data?.data);
        } catch(err) {
            await errHandler(err);
        }
    };

    if (!properties || !list) {
        return <Loading />;
    }

    return (
        <>
            <Background noScroll>
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
                    properties.length === 0
                    ?
                    <Pera style={{textAlign: 'center'}}>No Property Added</Pera>
                    :
                    <FlatList
                        style={{height: height * 0.69}}
                        showsVerticalScrollIndicator={false}
                        data={properties}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        renderItem={({ item, index }) => {
                            if (list[index]?.title?.toLowerCase()?.includes(keywords)) {
                                return item;
                            }else {
                                return <></>;
                            }
                        }}
                        keyExtractor={(item, index) => index}
                        numColumns={2}
                    />
                }
            </Background>
            <NavigationBar />
        </>
    );
};

export default UploadedProperties;
