import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Dimensions} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AddItemScreen from "./src/screens/addItem.js";
import Detailed_Trade_item from './src/screens/detailed_trade_item';
import MainScreen from "./src/screens/MainScreen";
import ChatScreen from './src/screens/ChatScreen';

import AppNavigation from './src/navigation/AppStack';

const {height, width} = Dimensions.get('window');

const RootStack = createStackNavigator();

const App = () =>{
    return(
        <AppNavigation></AppNavigation>
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
