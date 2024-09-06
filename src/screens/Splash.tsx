/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Button, ButtonOutline } from '../components/Button';
import Br from '../components/Br';
import { Color } from '../utils/Colors';

const { width, height } = Dimensions.get('screen');

const Splash = ({ navigation }: { navigation: any }) => {
  const [top, setTop]: any = useState(height * 0.3);
  const [showBtn, setShowBtn] = useState(false);
  const [start, setStart] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 2000);
  }, []);
  useEffect(() => {
    if (start) {
      setTimeout(() => {
        moveUpwards();
      }, 0.9);
    }
  }, [top, start]);
  const moveUpwards = () => {
    const max: any = height * 0.11;
    if (parseInt(top) >= parseInt(max)) {
      setTop(top - 1);
    } else {
      setShowBtn(true);
    }
  };

  return (
    <View>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.container}
      />
      <View style={{
        position: 'absolute',
        top: top,
        left: width * 0.25,
        justifyContent: 'space-between',
      }}>
        <Image style={{
          maxWidth: width * 0.5,
          maxHeight: width * 0.5,
        }}
          source={require('../assets/images/icon.png')}
        />
        {
          showBtn && (
            <>
              <View>
                <Br space={0.03} />
                <Button textStyle={{ letterSpacing: 3 }} color={Color('navigationBackground')} onPress={() => navigation.navigate('Login')}>LOGIN</Button>
                <Br space={0.03} />
                <ButtonOutline textStyle={{ letterSpacing: 3 }} style={{ backgroundColor: null, borderColor: Color('btnBackground'), borderWidth: 2 }} color={Color('btnBackground')} onPress={() => navigation.navigate('Signup')}>SIGN UP</ButtonOutline>
              </View>
            </>
          )
        }
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
