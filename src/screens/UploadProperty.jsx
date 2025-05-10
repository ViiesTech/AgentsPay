/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import {H5, Pera, Small, XSmall} from '../utils/Text';
import Br from '../components/Br';
import {Color} from '../utils/Colors';
import Input from '../components/Input';
import {CloseCircle, MaximizeCircle} from 'iconsax-react-native';
import {Button, ButtonOutline} from '../components/Button';
import Dropdown from '../components/Dropdown';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api, errHandler} from '../API';
import {launchImageLibrary} from 'react-native-image-picker';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {allCity} from '../utils/defaultValues';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {ShowAlert} from '../utils/Alert';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const UploadProperty = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const validator = require('validator');
  const [disableAgentPercentage, setDisableAgentPercentage] = useState(false);
  const [disableAgentAmount, setDisableAgentAmount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const [tags, setTags] = useState([
    {label: 'Loft', value: 'Loft'},
    {label: 'Private Pool', value: 'Private Pool'},
    {label: 'Area Pool', value: 'Area Pool'},
    {label: 'Area Tennis', value: 'Area Tennis'},
    {label: 'Yard', value: 'Yard'},
    {label: 'Gerage', value: 'Gerage'},
    {label: 'Sprinkler', value: 'Sprinkler'},

    {label: 'Must have A/C', value: 'Must have A/C'},
    {label: 'Must have pool', value: 'Must have pool'},
    {label: 'On-site Parking', value: 'On-site Parking'},
    {label: 'Waterfront', value: 'Waterfront'},
    {label: 'In-unit Laundry', value: 'In-unit Laundry'},
    {
      label: 'Accepts Agent Pay Applications',
      value: 'Accepts Agent Pay Applications',
    },
    {label: 'Income restricted', value: 'Income restricted'},
    {label: 'Hardwood Floors', value: 'Hardwood Floors'},
    {label: 'Disabled Access', value: 'Disabled Access'},
    {label: 'Utilities Included', value: 'Utilities Included'},
    {label: 'Short term lease available', value: 'Short term lease available'},
    {label: 'Furnished', value: 'Furnished'},
    {label: 'Outdoor space', value: 'Outdoor space'},
    {label: 'Controlled access', value: 'Controlled access'},
    {label: 'High speed internet', value: 'High speed internet'},
    {label: 'Elevator', value: 'Elevator'},
    {label: 'Apartment Community', value: 'Apartment Community'},
  ]);
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
    property_size_acres: 0,
    property_value: 0,
    agent_percentage: 0,
    agent_amount: 0,
    no_of_bedrooms: 0,
    no_of_bathrooms: 0,
    property_description: '',
    property_type: '',
    agent_remarks: '',
  });

  useEffect(() => {
    if (property.agent_percentage > 0) {
      setDisableAgentAmount(true);
      setProperty({...property, agent_amount: 0});
    } else {
      setDisableAgentAmount(false);
    }
  }, [property.agent_percentage]);

  useEffect(() => {
    if (property.agent_amount > 0) {
      setDisableAgentPercentage(true);
      setProperty({...property, agent_percentage: 0});
    } else {
      setDisableAgentPercentage(false);
    }
  }, [property.agent_amount]);

  useEffect(() => {
    if (isFocused) {
      loadPropertyTypes();
    }
  }, [isFocused]);

  useEffect(() => {
    const statesDropdown = [];
    const searchCityDropdown = [];
    Object.keys(allCity).map(key => {
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
      const res = await api.get('/user/properties/types', {
        headers: {Authorization: `Bearer ${token}`},
      });
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

  const removeTag = label => {
    const arr = selectedTags.slice();
    const filter = arr.filter(val => val !== label);
    setSelectedTags(filter);
  };

  const removeDoc = index => {
    const arr = documents.slice();
    const filter = arr.filter((val, i) => i !== index);
    setDocuments(filter);
  };

  const isValid = () => {
    if (validator.isEmpty(property?.address)) {
      ShowAlert('Address is required!', 'Please enter address.');
      return false;
    }

    if (
      parseFloat(property?.agent_percentage) < 1 &&
      parseFloat(property?.agent_amount) < 1
    ) {
      ShowAlert(
        'Agent Percentage or Amount is required!',
        'Please enter agent percentage or amount.',
      );
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
        const propertyType = propertyTypes.filter(
          val => val.label === property?.property_type,
        )[0];
        const res = await api.post(
          '/user/properties/upload',
          {
            tags: JSON.stringify(selectedTags),
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
            property_type: propertyType ? propertyType?.id : '',
            agent_remarks: property?.agent_remarks?.toString(),
          },
          {headers: {Authorization: `Bearer ${token}`}},
        );

        if (route.name === 'UploadProperty') {
          if (Platform.OS === 'android') {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              gravity: 'center',
              title: res.data?.title,
              textBody: res.data?.message,
              button: 'Okay',
              onPressButton: () => navigation.replace('UploadedProperties'),
              onHide: () => navigation.replace('UploadedProperties'),
            });
          } else {
            Alert.alert(res.data?.title, res.data?.message, [
              {
                text: 'Okay',
                onPress: () => navigation.replace('UploadedProperties'),
              },
            ]);
          }
        }
      } catch (err) {
        await errHandler(err);
      }
      setLoading(false);
    }
  };

  const convertPropertyInAcres = squareFeet => {
    const squareFeetPerAcre = 43560;
    return squareFeet / squareFeetPerAcre;
  };

  const convertPropertyInSq = acres => {
    const squareFeetPerAcre = 43560;
    return acres * squareFeetPerAcre;
  };

  const fetchAddressSuggestions = async value => {
    if (!value) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const options = {
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyD0w7OQfYjg6mc7LVGwqPkvNDQ6Ao7GTwk&language=en`,
    };

    try {
      const {data} = await axios.request(options);
      setSuggestions(data.predictions || []); // Update suggestions
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = value => {
    setProperty({...property, address: value});

    // Debounce to reduce API calls
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      fetchAddressSuggestions(value);
    }, 500); // Wait for 500ms pause before making an API call

    setDebounceTimer(timer);
  };

  const handleSelectSuggestion = suggestion => {
    getStateFromPlaceId(suggestion.place_id).then(state => {
      setProperty({
        ...property,
        address: suggestion.description,
        state: state,
      });
    });
    setSuggestions([]); // Clear suggestions
  };

  // Function to fetch state from place_id
  async function getStateFromPlaceId(placeId) {
    const apiKey = 'AIzaSyD0w7OQfYjg6mc7LVGwqPkvNDQ6Ao7GTwk'; // Replace with your Google API Key
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const addressComponents = data.result.address_components;

        // Find the state in address_components
        const state = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1'),
        );

        return state ? state.long_name : null; // Return the state name
      } else {
        console.error('Error fetching place details:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  return (
    <Background>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: width * 0.85,
          alignSelf: 'center',
        }}>
        <Backbtn position="static" onPress={() => navigation.goBack()} />
      </View>
      <Br space={0.05} />
      <H5
        theme="light"
        style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
        Upload Property
      </H5>
      <Pera
        theme="transparent"
        style={{textAlign: 'center', width: width * 0.85, alignSelf: 'center'}}>
        Make your property stand out from the crowd! Upload your listing now and
        get noticed by serious buyers and renters who are looking for a property
        just like yours
      </Pera>

      <Br space={0.03} />
      <Pera
        theme="transparent"
        style={{width: width * 0.85, alignSelf: 'center'}}>
        Upload Property Images
      </Pera>
      <Br space={0.02} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 15,
          width: width * 0.85,
          alignSelf: 'center',
        }}>
        {images.map((item, index) => (
          <Image
            source={{
              uri: `data:${images[index].type};base64,${images[index].base64}`,
            }}
            style={{
              width: width * 0.25,
              height: width * 0.25,
              borderRadius: 20,
              marginBottom: 10,
            }}
            resizeMode="stretch"
          />
        ))}
        {images.length <= 5 ? (
          <Pressable
            onPress={uploadImage}
            style={{flexGrow: 1, marginBottom: height * 0.025}}>
            <Image
              source={require('../assets/images/upload_image.png')}
              style={{
                width: width * 0.25,
                height: width * 0.25,
                borderRadius: 20,
              }}
              resizeMode="stretch"
            />
          </Pressable>
        ) : null}
      </View>
      {/* <Dropdown
                data={states}
                selectedValue={property.state}
                defaultValue="Select a State"
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
            /> */}
      {cities.length !== 0 && (
        <Dropdown
          data={cities}
          defaultValue="Select a City"
          selectedValue={property.city}
          onValueChange={value => {
            setProperty({...property, city: value});
          }}
          style={{width: width * 0.86, alignSelf: 'center'}}
          defaultStyle={undefined}
          label={undefined}
          icon={undefined}
        />
      )}

      {/* <Input
        value={property?.address}
        labelText="Address"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => SearchAddress(value) }
      /> */}

      <Input
        value={property?.address}
        labelText="Address"
        style={{
          width: width * 0.85,
          marginBottom: 16,
          alignSelf: 'center',
        }}
        onChange={handleAddressChange}
      />
      {property?.state && (
        <View style={{width: width * 0.85, alignSelf: 'center', marginBottom:10, gap:3}}>
          <XSmall
            style={{
              color: Color('textLight'),
              fontFamily: 'Poppins-Regular',
              marginLeft:5
              
            }}>
            {'State'}
          </XSmall>

          <View style={{borderBottomWidth: 1, borderBottomColor: '#FFFFFF', paddingBottom:7}}>
            <Pera
              style={{
                color: '#FFFFFF',
                fontFamily: 'Poppins-Regular',
              }}>
              {property?.state}
            </Pera>
          </View>
        </View>
      )}
      {loading && (
        <ActivityIndicator
          size="small"
          color="white"
          style={{marginBottom: 16}}
        />
      )}

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectSuggestion(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FFFFFF',
              }}>
              <Text style={{color: 'black'}}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={{
            maxHeight: 200,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
          }}
        />
      )}

      <Dropdown
        data={propertyTypes}
        selectedValue={property.property_type}
        defaultValue="Select Property Type"
        onValueChange={value =>
          setProperty({...property, property_type: value})
        }
        style={{width: width * 0.86, alignSelf: 'center'}}
        defaultStyle={undefined}
        label={undefined}
        icon={undefined}
      />
      <Input
        keyboardType="numeric"
        value={property?.property_size}
        labelText="Lot (sq. ft)"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => {
          const squareFeet = parseFloat(value) || 0; // Safely parse value
          setProperty({
            ...property,
            property_size: value,
            property_size_acres: convertPropertyInAcres(squareFeet).toFixed(0), // Optional: Format to 2 decimals
          });
        }}
      />

      <Input
        keyboardType="numeric"
        value={property?.property_size_acres}
        labelText="Lot (Acres)"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => {
          const acres = parseFloat(value) || 0; // Safely parse value
          setProperty({
            ...property,
            property_size_acres: value,
            property_size: convertPropertyInSq(acres).toFixed(0), // Optional: Format to 2 decimals
          });
        }}
      />

      <Input
        keyboardType="numeric"
        value={property?.property_value}
        labelText="Property Price ($)"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value =>
          setProperty({...property, property_value: value})
        }
      />
      <Input
        readOnly={disableAgentPercentage}
        keyboardType="numeric"
        value={property?.agent_percentage}
        labelText="Agent Percentage (%)"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => setProperty({...property, agent_percentage: value})}
      />
      <View
        style={{justifyContent: 'center', alignItems: 'center', top: '0.5%'}}>
        <Text
          style={{fontSize: 14, color: Color('textColor'), fontWeight: '800'}}>
          OR
        </Text>
      </View>
      <Input
        readOnly={disableAgentAmount}
        keyboardType="numeric"
        value={property?.agent_amount}
        labelText="Agent Amount ($)"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => setProperty({...property, agent_amount: value})}
      />
      {/* <Br space={0.02} /> */}
      <Input
        keyboardType="numeric"
        value={property?.no_of_bedrooms}
        labelText="Number of Bedrooms"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => setProperty({...property, no_of_bedrooms: value})}
      />
      <Input
        keyboardType="numeric"
        value={property?.no_of_bathrooms}
        labelText="Number of Bathrooms"
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          marginBottom: height * 0.015,
        }}
        onChange={value => setProperty({...property, no_of_bathrooms: value})}
      />
      <Dropdown
        data={tags}
        selectedData={selectedTags}
        defaultValue="Amenities"
        style={{width: width * 0.86, alignSelf: 'center'}}
        defaultStyle={undefined}
        label={undefined}
        icon={undefined}
        multiple
        onValueChange={value => {
          if (selectedTags.includes(value)) {
            setSelectedTags(() => selectedTags.filter(val => val !== value));
          } else {
            setSelectedTags(() => [...selectedTags, value]);
          }
        }}
      />
      <Br space={0.015} />
      <View
        style={{
          width: width * 0.85,
          alignSelf: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}>
        {selectedTags.map((label, index) => {
          return (
            <Pressable
              onPress={() => removeTag(label)}
              key={index}
              style={{
                borderWidth: 1,
                borderColor: Color('textColor'),
                paddingVertical: height * 0.008,
                paddingHorizontal: width * 0.05,
                borderRadius: 30,
              }}>
              <Small
                style={{
                  fontFamily: 'Inter_28pt-Regular',
                  textTransform: 'capitalize',
                }}>
                {label}
              </Small>
            </Pressable>
          );
        })}
      </View>
      <Br space={0.03} />
      <View style={{width: width * 0.85, alignSelf: 'center'}}>
        <Small theme="transparent" style={{paddingLeft: width * 0.02}}>
          About the Property
        </Small>
        <Br space={0.01} />
        <View
          style={{
            padding: width * 0.05,
            paddingTop: height * 0.01,
            backgroundColor: Color('btnOutline'),
            borderRadius: 20,
          }}>
          <TextInput
            multiline
            value={property.property_description}
            onChangeText={value =>
              setProperty({...property, property_description: value})
            }
            placeholder="Enter information"
            numberOfLines={height < 650 ? 8 : 10}
            style={{textAlignVertical: 'top', color: Color('darkTheme')}}
            placeholderTextColor={Color('gray')}
          />
        </View>
      </View>
      <View style={{width: width * 0.85, alignSelf: 'center'}}>
        <Small
          theme="transparent"
          style={{paddingLeft: width * 0.02, paddingTop: width * 0.05}}>
          Agents Remarks
        </Small>
        <Br space={0.01} />
        <View
          style={{
            padding: width * 0.05,
            paddingTop: height * 0.01,
            backgroundColor: Color('btnOutline'),
            borderRadius: 20,
          }}>
          <TextInput
            multiline
            value={property.agent_remarks}
            onChangeText={value =>
              setProperty({...property, agent_remarks: value})
            }
            placeholder="Enter information"
            numberOfLines={height < 650 ? 8 : 10}
            style={{textAlignVertical: 'top', color: Color('darkTheme')}}
            placeholderTextColor={Color('gray')}
          />
        </View>
      </View>
      <Br space={0.03} />
      <Button
        onPress={() => {
          if (documents?.length === 2) {
            ShowAlert('Only 2 document is allowed!');
          } else {
            uploadDocuments();
          }
        }}
        style={{width: width * 0.85, alignSelf: 'center'}}>
        Upload Documents
      </Button>
      {documents.length > 0 && (
        <>
          <Br space={0.03} />
          <Pera
            theme="transparent"
            style={{
              marginTop: height * 0.002,
              width: width * 0.85,
              alignSelf: 'center',
            }}>
            Uploaded Document
          </Pera>
          <Br space={0.01} />
        </>
      )}
      {documents.map((val, index) => {
        return (
          <View key={index} style={{width: width * 0.85, alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.85,
                alignSelf: 'center',
              }}>
              <Pera
                numberOfLines={1}
                style={{marginTop: height * 0.002, width: width * 0.7}}>
                {val.fileName}
              </Pera>
              <Pressable onPress={() => removeDoc(index)}>
                <CloseCircle size="25" color={Color('btnBackground')} />
              </Pressable>
            </View>
            <Br space={0.02} />
          </View>
        );
      })}
      <Br space={0.05} />
      <ButtonOutline
        loading={loading}
        style={{width: width * 0.85, alignSelf: 'center'}}
        onPress={onAddProperty}>
        Submit
      </ButtonOutline>
      <Br space={0.05} />
    </Background>
  );
};

export default UploadProperty;
