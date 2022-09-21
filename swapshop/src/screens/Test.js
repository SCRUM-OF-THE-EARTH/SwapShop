import React, { useState, useEffect } from 'react';
import {Button, Image, View, Platform, StyleSheet, Text, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AddItem from "./MainImages";
import {login_user} from "./SignInScreen";
import {trade_items_list} from "./MainScreen";

export default function Test() {
    const [image, setImage] = useState(null);

    //new code
    const [name, onNameChange] = useState(''); // the name of the new item
    const [description, onDescChange] = useState(''); // the description of the new item
    const [value, onValueChange] = useState(''); // the flaot value of the new item
    const [errorMessage, onChangeError] = useState(''); // the error message displayed


    //up till here

    const pickImage = async ({navigation}) => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (

        <View style={styles.container}>
        {/*//new code*/}
        {/*// <View style={styles.container}>*/}
        {/*//     <Text style={styles.header}>Post a new Trade item</Text>*/}
        {/*//     <Text style={{color: 'red', textAlign:'center'}}>{errorMessage}</Text>*/}
        {/*//     <TextInput style={styles.TextInput} placeholder="name of item" onChangeText={(name)=>onNameChange(name)}/>*/}
        {/*//     <TextInput style={[styles.TextInput, {paddingVertical: 20}]} type="textarea" placeholder="description" multiline={true} onChangeText={(description)=>onDescChange(description)}/>*/}
        {/*//     <TextInput style={styles.TextInput} placeholder="estimate for value of item" onChangeText={(value)=>onValueChange(value)}/>*/}
        {/*//*/}
        {/*//     <View style={styles.addItemBtn}>*/}
        {/*//         <Button title="save item" color='#2E8B57' onPress={() => AddNewItem(name, description, value, onChangeError, navigation)}/>*/}
        {/*//     </View>*/}

        {/*    // everything above*/}
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <View style={styles.addImageButton}>

            <Button
                title="upload image"
                onPress={pickImage}

                color="yellow"/>
        </View>

        {/*// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>*/}
        {/*//     <Button title="Pick an image from camera roll" onPress={pickImage} />*/}
        {/*//     {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}*/}
        {/*// </View>*/}

         </View>






    );
}
//new code
// function AddNewItem(name, description, value, setError, navigation) {
//     if (name == "" || description == "" || value == "") {
//         setError("Please fill in all the fields");
//         return;
//     }
//
//     let owner_id = login_user.getID()
//     console.log(name, description, value, owner_id);
//     trade_items_list.addItem('add-trade-item', [name,description, value, owner_id]).then(res => {
//         console.log(res);
//         navigation.navigate('MainScreen')
//     })
//
// }

const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginVertical: 50,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    header: {
        fontWeight: '400',
        fontSize: 25,
        textAlign: 'center',
        color: '#3CB371'
    },
    TextInput: {
        padding: 5,
        color: "gray",
        alignSelf: 'center',
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        width: "90%",
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
    },

    //
    addImageButton: {
        height: 100,
        width: 150,
        marginBottom: -100,
        marginTop: 450,
        marginLeft: 110,
        // color:"blue",
    },

    addItemBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: "center",
        marginTop: 360,
        // marginBottom: -500,
        backgroundColor: "#2E8B57",
        margin: 2,
    },


});



