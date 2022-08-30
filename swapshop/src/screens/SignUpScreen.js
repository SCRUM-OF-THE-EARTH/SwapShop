import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import { Registering_User } from '../classes/User_Account';

const SignUpScreen = () =>{
    
    const [fullName, onChangeName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <Text>Welcome to SwapShop</Text>

            <Image
                source={require("../../assets/logo_signup.png")}
                style={styles.image}
            />

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Name"
                           placeholderTextColor="white"
                           onChangeText={(name) => onChangeName(name)}/>
            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Username"
                           placeholderTextColor="#003f5c"
                           onChangeText={(name) => onChangeUsername(name)}/>
            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Email"
                           placeholderTextColor="white"
                           onChangeText={(email) => onChangeEmail(email)}/>
            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Password"
                           placeholderTextColor="white"
                           secureTextEntry={true}
                           onChangeText={(password) => onChangePassword(password)}/>
            </View>

            <TouchableOpacity style = {styles.loginBtn}>
                <Text style = {styles.login_text} onPress={() => register(fullName, username, password, email)}>SIGNUP</Text>
            </TouchableOpacity>


            <View style = {styles.loginBtn}>
                <Button style = {styles.loginBtn}
                    title="SIGN UP"
                    color = "#59788E"
                    onPress={() => navigation.navigate('SignUpScreen')}
                />
            </View>

            <View style = {styles.signupBtn}>
                <Button
                    title="SIGN IN"
                    color = "#312d2a"
                    opacity = "0.9"

                    onPress={() => navigation.navigate('MainScreen')}
                />
            </View>
            <Text>Already have an account?</Text>



        </View>
    );
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#8E8259',
        backgroundColor : "white",
        alignItems: 'center',
        justifyContent: 'center',
    },

    //styling the logo
    image:{
        height:250,
        width:250,
        marginTop:-50,
        marginBottom: 30,

    },

    inputView :{
        backgroundColor:"#59788E",
        borderRadius:30,
        width:"70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",



    },

    TextInput:{
            height:50,
            width:400,
            flex:1,
            padding: 10,
            marginLeft:-100,
            color:"white",




    },

    forgot_button:{
        height: 30,
        marginBottom:30,
    },

    loginBtn:{
        width:"20%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        backgroundColor:"#59788E",

    },

    signupBtn:{
        width:"20%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#rgba(49,45,45,0.94)",

    },


    login_text:{
        fontSize:20,
        color: "black",
        fontFamily: "bold"

    },




});

export default SignUpScreen;
