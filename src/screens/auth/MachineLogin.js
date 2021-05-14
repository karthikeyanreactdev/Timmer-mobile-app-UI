import React from 'react';
//import Dimensions from 'Dimensions';
import axios from 'axios'
import {
    KeyboardAvoidingView, View, Button, Alert, Text, StyleSheet, TextInput, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ListItem, Avatar,Card, Icon } from 'react-native-elements'
var otpGenerator = require('otp-generator')
import apiRoot from '../../../apiconfig'
import * as Device from 'expo-device';

export default class SigninScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            mobileNumber:'',
            uniqueid:'',
            spinner: false,
            error: false
        };

      //  this._signInHandler = this._signInHandler.bind(this);
    }
componentDidMount(){
    this.clearStorage()
}
    machineLogin = async () => {
        const { mobileNumber, uniqueid } = this.state;
        const params={
            mobilenumber:mobileNumber,
            uniqueid
        }
        axios.post(`${apiRoot.url}/loginasmachine`,params)
        .then(response => response.data)
        .then(
            result => {
                               
                this.props.navigation.navigate('Key', { otp:result.OTPnumber , mobile:mobileNumber,role:result.data[0].role});
            },
            error => {
                console.log(error);
                Alert.alert(
                    "Mobile number not exists",
                    error.response.status===404?'Account does not exits':error.response.status===422?'Invalid Unique ID':'Please try again later' ,
                    [
                      {
                        text: "OK",
                        onPress: () =>   this.props.navigation.navigate('Auth'),
                        style: "cancel",
                      },
                    ],
                )
            }
        );

    }
    userLogin = async () => {
        const { mobileNumber, password } = this.state;
        const params={
            mobilenumber:mobileNumber
        }
        axios.post(`${apiRoot.url}/loginasuser`,params)
        .then(response => response.data)
        .then(
            result => {
                
                this.props.navigation.navigate('Key', { otp:result.OTPnumber , mobile:mobileNumber,role:result.data[0].role});
                
            },
            error => {
                console.log(error);
                Alert.alert(
                    "Mobile number not exists",
                   'Please enter valid mobile number' ,
                    [
                      {
                        text: "OK",
                        onPress: () =>   this.props.navigation.navigate('Auth'),
                        style: "cancel",
                      },
                    ],
                )
            }
        );

    }

    clearStorage= async()=>{
        await AsyncStorage.clear();
        


    }

    render() {
        return (
            <View style={{ flexGrow: 1 }} behavior="padding" enabled>

                <View style={style.container}>
                <Card.FeaturedSubtitle style={style.titleText}><Text>Login to your account</Text></Card.FeaturedSubtitle>        

                <TextInput 
                        keyboardType="number-pad"
                      //  onChangeText={mobileNumber => this.setState({mobileNumber})}
                        style={style.input}
                        textContentType= "telephoneNumber"

                        placeholder="Mobile Number"
                        onChangeText={(mobileNumber) => {
                            let num = mobileNumber.replace(".", '');
                              if(isNaN(num)){
                                  // Its not a number
                              }else{                                    
                                 this.setState({ mobileNumber:num })
                                }  
                              }
                            }
                        value={this.state.mobileNumber}
                    />
                      <TextInput 
                        keyboardType="default"
                        onChangeText={uniqueid => this.setState({uniqueid})}
                        style={style.input}
                        placeholder="Unique ID"
                        value={this.state.uniqueid}
                    />
                    
                    {this.state.spinner &&
                        <Text style={style.spinnerTextStyle}>Processing ...</Text>
                    }
                   

<View style={{ flexDirection: "column",width:'45%' }}>
                    {/* <TouchableOpacity
                        style={style.loginBtn}

                       
                        onPress={this.userLogin}
                    ><Text style={style.loginText}>Sign in as User</Text></TouchableOpacity> */}
                    <TouchableOpacity
                        style={style.loginBtn}

                        
                        onPress={this.machineLogin
                        }
                    ><Text style={style.loginText}>Login</Text></TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity

                        title="Sign UP!"
                        onPress={() =>
                            this.props.navigation.navigate('Auth2')
                        }
                    >
                        <Text style={style.signupText}>Sign Up</Text>

                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}

//const DEVICE_WIDTH = Dimensions.get('window').width;

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
      //  flex: 1,
      flexDirection:'row',
        width: "50%",
        backgroundColor: '#ffff',
       // alignItems: 'center',
        justifyContent: 'center',
    },
    titleText:{
        color:'black',fontSize:22, marginTop:-15, marginBottom:30
    },
    loginBtn: {
        width: "95%",
        backgroundColor: "#612B8B",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    inputText: {
        height: 50,
        color: "white"
    },
    input: {
        backgroundColor: '#DAE1F1',
        width: "75%",
        height: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        color: '#333333',
        marginBottom: 20,
        paddingLeft: 15
    },
    spinnerTextStyle: {
        textAlign: 'center'
    },
    loginText:{
        color:"white"
      },
      signupText:{
        color:"#612B8B"
      }
});