import React from 'react';
//import Dimensions from 'Dimensions';
import axios from 'axios'
import {
    KeyboardAvoidingView, View, Button, Alert, Text, StyleSheet, TextInput, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
//import DeviceInfo from 'react-native-device-info';
//import DeviceId from "react-native-device-id";
var otpGenerator = require('otp-generator')
import apiRoot from '../../../apiconfig'


export default class SigninScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            mobileNumber:'',
            spinner: false,
            error: false
        };

      //  this._signInHandler = this._signInHandler.bind(this);
    }

    signInHandler = async () => {
        const { mobileNumber, password } = this.state;
        const params={
            mobilenumber:mobileNumber
        }
        axios.post(`${apiRoot.url}/login`,params)
        .then(response => response.data)
        .then(
            result => {
                this.props.navigation.navigate('Key', { otp:result.OTPnumber , mobile:mobileNumber});
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




        // AsyncStorage.setItem('userToken', mobileNumber+'');
        // AsyncStorage.setItem('userName', 'karthik');
        // const userToken1 = await AsyncStorage.getItem('userToken');
        // console.log(userToken1)
        // var uniqueId  = DeviceId.getUniqueId();// DeviceInfo.getDeviceId();
        // console.log('uniqueId '+ uniqueId)
        // alert('Local :'+AsyncStorage.getItem('userToken'))
        // this.props.navigation.navigate(userToken1 ==='2' ? 'App2' : 'App');
       // this.props.navigation.navigate(userToken1 === '2' ? 'App2' : userToken1 === '1' ? 'App' : 'Auth');
// if(mobileNumber.length){
//  const OTPnumber= otpGenerator.generate(6, { upperCase: false, specialChars: false , alphabets: false });
//  console.log(OTPnumber)

// }
        //this.props.navigation.navigate('App2');
        //         var formData = new FormData();
        //         formData.append('email', email);
        //         formData.append('password', password);

        //         this.setState({spinner: true});

        //         const response = await fetch(`https://c282a758.ngrok.io/api/login`, {
        //     method: 'POST', 
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }, 
        //     body: formData
        // })
        //         .then(resp => {
        //             this.setState({spinner: false});
        //             return resp.json();
        //         })
        //         .catch(error => {
        //             this.setState({spinner: false});
        //             throw error;
        //         });

        //         console.log(response);

        //         if (typeof response.message != "undefined") {
        //             await Alert.alert('Error', response.message);
        //         }
        //         else {

        //r  }
    }

    render() {
        return (
            <View style={{ flexGrow: 1 }} behavior="padding" enabled>
                <View style={style.container}>
                <TextInput 
                        keyboardType="number-pad"
                        onChangeText={mobileNumber => this.setState({mobileNumber})}
                        style={style.input}
                        placeholder="Mobile Number"
                        value={this.state.mobileNumber}
                    />
                    {/* <TextInput
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        style={style.input}
                        placeholder="Password"
                        value={this.state.password}
                    /> */}
                    {this.state.spinner &&
                        <Text style={style.spinnerTextStyle}>Processing ...</Text>
                    }
                    {/* {!this.state.spinner &&
                        
                    } */}
                    <TouchableOpacity
                        style={style.loginBtn}

                        title="Sign in!"
                        onPress={this.signInHandler}
                    ><Text style={style.loginText}>LOGIN</Text></TouchableOpacity>
                    <TouchableOpacity

                        title="Sign UP!"
                        onPress={() =>
                            this.props.navigation.navigate('Auth2')
                        }
                    ><Text style={style.signupText}>SIGN UP</Text>

                    </TouchableOpacity>
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
    loginBtn: {
        width: "75%",
        backgroundColor: "#018e8f",
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
        color:"#018e8f"
      }
});