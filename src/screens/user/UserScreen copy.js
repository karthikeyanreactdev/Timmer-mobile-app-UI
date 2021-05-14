import React,{useRef} from 'react'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
//import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import {
    SafeAreaView,
    StyleSheet, Button,
    Text, Alert, Picker,
    View, TextInput,
    Modal, Pressable,TouchableOpacity,
    TouchableHighlight, Linking, Platform, NativeModules 
} from 'react-native';
import { NavigationActions,SwitchActions,StackActions  } from 'react-navigation';
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
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import UserReport from './UserReport';
import UserTimer from './UserTimer';
import { Header } from 'react-native-elements';
import AuthLoadingScreen from '../AuthLoadingScreen'
export const SignoutScreen =async ({navigation}) => {
  await AsyncStorage.clear();
  navigation.navigate('Auth');
}

const Tab = createBottomTabNavigator();
class HomeScreen extends React.Component {
   
    render(){
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
       let iconName;
       if (route.name === 'Home') {
          iconName = focused
          ? 'ios-time'
          : 'ios-time-outline';
        } else if (route.name === 'Reports') {
          iconName = focused
          ? 'ios-bar-chart'
          : 'ios-bar-chart-outline';
        }
  return <Ionicons name={iconName} size={size} color={color}     />;
          },
        })}
        tabBarOptions={{
        activeTintColor: '#612B8B',
        inactiveTintColor: 'gray',
        }}
      >
           
          <Tab.Screen name="Home" component={UserTimer} />
          <Tab.Screen name="Reports" component={UserReport} />
      </Tab.Navigator>
    );
  }
}
  const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() =>{

const resetAction = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [
      NavigationActions.navigate('Starter')
  ]
});
props.navigation.dispatch(resetAction);
      }

      

} />
    </DrawerContentScrollView>
  );
}
class LogoutScreen extends React.Component{
  componentDidMount(){
      AsyncStorage.clear()
      this.props.navigation.navigate('Auth');
  }
  render(){
    AsyncStorage.clear()
    this.props.navigation.navigate('Auth');
      return(
       <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
         <Pressable onPress={()=>this.props.navigation.navigate('Auth')}><Text>aa</Text></Pressable>
       </View>
      );
  }
}

  export function UserScreen({ navigation }) {
    const drawer = useRef(null);

    return (
        
      <NavigationContainer  >
          
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
     
          <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:true,headerTitle:''}}
          
          />
         
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
  

// export const UserScreen = createBottomTabNavigator({
//     Home: {
//         screen: UserReport, 
//         navigationOptions: {
//             tabBarLabel: 'Reports',            
//             tabBarIcon: ({ tintColor }) => (
//                 <Ionicons name="ios-bar-chart" color={tintColor} size={25} />
//             )
//         }
//     }, 
//     Settings: {
//         screen: UserTimer, 
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
// },

// );