import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import image from "react-native-web/src/exports/Image";
import Animated from "react-native-reanimated";
// import onChange from "module:react-native-reanimated.Animated.onChange";

// the forgot password screen is the screen where users can enter their email and
// the system will begin the reset password process
// const mainImages = async ({navigation}) => {
export default function MainImage(){
    const [image, setImage] = useState(null);
    const pickImage = async ({navigation}) => {


        // const [email, setEmail] = useState(''); // the email address


        //start
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });//this function allows or gives permission to upload pictures and also be able to edit them
        console.log(result); //well get the log if the process in unsuccessful so we know where the error is:)

        if (!result.cancelled) {
            setImage(result.uri);

        }
    };


    // the react native GUI component
    return (


        <View style={styles.container}>

            {image && <Image source={{uri: image}} style={{width: 200, height: 200, marginTop:-500}}/>}

            <View style = {styles.inputView}>
                <TextInput style = {styles.TextInput}
                           editable maxLength={5000000000000}
                           multiline numberOfLines={10}
                           // onChangeText={onChange}
                           placeholder="Description"

                />

            </View>

            <View style={styles.UploadButton}>
                <Button
                    title="Upload"
                    color="gray"/>
            </View>

            <View style={styles.addImageButton}>
                <Button
                    title="+" onPress={pickImage}
                    color="#00FF66"/>
            </View>




        </View>




    );
};


// the styles for the forgot image upload page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",

    },
    addImageButton:{
        height: 80,
        width: 80,
        marginBottom:-400,
        marginTop:10,
        // color:"blue",
    },

    UploadButton:{
        height: 180,
        width: 100,
        marginBottom:-100,
        marginTop:-80,
        // color:"blue",
    },
    inputView :{
        backgroundColor:"#00FF66",
        borderRadius:0,
        width:"90%",
        height: 185,
        marginTop: 50,
        marginBottom: 100,
        alignItems: "center",
        justifyContent:"center",




    },

    TextInput:{
        height:0,
        width:400,
        flex:1,
        padding: 10,
        marginLeft:150,
        justifyContent:"center",

        color:"gray",


    },

});
