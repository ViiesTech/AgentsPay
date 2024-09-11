/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, Keyboard, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import KeyboardView from './KeyboardView';
import Sidebar from '../components/Sidebar';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Color } from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from './NavigationContext';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const Background = ({ children, noBackground, data, noScroll, detectScrollEnd, onScrollEnd, noAuth, flex }) => {
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!noAuth) {hasToken();}
    }, [isFocused]);

    const hasToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigate('Login');
        }
    };

    const scrollEnd = () => {
        if (detectScrollEnd) {
            onScrollEnd();
        }
    };

    return (
        <>
            <AlertNotificationRoot colors={[
                {
                    label: Color('btnText'),
                    card: Color('textColor'),
                    overlay: Color('modalBackground'),
                    success: Color('btnBackground'),
                    danger: Color('danger'),
                    warning: Color('warning'),
                },
            ]}>
                <Sidebar user={data} />
                <SafeAreaView style={styles.safeAreaView}>
                    {!noBackground && <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />}
                    <View style={styles.content}>
                        <KeyboardView>
                            {
                                noScroll
                                ?
                                children
                                :
                                flex
                                ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    onScrollEndDrag={scrollEnd}
                                    data={[children]}
                                    renderItem={({ item }) => item}
                                    keyExtractor={(item, index) => index}
                                />
                                :
                                <View>
                                    <ScrollView
                                        keyboardShouldPersistTaps="handled"
                                        showsVerticalScrollIndicator={false}
                                        onScrollEndDrag={(e) => {
                                            const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
                                            const end = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
                                            if (end) {
                                                scrollEnd();
                                            }
                                        }}
                                    >
                                        <TouchableWithoutFeedback onPress={() => {
                                            Keyboard.dismiss();
                                        }}>
                                            <View>
                                                {children}
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </ScrollView>
                                </View>
                            }
                        </KeyboardView>
                    </View>
                </SafeAreaView>
            </AlertNotificationRoot>
        </>
    );
};

export default Background;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height,
    },
    content: {
        zIndex: 1,
        flex: 1,
        paddingTop: height * 0.030,
        paddingHorizontal: width * 0.040,
    },
});
