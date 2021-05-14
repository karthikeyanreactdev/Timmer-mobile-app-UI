import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {
    SafeAreaView,
    StyleSheet, Button,
    Text, Alert, Picker,
    View, TextInput,
    Modal, Pressable,
    TouchableHighlight, Linking, Platform 
} from 'react-native';
import MachineonBoard from './MachineTimer';
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
                <Ionicons name="ios-timer" color={tintColor} size={25} />
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
                Alert.alert(
                    "Confirmation",
                   'Are you sure want to Logout?' ,
                    [
                      {
                        text: "Yes",
                        onPress: async () =>{ 
                             await AsyncStorage.clear();
                            navigation.navigate('Auth');
                        },
                        style: "cancel",
                      },
                      {text: 'No',style: "cancel",}
                    ],
                )
              
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