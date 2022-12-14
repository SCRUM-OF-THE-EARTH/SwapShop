import {StyleSheet, Switch, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import React, {useState, useContext} from 'react';
import { login_user } from '../helpers/init';

import themeContext from '../components/themeContext';
// defining a new login user for the sign in screen


// this is the sign in screen for the app
// users will enter a username and a password
// and will either be taken to the mia page if theri details are correct
// or an error will be displayed if something goes wrong
const SignInScreen = ({navigation}) => {

    const [username, onChangeUsername] = useState(''); // the username of the user
    const [password, onChangePassword] = useState(''); // the password of the user
    const [errorMessage, onChangeError] = useState(''); // the error message that is displayed
    
    const theme = useContext(themeContext);
    // this is the GUI component for the sign in screen
    return(

        <View style={[styles.container, {backgroundColor: theme.background}]}>


            <Image
                source={require("../../assets/appLogo.png")}
                style={styles.image}
            />
            <Text style={styles.error_message}>{errorMessage}</Text>
            <View style={[styles.inputView, { backgroundColor: theme.inputColor }]}>

                <TextInput style={styles.TextInput}
                           placeholder="Username"
                           placeholderTextColor="#3CB371"
                           onChangeText={(username) => onChangeUsername(username)}/>
            </View>

            <View style={[styles.inputView, { backgroundColor: theme.inputColor }]}>
                <TextInput style = {styles.TextInput}
                           placeholder="Password"
                           placeholderTextColor="#3CB371"
                           secureTextEntry={true}
                           onChangeText={(password) => onChangePassword(password)}/>
            </View>


            <View style = {styles.forgot_button}>
                <TouchableOpacity style={styles.forgot_button}
                                  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={{color: theme.color}}> Forgot Password? </Text>
                </TouchableOpacity>

            </View>

            <View style={[styles.loginBtn, { backgroundColor: theme.sec }]} >
                <Button
                    title="LOG IN"
                    color="#3CB371"
                    onPress = {() => Login(username, password, navigation, onChangeError)}
                />
            </View>

            <Text style={{ color: theme.color }}>Don't have an account?</Text>

            <View style={[styles.signupBtn, { backgroundColor: theme.sec }]}>
                <Button
                    title="SIGN UP"
                    color = "#3CB371"
                    onPress = {() => navigation.navigate('SignUpScreen')}
                />
            </View>
            
        </View>
    );
}

// the Login function is used to pass the username and password to a new user acount
// and test the user's details against the database through the communicator
// if the login was a succes thsi will change the pagea to the main screen
// if not then it will display an error to the user
async function Login(username, password, navigation, onChangeError){
    login_user.setUsername(username);
    let success = await login_user.Login(password);

    if (success) {
        navigation.navigate('MainScreen');
        return;
    } else {
        onChangeError("Sorry. Those details don't seem to match");
    }
}

// the styles for the sign in screen
const styles = StyleSheet.create({
    error_message: {
        color: "red",
    },
    container: {
        flex: 1,
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
        borderRadius:50,
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
        height: 80,
        marginBottom:-20,
        marginTop:0,
    },

    loginBtn:{
        width:"30%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:0,
        marginBottom:50,

    },

    signupBtn:{
        width:"30%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,

    },


    login_text:{
        fontSize:20,
        color: "black",

    },
    


});

export default SignInScreen;