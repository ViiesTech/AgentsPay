/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H6, Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import Notificationbtn from '../components/Notificationbtn';
import Br from '../components/Br';
import Search from '../components/Search';
import PropertyInfo from '../components/PropertyInfo';
import Swiper from 'react-native-swiper';
import PropertyCard from '../components/PropertyCard';
import NavigationBar from '../components/NavigationBar';
import { useDispatch } from 'react-redux';
import { showDrawer } from '../redux/Reducers/drawerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Home = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [ keywords, setKeywords ] = useState('');
    const [ propertyType, setPropertyType ] = useState('');
    const [ homepageData, setHomepageData ] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFocused) {loadProperties();}
    }, [isFocused]);

    const loadProperties = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/home',{headers: {Authorization: `Bearer ${token}`}});
            setHomepageData(res.data?.data);
        } catch(err) {
            await errHandler(err, () => loadProperties());
        }
    };


    if (!homepageData) {
        return <Loading />;
    }

    const user = homepageData[0];
    const propertyTypes = homepageData[1];
    const recentProperties = homepageData[2];
    const popularProperties = homepageData[3];

    const filteredRecentProperties = recentProperties?.filter(val => (val.title.toLowerCase().includes(keywords) || val.address.toLowerCase().includes(keywords)) && val?.tbl_property_type?.label.toLowerCase().includes(propertyType));

    return (
        <>
            <Background data={user} home>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width * 0.9,
                }}>
                    <TouchableOpacity onPress={() => dispatch(showDrawer())} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                    }}>
                        <Image source={{uri: user ? `${JSON.parse(user?.profile_image).prefix}${JSON.parse(user?.profile_image).uri}` : 'https://random.imagecdn.app/500/150'}} resizeMode="cover" style={{
                            borderRadius: 100,
                            width: width * 0.12,
                            height: width * 0.12,
                            borderWidth: 2,
                            borderColor: Color('textColor'),
                        }} />
                        <H6 numberOfLines={1} style={{marginTop: height * 0.01, fontFamily: 'Poppins-SemiBold', textTransform: 'capitalize'}}>{user.full_name?.split(' ')?.shift()}</H6>
                    </TouchableOpacity>
                    <Notificationbtn unSeen position="static" style={{marginTop: height * 0.01}} />
                </View>
                <Br space={0.03} />
                <Search
                    propertyType={propertyType}
                    label="Explore"
                    navigation={navigation}
                    propertyTypes={propertyTypes}
                    setKeywords={setKeywords}
                    setPropertyType={setPropertyType}
                />
                <Br space={0.03} />
                {
                    filteredRecentProperties?.length === 0 && popularProperties?.length === 0
                    ?
                    <Pera style={{textAlign: 'center'}}>No Property Available</Pera>
                    :
                    <View>
                         <View style={{ width: width * 0.85, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginBottom: height * 0.025 }}>
                            <Pera theme="light">Recent</Pera>
                            {/* <TouchableOpacity onPress={() => navigation.navigate('ListedProperties')}>
                                <Pera style={{ color: Color('gray') }}>See All</Pera>
                            </TouchableOpacity> */}
                        </View>
                        {filteredRecentProperties && filteredRecentProperties.length > 1
                            ?
                            <Swiper
                                centerContent
                                showsButtons={false}
                                style={{ height: height * 0.55 }}
                                showsPagination={true }
                                activeDotColor={Color('btnBackground')}
                                loop={true}
                                autoplay={true}
                                autoplayTimeout={3}
                                autoplayDirection={true}
                            >
                                {
                                    filteredRecentProperties?.map((val, index) => {
                                        return (
                                            <View key={index}>
                                                <PropertyInfo data={val} clickable />
                                            </View>
                                        );
                                    })
                                }
                            </Swiper>
                            :
                            filteredRecentProperties?.map((val, index) => {
                                return (
                                    <View key={index} style={{ height: height * 0.55 }}>
                                        <PropertyInfo data={val} clickable />
                                    </View>
                                );
                            })
                        }
                        <View style={{ width: width * 0.85, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginBottom: height * 0.005 }}>
                            <Pera theme="light">Popular</Pera>
                            <TouchableOpacity onPress={() => navigation.navigate('ListedProperties')}>
                                <Pera style={{ color: Color('gray') }}>See All</Pera>
                            </TouchableOpacity>
                        </View>
                        {
                            popularProperties?.filter(
                                val =>
                                    (val.title.toLowerCase().includes(keywords) || val.address.toLowerCase().includes(keywords.toLowerCase())) &&
                                    val?.tbl_property_type?.label.toLowerCase().includes(propertyType)
                            )?.map((val, index) => {
                                return (
                                    <View key={index}>
                                        <PropertyCard data={val} />
                                    </View>
                                );
                            })
                        }
                        <Br space={0.08} />
                    </View>
                }
            </Background>
            <NavigationBar />
        </>
    );
};

export default Home;
