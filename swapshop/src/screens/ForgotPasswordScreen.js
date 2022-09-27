import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';

// the forgot password screen is the screen where users can enter their email and 
// the system will begin the reset password process
const ForgotPasswordScreen = ({navigation}) =>{

    const [email, setEmail] = useState(''); // the email address

    // the react native GUI component
    return(



   <View style={styles.container}>

       <Text style={styles.textHeader}>ENTER YOUR EMAIL ADDRESS
           TO RETRIEVE YOUR PASSWORD</Text>

           <Image
               source={require("../../assets/img_1.png")}
               style={styles.image}
           />

           <View style = {styles.inputView}>
               <TextInput style = {styles.TextInput}
                          placeholder="Email"
                          placeholderTextColor="#2E8B57"
                          onChangeText={(email) => setEmail(email)}/>

           </View>


        {/*<View style={styles.forgot_button}>*/}
        {/*    <Button*/}
        {/*        title="RESET PASSWORD"*/}
        {/*        color= "#2E8B57"*/}
        {/*        onPress={() => navigation.navigate('SignInScreen')}*/}

        {/*    />*/}

       {/*//to be deleted*/}
            <View style={styles.forgot_button}>
                <Button
                    title="RESET PASSWORD"
                    color= "#2E8B57"

                    // onPress={() => navigation.navigate('addItem')}

                    // onPress={() => navigation.navigate('addItemScreen')}


                />


        </View>

   </View>


    );
}

// the styles for the forgot password page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",

    },
    forgot_button:{
        height: 80,
        marginBottom:-20,
        marginTop:20,
    },
    image:{
        height:250,
        width:250,
        marginTop:-300,
        marginBottom: 20,

    },
    inputView :{
        backgroundColor:"#F5F5F5",
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
        color:"#3CB371",


    },

});

export default ForgotPasswordScreen;
