import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';




// export default function forgotPasswordScreen() {

const ForgotPasswordScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');
    return(



   <View style={styles.container}>

       <Text style={styles.textHeader}>ENTER YOUR EMAIL ADDRESS
           TO RETRIEVE YOUR PASSWORD</Text>


           <View style = {styles.inputView}>
               <TextInput style = {styles.TextInput}
                          placeholder="Email"
                          placeholderTextColor="#2E8B57"
                          onChangeText={(email) => setEmail(email)}/>

           </View>


        <View style={styles.forgot_button}>
            <Button
                title="RESET PASSWORD"
                color= "#2E8B57"
                onPress={() => navigation.navigate('SignInScreen')}

            />


        </View>

   </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#F5F5F5",

    },
    forgot_button:{
        height: 80,
        marginBottom:-20,
        marginTop:20,
    },
    image:{
        height:250,
        width:250,
        marginTop:-330,
        marginBottom: 30,

    },
    inputView :{
        backgroundColor:"white",
        borderRadius:30,
        width:"70%",
        height: 45,
        marginTop: 75,
        marginBottom: 20,
        alignItems: "center",

    },

    textHeader:{
        fontSize:20,
        // fontFamily:"bold",
        textAlign:"center",
        color: "#3CB371"

    },

    TextInput:{
        height:0,
        width:400,
        flex:1,
        padding: 10,
        marginLeft:150,
        color:"white",


    },

});

export default ForgotPasswordScreen;
