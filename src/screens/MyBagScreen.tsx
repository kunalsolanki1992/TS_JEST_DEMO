// MY BAG BOTTOM TAB
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, Button, ActivityIndicator, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// redux imports
import { fetchTodoRequest } from '../redux/actions/Auth';

// component imports
import ParentContainer from "../components/ParentContainer";

// constant imports
import { DEVICE_WIDTH, HORIZONTAL_DIMENS } from '../constants/dimens';

export const MyBagScreen = (props: any) => {
    const userData = useSelector((state: any) => state.user.user);
    const pending = useSelector((state: any) => state.user.pending);
    const todos = useSelector((state: any) => state.user.todos);
    const error = useSelector((state: any) => state.user.error);

    const dispatch = useDispatch();

    const callTodos = () => { dispatch(fetchTodoRequest()) }

    return (
        <ParentContainer {...props}>
            <View style={styles.body}>
                <Text>{!!userData && !!userData.email ? `Hello ${userData.email}, My Bag` : 'My Bag Screen'}</Text>
            </View>

            <Button
                title="Click Me"
                onPress={callTodos}
            // style={{ backgroundColor: 'blue' }}
            />

            {pending && (
                <ActivityIndicator size={'small'} />
            )}

            <FlatList
                data={todos}
                renderItem={(item) => (
                    <View style={styles.listItem}>
                        <Text>{item.item.title}</Text>
                    </View>
                )}
            />
        </ParentContainer>
    )
};


const styles = StyleSheet.create({
    body: {
        // flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        margin: HORIZONTAL_DIMENS._20
        // backgroundColor: 'yellow'
    },

    listItem: {
        width: DEVICE_WIDTH,
        padding: HORIZONTAL_DIMENS._15,
        backgroundColor: 'grey'
    }
})