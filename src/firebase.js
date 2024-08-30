/* eslint-disable no-unused-vars */
import { PermissionsAndroid } from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const config = {
  apiKey: 'AIzaSyCcqJR5ch6nizGv09yk90N24YEmHf00KUQ',
  authDomain: 'date420-c38ee.firebaseapp.com',
  projectId: 'date420-c38ee',
  storageBucket: 'date420-c38ee.appspot.com',
  messagingSenderId: '436381275114',
  appId: '1:436381275114:web:f3e13c7045d0a674725893',
  persistence: true,
  measurementId: 'G-5BQPGBTEP6',
  databaseURL: 'https://date420-c38ee-default-rtdb.firebaseio.com/',
};

export async function connectFirebase() {
  try {
    const initializeLoginFramework = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
    const fcmToken = await messaging().getToken();
    const subscribeToTopic = await messaging().subscribeToTopic('date420');
    return fcmToken;
  }catch(err) {
    console.log(err);
  }
}
