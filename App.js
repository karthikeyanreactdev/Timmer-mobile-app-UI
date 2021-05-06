import { TabScreen } from './src/screens/TabScreen'
import { TabScreen2 } from './src/screens/TabScreen2';
import  OTP from './src/screens/auth/OTPverify'

import SignScreen from './src/screens/auth/SigninScreen'
import Signup from './src/screens/auth/Signup'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


const AppStack = createStackNavigator({ TabScreen });
const AuthStack = createStackNavigator({ Signin: SignScreen });
const AuthStack2 = createStackNavigator({ Signup: Signup });
const OTPpage = createStackNavigator({ Key: OTP });
const AppStack2 = createStackNavigator({ TabScreen2 });

export default createAppContainer(createSwitchNavigator(
    {
        Starter: AuthLoadingScreen, 
        App: AppStack, 
        Auth: AuthStack,
        Auth2: AuthStack2,
        App2: AppStack2,
        Otp:OTPpage

    }, 
    {
        initialRouteName: 'Starter'
    }
));
