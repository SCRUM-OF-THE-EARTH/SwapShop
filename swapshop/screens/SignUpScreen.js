import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function SignUpScreen() {
    //
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <Text>Welcome to SwapShop</Text>

            <Image
                source={require("../assets/logo_signup.png")}
                style={styles.image}
            />

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Name"
                           placeholderTextColor="#003f5c"
                           onChangeText={(name) => setName(name)}/>

            </View>


            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Email"
                           placeholderTextColor="#003f5c"
                           onChangeText={(email) => setEmail(email)}/>

            </View>

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           placeholder="Password"
                           placeholderTextColor="#003f5c"
                           underlineColorAndroid="transparent"

                           onChangeText={(password) => setEmail(password)}/>

            </View>

            {/*<TouchableOpacity>*/}
            {/*    <Text style = {styles.forgot_button}> Forgot Password?</Text>*/}
            {/*</TouchableOpacity>*/}



            <TouchableOpacity style = {styles.loginBtn}>
                <Text style = {styles.login_text}>SIGNUP</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity>*/}
            {/*    <Text style = {styles.forgot_button}> Already have an account?</Text>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity style = {styles.signupBtn}>
                <Text style = {styles.login_text}>SIGN-IN</Text>
            </TouchableOpacity>
            <Text>Already have an account?</Text>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8E8259',
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
        height:30,
        width:400,
        flex:1,
        padding: 10,
        marginLeft:-100,
        color:"white",
        fontFamily:"bold",
        fontSize:20,
        borderBottomWidth:1,
        backgroundColor:"#59788E",



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
