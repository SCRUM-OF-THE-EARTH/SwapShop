import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import { Registering_User } from '../classes/User_Account';

// const SignUpScreen = ({navigation}) => {
const SignUpScreen = ({navigation}) =>{
    
    const [fullName, onChangeName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <Image
                source={require("../../assets/appLogo.png")}
                style={styles.image}
            />

            {/*<View style = {styles.inputView}>*/}
            {/*    <TextInput style = {styles.TextInput}*/}
            {/*               placeholder="Name"*/}
            {/*               placeholderTextColor="white"*/}
            {/*               onChangeText={(name) => onChangeName(name)}/>*/}
            {/*</View>*/}

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Full Name"
                           placeholderTextColor="#3CB371"
                           onChangeText={(fullName) => onChangeName(fullName)}/>
            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Username"
                           placeholderTextColor="#3CB371"
                           onChangeText={(username) => onChangeUsername(username)}/>
            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Email"
                           placeholderTextColor="#3CB371"
                           onChangeText={(email) => onChangeEmail(email)}/>
            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#3CB371"
                        secureTextEntry={true}
                        onChangeText={(password) => onChangePassword(password)}/>
            </View>

            {/*removed this touchable and exported its functionality onto the button that already existed*/}

            {/*<TouchableOpacity style = {styles.loginBtn}>*/}
            {/*    <Text style = {styles.login_text} onPress={() => register(fullName, username, password, email)}>SIGNUP</Text>*/}
            {/*</TouchableOpacity>*/}


            <View style = {styles.loginBtn}>
                <Button style = {styles.loginBtn}
                    title="SIGN UP"
                    color = "#3CB371" onPress={()=> register(fullName, username, password, email)}

                />
            </View>

            <Text> Already have an account?</Text>

            <View style = {styles.signupBtn}>
                <Button
                    title="LOG IN"
                    color = "#2E8B57"
                    onPress={() => navigation.navigate('SignInScreen')}
                />
            </View>

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
        backgroundColor:"#F5F5F5",
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
            marginLeft:150,
            color:"gray",
    },

    forgot_button:{
        height: 30,
        marginBottom:30,
    },

    loginBtn:{
        width:"30%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:30,
        backgroundColor:"#3CB371",

    },

    signupBtn:{
        width:"30%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:5,
        backgroundColor:"#2E8B57",

    },


    login_text:{
        fontSize:20,
        color: "black",
        fontFamily: "bold"

    },




});

export default SignUpScreen;
