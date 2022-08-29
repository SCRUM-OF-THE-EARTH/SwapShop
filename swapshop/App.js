<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './screens/SignInScreen';
import forgotPasswordScreen from "./screens/forgotPasswordScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainScreen from "./screens/MainScreen";

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
=======
import { StyleSheet, View } from 'react-native';
import RegisterScreen from './src/screens/registerScreen.js';
import LoginScreen from './src/screens/loginScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
    </View>
  );
}
>>>>>>> main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;
