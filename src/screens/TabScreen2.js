import React from 'react'
import { AsyncStorage } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen2 from './HomeScreen2';
import SettingScreen2 from './SettingScreen2';

const SignoutScreen = () => {}

export const TabScreen2 = createBottomTabNavigator({
    Home: {
        screen: HomeScreen2, 
        navigationOptions: {
            tabBarLabel: 'Home', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-home" color={tintColor} size={25} />
            )
        }
    }, 
    Settings: {
        screen: SettingScreen2, 
        navigationOptions: {
            tabBarLabel: 'Settings', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-settings" color={tintColor} size={25} />
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
        activeTintColor: '#018e8f', 
        inactiveTintColor: 'black', 
        showIcon: true
    }
});