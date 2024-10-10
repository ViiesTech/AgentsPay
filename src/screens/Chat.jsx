/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H4, H6, Pera, Small } from '../utils/Text';
import Hr from '../components/Hr';
import { socket } from '../API';
import Loading from './Loading';
import Input from '../components/Input';
import { Send2 } from 'iconsax-react-native';
import { Color } from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backbtn from '../components/Backbtn';
import KeyboardView from '../utils/KeyboardView';

const { width, height } = Dimensions.get('window');
const Chat = ({ navigation, route }) => {
    const scrollViewRef = useRef(null);

    const [chat, setChats] = useState();
    const [currUserEmail, setCurrUserEmail] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        getContent();
        socket.on('chat', (data) => {
            console.log('DATA',data);            
            setChats(data[0]);
            // if (parseInt(data[1]) === parseInt(route?.params?.property_id)) {
            // }
        });
    }, []);

    useEffect(() => {
        if (chat) {
            scrollViewRef?.current?.scrollToEnd();
        }
    }, [chat]);

    const getContent = async () => {
        const token = await AsyncStorage.getItem('user');
        setCurrUserEmail(JSON.parse(token)?.email);
        socket.emit('get_chat', {
            property_id: route?.params?.property_id,
            sender: route?.params?.sender_id,
            receiver: route?.params?.receiver_id
        });
    };

    const onSendMessage = () => {
        if (message.length > 0) {
            socket.emit('set_chat', {
                message: message,
                property_id: route?.params?.property_id,
                sender: route?.params?.owner ? route?.params?.receiver_id : route?.params?.sender_id,
                receiver: route?.params?.owner ? route?.params?.sender_id : route?.params?.receiver_id,

            });
            setMessage('');
        }
    };

    if (!chat) {
        return <Loading noAuth />;
    }


    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: width * 0.08,
                paddingBottom: height * 0.005,
                position: 'absolute',
                top: height * 0.01,
                backgroundColor: Color('navigationBackground'),
                width: width,
                zIndex: 1,
                height: height * 0.08
            }}>
                <Backbtn position="static" onPress={() => navigation.goBack()} backToSidebar={route?.params?.backToSidebar} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.02 }}>
                    <Image source={{ uri:  `${JSON.parse(route?.params?.user?.profile_image).prefix}${JSON.parse(route?.params?.user?.profile_image).uri}` }}
                        style={{
                            width: width * 0.1,
                            height: width * 0.1,
                            borderRadius: width,
                        }}
                    />
                    <View>
                        <H6 style={{ textTransform: 'capitalize' }}>{route?.params?.owner ? route?.params?.user?.name :  route?.params?.user?.full_name}</H6>
                        {/* <Small style={{ textTransform: 'capitalize' }}>{route?.params?.user?.broker_name}</Small> */}
                    </View>
                </View>
            </View>
            <Background noAuth  >
                <ScrollView
                    style={{
                        // height: height * 0.85,
                        paddingVertical: height * 0.05,
                        // overflow: 'hidden'
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <View style={{ paddingVertical: height * 0.01, marginBottom: height * 0.01 }}>
                        {
                            chat.length === 0
                                ?
                                <>
                                    <Hr style={{ alignSelf: 'center' }} />
                                    <Pera style={{ textAlign: 'center' }}>No Chat Found</Pera>
                                </>
                                :
                                chat.filter(val => (val.receiverUser.email === currUserEmail || val.senderUser.email === currUserEmail) && (val.receiverUser.email === route?.params?.user?.email || val.senderUser.email === route?.params?.user?.email)).map((val, index) => {
                                    if (val?.senderUser?.email === currUserEmail) {
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: height * 0.01 }}>
                                                <View style={{ width: width * 0.8, paddingTop: height * 0.01, paddingBottom: height * 0.008, paddingHorizontal: width * 0.04, backgroundColor: Color('darkTheme'), borderRadius: height * 0.01 }}>
                                                    <Pera style={{ paddingBottom: 0 }}>{val?.message}</Pera>
                                                </View>
                                            </View>
                                        );
                                    }
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', paddingVertical: height * 0.01 }}>
                                            <View style={{ width: width * 0.8, paddingTop: height * 0.01, paddingBottom: height * 0.008, paddingHorizontal: width * 0.04, backgroundColor: Color('textLight'), borderRadius: height * 0.01 }}>
                                                <Pera style={{ paddingBottom: 0 }}>{val?.message}</Pera>
                                            </View>
                                        </View>
                                    );
                                })
                        }
                    </View>
                </ScrollView>
            </Background>
            <View
                style={{
                    backgroundColor: Color('textColor'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: Color('textColor'),
                    // paddingVertical: height * 0.005,
                    paddingHorizontal: width * 0.05,
                    position: 'absolute',
                    bottom: height * 0.02,
                    marginHorizontal: width * 0.04
                }}
            >
                <Input
                    value={message}
                    plceHolderTextClr={Color('btnText')}
                    color={Color('btnText')}
                    placeholder="Write a Message"
                    inputStyling={{ paddingTop: 0 }}
                    style={{
                        flex: 1,
                        paddingVertical: 0,
                        paddingLeft: width * 0.02,
                        borderColor: 'transparent'
                    }}
                    onChange={(value) => setMessage(value)}
                    onSubmitEditing={onSendMessage}
                    returnKeyType="search"
                />
                <TouchableOpacity onPress={onSendMessage}>
                    <Send2
                        size={height * 0.035}
                        color={Color('btnBackground')}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Chat;
