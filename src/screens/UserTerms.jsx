/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, H6, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import Backbtn from '../components/Backbtn';
import Hr from '../components/Hr';
import { Color } from '../utils/Colors';
import { api, errHandler } from '../API';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const UserTerms = ({ navigation }) => {

    const [ content, setContent ] = useState('');
    const [ points, setPoints ] = useState([]);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const res = await api.get('/user/user_terms');
            const data = res.data?.data?.content || 'No User Terms';
            setContent(data);
            if (data.length > 0 && data !== 'No User Terms') {
                setPoints(JSON.parse(res.data?.data?.points));
            }
        } catch(err) {
            await errHandler(err);
        }
    };

    if (content.length === 0) {
        return <Loading noAuth />;
    }
    return (
        <Background noAuth>
            <Backbtn onPress={() =>{
             navigation.goBack();
            }} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
                <Br space={0.01} />
                <View style={{width: width * 0.85, alignItems: 'center'}}>
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>User Terms</H5>
                    <Pera theme="transparent" style={{textAlign: 'center'}}>This Privacy Notice describes information we collect, process and use</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.02} />
                    <Pera style={{whiteSpace: 'pre-line'}}>
                        {content}
                    </Pera>
                    <Br space={0.04} />
                    {
                        points.map((point, index) => {
                            return (
                                <View key={index} style={{whiteSpace: 'pre-line', flexDirection: 'row', columnGap: 10, marginBottom: height * 0.03}}>
                                    <View style={{flex: 1}}>
                                        <H6 style={{fontFamily: 'Poppins-SemiBold', textAlign: 'right', paddingRight: width * 0.02, paddingTop: height * 0.005, color: Color('btnBackground')}}>{index + 1}</H6>
                                    </View>
                                    <View style={{flex: 5}}>
                                        <Small>{point}</Small>
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
            </View>
        </Background>
    );
};

export default UserTerms;
