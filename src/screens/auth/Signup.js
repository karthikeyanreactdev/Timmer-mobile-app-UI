import React from 'react';
//import Dimensions from 'Dimensions';
import axios from 'axios'

import { 
    KeyboardAvoidingView, View, Button, Alert, Text, StyleSheet, TextInput,TouchableOpacity
} from 'react-native';
import { ListItem, Avatar,Card, Icon } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage'
import apiRoot from '../../../apiconfig'

export default class SigninScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            mobileNumber: '', 
            firstName: '', 
            lastName: '', 
            isActive: true, 
            error: false
        };

        //this._signInHandler = this._signInHandler.bind(this);
    }
    signUpHandler=()=>{
        const {mobileNumber, firstName, lastName }=this.state;

         const params={
            firstName:firstName,
            lastName: lastName,
            mobile: mobileNumber,
            role:'user',
            isActive:true,           
            isbusy:false,
        }
        axios.post(`${apiRoot.url}/signup`,params)
            .then(response => response.data)
            .then(
                result => {

                    Alert.alert(
                        "Account Created Successfully..",
                       'Login Using Mobile Number' ,
                        [
                          {
                            text: "OK",
                            onPress: () =>   this.props.navigation.navigate('Auth'),
                            style: "cancel",
                          },
                        ],
                    )
                },
                error => {
                   // console.log(error);
                  //  console.log(error.response.status);
                    Alert.alert(
                        "Account creation failed..",
                    error.response.status===404?'Mobile number already exits':  'Please try again' ,
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
        const {firstName, lastName, mobileNumber}=this.state;
        return (
            <View style={{flexGrow: 1}} behavior="padding" enabled>
                <View style={style.container}>
                <Card.FeaturedSubtitle style={style.titleText}><Text>Sign in to your account</Text></Card.FeaturedSubtitle>        

                    <TextInput 
                        //secureTextEntry={true}
                        keyboardType="default"
                        onChangeText={firstName => this.setState({firstName})}
                        style={style.input}
                        placeholder="First Name"
                        value={this.state.firstName}
                    />
                     <TextInput 
                       // secureTextEntry={true}
                       keyboardType="default"
                        onChangeText={lastName => this.setState({lastName})}
                        style={style.input}
                        placeholder="Last Name"
                        value={this.state.lastName}
                    />
                    <TextInput 
                        keyboardType="number-pad"
                        onChangeText={mobileNumber =>{this.setState({mobileNumber}); console.log(mobileNumber.length)}}
                        style={style.input}
                        placeholder="Mobile Number"
                        value={this.state.mobileNumber}
                    />
                    {this.state.spinner &&
                        <Text style={style.spinnerTextStyle}>Processing ...</Text>
                    }
                    {/* {!this.state.spinner &&
                        
                    } */}
                      <TouchableOpacity
                        style={style.loginBtn}
disabled={firstName==='' || lastName==='' || mobileNumber.length!==10?true:false}
                        title="Sign Up"
                       onPress={this.signUpHandler}
                    ><Text style={style.loginText}>Sign Up</Text></TouchableOpacity>
                    <TouchableOpacity

                        title="BACK"
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
    titleText:{
        color:'black',fontSize:22, marginTop:-15, marginBottom:30
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