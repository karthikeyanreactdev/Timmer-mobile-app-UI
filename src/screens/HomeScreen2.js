import React from 'react';
import {StyleSheet, View, Text,  ScrollView, Picker} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment';
import axios from 'axios'

import apiRoot from '../../apiconfig'
//import { getPhoneNumberSync } from 'react-native-device-info';

export default class HomeScreen2 extends React.Component {

    constructor() {
        super();
        this.state = {
            fullname: '',
            mobile:'',
            range:'1',
            reportData1:[
                {id:'1',machineName:'abcd',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'2',machineName:'abcd2',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'3',machineName:'abc3',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'4',machineName:'abcd4',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'5',machineName:'abcd5',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'6',machineName:'abcd6',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'7',machineName:'abcd7',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'8',machineName:'abcd8',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'9',machineName:'abcd9',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
                {id:'10',machineName:'abcd10',userName:'xyz', hours:'2', paidStatus:'unpaid',baseAmount:'20',totalAmount:'40',startedDate:'5-4-2021'},          
        ],
        reportData:[]
        };
        this.getuserData();
    }

    getuserData = async () => {
      
        const number= await AsyncStorage.getItem('mobilenumber')
        const name=   await AsyncStorage.getItem('userName')
   
        this.setState({
           mobile:number,
           fullname:name
       })
       axios.get(`${apiRoot.url}/billdata/${number}`)
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
componentDidMount(){
    this.getuserData()
    alert('hi')
    
}





    render() {
            return (
            <View style={styles.container}>
                <Text>Welcome {this.state.name}</Text>
                <Text>Reports</Text>            
                <View style={styles.dropdown}>
      <Picker
        selectedValue={this.state.range}
        style={{ height: 30,width:150,border:'1px solid black'}}
        onValueChange={(itemValue, itemIndex) => this.setState({range:itemValue})}
      > 
        <Picker.Item label="Today" value="1" />
        <Picker.Item label="Yesterday" value="-1" />
        <Picker.Item label="This Week" value="-7" />        
        <Picker.Item label="This Month" value="-30" />
        <Picker.Item label="Last Month" value="-60" />
        <Picker.Item label="This Year" value="-365" />
        <Picker.Item label="Last Year" value="-700" />
     
      </Picker>
    </View>
                

                <ScrollView style={styles.viewlist}>
                {this.state.reportData.map((item,i)=>(
                    <ListItem key={item.id} bottomDivider onPress={()=>alert(item.id)} >
    
                    <ListItem.Content>
                      <ListItem.Title>{item.machineName}</ListItem.Title>
                      <ListItem.Subtitle><Text>Minutes : {item.baseamount}{"\n"}</Text><Text>Hourly Amount : {item.baseamount} </Text> </ListItem.Subtitle>
                      <ListItem.Subtitle> <Text>Total Amonut: {item.totalamount}{"\n"}</Text><Text>Status: {item.paidStatus}</Text></ListItem.Subtitle>
                      <ListItem.Subtitle><Text>Started Date : {item.startedDate}{"\n"}</Text><Text>End Date: {item.enddate}</Text> </ListItem.Subtitle>                      
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>                   
                    
                ))}
                </ScrollView>
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
    viewlist: {
        width: "100%",
    },
    dropdown:{
        alignSelf:'flex-end' ,
        borderWidth: 1,
        borderColor: "#20232a",
        margin:15
    }
});