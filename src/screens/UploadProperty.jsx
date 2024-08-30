/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TextInput, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Input from '../components/Input';
import { DocumentUpload } from 'iconsax-react-native';
import { ButtonOutline } from '../components/Button';

const { width, height } = Dimensions.get('window');
const UploadProperty = ({ navigation }) => {
    return (
        <Background>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.85,
                alignSelf: 'center',
            }}>
                <Backbtn position="static" onPress={() => navigation.goBack()} />
            </View>
            <Br space={0.05} />
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Upload Property</H5>
            <Pera theme="transparent" style={{textAlign: 'center', width: width * 0.85, alignSelf: 'center'}}>We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity</Pera>
            <Br space={0.02} />
            <Input
                labelText="Property Title"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="City"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="State"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Address"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Property Type"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Property Area"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Property Value"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Agent Percentage"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Br space={0.03} />
            <Pera theme="transparent">Upload Property Images</Pera>
            <Br space={0.02} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', columnGap: 15}}>
                <Image source={require('../assets/images/upload_image.png')} style={{flexGrow: 1, width: width * 0.25, height: height < 650 ? (height * 0.18) : (height * 0.15)}} resizeMode="contain" />
                <Image source={require('../assets/images/upload_image.png')} style={{flexGrow: 1, width: width * 0.25, height: height < 650 ? (height * 0.18) : (height * 0.15)}} resizeMode="contain" />
                <Image source={require('../assets/images/upload_image.png')} style={{flexGrow: 1, width: width * 0.25, height: height < 650 ? (height * 0.18) : (height * 0.15)}} resizeMode="contain" />
                <Image source={require('../assets/images/upload_image.png')} style={{flexGrow: 1, width: width * 0.25, height: height < 650 ? (height * 0.18) : (height * 0.15)}} resizeMode="contain" />
                <Image source={require('../assets/images/upload_image.png')} style={{flexGrow: 1, width: width * 0.25, height: height < 650 ? (height * 0.18) : (height * 0.15)}} resizeMode="contain" />
                <Image source={require('../assets/images/upload_image.png')} style={{flexGrow: 1, width: width * 0.25, height: height < 650 ? (height * 0.18) : (height * 0.15)}} resizeMode="contain" />
            </View>
            <Br space={0.03} />
            <Input
                labelText="Number of Bedrooms"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Number of Bathrooms"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Input
                labelText="Amenities"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(emailAddress) => console.log(emailAddress)}
            />
            <Br space={0.03} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Small theme="transparent" style={{ paddingLeft: width * 0.02 }}>About the Property</Small>
                <Br space={0.01} />
                <View style={{
                    padding: width * 0.05,
                    paddingTop: height * 0.01,
                    backgroundColor: Color('btnOutline'),
                    borderRadius: 20,
                }}>
                    <TextInput placeholder="Enter information" numberOfLines={height < 650 ? 8 : 10} style={{ textAlignVertical: 'top' }} placeholderTextColor={Color('gray')} />
                </View>
            </View>
            <Br space={0.03} />
            <Pera theme="transparent" style={{ marginTop: height * 0.002, width: width * 0.85, alignSelf: 'center' }}>Upload Document</Pera>
            <Br space={0.01} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: width * 0.02, width: width * 0.85, alignSelf: 'center' }}>
                <Pera style={{ marginTop: height * 0.002 }}>No Uploads</Pera>
                <DocumentUpload
                    size="25"
                    color={Color('btnBackground')}
                />
            </View>
            <Br space={0.05} />
            <ButtonOutline onPress={() => navigation.navigate('Home')}>Submit</ButtonOutline>
            <Br space={0.05} />
        </Background>
    );
};

export default UploadProperty;
