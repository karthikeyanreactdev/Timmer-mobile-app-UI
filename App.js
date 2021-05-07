import { MachineScreen } from './src/screens/machines/MachineScreen'
import { UserScreen } from './src/screens/user/UserScreen';
import  OTP from './src/screens/auth/OTPverify'

import SignScreen from './src/screens/auth/SigninScreen'
import Signup from './src/screens/auth/Signup'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


const AppStack = createStackNavigator({ MachineScreen });
const AuthStack = createStackNavigator({ Signin: SignScreen });
const AuthStack2 = createStackNavigator({ Signup: Signup });
const OTPpage = createStackNavigator({ Key: OTP });
const AppStack2 = createStackNavigator({ UserScreen });

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
