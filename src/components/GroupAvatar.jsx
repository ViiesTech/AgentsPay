/* eslint-disable react/react-in-jsx-scope */
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Color } from '../utils/Colors';

const Avatar = ({ width, height, data, id }) => {
    return <ImageBackground source={{uri: data}} key={id} style={[styles.avatar, { width: width, height: height, marginRight: -(width / 2) }]} />;
};

export const AvatarList = ({ width, height, arr }) => {
    return (
        <View style={styles.avatarList}>
            {
                arr.slice(0,10).map((val, index) => {
                    return <Avatar width={width} height={height} data={val} id={index} />;
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    avatarList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: Color('textColor'),
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Color('textColor'),
        shadowColor: Color('textColor'),
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        overflow: 'hidden',
    },
});
