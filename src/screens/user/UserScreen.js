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
import UserTimer from './UserTimer';
import UserReport from './UserReport';

const SignoutScreen = () => {}

export const UserScreen = createBottomTabNavigator({
    Reports: {
        screen: UserReport, 
        navigationOptions: {
            tabBarLabel: 'Reports', 
                     
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-bar-chart" color={tintColor} size={25} />
            )
        }
    }, 
    Timer: {
        screen:UserTimer , 
        navigationOptions: {
            
            tabBarLabel: 'Timer', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-timer" color={tintColor} size={25} />
            )
        }
    }, 
    Signout: {
        screen: SignoutScreen, 
        navigationOptions: {
            tabBarLabel: 'Logout', 
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
                    {text: 'No',style: "cancel"}
                  ],
              )
            
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