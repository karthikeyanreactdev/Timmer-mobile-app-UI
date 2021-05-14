import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import MachineonBoard from './MachineonBoard';
import MachineReport from './MachineReport';

const SignoutScreen = () => {}

export const MachineScreen = createBottomTabNavigator({
    Home: {
        screen: MachineReport, 
        navigationOptions: {
            tabBarLabel: 'Reports', 
                     
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-bar-chart" color={tintColor} size={25} />
            )
        }
    }, 
    Settings: {
        screen:MachineonBoard , 
        navigationOptions: {
            
            tabBarLabel: 'On Board', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-timer-outline" color={tintColor} size={25} />
            )
        }
    }, 
    Signout: {
        screen: SignoutScreen, 
        navigationOptions: {
            tabBarLabel: 'Signout', 
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons name="logout" color={tintColor} size={20} />
            ), 
            tabBarOnPress: async ({navigation}) => {
                await AsyncStorage.clear();
                navigation.navigate('Auth');
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: '#0071BD', 
        inactiveTintColor: 'grey', 
        showIcon: true
    }
});