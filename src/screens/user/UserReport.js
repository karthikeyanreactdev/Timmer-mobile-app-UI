import React from 'react';
import { StyleSheet, View, Text, ScrollView, Modal, Pressable, Picker } from 'react-native';
import { ListItem, Avatar,Card, Button, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment';
import axios from 'axios'
import apiRoot from '../../../apiconfig'
//import { getPhoneNumberSync } from 'react-native-device-info';

export default class UserReport extends React.Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            fullname: '',
            mobile: '',
            range: '1',
            ReportDetails: [],
            reportData: []
        };
        this.getuserData();
    }

    getuserData = async () => {

        const number = await AsyncStorage.getItem('mobilenumber')
        const name = await AsyncStorage.getItem('userName')

        this.setState({
            mobile: number,
            fullname: name
        })
        axios.get(`${apiRoot.url}/billdata/${number}/${this.state.range}`)
            .then(response => response.data)
            .then(
                result => {

                    this.setState({
                        reportData: result.data
                    })
                },
                error => {
                    console.log(error);
                }
            );
    }
    componentDidMount() {
        this.getuserData()
        

    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    render() {
        const { modalVisible, ReportDetails } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title1}>Welcome {this.state.fullname}</Text>                
                <Text style={styles.title}>Summary Report</Text>
                               
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={this.state.range}
                        style={{ height: 30, width: 150, border: '1px solid black' }}
                        onValueChange={(itemValue, itemIndex) =>{ this.setState({ range: itemValue },()=> this.getuserData())}}
                    >
                        <Picker.Item label="Today" value="1" />
                        <Picker.Item label="Yesterday" value="-1" />
                        <Picker.Item label="This Week" value="-7" />
                        <Picker.Item label="Last Week" value="-14" />
                        <Picker.Item label="This Month" value="-30" />
                        <Picker.Item label="Last Month" value="-60" />
                        <Picker.Item label="This Year" value="-365" />
                        <Picker.Item label="Last Year" value="-730" />

                    </Picker>
                </View>


                {this.state.reportData.length?  <ScrollView style={styles.viewlist}>
                    
                    {this.state.reportData.map((item, i) => (
                        <ListItem key={item.id} bottomDivider onPress={() => { this.setModalVisible(!modalVisible); this.setState({ ReportDetails: item }) }}>
                            <ListItem.Content>                            
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Name : </Text> {item.name}</Card.FeaturedSubtitle>                                
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Machine Name : </Text> {item.machinename}</Card.FeaturedSubtitle>                                
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Total Amount : </Text> {item.totalamount}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Paid Status : </Text> {item.paidstatus}</Card.FeaturedSubtitle>
                               <Card.FeaturedSubtitle style={{color:'black'}}><Text>Start Date : </Text> {moment(item.startdate).format('DD-MMM-YYYY hh:mm a')}</Card.FeaturedSubtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>

                    ))}
                    
                    
                </ScrollView>:
                <Card.FeaturedSubtitle style={{color:'black', marginTop:50}}>No Record Found</Card.FeaturedSubtitle> }
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {/* <Text style={styles.modalText}>Hello World!</Text> */}
                                <Card >
                                <Card.Title>Summary Report</Card.Title>
                                <Card.Divider/>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Name : </Text> {ReportDetails.name}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Mobile : </Text> {ReportDetails.mobile}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Machine Name : </Text> {ReportDetails.machinename}</Card.FeaturedSubtitle>
                                {/* <Card.FeaturedSubtitle style={{color:'black'}}><Text>User Name : </Text> {ReportDetails.firstname } {ReportDetails.lastname}</Card.FeaturedSubtitle> */}
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Cost/Hour : </Text> {ReportDetails.baseamount}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Total Minutes : </Text> {ReportDetails.minutes}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Total Amount : </Text> {ReportDetails.totalamount}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Paid Status : </Text> {ReportDetails.paidstatus}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>Start Date : </Text> {moment(ReportDetails.startdate).format('DD-MMM-YYYY hh:mm a')}</Card.FeaturedSubtitle>
                                <Card.FeaturedSubtitle style={{color:'black'}}><Text>End Date : </Text> {moment(ReportDetails.enddate).format('DD-MMM-YYYY hh:mm a')}</Card.FeaturedSubtitle>
                                </Card>
                                <Pressable
                                    style={[styles.Btn]}
                                    onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom:20
    },
    title1: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 0,
        paddingTop:10

    },
    viewlist: {
        width: "100%",
    },
    dropdown: {
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: "#20232a",
        margin: 15
    },
    centeredView: {
        flex: 1,
       // width:'90%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width:'95%',
        backgroundColor: "white",
        //borderRadius: 20,
       // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        //elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    Btn: {
        width: "50%",
        backgroundColor: "#612B8B",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
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