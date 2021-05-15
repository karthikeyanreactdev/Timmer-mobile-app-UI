import React from 'react';
//import Dimensions from 'Dimensions';
import axios from 'axios'
import {
    KeyboardAvoidingView, View, Button, Alert, Text, StyleSheet, TextInput, TouchableOpacity,Pressable
} from 'react-native';
import OtpTimer from 'otp-timer'
import { ListItem, Avatar,Card, Icon } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage'
import apiRoot from '../../../apiconfig'

export default class OTPverify extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
           helperText:'',
            spinner: false,
            error: false,
            otp:'',
            role:props.navigation.state.params.role,
            otpfromProps:props.navigation.state.params.otp,
            mobilefromProps:props.navigation.state.params.mobile,
           

        };

        //this._signInHandler = this._signInHandler.bind(this);
    }

    userSubmit = async () => {
       const { otp, otpfromProps, mobilefromProps, role } = this.state;
       // AsyncStorage.setItem('userToken', mobileNumber);
       // AsyncStorage.setItem('userName', 'karthik');

       const params={
        mobilenumber:mobilefromProps,
        otp:otp
    }
    console.log(params)
    axios.post(`${apiRoot.url}/verifyOTP`,params)
    .then(response => response.data)
    .then(
        result => {
           console.log(result   )
           if(result.message==="Success"){         
           
            AsyncStorage.setItem('userToken', result.token);
            AsyncStorage.setItem('mobilenumber', result.data[0].mobile);
            AsyncStorage.setItem('userName', result.data[0].firstname+' '+ result.data[0].lastname[0] );
            AsyncStorage.setItem('userRole', result.data[0].role);
            AsyncStorage.setItem('uniqueid', result.data[0].uniqueid);
            this.props.navigation.navigate(result.data[0].role === 'user' ? 'App2' : result.data[0].role === 'machine' ? 'App' : 'Auth');
    
           
           }else if(result.message==="OTP not mached"){
            Alert.alert(
                "OTP is incorrect.",
               'Please enter valid OTP.' ,
                [
                  {
                    text: "OK",
                    //onPress: () =>   this.props.navigation.navigate('Auth'),
                    style: "cancel",
                  },
                ],
            )
           }
        },
        error => {
            console.log(error);
            Alert.alert(
                "Error",
               'Please try again later..' ,
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

    machineSubmit = async () => {
        const { otp, otpfromProps, mobilefromProps, role } = this.state;    
 
        const params={
         mobilenumber:mobilefromProps,
         otp:otp
     }
     console.log(params)
     axios.post(`${apiRoot.url}/VerifyOTPforMachine`,params)
     .then(response => response.data)
     .then(
         result => {
            console.log(result   )
            if(result.message==="Success"){         
            
             AsyncStorage.setItem('userToken', result.token);
             AsyncStorage.setItem('mobilenumber', result.data[0].mobile1);
             AsyncStorage.setItem('userName', result.data[0].machinename);
             AsyncStorage.setItem('userRole', result.data[0].role);
             this.props.navigation.navigate(result.data[0].role === 'user' ? 'App2' : result.data[0].role === 'machine' ? 'App' : 'Auth');
     
            
            }else if(result.message==="OTP not mached"){
             Alert.alert(
                 "OTP is incorrect.",
                'Please enter valid OTP.' ,
                 [
                   {
                     text: "OK",
                     //onPress: () =>   this.props.navigation.navigate('Auth'),
                     style: "cancel",
                   },
                 ],
             )
            }
         },
         error => {
             console.log(error);
             Alert.alert(
                 "Error",
                'Please try again later..' ,
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

    noaction=()=>{       
       
      }
      resendOTP=()=>{
        const {mobilefromProps}=this.state;

        axios.get(`${apiRoot.url}/resendOTP/${mobilefromProps}`)
        .then(response => response.data)
        .then(
            result => {
               console.log(result)
               this.setState({
                   otpfromProps:result.OTPnumber,
                   otp:'',
                helperText: 'OTP sent successfully.'
            })
               setTimeout(() => {
                this.setState({
                    helperText: ''
                })
            }, 5000);
               
            },
            error => {
                console.log(error);
                Alert.alert(
                    "Error",
                   'Please try again later..' ,
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
      ResendOTPforMachine=()=>{
        const {mobilefromProps}=this.state;

        axios.get(`${apiRoot.url}/ResendOTPforMachine/${mobilefromProps}`)
        .then(response => response.data)
        .then(
            result => {
               console.log(result)
               this.setState({
                   otpfromProps:result.OTPnumber,
                   otp:'',
                helperText: 'OTP sent successfully.'
            })
               setTimeout(() => {
                this.setState({
                    helperText: ''
                })
            }, 5000);
               
            },
            error => {
                console.log(error);
                Alert.alert(
                    "Error",
                   'Please try again later..' ,
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
    render() {
        const {role}=this.state
        return (
            <View style={{ flexGrow: 1 }} behavior="padding" enabled>
                <View style={style.container}>
                <Card.FeaturedSubtitle style={style.titleText}><Text>Verify OTP</Text></Card.FeaturedSubtitle>        

                <TextInput 
                        keyboardType="number-pad"
                        onChangeText={otp => this.setState({otp})}
                        style={style.input}
                        placeholder="Please Enter 6-digit OTP"
                        value={this.state.otp}
                    />
                    
                    {this.state.spinner &&
                        <Text style={style.spinnerTextStyle}>Processing ...</Text>
                    }
                    <Text style={{ color: 'red' }}>{this.state.helperText}</Text>
                                <Pressable
                                    style={style.link}
                                    onPress={role==='user'? this.resendOTP:role==='machine'?this.ResendOTPforMachine:this.noaction}
                                >
                                    <Text style={style.linkColor}>Resend OTP?</Text>
                                </Pressable>
                    <TouchableOpacity
                        style={style.loginBtn}
                        onPress={role==='user'? this.userSubmit:role==='machine'?this.machineSubmit:this.noaction}

                    ><Text style={style.loginText}>Verify OTP</Text></TouchableOpacity>


                   {/* <TouchableOpacity>   <OtpTimer  seconds= {30} minutes={0} resend={this.handleClick}   /></TouchableOpacity> */}


                    <TouchableOpacity

                        title="Sign UP!"
                        onPress={() =>
                            this.props.navigation.navigate('Auth')
                        }
                    ><Text style={style.signupText}>Back to Login</Text>

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
    link: {
        width: '75%',
        alignItems: "flex-end",

    },
    linkColor: {
        fontSize: 14,
        color: '#612B8B'
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
    titleText:{
        color:'black',fontSize:22, marginTop:-15, marginBottom:30
    },
    loginText:{
        color:"white"
      },
      signupText:{
        color:"#612B8B"
      }
});