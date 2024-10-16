/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Dimensions, Image, View } from 'react-native';
import Backbtn from '../components/Backbtn';
import Background from '../utils/Background';
import { H4, H5, H6, Pera } from '../utils/Text';
import Br from '../components/Br';
const { width, height } = Dimensions.get('window');

const UserChatProfile = ({ navigation, route }) => {

    return (
        <Background noAuth>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.12, paddingBottom: height * 0.005 }}>
                <Backbtn position="static" onPress={() => navigation.goBack()} />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: height * 0.02, marginTop: height * 0.04 }}>
                <Image
                    resizeMode="contain"
                    style={{
                        borderRadius: 140 / 2,
                        width: 140,
                        height: 140,
                    }}
                    source={{ uri: route?.params?.userData?.url }}
                />
                <H5>{route?.params?.userData?.name}</H5>
                <View style={{alignItems: 'center'}}>
                    <Pera theme="transparent">Email</Pera>
                    <H6>{route?.params?.userData?.email}</H6>
                    <Br space={0.03} />
                    <Pera theme="transparent">Phone</Pera>
                    <H6>{route?.params?.userData?.phone}</H6>
                    <Br space={0.03} />
                    <Pera theme="transparent">Broker Name</Pera>
                    <H6>{route?.params?.userData?.broker_name}</H6>
                    <Br space={0.03} />
                    <Pera theme="transparent">License Number</Pera>
                    <H6>{route?.params?.userData?.license_number}</H6>
                </View>
            </View>
        </Background>
    );
};


export default UserChatProfile;
