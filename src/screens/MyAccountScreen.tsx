// MY ACCOUNT BOTTOM TAB
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Keyboard, Alert, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

// redux imports
import { login } from "../redux/actions/Auth";

// constant imports
import { DEVICE_WIDTH } from "../constants/dimens";

// component imports
import ParentContainer from "../components/ParentContainer";

const COMP_WIDTH = DEVICE_WIDTH / 5;

export const MyAccountScreen: React.FC = (props: any) => {
    const [stateValue, setStateValue] = React.useState(true);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const userData = useSelector((state: any) => state.user.user);

    const dispatch = useDispatch();

    const isValid = () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (email === '') {
            Alert.alert("Please enter Email!");
            return false;
        }

        if (password === '') {
            Alert.alert("Please enter password!")
            return false;
        }

        if (!email.match(emailRegex)) {
            Alert.alert("Please enter valid email!");
            return false
        }

        return true;
    }

    const signIn = () => {
        if (isValid()) {
            dispatch(login({ email }))
        }
    }

    const signOff = () => { dispatch(login({})) }

    return (
        <ParentContainer {...props}>
            <View style={styles.container}>
                {!!userData && userData.email === undefined && (<View style={styles.loginContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        value={email}
                        placeholder={"E-mail"}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={'email-address'}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        value={password}
                        placeholder={"Password"}
                        onChangeText={(text) => setPassword(text)}
                        // keyboardType={'phone-pad'}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />

                    {/* <TouchableOpacity style={styles.btnToggleTCContainer} onPress={signIn}>
                    <Ionicons name={'log-in'} size={24} style={{ color: 'white' }} />

                    <Text style={styles.btnText} >{'Login'}</Text>
                </TouchableOpacity> */}

                    <Button
                        title="Login"
                        onPress={signIn}
                    />
                </View>)}

                {!!userData && !!userData.email && (
                    <TouchableOpacity style={styles.btnToggleTCContainer} onPress={signOff}>
                        <Ionicons name={'log-out'} size={24} style={{ color: 'white' }} />

                        <Text style={styles.btnText} >{'Logout'}</Text>
                    </TouchableOpacity>
                )}

                {/* <View style={styles.toggleUITestCaseContainer}>
                <TouchableOpacity style={styles.btnToggleTCContainer} onPress={() => { setStateValue(!stateValue) }} >
                    <Ionicons name={'ios-build'} size={24} style={{ color: 'white' }} />

                    <Text style={styles.btnText} >{stateValue ? 'Pass' : 'Fail'}</Text>
                </TouchableOpacity>
            </View> */}
            </View>
        </ParentContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-evenly'
        // backgroundColor: 'green'
    },

    inputStyle: {
        width: '100%',
        height: 20,
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        minHeight: 40,
        marginBottom: 8
    },

    loginContainer: {
        width: DEVICE_WIDTH,
        padding: 20,
        minHeight: 1,
        // backgroundColor: 'pink',
        alignItems: 'center'
    },

    toggleUITestCaseContainer: {
        width: DEVICE_WIDTH,
        height: COMP_WIDTH,
        // backgroundColor: 'yellow'
    },

    btnToggleTCContainer: {
        flexDirection: 'row',
        padding: 10,
        width: 100,
        borderRadius: 4,
        backgroundColor: 'orange',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10
    },

    btnText: {
        fontSize: 18,
        color: 'white'
    },
})