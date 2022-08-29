import { useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Login_user } from "../classes/User_Account.js";

 export default function LoginScreen(){
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    return(
    
      <View style={styles.container}>

      <Image
          source={require("../../assets/logo3.png")}
          style={styles.image}
      />


      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Username"
                   placeholderTextColor="#003f5c"
                   onChangeText={(username) => onChangeUsername(username)}/>

      </View>

      <View style = {styles.inputView}>
        <TextInput style = {styles.TextInput}
                   placeholder="Password"
                   placeholderTextColor="#003f5c"
                   onChangeText={(password) => onChangePassword(password)}/>

      </View>

      <TouchableOpacity>
        <Text style = {styles.forgot_button}> Forgot Password?</Text>
      </TouchableOpacity>



      <TouchableOpacity style = {styles.loginBtn} onPress={() => Login(username, password)}>
        <Text style = {styles.login_text}>LOGIN</Text>
      </TouchableOpacity>





      <TouchableOpacity style = {styles.signupBtn}>
        <Text style = {styles.login_text}>SIGN-UP</Text>
      </TouchableOpacity>
      <Text>Don't have an account?</Text>




    </View>
    );  
 }

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
    backgroundColor:"#8e8259",

  },


  login_text:{
    fontSize:20,
    color: "black",
    fontFamily: "bold"

  },




});
