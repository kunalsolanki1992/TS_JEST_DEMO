import React, { useState, useReducer, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import GetLocation, {Location } from 'react-native-get-location';

const screenWidth = Dimensions.get('screen').width;

export const LandingScreen = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [address, setAddress] = useState();
    const [displayAddress, setDisplayAddress] = useState("")

    useEffect(() => {
        (() => {
            // let { status } = await GetLocation.getCurrentPosition
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
                console.log(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        })()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.navigation} />

            <View style={styles.body}>
                <Image
                    source={{ uri: 'https://elasq.com/wp-content/uploads/2021/08/truck4.png' }}
                    style={styles.deliveryIcon}
                    resizeMode={'center'}
                />

                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Your Delivery Address</Text>
                </View>

                <Text style={styles.addressText}>Waiting for current location</Text>
            </View>

            <View style={styles.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'green'
        backgroundColor: 'rgba(242,242,242,1)'
    },

    navigation: {
        flex: 2,
        // backgroundColor: 'red'
    },

    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },

    deliveryIcon: {
        width: 120,
        height: 120
    },

    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'
    },

    addressTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#7d7d7d'
    },

    addressText: {
        fontSize: 20,
        fontWeight: '200',
        color: '#4f4f4f'
    },

    footer: {
        flex: 1,
        // backgroundColor: 'cyan'
    }
})