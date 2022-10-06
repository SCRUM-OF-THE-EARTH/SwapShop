import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Dimensions} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AddItemScreen from "../screens/addItem.js";
import Detailed_Trade_item from '../screens/detailed_trade_item';
import MainScreen from "../screens/MainScreen";
import ChatScreen from '../screens/ChatScreen';

const {height, width} = Dimensions.get('window');

const RootStack = createStackNavigator();

const AppNavigation = () =>{
    return(

        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>
                <RootStack.Screen name = "SignInScreen" component = {SignInScreen}/>
                <RootStack.Screen name = "SignUpScreen" component = {SignUpScreen}/>
                <RootStack.Screen name = "MainScreen" component = {MainScreen}/>
                <RootStack.Screen name = "ForgotPasswordScreen" component = {ForgotPasswordScreen}/>
                <RootStack.Screen name = "addItemScreen" component={AddItemScreen}/>
                <RootStack.Screen name = "detailed_item" component={Detailed_Trade_item} options={{headerShown:true, title:"", headerStyle:{backgroundColor:"#3CB371"}}}/>
                <RootStack.Screen name = "ChatScreen" component={ChatScreen} options={({ route  }) => ({headerShown:true, title: route.params.owner.getFullName() , headerStyle:{backgroundColor:"#3CB371"}})}/>
            </RootStack.Navigator>
        </NavigationContainer>
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

export default AppNavigation;