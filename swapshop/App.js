import {StyleSheet,Dimensions,LogBox} from 'react-native';
import * as helper from "./src/helpers/init";
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
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessagesScreen'
import { useEffect } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './src/components/themeContext';
import theme from './src/components/config/theme';
import registerNNPushToken from 'native-notify';

const {height, width} = Dimensions.get('window');

const RootStack = createStackNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

const App = () =>{
    const [mode, setMode] = useState(false);
    registerNNPushToken(4557, 'emqys7tmf4UIZdRXe1dhJF');
    useEffect(() => {
        let eventListener = EventRegister.addEventListener(
            "changeTheme",
            (data) => {
                setMode(data);
            }
        );
        return () => {
            EventRegister.removeEventListener(eventListener);
        };
    });
    return(

        <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
         <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>

                <RootStack.Screen name = "SignInScreen" component = {SignInScreen}/>
                <RootStack.Screen name = "SignUpScreen" component = {SignUpScreen}/>
                <RootStack.Screen name = "MainScreen" component = {MainScreen}/>
                <RootStack.Screen name = "ForgotPasswordScreen" component = {ForgotPasswordScreen}/>
                <RootStack.Screen name = "addItemScreen" component={AddItemScreen}/>
                <RootStack.Screen name = "detailed_item" component={Detailed_Trade_item} options={{headerShown:true, title:"", headerStyle:{backgroundColor:"#3CB371"}}}/>
                <RootStack.Screen name = "ChatScreen" component={ChatScreen} options={({ route }) => ({headerShown:true, title: route.params.owner.getFullName() , headerStyle:{backgroundColor:"#3CB371"}})}/>
                <RootStack.Screen name = "ProfileScreen" component={ProfileScreen} />
                <RootStack.Screen name = "MessageScreen" component={MessageScreen} options={{headerShown: true, title:"Chats", headerStyle:{backgroundColor:"#3CB371"}}}/>
            </RootStack.Navigator>
        </NavigationContainer>
        </themeContext.Provider>

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
