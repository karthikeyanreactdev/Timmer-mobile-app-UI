import React, { useRef } from 'react'
// import { AsyncStorage } from 'react-native'
import RNRestart from 'react-native-restart'; // Import package from node modules
import { CommonActions } from "@react-navigation/native";

// Immediately reload the React Native Bundle
import AsyncStorage from '@react-native-community/async-storage'
//import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import {
    SafeAreaView,
    StyleSheet, Button,
    Text, Alert, Picker,
    View, TextInput,
    Modal, Pressable, TouchableOpacity,
    TouchableHighlight, Linking, Platform, NativeModules
} from 'react-native';
import { NavigationActions, SwitchActions, StackActions } from 'react-navigation';
// import { createBottomTabNavigator ,createDrawerNavigator } from 'react-navigation-tabs'
//import { Button, View, Text } from 'react-native';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AuthLoadingScreen from '../AuthLoadingScreen'
import { useNavigation } from '@react-navigation/native'

import MachineTimer from './MachineTimer';
import MachineReport from './MachineReport';
import Signup from '../auth/MachineLogin';

const SignoutScreen = () => {

const navigation = useNavigation()
navigation.navigate('App')
return null
 }

// export const MachineScreen = createBottomTabNavigator({
//     Home: {
//         screen: MachineReport, 
//         navigationOptions: {
//             tabBarLabel: 'Reports', 

//             tabBarIcon: ({ tintColor }) => (
//                 <Ionicons name="ios-bar-chart" color={tintColor} size={25} />
//             )
//         }
//     }, 
//     Settings: { 
//         screen:MachineTimer , 
//         navigationOptions: {

//             tabBarLabel: 'On Board', 
//             tabBarIcon: ({ tintColor }) => (
//                 <Ionicons name="ios-timer-outline" color={tintColor} size={25} />
//             )
//         }
//     }, 
//     Signout: {
//         screen: SignoutScreen, 
//         navigationOptions: {
//             tabBarLabel: 'Signout', 
//             tabBarIcon: ({ tintColor }) => (
//                 <SimpleLineIcons name="logout" color={tintColor} size={20} />
//             ), 
//             tabBarOnPress: async ({navigation}) => {
//                 await AsyncStorage.clear();
//                 navigation.navigate('Auth');
//             }
//         }
//     }
// }, {
//     tabBarOptions: {
//         activeTintColor: '#0071BD', 
//         inactiveTintColor: 'grey', 
//         showIcon: true
//     }
// });


const Tab = createBottomTabNavigator();
class HomeScreen extends React.Component {

    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                
                    
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Timer') {
                            iconName = focused
                                ? 'ios-time'
                                : 'ios-time-outline';
                        } else if (route.name === 'Reports') {
                            iconName = focused
                                ? 'ios-bar-chart'
                                : 'ios-bar-chart-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#0071BD',
                    inactiveTintColor: 'gray',
                    
                }}
            >

                <Tab.Screen name="Reports" component={MachineReport} />
                <Tab.Screen name="Timer" component={MachineTimer}  />
                
                </Tab.Navigator>
        );
    }
}
const Drawer = createDrawerNavigator();
//const name = AsyncStorage.getItem('userName')
function CustomDrawerContent(props) {
//console.log(props)
// alert(props)
    
    return (
        <DrawerContentScrollView {...props}>
<View style={{flex:1, margin:40, justifyContent:'center', alignItems:'center'}}>
            <Text>Welcome</Text>
            {/* <Text>{name}</Text> */}
            </View>
            <DrawerItemList {...props} />
            
            <DrawerItem label="Logout" onPress={() =>

{
    
    props.navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: "App2" }]
        })
      });
//await AsyncStorage.clear()
  //  props.navigation.navigate('App2', {screen: 'App'})
    // props.navigation.navigate('Auth',{
    //     screen: 'App',
    //     params: {
    //        screen: 'Auth',
    //        params: {
    //           screen: 'Auth'
    //        }
    //     }
    //    }
    //  )
}

            } />
        </DrawerContentScrollView>
    );
}
class LogoutScreen extends React.Component {
    componentDidMount() {
        AsyncStorage.clear()
        this.props.navigation.navigate('Auth');
    }
    render() {
        AsyncStorage.clear()
        this.props.navigation.navigate('Auth');
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Pressable onPress={() => this.props.navigation.navigate('Auth')}><Text>aa</Text></Pressable>
            </View>
        );
    }
}

export function MachineScreen({ navigation }) {
    const drawer = useRef(null);

    return (

        <NavigationContainer  >

            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>

                <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: true, headerTitle: '' }}

                />
                 {/* <Drawer.Screen name="Lo" component={Signup} options={{ headerShown: true, headerTitle: '' }}/>  */}
               
                
            </Drawer.Navigator>
        </NavigationContainer>
    )
}