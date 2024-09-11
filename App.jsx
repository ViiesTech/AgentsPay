/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider, useNavigation } from './src/utils/NavigationContext';
import { lazy, Suspense } from 'react';

import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Splash from './src/screens/Splash';
import Loading from './src/screens/Loading';
const Welcome = lazy(() => import('./src/screens/Welcome'));
const Login = lazy(() => import('./src/screens/Login'));
const Signup = lazy(() => import('./src/screens/Signup'));
const ForgotPassword = lazy(() => import('./src/screens/ForgotPassword'));
const OTP = lazy(() => import('./src/screens/OTP'));
const ResetPassword = lazy(() => import('./src/screens/ResetPassword'));
const PrivacyPolicy = lazy(() => import('./src/screens/PrivacyPolicy'));
const UserTerms = lazy(() => import('./src/screens/UserTerms'));
const Home = lazy(() => import('./src/screens/Home'));
const CompleteProfile = lazy(() => import('./src/screens/CompleteProfile'));
const Subscriptions = lazy(() => import('./src/screens/Subscriptions'));
const SubscriptionPayment = lazy(() => import('./src/screens/SubscriptionPayment'));
const PropertyCard = lazy(() => import('./src/components/PropertyCard'));
const Filters = lazy(() => import('./src/screens/Filters'));
const UploadedProperties = lazy(() => import('./src/screens/UploadedProperties'));
const ListedProperties = lazy(() => import('./src/screens/ListedProperties'));
const BookmarkedProperties = lazy(() => import('./src/screens/BookmarkedProperties'));
const ContactAdmin = lazy(() => import('./src/screens/ContactAdmin'));
const MySubscription = lazy(() => import('./src/screens/MySubscription'));
const PaymentCards = lazy(() => import('./src/screens/PaymentCards'));
const AddCard = lazy(() => import('./src/screens/AddCard'));
const PropertyDetails = lazy(() => import('./src/screens/PropertyDetails'));
const Notifications = lazy(() => import('./src/screens/Notifications'));
const UploadProperty = lazy(() => import('./src/screens/UploadProperty'));
const Logout = lazy(() => import('./src/screens/Logout'));
const EditProfile = lazy(() => import('./src/screens/EditProfile'));
const EditProperty = lazy(() => import('./src/screens/EditProperty'));

const Stack = createNativeStackNavigator();

function App() {
  const { navigationRef } = useNavigation();

  const Sus = ({component}) => {
    return <Suspense fallback={<Loading />}>{component}</Suspense>;
  };
  return (
    <>
      <Provider store={store}>
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

            {/* ACT & RIGHTS */}
            <Stack.Screen name="PrivacyPolicy">
              {props => <Sus component={<PrivacyPolicy {...props} />} />}
            </Stack.Screen>
            <Stack.Screen name="UserTerms">
              {props => <Sus component={<UserTerms {...props} />} />}
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
