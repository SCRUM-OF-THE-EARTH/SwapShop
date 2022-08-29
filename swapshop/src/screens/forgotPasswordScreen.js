import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';




// export default function forgotPasswordScreen() {

const forgotPasswordScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');
    return(



   <View style={styles.container}>

       <Text style={styles.textHeader}>ENTER YOUR EMAIL ADDRESS
           TO RETRIEVE YOUR PASSWORD RESET  INSTRUCTIONS</Text>

           <Image
               source={require("../../assets/img.png")}
               style={styles.image}
           />

           <View style = {styles.inputView}>
               <TextInput style = {styles.TextInput}
                          placeholder="Email"
                          placeholderTextColor="white"
                          onChangeText={(email) => setEmail(email)}/>

           </View>




        <View>
            <Button
                title="RESET PASSWORD"
                color= "red"
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
        backgroundColor:"white",
    },
    image:{
        height:250,
        width:250,
        marginTop:-330,
        marginBottom: 30,

    },
    inputView :{
        backgroundColor:"#59788E",
        borderRadius:30,
        width:"70%",
        height: 45,
        marginTop: 60,
        marginBottom: 20,
        alignItems: "center",
        borderColor:"red",


    },

    textHeader:{
        fontSize:20,
        fontFamily:"bold",
        textAlign:"center",
        color: "gray"

    },

    TextInput:{
        height:0,
        width:400,
        flex:1,
        padding: 10,
        marginLeft:-100,
        color:"white",


    },

});

export default forgotPasswordScreen;
