/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { AddCircle, GlobalSearch, Home, User } from 'iconsax-react-native';
import { Color } from '../utils/Colors';
import { useNavigation } from '../utils/NavigationContext';
import { useDispatch } from 'react-redux';
import { showDrawer } from '../redux/Reducers/drawerSlice';

const { height, width } = Dimensions.get('window');

const NavigationBar = () => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    return (
        <View style={{ position: 'absolute', bottom: height * 0.02, flexDirection: 'row', alignItems: 'center', backgroundColor: Color('navigationBackground'), width: width * 0.85, paddingVertical: height * 0.02, borderRadius: 15, alignSelf: 'center' }}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => navigate('Home')}>
                <View style={{ backgroundColor: Color('btnBackground'), borderRadius: 100, padding: width * 0.02 }}>
                    <Home
                        size="25"
                        color={Color('textColor')}
                        variant="Bold"
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => navigate('Filters')}>
                <View>
                    <GlobalSearch
                        size="25"
                        color={Color('navigationIcon')}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => navigate('UploadProperty')}>
                <View>
                    <AddCircle
                        size="25"
                        color={Color('navigationIcon')}
                        variant="Bold"
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => dispatch(showDrawer())}>
                <View>
                    <User
                        size="25"
                        color={Color('navigationIcon')}
                        variant="Bold"
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default NavigationBar;
