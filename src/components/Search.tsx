/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, FlatList, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { H6, Small } from '../utils/Text';
import { SearchNormal1, Setting4 } from 'iconsax-react-native';
import { Color } from '../utils/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Br from './Br';

const { height, width } = Dimensions.get('window');

const Search = ({propertyType, propertyTypes, label, navigation, setKeywords, setPropertyType}: {propertyType?: any, setPropertyType?: any, setKeywords?: any, propertyTypes?: any, label: number, navigation?: any}) => {
    return (
        <View>
            <H6 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>{label}</H6>
            <Br space={0.02} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color('textColor'),
                paddingHorizontal: width * 0.03,
                paddingVertical: height < 650 ? 0 : (height * 0.005),
                borderRadius: 30,
            }}>
                <SearchNormal1
                    size="25"
                    color={Color('gray')}
                />
                <TextInput
                    style={{flex: 1, paddingLeft: width * 0.03, fontSize: RFValue(14, height), color: Color('btnText')}}
                    placeholderTextColor={Color('gray')}
                    placeholder="Search anything"
                    onChangeText={(text: any) => setKeywords(text.toLowerCase())}
                    // onBlur={() => navigation.navigate('ListedProperties', {keywords: keywords})}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Filters')} style={{backgroundColor: Color('btnBackground'), padding: width * 0.02, borderRadius: 100}}>
                    <Setting4
                        size="20"
                        color={Color('btnText')}
                    />
                </TouchableOpacity>
            </View>
            <Br space={0.02} />
            {
                propertyTypes && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={propertyTypes}
                        horizontal
                        renderItem={({ item }: { item?: any }) => {
                            return (
                                <Pressable
                                    onPress={() => setPropertyType(item?.label.toLowerCase())}
                                    style={{
                                        borderColor: Color('textColor'),
                                        backgroundColor: propertyType === item?.label.toLowerCase() ? Color('textColor') : null,
                                        borderWidth: 1,
                                        paddingTop: height * 0.01,
                                        paddingBottom: height * 0.007,
                                        paddingHorizontal: width * 0.05,
                                        marginRight: width * 0.02,
                                        borderRadius: 30,
                                    }}
                                >
                                    <Small style={{ color: propertyType === item?.label.toLowerCase() ? Color('btnText') : Color('textColor') }}>{item?.label}</Small>
                                </Pressable>
                            );
                        }}
                        keyExtractor={(item, index: any) => index}
                    />
                )
            }
        </View>
    );
};

export default Search;
