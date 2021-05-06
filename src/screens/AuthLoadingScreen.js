import React from 'react'
import { View, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
 import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {

    constructor() {
        super();
        this._bootstrap();
    }

    _bootstrap = async () => {

        const userRole = await AsyncStorage.getItem('userRole');       
       // this.props.navigation.navigate(userToken ==='2' ? 'App2' : userToken ==='1'?  'App':'Auth');
        this.props.navigation.navigate(userRole === 'user' ? 'App2' : userRole === 'machine' ? 'App' : 'Auth');

    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});