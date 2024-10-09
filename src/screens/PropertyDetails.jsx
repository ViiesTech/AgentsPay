/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, Pressable, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H6, Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import PropertyInfo from '../components/PropertyInfo';
import NavigationBar from '../components/NavigationBar';
import { DocumentDownload, MessageText1 } from 'iconsax-react-native';
import { Button } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, baseUrl, errHandler } from '../API';
import Loading from './Loading';
import Toast from 'react-native-simple-toast';
import Hr from '../components/Hr';
import Backbtn from '../components/Backbtn';

const { width, height } = Dimensions.get('window');
const PropertyDetails = ({ navigation, route }) => {
    const [details, setDetails] = useState();
    const [paramData, setParamData] = useState();
    const [showAgentDetails, setShowAgentDetails] = useState(false);
    const [currentUserId, setCurrentUserID] = useState();

    useEffect(() => {
        checkId();
        return () => {
            AsyncStorage.removeItem('propertyDetails');

        };
    }, []);

    const checkId = async () => {
        const data = await AsyncStorage.getItem('propertyDetails');
        const token = await AsyncStorage.getItem('token');
        const res = await api.get('/user/profile/data', { headers: { Authorization: `Bearer ${token}` } });
        setCurrentUserID(res.data.data?.user_id)
        if (data) {
            setParamData(JSON.parse(data));
            loadDetails(JSON.parse(data)?.id);
        } else
            if (route?.params?.data?.id) {
                AsyncStorage.setItem('propertyDetails', JSON.stringify(route?.params?.data));
                setParamData(route?.params?.data);
                loadDetails(route?.params?.data?.id);
            }
    };

    const loadDetails = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/details?id=' + id, { headers: { Authorization: `Bearer ${token}` } });

            setDetails(res.data?.data);
        } catch (err) {
            await errHandler(err, () => loadDetails(id));
        }
    };

    const downloadDocument = async (url) => {
        Linking.openURL(`${baseUrl}/download?file=${url}`);
        Toast.show('Document has been downloaded', Toast.SHORT);
    };
    const AgentDetailsModal = () => {
        return (
            <View style={{ paddingVertical: height * 0.03, position: 'absolute', width: width * 0.85, top: height * 0.2, left: width * 0.075, backgroundColor: Color('textColor'), borderRadius: 20, borderWidth: 2, borderColor: Color('btnText'), zIndex: 1 }}>
                <Image source={{ uri: `${JSON.parse(details?.tbl_user?.profile_image).prefix}${JSON.parse(details?.tbl_user?.profile_image).uri}` }}
                    style={{
                        width: width * 0.42,
                        height: width * 0.42,
                        borderRadius: 200,
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderColor: Color('btnText'),
                    }}
                />
                <Br space={0.03} />
                <H6 theme="dark" style={{ alignSelf: 'center', textTransform: 'capitalize' }}>{details?.tbl_user?.full_name}</H6>
                <Hr style={{ width: width * 0.42, height: 3, alignSelf: 'center' }} />
                <Br space={0.03} />
                <View style={{ flexDirection: 'row', width: width * 0.6, alignSelf: 'center', marginBottom: height * 0.01 }}>
                    <View style={{ flex: 1 }}>
                        <Pera theme="light">Email</Pera>
                    </View>
                    <View style={{ flex: 3, paddingLeft: width * 0.02 }}>
                        <Pera theme="dark">{details?.tbl_user?.email}</Pera>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.6, alignSelf: 'center', marginBottom: height * 0.01 }}>
                    <View style={{ flex: 1 }}>
                        <Pera theme="light">Phone</Pera>
                    </View>
                    <View style={{ flex: 3, paddingLeft: width * 0.02 }}>
                        <Pera theme="dark">{details?.tbl_user?.phone}</Pera>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.6, alignSelf: 'center', marginBottom: height * 0.01 }}>
                    <View style={{ flex: 1 }}>
                        <Pera theme="light">Lic #</Pera>
                    </View>
                    <View style={{ flex: 3, paddingLeft: width * 0.02 }}>
                        <Pera theme="dark">{details?.tbl_user?.license_number}</Pera>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.6, alignSelf: 'center', marginBottom: height * 0.01 }}>
                    <View style={{ flex: 1 }}>
                        <Pera theme="light">Broker</Pera>
                    </View>
                    <View style={{ flex: 3, paddingLeft: width * 0.02 }}>
                        <Pera theme="dark">{details?.tbl_user?.broker_name}</Pera>
                    </View>
                </View>
                <Br space={0.03} />
                <Button onPress={() => setShowAgentDetails(false)} style={{ width: width * 0.5, alignSelf: 'center' }}>Close</Button>
            </View>
        );
    };

    if (!details) {
        return <Loading />;
    }

    return (
        <>
            <Background
                flex
                contenStyle={{
                    paddingHorizontal: 0,
                }}>
                <View style={{ width: width * 0.85, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Backbtn
                        position="static"
                        onPress={() => {
                            navigation.goBack();
                        }} />
                    <TouchableOpacity onPress={() => {
                        if (details?.tbl_user?.user_id !== currentUserId) {
                            navigation.navigate('Chat', {
                                user: details?.tbl_user,
                                property_id: paramData?.id,
                                sender_id:  currentUserId,
                                receiver_id: details?.tbl_user?.user_id,
                            });
                        } else {
                            navigation.navigate('Inbox', { user: details?.tbl_user, property_id: paramData?.id })
                        }
                    }}
                    >
                        <MessageText1
                            size={height * 0.03}
                            color={Color('textColor')}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{ position: 'relative' }}
                >
                    <Br space={0.03} />
                    <View>
                        <PropertyInfo data={paramData} isSwiper />
                    </View>
                    <Br space={0.07} />
                    <View
                        style={{
                            alignSelf: 'center',
                            position: 'absolute',
                            width: width * 20,
                            paddingVertical: height * 0.005,
                            bottom: 0, backgroundColor:
                                Color('btnBackground'),
                            alignItems: 'center',
                        }}
                    >
                        <H6 numberOfLines={1}>Agent Commission {details?.agent_percentage > 0 && `${details?.agent_percentage}%`} {details?.agent_amount > 0 && `(${details?.agent_amount.toLocaleString('en')}/-)`}</H6>
                    </View>
                </View>
                <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                    <Br space={0.03} />
                    <H6 style={{ fontFamily: 'Jost-Regular' }}>About the Property</H6>
                    <Br space={0.01} />
                    <Pera theme="transparent" style={{ fontFamily: 'Jost-Regular', textAlign: 'justify' }}>
                        {details?.property_description}
                    </Pera>
                    <Br space={0.03} />
                    <H6 style={{ fontFamily: 'Jost-Regular' }}>
                        Amenities
                    </H6>
                    <Br space={0.01} />
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        {
                            details?.tags.split(', ').map((tag, index) => {
                                return (

                                    <React.Fragment key={index}>
                                        <Pera style={{ textTransform: 'capitalize' }}>{tag}</Pera>
                                        {(index + 1) < details?.tags.split(', ')?.length && <Pera theme="light">|</Pera>}
                                    </React.Fragment>

                                );
                            })
                        }
                    </View>

                    <Br space={0.03} />
                    <H6 style={{ fontFamily: 'Jost-Regular' }}>
                        Documents
                    </H6>
                    <Br space={0.02} />
                    {
                        details?.tbl_property_documents?.map((val, index) => {
                            return (
                                <Pressable onPress={() => downloadDocument(val.url)} key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: width * 0.02, marginBottom: height * 0.015 }}>
                                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: Color('btnBackground'), width: width * 0.03, height: width * 0.03, borderRadius: 20 }} />
                                        <Pera numberOfLines={1} style={{ marginTop: height * 0.002, textTransform: 'capitalize', width: width * 0.6 }}>{val.url}</Pera>
                                    </View>
                                    <DocumentDownload
                                        size="25"
                                        color={Color('btnBackground')}
                                    />
                                </Pressable>
                            );
                        })
                    }
                    <Br space={0.03} />
                    <View style={{ backgroundColor: Color('navigationBackground'), borderRadius: 20, paddingVertical: height * 0.03, paddingHorizontal: width * 0.05 }}>
                        <Small>
                            NOTE: After downloading the document. Sign it and email it to the Listing Agent Email address.
                        </Small>
                    </View>
                    <Br space={0.03} />
                    <H6 style={{ fontFamily: 'Jost-Regular' }}>
                        Listing Agent
                    </H6>
                    <Br space={0.02} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <Image source={{ uri: `${JSON.parse(details?.tbl_user?.profile_image).prefix}${JSON.parse(details?.tbl_user?.profile_image).uri}` }}
                            style={{
                                width: width * 0.12,
                                height: width * 0.12,
                                borderRadius: 10,
                            }}
                        />
                        <Pera style={{ textTransform: 'capitalize' }}>{details?.tbl_user?.full_name}</Pera>
                    </View>
                    {
                        details?.agent_remarks && details?.agent_remarks?.length && (
                            <>
                                <Br space={0.01} />
                                <H6 style={{ fontFamily: 'Jost-Regular' }}>
                                    Agent's Remarks
                                </H6>
                                <Br space={0.01} />
                                <Small>
                                    {details?.agent_remarks}
                                </Small>
                            </>
                        )
                    }
                    <Br space={0.03} />
                    <Button onPress={() => setShowAgentDetails(true)}>View Contact Details</Button>
                    <Br space={0.15} />
                </View>
            </Background>
            <NavigationBar />
            {showAgentDetails && <AgentDetailsModal />}
        </>
    );
};

export default PropertyDetails;
