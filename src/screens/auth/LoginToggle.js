import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MachineLogin from './MachineLogin';
import SigninScreen from './UserLogin';

// const SignoutScreen = () => {}

export const LoginToggle = createBottomTabNavigator({
    User: {
        screen: SigninScreen, 
        navigationOptions: {
            tabBarLabel: 'User', 
                     
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-person" color={tintColor} size={25} />
            )
        }
    }, 
    Machine: {
        screen:MachineLogin , 
        navigationOptions: {
            
            tabBarLabel: 'Machine', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-settings" color={tintColor} size={25} />
            )
        }
    }, 
    
}, {
    tabBarOptions: {
        activeTintColor: '#612B8B', 
        inactiveTintColor: 'grey', 
        showIcon: true
    }
});