import React from 'react'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import UserReport from './UserReport';
import UseronBoard from './UseronBoard';

const SignoutScreen = () => {}

export const UserScreen = createBottomTabNavigator({
    Home: {
        screen: UserReport, 
        navigationOptions: {
            tabBarLabel: 'Reports',            
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-bar-chart" color={tintColor} size={25} />
            )
        }
    }, 
    Settings: {
        screen: UseronBoard, 
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
        activeTintColor: '#612B8B', 
        inactiveTintColor: 'grey', 
        showIcon: true
    }
});