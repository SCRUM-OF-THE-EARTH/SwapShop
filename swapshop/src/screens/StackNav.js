import { createStackNavigator } from '@react-navigation/stack';
import * as React from "react";
import { StyleSheet } from 'react-native';
//import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './SignInScreen';
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import SignUpScreen from "./SignUpScreen";
import colors from '../config/colors';
import AddItemScreen from "./addItem.js"
import MainScreen from "./MainScreen"


//const { height, width } = Dimensions.get('window');

const RootStack = createStackNavigator();
const StackNav = () => {
    return (
        <RootStack.Navigator>
            {/*<RootStack.Screen name = "forgotPasswordScreen" component = {forgotPasswordScreen}/>*/}

            <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerStyle: { backgroundColor: colors.extraColor } }} />
            <RootStack.Screen name="MainScreen" component={MainScreen} options={{ headerStyle: { backgroundColor: colors.extraColor } }} />
            <RootStack.Screen name="forgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerStyle: { backgroundColor: colors.extraColor } }} />
            <RootStack.Screen name="addItemScreen" component={AddItemScreen} options={{ headerStyle: { backgroundColor: colors.extraColor } }} />
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
export { StackNav };
