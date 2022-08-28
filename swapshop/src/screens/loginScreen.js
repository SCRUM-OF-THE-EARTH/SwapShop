import { useState } from "react";
import { StyleSheet, View, Text, Button} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Login_user } from "../classes/User_Account.js";

 export default function LoginScreen(){
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    return(
        
    <View style={styles.container}>
        <Text>Login in</Text>
        <TextInput placeholder="username" onChangeText={(i) => onChangeUsername(i)}/>
        <TextInput placeholder="password" secureTextEntry={true} onChangeText={i => onChangePassword(i)}/>
        <Button title="Login" onPress={() => Login(username, password)}></Button>
    </View>
    )
 }

 async function Login(username, password){

  let login_user = new Login_user(username);
  let success = await login_user.Login(password);
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 100,
    },
  });