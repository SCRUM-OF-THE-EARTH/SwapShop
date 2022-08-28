import { View, Text, Button, Alert } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Registering_User } from '../classes/User_Account.js'

 export default function RegisterScreen(){
    const [fullName, onChangeName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');

    return(
        <View>
            <Text>Register a new account</Text>
            <TextInput placeholder="full name" onChangeText={(text) => onChangeName(text)}></TextInput>
            <TextInput placeholder="username" onChangeText={(text) => onChangeUsername(text)}></TextInput>
            <TextInput placeholder="password" secureTextEntry={true} onChangeText={(text) => onChangePassword(text)}></TextInput>
            <TextInput placeholder="email" onChangeText={(text) => onChangeEmail(text)}></TextInput>
            <Button title="register" onPress={() => register(fullName, username, password, email)}></Button>
        </View>
    )
 }

 function register(fullName, username, password, email) {

    let new_user = new Registering_User(fullName, username, email);
    let success = new_user.register_Account(password);
    // if (success) {
    //     console.log("new accoutn ha been successfully registered");
    // } else {
    //     console.log("new accoutn was not successfully registered");
    // }
 }