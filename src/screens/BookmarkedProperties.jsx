/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import Background from '../utils/Background';
import Notificationbtn from '../components/Notificationbtn';
import Br from '../components/Br';
import Search from '../components/Search';
import NavigationBar from '../components/NavigationBar';
import Backbtn from '../components/Backbtn';
import PropertyListing from '../components/PropertyListing';

const { width, height } = Dimensions.get('window');
const BookmarkedProperties = ({ navigation }) => {
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
                />
                <Br space={0.03} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={[
                        <PropertyListing style={{ marginBottom: height * 0.02 }} />,
                        <PropertyListing style={{ marginBottom: height * 0.02 }} />,
                        <PropertyListing style={{ marginBottom: height * 0.02 }} />,
                        <PropertyListing style={{ marginBottom: height * 0.02 }} />,
                        <PropertyListing style={{ marginBottom: height * 0.02 }} />,
                        <PropertyListing style={{ marginBottom: height * 0.02 }} />,
                    ]}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    renderItem={({ item }) => item}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                />
                <Br space={0.1} />
            </Background>
            <NavigationBar />
        </>
    );
};

export default BookmarkedProperties;
