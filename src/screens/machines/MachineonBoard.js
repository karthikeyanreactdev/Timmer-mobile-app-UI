// Example of React Native Timer and Stopwatch
// https://aboutreact.com/react-native-timer-stopwatch/

// import React in our code
import React, { useState } from 'react';
import moment from 'moment';
var otpGenerator = require('otp-generator')
import {
    SafeAreaView,
    StyleSheet, Button,
    Text, Alert, Picker,
    View, TextInput,
    Modal, Pressable,
    TouchableHighlight, Linking, Platform 
} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { TabRouter } from 'react-navigation';
import apiRoot from '../../../apiconfig'


class MachineonBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            button: '',
            started: false,
            modalVisible: false,
            otp: '',
            userList: [],
            useridno: '',
            userid: 'b02dcd28-ac10-11eb-b6d8-00ff2a599786',
            hourlyamount: '',
            starttime: moment().format('YYYY-DD-MM HH:mm'),
            endtime: moment().format('YYYY-DD-MM HH:mm'),
            helperText: '',
mobile:'',
fullname:'',
username:'',

            ispaused: false
            // disableInputs:false
        }
    };
    componentDidMount() {

        this.getuserData()
      
        axios.get(`${apiRoot.url}/getallactiveusers`)
            .then(response => response.data)
            .then(
                result => {

                    this.setState({
                        userList: result.data
                    })
                },
                error => {
                    console.log(error);
                }
            );

    }

    getuserData=async()=>{

        // const didBlurSubscription = this.props.navigation.addListener(
        //     'didBlur',
        //     payload => {
        //       console.debug('didBlur', payload);
        //     }
        //   );


        const number= await AsyncStorage.getItem('mobilenumber')
        const name=   await AsyncStorage.getItem('userName')
   
        this.setState({
           mobile:number,
           fullname:name
       })
       axios.get(`${apiRoot.url}/getActiveMachine/${number}`)
       .then(response => response.data)
       .then(
           result => {

              console.log(result)
              if(result.data[0].isstarted===1){
                  this.setState({
                      id: result.data[0].id,
                      useridno:result.data[0].userid,
                      hourlyamount:result.data[0].baseamount,
                      started:true,
                      ispaused:result.data[0].ispaused===1?true:false
                
                  });
              }
           },
           error => {
               console.log(error);
           }
       );
   
    }
    setModalVisible = (visible) => {
        if (visible) {
            this.setState({ modalVisible: visible });
           
            this.ResendOTPforMachine(false)
            
        } else {
            const { otp, generatedOTP, button, isStopwatchStart, started } = this.state;
            if (otp === generatedOTP) {

                this.setState({ modalVisible: visible });
                if (button === 'start') {
                    this.setState({
                        starttime: moment().format('YYYY-DD-MM HH:mm'),
                        started: true,
                    })
                    this.startCall(moment().format('YYYY-DD-MM HH:mm'))
                  
                } else if (button === 'pause') {
                   
                    this.pauseCall(moment().format('YYYY-DD-MM HH:mm '))
                }
                else if (button === 'resume') {
                    
                    this.resumeCall(moment().format('YYYY-DD-MM HH:mm '))
                }
                else if (button === 'stop') {
                   
                    this.endCall(moment().format('YYYY-DD-MM HH:mm '))
                }


            }
            this.setState({
                otp: '',
                generatedOTP: ''
            })
        }
    }

    startTimmer = () => {
        this.setModalVisible(true)
        this.setState({
            button: 'start',

        })
    };
    stopTimmer = () => {
        this.setModalVisible(true);
        this.setState({
            button: 'stop',
            endtime: moment().format('YYYY-DD-MM HH:mm')

        })
    };
    pauseTimmer = () => {
        this.setModalVisible(true)
        this.setState({
            button: 'pause',

        })
    };
    resumeTimmer = () => {
        this.setModalVisible(true)
        this.setState({
            button: 'resume',

        })
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    resendOTP=(val)=>{
        const {mobile}=this.state;

        axios.get(`${apiRoot.url}/resendOTP/${mobile}`)
        .then(response => response.data)
        .then(
            result => {
               console.log(result)
               this.setState({
                generatedOTP:result.OTPnumber,
               
            })
            if(val){
                this.setState({
                    helperText: 'OTP sent successfully.'
                })
            }
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
                        style: "cancel"
                      },
                    ],
                )
            }
        );
        
      }
 ResendOTPforMachine=(val)=>{
        const {mobile}=this.state;

        axios.get(`${apiRoot.url}/ResendOTPforMachine/${mobile}`)
        .then(response => response.data)
        .then(
            result => {
                console.log(result)
                this.setState({
                 generatedOTP:result.OTPnumber,
                 otp:''
                
             })
             if(val){
                 this.setState({
                     helperText: 'OTP sent successfully.'
                 })
             }
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

    startCall = (time) => {
        const { starttime, useridno, hourlyamount, userid,mobile } = this.state;

        const params = {
            userid: useridno,
            machineid:mobile,
            hourlyamount,
            starttime: time
        }
        axios.post(`${apiRoot.url}/startTimeEntry`,params)
        .then(response => response.data)
        .then(
            result => {

                this.setState({
                    id: result.id
                })
            },
            error => {
                console.log(error);
            }
        );
       
        console.log('start', params);
    };
    endCall = (time) => {
        const { id } = this.state;

        const params = {
            id,
            endtime: time
        }
        axios.post(`${apiRoot.url}/stopTimeEntry`,params)
        .then(response => response.data)
        .then(
            result => {

                this.setState({
                    started: false ,
                    id:'',
                    ispaused:false,
                    useridno:'',
                    hourlyamount:''

                })
            },
            error => {
                console.log(error);
            }
        );
       
        console.log('end', params);


    };
    pauseCall = (time) => {
        const { id } = this.state;

        const params = {
            id,
            pausedtime: time// moment().format('YYYY-DD-MM HH:mm a')
        }
        axios.post(`${apiRoot.url}/pauseTimeEntry`,params)
        .then(response => response.data)
        .then(
            result => {

                this.setState({
                    ispaused: true
                })
            },
            error => {
                console.log(error);
            }
        );

       
        console.log('pause', params);
    };
    resumeCall = (time) => {
        const { id } = this.state;

        const params = {
            id,
            startedtime: time// moment().format('YYYY-DD-MM HH:mm a')
        }
        axios.post(`${apiRoot.url}/resumeTimeEntry`,params)
        .then(response => response.data)
        .then(
            result => {
                this.setState({
                    ispaused: false,
                    //started:false
                })
            },
            error => {
                console.log(error);
            }
        );
       
        console.log('end', params);
    };

    getFormattedTime(time) {
        console.log(time)
    }
    dialCall = () => {
        const {useridno}=this.state;
        let phoneNumber = '';
    
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${useridno}`;
        }
        else {
          phoneNumber = `telprompt:${useridno}`;
        }
    
        Linking.openURL(phoneNumber);
      };
    render() {

        const { isTimerStart, isStopwatchStart, timerDuration, resetTimer, resetStopwatc,ispaused, modalVisible, userList, started, useridno, hourlyamount } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>

                        ON BOARD USER
        </Text>
                    <View style={{ backgroundColor: '', width: '100%', flex: 1 }}>
                        <View style={styles.dropdown}>
                            <Picker
                                selectedValue={this.state.useridno}
                                style={{ height: 30, width: 250, border: '1px solid black' }}
                                enabled={!started}
                                onValueChange={(itemValue, itemIndex) =>{ this.setState({ useridno: itemValue, }) ; console.log(itemValue)}}
                            >
                                <Picker.Item label="--select--" value="" />

                                {userList.map((item, i) => (
                                    <Picker.Item key={i} label={`${item.firstname} ${item.lastname}`} value={item.mobile} />
                                ))}
                            </Picker>
                        </View>
                        <TextInput
                            keyboardType="number-pad"
                            onChangeText={hourlyamount => this.setState({ hourlyamount })}
                            style={styles.input}
                            editable={!started}

                            placeholder="Amount"
                            value={this.state.hourlyamount}
                        />
                       

                                   
                        <View style={styles.sectionStyle}>
                            <View style={{ flexDirection: "row" }}>
                                {

                                    started === false && ispaused === false ?

                                        <Pressable
                                            style={styles.Btn}
                                            disabled={useridno === '' || hourlyamount === '' ? true : false}

                                            onPress={this.startTimmer}>

                                            <Text style={styles.buttonText}>
                                                {/* {!isStopwatchStart ? 'START' : 'PAUSE'} */} START
                                            </Text>
                                        </Pressable> : null
                                }
                                {started === true && ispaused === false ?
                                    <Pressable
                                        style={styles.Btn}
                                        // disabled={useridno === '' || hourlyamount === '' ? true : false}

                                        onPress={this.pauseTimmer}>

                                        <Text style={styles.buttonText}>
                                            {/* {!isStopwatchStart ? 'START' : 'PAUSE'} */} PAUSE
                                            </Text>
                                    </Pressable> : null
                                }
                                {started === true && ispaused === true ?
                                    <Pressable
                                        style={styles.Btn}
                                        // disabled={useridno === '' || hourlyamount === '' ? true : false}

                                        onPress={this.resumeTimmer}>

                                        <Text style={styles.buttonText}>
                                            {/* {!isStopwatchStart ? 'START' : 'PAUSE'} */} RESUME
                                            </Text>
                                    </Pressable> : null
                                }
                                <Pressable
                                    style={styles.Btn}
                                    disabled={!started}
                                    onPress={this.stopTimmer}>
                                    <Text style={styles.buttonText}>STOP</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row",width:'100%' },styles.link}>
                                {

                                    useridno !== '' ?

                                        <Pressable
                                            style={styles.Btncall}
                                           // disabled={useridno === '' || hourlyamount === '' ? true : false}

                                            onPress={this.dialCall}>

                                            <Text style={styles.buttonText}>
                                                {/* {!isStopwatchStart ? 'START' : 'PAUSE'} */} Call {useridno}
                                            </Text>
                                        </Pressable> : null
                                } 
                                </View>

                    </View>


                    

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Please enter otp or press cancel");

                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Please Enter OTP</Text>

                                <TextInput
                                    keyboardType="number-pad"
                                    onChangeText={otp => this.setState({ otp })}
                                    style={styles.input}
                                    placeholder="OTP"
                                    autoFocus
                                    value={this.state.otp}
                                />
                                <Text style={{ color: 'red' }}>{this.state.helperText}</Text>
                                <Pressable
                                    style={styles.link}
                                    onPress={()=>this.ResendOTPforMachine(true)}
                                >
                                    <Text style={styles.linkColor}>Resend OTP?</Text>
                                </Pressable>

                                <View style={styles.buttonClose}>
                                    <Pressable
                                        style={styles.Btn}
                                        onPress={() => this.setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.buttonText}>SUBMIT</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.Btn}
                                        onPress={this.handleCancel}
                                    >
                                        <Text style={styles.buttonText}>CANCEL</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        );
    }
};

export default MachineonBoard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewlist: {
        width: "100%",
    },
    dropdown: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "#20232a",
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 0,
        marginRight: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    sectionStyle: {
        flex: 0,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
        //marginTop: 10,

    },
    link: {
        width: '90%',
        alignItems: "flex-end",

    },
    linkColor: {
        fontSize: 14,
        color: '#0071BD'
    },

    Btn: {
        width: "45%",
        backgroundColor: "#0071BD",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    Btncall: {
        width: "80%",
        backgroundColor: "#0071BD",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 10
    },

    input: {
        backgroundColor: '#DAE1F1',
        width: "80%",
        height: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        color: '#333333',
        marginBottom: 20,
        paddingLeft: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: "90%",
        //  height:"30%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        flexDirection: "row"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

const options = {
    container: {
        backgroundColor: '#0071BD',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },
};
