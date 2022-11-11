import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import React, {useState, useContext} from 'react';
import themeContext from '../components/themeContext';
import { Registering_User } from '../classes/User_Account';
import { communicator } from "../helpers/init";

// this is the the dign up creen for the app 
// th user will enter a usename, full name, passwor dnad email
// and he app will the create a new registering account and saved the details
// to the database through the communicator
const SignUpScreen = ({navigation}) =>{
    
    const [fullName, onChangeName] = useState(''); // the full name of the user
    const [username, onChangeUsername] = useState(''); // the user of the user
    const [password, onChangePassword] = useState(''); // the password enterd by the user
    const [email, onChangeEmail] = useState(''); // the email of the user
    const [errorMessage, onChangeError] = useState(''); // the error message displayed on the screen


        // the GUI of the component
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <Image
                source={require("../../assets/appLogo.png")}
                style={styles.image}
            />

            <Text style={styles.error_message}>{errorMessage}</Text>

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


            <View style = {styles.loginBtn}>
                <Button style = {styles.loginBtn}
                    title="SIGN UP"
                    color = "#3CB371" onPress={()=> register(fullName, username, password, email, navigation, onChangeError)}

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

// the register function is used to create a new account for the user and save their data into the database
// if successful the componet will navigate to the login screen
// else it will display an errors message to the user
async function register(fullName, username, password, email, navigation, onChangeError) {

    let new_user;
    new_user = new Registering_User(fullName, username, email, communicator);
    if (new_user.error) {
        onChangeError(new_user.error);
        return;
    }

    let success = await new_user.register_Account(password);
    
    console.log(success);

    if (success == true) {
        navigation.navigate('SignInScreen');
    } else {
        onChangeError(new_user.getError())
    }
 }

 // the styles for the register screen
const styles = StyleSheet.create({
    error_message: {
        color: "red",
    },
    container: {
        flex: 1,
        backgroundColor : "white",
        alignItems: 'center',
        justifyContent: 'center',
    },

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
