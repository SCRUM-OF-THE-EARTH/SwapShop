import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './src/screens/SignInScreen';
import forgotPasswordScreen from "./src/screens/forgotPasswordScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import MainScreen from "./src/screens/MainScreen";

const RootStack = createStackNavigator();
// export default function App() {
// // const App = () =>{
//
//   return (
//
//       <NavigationContainer>
//           <SignInScreen></SignInScreen>
//
//
//       </NavigationContainer>
//
//   )};

const App = () =>{
    return(
        // <View style = {styles.container}>
        //     <SignInScreen></SignInScreen>
        //     {/*<Text>Welcome to SwapShop</Text>*/}
        // </View>

        <NavigationContainer>
            <RootStack.Navigator>
                {/*<RootStack.Screen name = "forgotPasswordScreen" component = {forgotPasswordScreen}/>*/}

                <RootStack.Screen name = "Welcome Back" component = {SignInScreen}/>
                <RootStack.Screen name = "MainScreen" component = {MainScreen}/>

                <RootStack.Screen name = "SignUpScreen" component = {SignUpScreen}/>
                <RootStack.Screen name = "forgotPasswordScreen" component = {forgotPasswordScreen}/>

            </RootStack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;
