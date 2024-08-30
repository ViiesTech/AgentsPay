/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H6, Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import PropertyInfo from '../components/PropertyInfo';
import NavigationBar from '../components/NavigationBar';
import { DocumentDownload } from 'iconsax-react-native';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');
const PropertyDetails = ({ navigation }) => {
    return (
        <>
            <Background>
                <View style={{position: 'relative'}}>
                    <Br space={0.03} />
                    <PropertyInfo />
                    <Br space={0.07} />
                    <View style={{alignSelf: 'center', position: 'absolute', width: width * 0.85, paddingVertical: height * 0.005, bottom: 0, backgroundColor: Color('btnBackground'), alignItems: 'center'}}>
                        <Pera>Agent Commission 5% ($6250)</Pera>
                    </View>
                </View>
                <View style={{width: width * 0.85, alignSelf: 'center'}}>
                    <Br space={0.03} />
                    <H6 style={{fontFamily: 'Jost-Regular'}}>About the Property</H6>
                    <Br space={0.01} />
                    <Pera theme="transparent" style={{fontFamily: 'Jost-Regular'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam laoreet aliquet amet, ipsum mi. In molestie fames mollis feugiat ultricies ultrices integer in. Vulputate
                    </Pera>
                    <Br space={0.03} />
                    <H6 style={{fontFamily: 'Jost-Regular'}}>
                        Amenities
                    </H6>
                    <Br space={0.01} />
                    <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-around'}}>
                        <Pera>Washer/dryer</Pera>
                        <Pera theme="light">|</Pera>
                        <Pera>Wifi</Pera>
                        <Pera theme="light">|</Pera>
                        <Pera>Laundry</Pera>
                        <Pera theme="light">|</Pera>
                        <Pera>Parking</Pera>
                    </View>
                    <Br space={0.03} />
                    <H6 style={{fontFamily: 'Jost-Regular'}}>
                        Documents
                    </H6>
                    <Br space={0.02} />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: width * 0.02}}>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: Color('btnBackground'), width: width * 0.03, height: width * 0.03, borderRadius: 20}} />
                            <Pera style={{marginTop: height * 0.002}}>Document 1 - Property Lease</Pera>
                        </View>
                        <DocumentDownload
                            size="25"
                            color={Color('btnBackground')}
                        />
                    </View>
                    <Br space={0.03} />
                    <View style={{backgroundColor: Color('navigationBackground'), borderRadius: 20, paddingVertical: height * 0.03, paddingHorizontal: width * 0.05}}>
                        <Small>
                            NOTE: After downloading the document. Sign it and email it to the Listing Agent Email address.
                        </Small>
                    </View>
                    <Br space={0.03} />
                    <H6 style={{fontFamily: 'Jost-Regular'}}>
                        Listing Agent
                    </H6>
                    <Br space={0.02} />
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <Image source={{uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2193'}}
                            style={{
                                width: width * 0.12,
                                height: width * 0.12,
                                borderRadius: 10,
                            }}
                        />
                        <Pera>Cameron Williamson</Pera>
                    </View>
                    <Br space={0.03} />
                    <Button onPress={() => navigation.replace('Login')}>View Contact Details</Button>
                    <Br space={0.15} />
                </View>
            </Background>
            <NavigationBar />
        </>
    );
};

export default PropertyDetails;
