import { MachineScreen } from './src/screens/machines/MachineScreen'
import { UserScreen } from './src/screens/user/UserScreen';
import  OTP from './src/screens/auth/OTPverify'

import {LoginToggle} from './src/screens/auth/LoginToggle'
import Signup from './src/screens/auth/Signup'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


const AppStack = createStackNavigator({ MachineScreen },{defaultNavigationOptions: {
    // headerStyle: {
    //    display:'none'
    // },
}});
const AuthStack = createStackNavigator({ Signin:LoginToggle });
const AuthStack2 = createStackNavigator({ Signup: Signup });
const OTPpage = createStackNavigator({ Key: OTP });
const AppStack2 = createStackNavigator({ UserScreen },{defaultNavigationOptions: {
    // headerStyle: {
    //    display:'none'
    // },
}});

const finalnav = createSwitchNavigator(
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
);
export default createAppContainer(finalnav)