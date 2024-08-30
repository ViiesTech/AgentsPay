/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const { width, height } = Dimensions.get('window');
const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    return (
        <>
            <Background>
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
                        <Image source={{uri: 'https://random.imagecdn.app/500/150'}} resizeMode="cover" style={{
                            borderRadius: 100,
                            width: width * 0.12,
                            height: width * 0.12,
                            borderWidth: 2,
                            borderColor: Color('textColor'),
                        }} />
                        <H6 style={{marginTop: height * 0.01, fontFamily: 'Poppins-SemiBold'}}>Welcome Jacob,</H6>
                    </TouchableOpacity>
                    <Notificationbtn unSeen position="static" style={{marginTop: height * 0.01}} />
                </View>
                <Br space={0.03} />
                <Search
                    label="Explore"
                    navigation={navigation}
                />
                <Br space={0.03} />
                <Swiper
                    centerContent
                    showsButtons={false}
                    style={{ height: height * 0.55 }}
                    showsPagination={true}
                    activeDotColor={Color('btnBackground')}
                    loop
                >
                    <PropertyInfo />
                    <PropertyInfo />
                    <PropertyInfo />
                </Swiper>
                <View style={{ width: width * 0.85, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginBottom: height * 0.005 }}>
                    <Pera theme="light">Popular</Pera>
                    <TouchableOpacity onPress={() => navigation.navigate('ListedProperties')}>
                        <Pera style={{ color: Color('gray') }}>See All</Pera>
                    </TouchableOpacity>
                </View>
                <PropertyCard />
                <PropertyCard />
                <Br space={0.08} />
            </Background>
            <NavigationBar />
        </>
    );
};

export default Home;
