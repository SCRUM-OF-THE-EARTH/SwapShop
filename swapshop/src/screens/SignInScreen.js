import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import SignUpScreen from './SignUpScreen';
import { Login_user } from '../classes/User_Account.js'
// import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';

// export default function SignInScreen() {

export const login_user = new Login_user();

const SignInScreen = ({navigation}) => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    return(
    
      <View style={styles.container}>

      <Image
          source={require("../../assets/logo3.png")}
          style={styles.image}
      />

      {/*<Button title="Go to signUp page" onPress={() => navigation.navigate('SignUpScreen')}/>*/}


      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Username"
                   placeholderTextColor="white"
                   onChangeText={(username) => onChangeUsername(username)}/>
      </View>

      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Password"
                   placeholderTextColor="white"
                   onChangeText={(password) => onChangePassword(password)}/>
      </View>


      <View style={styles.forgot_button} >
        <Button
            buttonTextStyle = {{color: "black"}}
            title="forgot password?"
            color="black"


            onPress={() => navigation.navigate('forgotPasswordScreen')}
        />
      </View>

      <View style={styles.loginBtn} >
        <Button
                title="SIGN IN"
                color="#59788E"
                onPress={() => Login(username, password, navigation)}
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

async function Login(username, password, navigation){
  console.log(username, password);
  login_user.setUsername(username)
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
