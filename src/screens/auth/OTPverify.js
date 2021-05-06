import React from 'react';
//import Dimensions from 'Dimensions';
import axios from 'axios'
import {
    KeyboardAvoidingView, View, Button, Alert, Text, StyleSheet, TextInput, TouchableOpacity,Pressable
} from 'react-native';
import OtpTimer from 'otp-timer'
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
            otpfromProps:props.navigation.state.params.otp,
            mobilefromProps:props.navigation.state.params.mobile,
           

        };

        //this._signInHandler = this._signInHandler.bind(this);
    }

    signInHandler = async () => {
       const { otp, otpfromProps, mobilefromProps } = this.state;
       // AsyncStorage.setItem('userToken', mobileNumber);
       // AsyncStorage.setItem('userName', 'karthik');

       const params={
        mobilenumber:mobilefromProps,
        otp:otpfromProps
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





        
        
        // alert('Local :'+AsyncStorage.getItem('userToken'))
        // this.props.navigation.navigate(userToken1 ==='2' ? 'App2' : 'App');
       // this.props.navigation.navigate(userToken1 === '2' ? 'App2' : userToken1 === '1' ? 'App' : 'Auth');

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
    handleClick=()=>{
        alert('submit clicked')
       
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
        return (
            <View style={{ flexGrow: 1 }} behavior="padding" enabled>
                <View style={style.container}>
                <TextInput 
                        keyboardType="number-pad"
                        onChangeText={otp => this.setState({otp})}
                        style={style.input}
                        placeholder="Please Enter OTP"
                        value={this.state.otp}
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
                    <Text style={{ color: 'red' }}>{this.state.helperText}</Text>
                                <Pressable
                                    style={style.link}
                                    onPress={this.resendOTP}
                                >
                                    <Text style={style.linkColor}>Resend OTP?</Text>
                                </Pressable>
                    <TouchableOpacity
                        style={style.loginBtn}

                        title="Sign in!"
                        onPress={this.signInHandler}
                    ><Text style={style.loginText}>SUBMIT</Text></TouchableOpacity>


                   {/* <TouchableOpacity>   <OtpTimer  seconds= {30} minutes={0} resend={this.handleClick}   /></TouchableOpacity> */}


                    <TouchableOpacity

                        title="Sign UP!"
                        onPress={() =>
                            this.props.navigation.navigate('Auth')
                        }
                    ><Text style={style.signupText}>BACK TO LOGIN</Text>

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
    link: {
        width: '90%',
        alignItems: "flex-end",

    },
    linkColor: {
        fontSize: 14,
        color: '#018e8f'
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