// LOVE IT LIST BOTTOM TAB
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useSelector } from 'react-redux';

// component imports
import ParentContainer from "../components/ParentContainer";

export const LoveItListScreen = (props: any) => {
    const userData = useSelector((state: any) => state.user.user);

    return (
        <ParentContainer {...props}>
            <View style={styles.body}>
                <Text>{!!userData && !!userData.email ? `Hello ${userData.email}, Love-it List` : 'Love-it List Screen'}</Text>
            </View>
        </ParentContainer>
    )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})