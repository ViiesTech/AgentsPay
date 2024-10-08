/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, Text, TextInput, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Input from '../components/Input';
import { CloseCircle } from 'iconsax-react-native';
import { Button, ButtonOutline } from '../components/Button';
import Dropdown from '../components/Dropdown';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import { launchImageLibrary } from 'react-native-image-picker';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { allCity } from '../utils/defaultValues';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { ShowAlert } from '../utils/Alert';

const { width, height } = Dimensions.get('window');
const UploadProperty = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const validator = require('validator');
    const [disableAgentPercentage, setDisableAgentPercentage] = useState(false);
    const [disableAgentAmount, setDisableAgentAmount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [images, setImages] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [searchCity, SetSearchCity] = useState({});
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [property, setProperty] = useState({
        title: '',
        city: '',
        state: '',
        address: '',
        property_size: 0,
        property_value: 0,
        agent_percentage: 0,
        agent_amount: 0,
        no_of_bedrooms: 0,
        no_of_bathrooms: 0,
        property_description: '',
        property_type: '',
        agent_remarks: ''
    });

    useEffect(() => {
        if (property.agent_percentage > 0) {
            setDisableAgentAmount(true);
            setProperty({ ...property, agent_amount: 0 });
        } else {
            setDisableAgentAmount(false);
        }
    }, [property.agent_percentage]);

    useEffect(() => {
        if (property.agent_amount > 0) {
            setDisableAgentPercentage(true);
            setProperty({ ...property, agent_percentage: 0 });
        } else {
            setDisableAgentPercentage(false);
        }
    }, [property.agent_amount]);

    useEffect(() => {
        if (isFocused) { loadPropertyTypes(); }
    }, [isFocused]);

    useEffect(() => {
        const statesDropdown = [];
        const searchCityDropdown = [];
        Object.keys(allCity).map((key) => {
            searchCityDropdown.push({
                serachState: key,
                allCity: allCity[key],
            });
            statesDropdown.push({
                label: key,
                value: key,
            });
        });
        setStates(statesDropdown);
        SetSearchCity(searchCityDropdown);
    }, [allCity]);

    const loadPropertyTypes = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/properties/types', { headers: { Authorization: `Bearer ${token}` } });
            const arr = [];
            for (let x = 0; x < res.data.data.length; x++) {
                arr.push({
                    id: res.data.data[x].id,
                    value: res.data.data[x].label,
                    label: res.data.data[x].label,
                });
            }
            setPropertyTypes(arr);
        } catch (err) {
            await errHandler(err, () => loadPropertyTypes());
        }
    };

    const uploadImage = async () => {
        let imgs = images.slice();
        const result = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            includeBase64: true,
            selectionLimit: 6,
        });

        if (result?.assets) {
            for (let x = 0; x < result?.assets.length; x++) {
                imgs.push(result?.assets[x]);
            }

            if (imgs.length > 6) {
                imgs.splice(0, imgs.length - 6);
            }
            setImages(imgs);
        }
    };

    const uploadDocuments = async () => {
        try {
            let docs = documents.slice();
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                allowMultiSelection: true,
            });
            for (let x = 0; x < result.length; x++) {
                const base64 = await RNFS.readFile(result[x].uri, 'base64');
                result[x].base64 = base64;
                result[x].fileName = result[x].name;
                docs.push(result[x]);
            }

            if (docs.length > 2) {
                docs.splice(0, docs.length - 6);
            }
            setDocuments(docs);
        } catch (err) {
            console.log(null);
        }
    };

    const addTag = () => {
        const arr = tags.slice();
        arr.push(tag.toLowerCase());
        setTags(arr);
        setTag('');
    };

    const removeTag = (label) => {
        const arr = tags.slice();
        const filter = arr.filter(val => val !== label);
        setTags(filter);
    };

    const removeDoc = (index) => {
        const arr = documents.slice();
        const filter = arr.filter((val, i) => i !== index);
        setDocuments(filter);
    };

    const isValid = () => {

        if (validator.isEmpty(property?.address)) {
            ShowAlert('Address is required!', 'Please enter address.');
            return false;
        }

        if (parseFloat(property?.agent_percentage) < 1 && parseFloat(property?.agent_amount) < 1) {
            ShowAlert('Agent Percentage or Amount is required!', 'Please enter agent percentage or amount.');
            return false;
        }
        return true;
    };

    const onAddProperty = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);

            try {
                const token = await AsyncStorage.getItem('token');
                const propertyType = propertyTypes.filter(val => val.label === property?.property_type)[0];
                const res = await api.post('/user/properties/upload', {
                    tags: JSON.stringify(tags),
                    images: JSON.stringify(images),
                    documents: JSON.stringify(documents),
                    title: property?.title.toString(),
                    city: property?.city.toString(),
                    state: property?.state.toString(),
                    address: property?.address.toString(),
                    property_size: property?.property_size,
                    property_value: property?.property_value,
                    agent_percentage: property?.agent_percentage,
                    agent_amount: property?.agent_amount,
                    no_of_bedrooms: property?.no_of_bedrooms,
                    no_of_bathrooms: property?.no_of_bathrooms,
                    property_description: property?.property_description.toString(),
                    property_type: propertyType ? propertyType?.id : "",
                    agent_remarks: property?.agent_remarks?.toString()
                }, { headers: { Authorization: `Bearer ${token}` } });

                if (route.name === 'UploadProperty') {
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        gravity: 'center',
                        title: res.data?.title,
                        textBody: res.data?.message,
                        button: 'Okay',
                        onPressButton: () => navigation.replace('UploadedProperties'),
                        onHide: () => navigation.replace('UploadedProperties'),
                    });
                }
            } catch (err) {
                await errHandler(err);
            }
            setLoading(false);
        }
    };

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
            <H5 theme="light" style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Upload Property</H5>
            <Pera theme="transparent" style={{ textAlign: 'center', width: width * 0.85, alignSelf: 'center' }}>We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity</Pera>
            <Br space={0.02} />
            <Input
                value={property?.title}
                labelText="Property"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, title: value })}
            />
            <Dropdown
                data={states}
                selectedValue={property.state}
                onValueChange={(value) => {
                    setProperty({ ...property, state: value });
                    const selectedCities = searchCity.filter(function (creature) {
                        return creature.serachState === value;
                    });
                    let filterCities = [];
                    selectedCities[0]?.allCity?.map((item) => {
                        filterCities.push({
                            label: item,
                            value: item,
                        });
                        setCities(filterCities);
                    });
                }}
                style={{ width: width * 0.86, alignSelf: 'center' }}
                defaultStyle={undefined}
                label={undefined}
                icon={undefined}
            />
            {cities.length !== 0 &&
                <Dropdown
                    data={cities}
                    selectedValue={property.city}
                    onValueChange={(value) => { setProperty({ ...property, city: value }); }}
                    style={{ width: width * 0.86, alignSelf: 'center' }}
                    defaultStyle={undefined}
                    label={undefined}
                    icon={undefined}
                />
            }


            <Input
                value={property?.address}
                labelText="Address"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, address: value })}
            />
            <Dropdown
                data={propertyTypes}
                selectedValue={property.property_type}
                onValueChange={(value) => setProperty({ ...property, property_type: value })}
                style={{ width: width * 0.86, alignSelf: 'center' }}
                defaultStyle={undefined}
                label={undefined}
                icon={undefined}
            />
            <Input
                keyboardType="numeric"
                value={property?.property_size}
                labelText="Property Area  (Sq)"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, property_size: value })}
            />
            <Input
                keyboardType="numeric"
                value={property?.property_value}
                labelText="Property Price"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, property_value: value })}
            />
            <Input
                readOnly={disableAgentPercentage}
                keyboardType="numeric"
                value={property?.agent_percentage}
                labelText="Agent Percentage (%)"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, agent_percentage: value })}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', top: '0.5%' }}>
                <Text style={{ fontSize: 14, color: Color('textColor'), fontWeight: '800' }}>OR</Text>
            </View>
            <Input
                readOnly={disableAgentAmount}
                keyboardType="numeric"
                value={property?.agent_amount}
                labelText="Agent Amount"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, agent_amount: value })}
            />
            <Br space={0.03} />
            <Pera theme="transparent" style={{ width: width * 0.85, alignSelf: 'center' }}>Upload Property Images</Pera>
            <Br space={0.02} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 15, width: width * 0.85, alignSelf: 'center' }}>
                {images.map((item, index) => (
                    <Image source={{ uri: `data:${images[index].type};base64,${images[index].base64}` }}
                        style={{ width: width * 0.25, height: width * 0.25, borderRadius: 20, marginBottom: 10 }}
                        resizeMode="stretch" />
                ))}
                {images.length <= 5 ? <Pressable
                    onPress={uploadImage}
                    style={{ flexGrow: 1, marginBottom: height * 0.025 }}>
                    <Image source={require('../assets/images/upload_image.png')} style={{ width: width * 0.25, height: width * 0.25, borderRadius: 20 }} resizeMode="stretch" />
                </Pressable> : null}
            </View>
            <Br space={0.03} />
            <Input
                keyboardType="numeric"
                value={property?.no_of_bedrooms}
                labelText="Number of Bedrooms"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, no_of_bedrooms: value })}
            />
            <Input
                keyboardType="numeric"
                value={property?.no_of_bathrooms}
                labelText="Number of Bathrooms"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015 }}
                onChange={(value) => setProperty({ ...property, no_of_bathrooms: value })}
            />
            <Input
                value={tag}
                labelText="Amenities"
                placeholder={tags.length > 0 ? 'You can add more' : ''}
                plceHolderTextClr="rgba(255, 255, 255, 0.4)"
                style={{ width: width * 0.85, alignSelf: 'center', marginBottom: height * 0.015, fontSize: 12 }}
                onChange={(value) => setTag(value)}
                onBlur={addTag}
            />
            <View style={{ width: width * 0.85, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {
                    tags.map((label, index) => {
                        return (
                            <Pressable onPress={() => removeTag(label)} key={index} style={{ borderWidth: 1, borderColor: Color('textColor'), paddingVertical: height * 0.008, paddingHorizontal: width * 0.05, borderRadius: 30 }}>
                                <Small style={{ fontFamily: 'Inter_28pt-Regular', textTransform: 'capitalize' }}>{label}</Small>
                            </Pressable>
                        );
                    })
                }
            </View>
            <Br space={0.03} />
            <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                <Small theme="transparent" style={{ paddingLeft: width * 0.02 }}>About the Property</Small>
                <Br space={0.01} />
                <View style={{
                    padding: width * 0.05,
                    paddingTop: height * 0.01,
                    backgroundColor: Color('btnOutline'),
                    borderRadius: 20,
                }}>
                    <TextInput multiline value={property.property_description} onChangeText={(value) => setProperty({ ...property, property_description: value })} placeholder="Enter information" numberOfLines={height < 650 ? 8 : 10} style={{ textAlignVertical: 'top', color: Color('darkTheme') }} placeholderTextColor={Color('gray')} />
                </View>
            </View>
            <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                <Small theme="transparent" style={{ paddingLeft: width * 0.02, paddingTop: width * 0.05 }}>Agents Remarks</Small>
                <Br space={0.01} />
                <View style={{
                    padding: width * 0.05,
                    paddingTop: height * 0.01,
                    backgroundColor: Color('btnOutline'),
                    borderRadius: 20,
                }}>
                    <TextInput multiline value={property.agent_remarks} onChangeText={(value) => setProperty({ ...property, agent_remarks: value })} placeholder="Enter information" numberOfLines={height < 650 ? 8 : 10} style={{ textAlignVertical: 'top', color: Color('darkTheme') }} placeholderTextColor={Color('gray')} />
                </View>
            </View>
            <Br space={0.03} />
            <Button onPress={() => {
                if (documents?.length === 2) {
                    ShowAlert('Only 2 document is allowed!',);
                } else {
                    uploadDocuments()
                }
            }} style={{ width: width * 0.85, alignSelf: 'center' }}>Upload Documents</Button>
            {documents.length > 0 && (
                <>
                    <Br space={0.03} />
                    <Pera theme="transparent" style={{ marginTop: height * 0.002, width: width * 0.85, alignSelf: 'center' }}>Uploaded Document</Pera>
                    <Br space={0.01} />
                </>
            )
            }
            {documents.map((val, index) => {
                return (
                    <View key={index} style={{ width: width * 0.85, alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.85, alignSelf: 'center' }}>
                            <Pera numberOfLines={1} style={{ marginTop: height * 0.002, width: width * 0.7 }}>{val.fileName}</Pera>
                            <Pressable onPress={() => removeDoc(index)}>
                                <CloseCircle
                                    size="25"
                                    color={Color('btnBackground')}
                                />
                            </Pressable>
                        </View>
                        <Br space={0.02} />
                    </View>
                );
            })
            }
            <Br space={0.05} />
            <ButtonOutline loading={loading} style={{ width: width * 0.85, alignSelf: 'center' }} onPress={onAddProperty}>Submit</ButtonOutline>
            <Br space={0.05} />
        </Background>
    );
};

export default UploadProperty;
