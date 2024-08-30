/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import { Edit2 } from 'iconsax-react-native';
import Dropdown from '../components/Dropdown';

const { width, height } = Dimensions.get('window');
const CompleteProfile = ({ navigation }) => {
    return (
        <Background>
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Br space={0.1} />
                <H5 theme="light" style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center' }}>Complete your Profile</H5>
                <Pera theme="transparent" style={{ textAlign: 'center' }}>Please enter below details to complete your profile</Pera>
                <Br space={0.03} />
                <View style={{
                    alignItems: 'center',
                    position: 'relative',
                    width: width * 0.25,
                    alignSelf: 'center',
                }}>
                    <Image source={{ uri: 'https://random.imagecdn.app/500/150' }} resizeMode="cover" style={{
                        width: width * 0.25,
                        height: width * 0.25,
                        borderRadius: 500,
                        borderWidth: 3,
                        borderColor: Color('textColor'),
                    }} />
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                        backgroundColor: Color('btnBackground'),
                        borderWidth: 3,
                        borderColor: Color('textColor'),
                        borderRadius: 100,
                        padding: width * 0.015,
                    }}>
                        <Edit2
                            size="20"
                            color={Color('textColor')}
                        />
                    </View>
                </View>
                <Br space={0.02} />
                <Dropdown
                    data={[
                        {label: 'Gender', value: ''},
                        {label: 'Male', value: ''},
                        {label: 'Female', value: ''},
                    ]}
                    selectedValue={'Gender'}
                    onValueChange={(value) => console.log(value)}
                    style={undefined}
                    defaultStyle={undefined}
                    label={undefined}
                    icon={undefined}
                />
                <Input
                    labelText="Location"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />
                <Input
                    labelText="Agent License Number"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />
                <Input
                    labelText="Broker Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />
                <Br space={0.03} />
                <ButtonOutline style={{width: width * 0.85}} onPress={() => navigation.navigate('Subscriptions')}>Submit</ButtonOutline>
                <Br space={0.02} />
            </View>
        </Background>
    );
};

export default CompleteProfile;
