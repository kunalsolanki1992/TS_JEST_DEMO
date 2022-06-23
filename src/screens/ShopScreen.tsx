// SHOP BOTTOM TAB
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useSelector } from 'react-redux';

// component imports
import ParentContainer from "../components/ParentContainer";

export const ShopScreen = (props: any) => {
    const userData = useSelector((state: any) => state.user.user);

    console.log("USER DATA == ", userData);

    return (
        <ParentContainer {...props}>
            <View style={styles.body}>
                <Text>{!!userData && !!userData.email ? `Hello ${userData.email}, Shop Screen` : 'Shop Screen'}</Text>
            </View>
        </ParentContainer>
    )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
})