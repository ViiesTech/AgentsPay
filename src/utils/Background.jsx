import React from 'react';
import { Dimensions, FlatList, Image, Keyboard, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import KeyboardView from './KeyboardView';
import Sidebar from '../components/Sidebar';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Color } from './Colors';

const { width, height } = Dimensions.get('screen');

const Background = ({ children, noBackground }) => {
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
                <Sidebar />
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <SafeAreaView style={styles.safeAreaView}>
                        {!noBackground && <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />}
                        <View style={styles.content}>
                            <KeyboardView>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={[children]}
                                    renderItem={({ item }) => item}
                                    keyExtractor={(item, index) => index}
                                />
                            </KeyboardView>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
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
        paddingTop: height * 0.030,
        paddingHorizontal: width * 0.040,
    },
});
