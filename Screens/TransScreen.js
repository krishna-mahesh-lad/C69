import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransScreen extends Component {
    constructor(){
        super();
        this.state = {
            hasCamPermission : null,
            scanned : false,
            scannedData : '',
            buttonState : 'mormal'
        }
    }

    hasCamPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCamPermission : status === 'granted',
            scanned : false,
            buttonState : 'clicked'
        });

    }

    handleBarCodeScanned = async({type, data}) => {
        this.setState({
            scannedData : data,
            scanned : true,
            buttonState : 'normal'
        });
    }


    render(){
        const hasCamPermission = this.state.hasCamPermission
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState === 'clicked' && hasCamPermission){
        return(
            <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
            />
            )
        }
        else if (buttonState === 'normal'){
            <View>
                <Text> {hasCamPermission === true? this.state.scannedData: 'Request Camera Permission'} </Text>
                <TouchableOpacity onPress = {this.getCamPermission}> 
                    <Text> Scan QR Code </Text>
                </TouchableOpacity>
            </View>
        }
    }
}