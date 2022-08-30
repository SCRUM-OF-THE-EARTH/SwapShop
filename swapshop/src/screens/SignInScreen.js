import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import SignUpScreen from './SignUpScreen';
import { Login_user } from '../classes/User_Account.js'
// import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';

// export default function SignInScreen() {
const SignInScreen = ({navigation}) => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    return(
    
      <View style={styles.container}>

      <Image
          source={require("../../assets/appLogo.png")}
          style={styles.image}
      />

      {/*<Button title="Go to signUp page" onPress={() => navigation.navigate('SignUpScreen')}/>*/}


      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Username"
                   placeholderTextColor="#3CB371"
                   onChangeText={(username) => onChangeUsername(username)}/>
      </View>

      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Password"
                   placeholderTextColor="#3CB371"
                   onChangeText={(password) => onChangePassword(password)}/>
      </View>


      <View style = {styles.forgot_button}>
        <TouchableOpacity style={styles.forgot_button} 
        onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={{color: "#2E8B57"}}> Forgot Password? </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.loginBtn} >
        <Button
                title="LOG IN"
                color="#2E8B57"
                // onPress={() => Login(username, password, navigation)}
                onPress = {() => navigation.navigate('MainScreen')}
        />
      </View>

      <Text>Don't have an account?</Text>

      <View style = {styles.signupBtn}>
        <Button
            title="SIGN UP"
            color = "#3CB371"
            onPress = {() => navigation.navigate('SignUpScreen')}
        />
      </View>
      
    </View>
    );  
 }

async function Login(username, password, navigation){
  console.log(username, password);
  let login_user = new Login_user(username);
  let success = await login_user.Login(password);
  console.log(success);

  if (success) {
    navigation.navigate('MainScreen');
  }

 }

 const styles = StyleSheet.create({
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
    backgroundColor:"#F5F5F5",
    borderRadius:50,
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
    marginLeft:150,
    color:"red",


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
    backgroundColor:"#2E8B57",

  },

  signupBtn:{
    width:"30%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    backgroundColor:"#3CB371",

  },


  login_text:{
    fontSize:20,
    color: "black",
    // fontFamily: "bold"

  },




});

export default SignInScreen;
