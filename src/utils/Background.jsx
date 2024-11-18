/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Image, Keyboard, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import KeyboardView from './KeyboardView';
import Sidebar from '../components/Sidebar';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Color } from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from './NavigationContext';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer, showDrawer } from '../redux/Reducers/drawerSlice';

const { width, height } = Dimensions.get('screen');

const Background = ({ bgColor, home, children, noBackground, data, noScroll, detectScrollEnd, onScrollEnd, noAuth, flex,contenStyle }) => {
    const isFocused = useIsFocused();
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOpen = useSelector(({ drawer }) => drawer?.drawer);

    useEffect(() => {
        const backAction = () => {
            const routes = navigation.navigationRef.current.getState().routes;
            const name = routes[routes.length - 2].name;
            const backToSidebar = route?.params?.backToSidebar;
            if (name === 'Splash') {
                if (noAuth) {
                    navigation.navigate(name);
                }else {
                    Alert.alert(
                        'Do you want to logout?',
                        'Logging out will clear your current session and require you to log in again to access your account. Are you sure?',
                        [
                            {text: 'No'},
                            {text: 'Yes', onPress: () => navigation.navigate(name)},
                        ]
                    );
                }
            }else {
                if (route.name === name) {
                    const previousName = routes[routes.length - 3] ? routes[routes.length - 3].name : 'Home';
                    navigation.navigate(previousName);
                }else {
                    navigation.navigate(name);
                }
                if (backToSidebar) {
                    dispatch(showDrawer());
                }else {
                    dispatch(hideDrawer());
                }
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [noAuth]);

    useEffect(() => {
        if (!noAuth) {
            hasToken();
        }
    }, [isFocused, noAuth]);

    const hasToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token && !noAuth) {
            navigation.navigate('Splash');
        }
    };

    const scrollEnd = () => {
        if (detectScrollEnd) {
            onScrollEnd();
        }
    };

    const handleURL = () => {
        navigation.navigate('Home');
    };

    Linking.getInitialURL().then((url) => {
        if (url) {
            console.log(url);
            handleURL(url);
        }
    });

    Linking.addEventListener('url', (event) => {
        handleURL();
    });

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
            ]}
            toastConfig={{ titleStyle: { textAlign: 'center' }, textBodyStyle: { textAlign: 'center' } }}
            >
                {
                    useMemo(() => {
                        return <Sidebar user={data} isOpen={isOpen} />;
                    }, [home, isOpen])
                }
                <SafeAreaView style={[styles.safeAreaView, { backgroundColor: bgColor || Color('navigationBackground') }]}>
                    {!noBackground && <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />}
                    <View style={[styles.content,contenStyle]}>
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
        paddingHorizontal:  width * 0.040,
    },
});
