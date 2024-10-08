import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import Backbtn from "../components/Backbtn"
import Background from "../utils/Background"
import Br from "../components/Br";
import { H4, H5, H6, Small } from "../utils/Text";
import { Color } from "../utils/Colors";

const { width, height } = Dimensions.get('window');
const inboxChat = [
    {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum  '

    },
    {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    },
    {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum  '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum  '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    }, {
        imagUrl: 'https://random.imagecdn.app/500/150',
        name: 'Charlie',
        msg: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum '

    },
]
const Inbox = ({ navigation, route }) => {
    return (
        <Background>
            <Backbtn onPress={() => navigation.goBack()} backToSidebar={route?.params?.backToSidebar} />
            <View style={{ width: width * 0.85, alignItems: 'center' }}>
                <H4 theme="light" style={{ fontFamily: 'Poppins-SemiBold' }}>Inbox</H4>
                <Br space={0.02} />
                <View>
                <FlatList
                    data={inboxChat}
                    renderItem={({ item, index }) => {
                        return (
                                <Pressable
                                    // onPress={() => { navigation.navigate('Chat') }}
                                    style={styles.container} key={index}>
                                    <View style={styles.subContainer} >
                                        <Image source={{ uri: item.imagUrl }} style={styles.imgStyle} resizeMode="cover" />
                                        <View style={styles.bodyContainer}>
                                            <H6 numberOfLines={1} style={{ fontFamily: 'Poppins-SemiBold', textTransform: 'capitalize' }}>{item.name}</H6>
                                            <Small>{item.msg}</Small>
                                        </View>
                                    </View>
                                </Pressable>
                        )
                    }}
                    />
                    </View> 
                <Br space={0.02} />
            </View>
        </Background>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: width * 0.03
    },
    subContainer: {
        flexDirection: 'row',
        gap: width * 0.05,
        alignItems: 'center',
    },
    bodyContainer: {
        flexDirection: 'column',
    },
    imgStyle: {
        borderRadius: 100,
        width: width * 0.15,
        height: width * 0.15,
        borderWidth: 2,
        borderColor: Color('textColor'),
    }
})

export default Inbox;