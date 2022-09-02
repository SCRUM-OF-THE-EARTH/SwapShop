//import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Dimensions} from 'react-native';
//import React, {useState} from 'react';
//import {NavigationContainer} from "@react-navigation/native";
//import {createStackNavigator} from '@react-navigation/stack';
//import SignInScreen from './src/screens/SignInScreen';
//import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
//import SignUpScreen from "./src/screens/SignUpScreen";
//import AddItemScreen from "./src/screens/addItem.js"
//import MainScreen from "./src/screens/MainScreen";

//const {height, width} = Dimensions.get('window');

//const RootStack = createStackNavigator();
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

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
//import {NavigationContainer} from "@react-navigation/native";
//import {createStackNavigator} from '@react-navigation/stack';

//import SignInScreen from './src/screens/SignInScreen';
//import forgotPasswordScreen from "./src/screens/forgotPasswordScreen";
//import SignUpScreen from "./src/screens/SignUpScreen";
//import MainScreen from "./src/screens/MainScreen";

import NavigationContainer from './src/screens/NavigationBar';

//const RootStack = createStackNavigator();
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

const App = () => {
    return (
        // <View style = {styles.container}>
        //     <SignInScreen></SignInScreen>
        //     {/*<Text>Welcome to SwapShop</Text>*/}
        // </View>
        <NavigationContainer></NavigationContainer>



    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
      window: "100%",
      aspectRatio: 10/3,
      padding: "8rem",
      width:"100%",
      height:"100%"



  },

});

export default App;

