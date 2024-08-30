/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Button, ButtonOutline } from '../components/Button';
import Br from '../components/Br';

const { width, height } = Dimensions.get('screen');

const Splash = ({ navigation }: { navigation: any }) => {

    return (
      <View>
        <Image
          source={require('../assets/images/splash.png')}
          style={styles.container}
        />
        <View style={{
          position: 'absolute',
          top: height * 0.11,
          left: width * 0.25,
          height: height * 0.8,
          justifyContent: 'space-between',
        }}>
          <Image style={{
            maxWidth: width * 0.5,
            maxHeight: width * 0.5,
          }}
            source={require('../assets/images/icon.png')}
          />
          <View>
            <Button onPress={() => navigation.navigate('Login')}>Login</Button>
            <Br space={0.03} />
            <ButtonOutline onPress={() => navigation.navigate('Signup')}>Signup</ButtonOutline>
          </View>
        </View>
      </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
});
