import { Dimensions, Image, View } from "react-native";
import Backbtn from "../components/Backbtn"
import Background from "../utils/Background"
import { H4, H5, H6 } from "../utils/Text";
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
                <H5 numberOfLines={1} >{route?.params?.userData?.name}</H5>
            </View>
        </Background>
    )
}


export default UserChatProfile;