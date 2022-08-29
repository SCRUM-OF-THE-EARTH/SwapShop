<<<<<<< HEAD:swapshop/screens/SignInScreen.js
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import SignUpScreen from './SignUpScreen';
// import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';

// export default function SignInScreen() {
const SignInScreen = ({navigation}) => {

  //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
import { useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Login_user } from "../classes/User_Account.js";

 export default function LoginScreen(){
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
>>>>>>> main:swapshop/src/screens/loginScreen.js

    return(
    
      <View style={styles.container}>

      <Image
          source={require("../../assets/logo3.png")}
          style={styles.image}
      />

      {/*<Button title="Go to signUp page" onPress={() => navigation.navigate('SignUpScreen')}/>*/}


      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
<<<<<<< HEAD:swapshop/screens/SignInScreen.js
                   placeholder="Email"
                   placeholderTextColor="white"
                   onChangeText={(email) => setEmail(email)}/>
=======
                   placeholder="Username"
                   placeholderTextColor="#003f5c"
                   onChangeText={(username) => onChangeUsername(username)}/>
>>>>>>> main:swapshop/src/screens/loginScreen.js

      </View>

      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Password"
<<<<<<< HEAD:swapshop/screens/SignInScreen.js
                   placeholderTextColor="white"
                   onChangeText={(password) => setEmail(password)}/>
=======
                   placeholderTextColor="#003f5c"
                   onChangeText={(password) => onChangePassword(password)}/>
>>>>>>> main:swapshop/src/screens/loginScreen.js

      </View>


      <View style={styles.forgot_button} >
        <Button
            buttonTextStyle = {{color: "black"}}
            title="forgot password?"
            color="black"


            onPress={() => navigation.navigate('forgotPasswordScreen')}
        />
      </View>

<<<<<<< HEAD:swapshop/screens/SignInScreen.js
      <View style={styles.loginBtn} >
        <Button
                title="SIGN IN"
                color="#59788E"
=======
      <TouchableOpacity style = {styles.loginBtn} onPress={() => Login(username, password)}>
        <Text style = {styles.login_text}>LOGIN</Text>
      </TouchableOpacity>
>>>>>>> main:swapshop/src/screens/loginScreen.js

                onPress={() => navigation.navigate('MainScreen')}
        />
      </View>

      <View style = {styles.signupBtn}>
        <Button
            title="SIGN UP"
            color = "#8e8259"
            onPress={() => navigation.navigate('SignUpScreen')}
        />
      </View>
      <Text>Don't have an account?</Text>
      




    </View>
    );  
 }

<<<<<<< HEAD:swapshop/screens/SignInScreen.js

const styles = StyleSheet.create({
=======
 async function Login(username, password){
  console.log(username, password);
  let login_user = new Login_user(username);
  let success = await login_user.Login(password);
  console.log(success);
  // if (success == true) {
  //   console.log("slogin was a sucess, user detiask match")
  // } else {
  //   console.log("Login was unsuccessful, user details don't match")
  // }
  // console.log(success);

 }

 const styles = StyleSheet.create({
>>>>>>> main:swapshop/src/screens/loginScreen.js
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderColor:"red",


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
    marginBottom:50,
    marginTop:-15,
    backgroundColor:"green",

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
    backgroundColor:"#8e8259",

  },


  login_text:{
    fontSize:20,
    color: "black",
    fontFamily: "bold"

  },




});

export default SignInScreen;
