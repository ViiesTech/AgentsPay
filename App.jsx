/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider, useNavigation } from './src/utils/NavigationContext';
import { Suspense, useEffect } from 'react';

import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar } from 'react-native';

import Splash from './src/screens/Splash';
import Loading from './src/screens/Loading';
import SendAgreement from './src/screens/SendAgreement';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import ForgotPassword from './src/screens/ForgotPassword';
import OTP from './src/screens/OTP';
import ResetPassword from './src/screens/ResetPassword';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import UserTerms from './src/screens/UserTerms';
import Home from './src/screens/Home';
import CompleteProfile from './src/screens/CompleteProfile';
import Subscriptions from './src/screens/Subscriptions';
import SubscriptionPayment from './src/screens/SubscriptionPayment';
import PropertyCard from './src/components/PropertyCard';
import Filters from './src/screens/Filters';
import UploadedProperties from './src/screens/UploadedProperties';
import ListedProperties from './src/screens/ListedProperties';
import BookmarkedProperties from './src/screens/BookmarkedProperties';
import ContactAdmin from './src/screens/ContactAdmin';
import MySubscription from './src/screens/MySubscription';
import PaymentCards from './src/screens/PaymentCards';
import AddCard from './src/screens/AddCard';
import PropertyDetails from './src/screens/PropertyDetails';
import Notifications from './src/screens/Notifications';
import UploadProperty from './src/screens/UploadProperty';
import Logout from './src/screens/Logout';
import EditProfile from './src/screens/EditProfile';
import EditProperty from './src/screens/EditProperty';
import Chat from './src/screens/Chat';
import Inbox from './src/screens/Inbox';
import UserChatProfile from './src/screens/UserChatProfile';
import Purchases from 'react-native-purchases';

const Stack = createNativeStackNavigator();

function App() {
  const { navigationRef } = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: 'appl_AiXHGogHIEulbOtFoRauzRglJvj'});
    }
  }, []);

  const Sus = ({ component }) => {
    return <Suspense fallback={<Loading />}>{component}</Suspense>;
  };
  return (
    <>
      <Provider store={store} >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Welcome">
              {props => <Sus component={<Welcome {...props} />} />}
            </Stack.Screen>

            {/* AUTH */}
            <Stack.Screen name="Login">
              {props => <Sus component={<Login {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="SendAgreement">
              {props => <Sus component={<SendAgreement {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => <Sus component={<Signup {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword">
              {props => <Sus component={<ForgotPassword {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="OTP">
              {props => <Sus component={<OTP {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="ResetPassword">
              {props => <Sus component={<ResetPassword {...props} />} />}
            </Stack.Screen>

            {/* AFTER AUTHENTICATION */}
            <Stack.Screen name="Home">
              {props => <Sus component={<Home {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="CompleteProfile">
              {props => <Sus component={<CompleteProfile {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Subscriptions">
              {props => <Sus component={<Subscriptions {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="SubscriptionPayment">
              {props => <Sus component={<SubscriptionPayment {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="PropertyCard">
              {props => <Sus component={<PropertyCard {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Filters">
              {props => <Sus component={<Filters {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="UploadedProperties">
              {props => <Sus component={<UploadedProperties {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="ListedProperties">
              {props => <Sus component={<ListedProperties {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="BookmarkedProperties">
              {props => <Sus component={<BookmarkedProperties {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="ContactAdmin">
              {props => <Sus component={<ContactAdmin {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="MySubscription">
              {props => <Sus component={<MySubscription {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="PaymentCards">
              {props => <Sus component={<PaymentCards {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="AddCard">
              {props => <Sus component={<AddCard {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="PropertyDetails">
              {props => <Sus component={<PropertyDetails {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Notifications">
              {props => <Sus component={<Notifications {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="UploadProperty">
              {props => <Sus component={<UploadProperty {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Logout">
              {props => <Sus component={<Logout {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="EditProfile">
              {props => <Sus component={<EditProfile {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="EditProperty">
              {props => <Sus component={<EditProperty {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Chat">
              {props => <Sus component={<Chat {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="Inbox">
              {props => <Sus component={<Inbox {...props} />} />}
            </Stack.Screen>
            {/* ACT & RIGHTS */}
            <Stack.Screen name="PrivacyPolicy">
              {props => <Sus component={<PrivacyPolicy {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="UserTerms">
              {props => <Sus component={<UserTerms {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="UserChatProfile">
              {props => <Sus component={<UserChatProfile {...props} />} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default function MobileApp() {
  return (
    <NavigationProvider>
      <App />
    </NavigationProvider>
  );
}
