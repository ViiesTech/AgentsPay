/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Backbtn from '../components/Backbtn';
import Background from '../utils/Background';
import Br from '../components/Br';
import { H4, H5, H6, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { api, errHandler } from '../API';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');

const Inbox = ({ navigation, route }) => {
    const [inboxData, setInboxData] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) { loadInbox(); }
    }, [isFocused]);

    const loadInbox = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get(`/user/inbox?property_id=${route.params?.property_id}`, { headers: { Authorization: `Bearer ${token}` } });
            setInboxData(res.data?.data);
        } catch (err) {
            await errHandler(err, () => loadInbox());
        }
    };

    if (!inboxData) {
        return <Loading />;
    }

    return (
        <Background contenStyle={{}} >
            <Backbtn onPress={() => navigation.goBack()} backToSidebar={route?.params?.backToSidebar} />
            <View style={{ width: width * 0.85, alignItems: 'center' }}>
                <H4 theme="light" style={{ fontFamily: 'Poppins-SemiBold' }}>Inbox</H4>
                <Br space={0.02} />
                <ScrollView horizontal={true}>
                    <FlatList
                        data={inboxData}
                        renderItem={({ item, index }) => {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate('Chat', {
                                            user: route?.params?.user,
                                            property_id: route?.params?.property_id,
                                            sender_id:item?.sender_id,
                                            receiver_id:item?.receiver_id,
                                            owner: true,
                                        });
                                    }}
                                    style={styles.container}
                                >
                                    <Image
                                        source={{ uri: item.sender_profile_image ? `${JSON.parse(item.sender_profile_image).prefix}${JSON.parse(item.sender_profile_image).uri}` : 'https://random.imagecdn.app/500/150' }}
                                        style={styles.imgStyle} resizeMode="cover" />
                                    <View>
                                        <H6 numberOfLines={1} style={{ fontFamily: 'Poppins-SemiBold', textTransform: 'capitalize' }}>{item.sender_name}</H6>
                                        <Small>{item?.last_message ? item.last_message : 'This chat has no messages'}</Small>
                                    </View>
                                </Pressable>
                            );
                        }}
                    />
                </ScrollView>
                <Br space={0.02} />
            </View>
        </Background>
    );
};


const styles = StyleSheet.create({
    container: {
        marginBottom: width * 0.03,
        flexDirection: 'row',
        gap: width * 0.05,
    },
    imgStyle: {
        borderRadius: 100,
        width: width * 0.15,
        height: width * 0.15,
        borderWidth: 2,
        borderColor: Color('textColor'),
    },
});

export default Inbox;
