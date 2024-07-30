import React from 'react'
import HomeScreen from '../../components/HomeScreen';
import FastTagAndGps from '../../components/FastTagAndGps';
import HistoricalData from '../../components/HistoricalData';
import SmsAlert from '../../components/SmsAlert';
import SaveFuelAndTime from '../../components/SaveFuelAndTime';
import SignIn from '../../screens/SignIn';
import OTP from '../../screens/opt/OTP';
import Register from '../../screens/register/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawer from '../Drawer/MainDrawer';
import ForgetYourPassword from '../../screens/ForgetYouPassword/ForgetYourPassword';
import PrivacyPolicy from '../../screens/privacyPolicy/PrivacyPolicy';
import TermsAndCondition from '../../screens/termsAndCondition/TermsAndCondition';
import WalletDetails from '../../screens/walllet/WalletDetails';
import TopupWallet from '../../screens/walllet/TopupWallet';
import OrderSummary from '../../screens/order/OrderSummary';
import ProfileAndMasterInfo from '../../screens/profile/ProfileAndMasterInfo';
import Order from '../../screens/order/Order';
import Acknowledgement from '../../screens/order/acknowledgement/Acknowledgement';
import OrderDetails from '../../screens/order/OrderDetails';
import Mobileverification from '../../screens/mobileVerfication/Mobileverification';
import CustomerRegistration from '../../screens/customerRegistration/CustomerRegistration';
import ImageCollection from '../../screens/tagRegistration/ImageCollection';
import TagRegistration from '../../screens/tagRegistration/TagRegistration';
import TagReplacement from '../../screens/tagReplacement/TagReplacement';
import TagReplacementForm from '../../screens/tagReplacement/TagReplacementForm';
// import TagRegistration from '../../screens/tagRegistration/TagRegistration';
// import TagReplacement from '../../screens/tagReplacement/TagReplacement';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="dashboard" >
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="FastTagAndGPS" component={FastTagAndGps} options={{
                headerShown: false
            }} />
            <Stack.Screen name="HistoricalData" component={HistoricalData} options={{
                headerShown: false
            }} />
            <Stack.Screen name="SmsAlert" component={SmsAlert} options={{
                headerShown: false
            }} />
            <Stack.Screen name="SaveFuelAndTime" component={SaveFuelAndTime} options={{
                headerShown: false
            }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{
                headerShown: false
            }} />
            <Stack.Screen name="OTP" component={OTP} options={{
                headerShown: false
            }} />
            <Stack.Screen name="register" component={Register} options={{
                headerShown: false
            }} />
            <Stack.Screen name="walletDetails" component={WalletDetails} options={{
                headerShown: false
            }} />
            <Stack.Screen name="topupWallet" component={TopupWallet} options={{
                headerShown: false
            }} />
            <Stack.Screen name="tagRegistration" component={TagRegistration} options={{
                headerShown: false
            }} />
            <Stack.Screen name="tagReplacement" component={TagReplacement} options={{
                headerShown: false
            }} />
            <Stack.Screen name="tagReplacementForm" component={TagReplacementForm} options={{
                headerShown: false
            }} />
            <Stack.Screen name="orderDescription" component={OrderSummary} options={{
                headerShown: false
            }} />
            <Stack.Screen name="forgetYourPassword" component={ForgetYourPassword} options={{
                headerShown: false
            }} />
            <Stack.Screen name="drawer" component={MainDrawer} options={{
                headerShown: false
            }} />
            <Stack.Screen name="customerRegistration" component={CustomerRegistration} options={{
                headerShown: false
            }} />
            <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} options={{
                headerShown: false
            }} />
            <Stack.Screen name="termsAndCondition" component={TermsAndCondition} options={{
                headerShown: false
            }} />
            <Stack.Screen name="profileAndMasterInfo" component={ProfileAndMasterInfo} options={{
                headerShown: false
            }} />


            <Stack.Screen name="order" component={Order} options={{
                headerShown: false
            }} />
            <Stack.Screen name="acknowledgement" component={Acknowledgement} options={{
                headerShown: false
            }} />
            <Stack.Screen name="orderDetails" component={OrderDetails} options={{
                headerShown: false
            }} />
            <Stack.Screen name="mobileVerification" component={Mobileverification} options={{
                headerShown: false
            }} />
            <Stack.Screen name="imageGallary" component={ImageCollection} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default StackNavigation