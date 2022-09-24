import { createStackNavigator } from '@react-navigation/stack';
import * as React from "react";
import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MainScreen from '../screens/MainScreen';

const RootStack = createStackNavigator();

const StackNavigation = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name=" " component={MainScreen} options={{ headerStyle: { backgroundColor: colors.white } }} />
            <RootStack.Screen name="MessageScreen" component={MessagesScreen} options={{ headerStyle: { backgroundColor: colors.white } }} />
            <RootStack.Screen name="Chat" component={ChatScreen} options={{ headerStyle: { backgroundColor: colors.white } }} />
        </RootStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        window: "100%",
        aspectRatio: 10 / 3,
        padding: "8rem",
        width: "100%",
        height: "100%"
    },
});
export { StackNavigation };