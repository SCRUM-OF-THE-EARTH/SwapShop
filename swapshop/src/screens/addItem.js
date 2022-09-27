import { Button, TextInput, View, StyleSheet, Text, Image } from "react-native"
import {useState} from 'react'
import {login_user} from './SignInScreen.js';
import { trade_items_list } from "./MainScreen.js";
import * as ImagePicker from 'expo-image-picker';

// This is the screen for creating a new trade item
//  export default function MainImage() {


const AddItem = ({navigation}) => {

    const [name, onNameChange] = useState(''); // the name of the new item
    const [description, onDescChange] = useState(''); // the description of the new item
    const [value, onValueChange] = useState(''); // the float value of the new item
    const [errorMessage, onChangeError] = useState(''); // the error message displayed
    const [image, setImage] = useState(null); //the uploaded image.
    const [exchange, setExchange] = useState(''); // the item the poster wants in exchange


    const pickImage = async ({navigate}) => {
        //the uploaded image.
        //uploaded image contents
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });//this function allows or gives permission to upload pictures and also be able to edit them
        console.log(result); //well get the log if the process in unsuccessful so we know where the error is:)

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const takePicture = async () => {
        // the taken image
        //upload image contents
        let results = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,   
        });

        if (!results.cancelled) {
            setImage(results);
        }
    }



    // the React GUI component
    return (

        <View style={styles.container}>
            <Text style={styles.header}>Post a new item to trade</Text>
            <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>
            <TextInput style={styles.TextInput} placeholder="name of item"
                       onChangeText={(name) => onNameChange(name)}/>
            <TextInput style={[styles.TextInput, {paddingVertical: 20}]} type="textarea" placeholder="description"
                       multiline={true} onChangeText={(description) => onDescChange(description)}/>
            <TextInput style={styles.TextInput} placeholder="estimate for value of item"
                       onChangeText={(value) => onValueChange(value)}/>

            <TextInput style={styles.TextInput} onChangeText={(text) => setExchange(text)} placeholder="wanted in exhange"/>

            {/*this is the uploaded image from the user's gallery*/}
            {/*{image && <Image source={{uri: image}} style={{width: 200, height: 200, marginLeft:80,marginTop: 200}}/>}*/}


            <View style={styles.addImageButton}>
                <Button
                    title="upload image"
                    onPress={pickImage}

                    color="#3CB371"/>
            </View>
            <Text style={{alignSelf:'center'}}>or</Text>
            <View style={styles.addImageButton}> 
                <Button 
                
                title="take a photo"
                onPress={takePicture}
                color="#3CB371"/>

            </View>
            {/*{image && <Image source={{uri: image}} style={{width: 300, height: 200, marginLeft:30,marginTop: 400, marginBottom: 10}}/>}*/}

            <View style={{alignContent:'center', alignSelf:'center'}}>
                {image && <Image source={{uri: image.uri}} style={{position:'relative', width: 300, height: 200}}/>}
            </View>

            <Text style={styles.addItemBtn} onPress={() => AddNewItem(name, description, value, exchange, onChangeError, navigation, image)}>Post</Text>

        </View>
    );

};




// addNewItem is used to pass the name, description and value to the the trade item class
// to create a new trade item which is then added to the list of trade items
// if the item is successfully created the app will return to the home page
// if not it will display an error
function AddNewItem(name, description, value, exchange, setError, navigation, image) {
    if (name == "" || description == "" || value == "" || image == "") {
        setError("Please fill in all the fields");
        return;
    }

    if (exchange == "") {
        exchange = "open";
    }

    let owner_id = login_user.getID()
    console.log("login_user id: ", owner_id);
    console.log(name, description, value, owner_id);

    trade_items_list.addItem('add-trade-item', [name,description, value, owner_id, exchange]).then(res => {
        console.log(res);
        navigation.navigate('MainScreen');
    })


}

// the styles for the add items screen
const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginVertical: 50,
        alignSelf: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        position: 'relative',
        height:'100%',
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
        alignSelf:"center",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        width: "90%",
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
    },

    //
    addImageButton: {
        // height: 100,
        width: 150,
        alignSelf:'center',
        margin:5,
    },

    addItemBtn: {
        width: "80%",
        borderRadius: 25,
        padding: 15,
        color:'white',
        textAlign:'center',
        alignSelf: 'center',
        backgroundColor: "#3CB371",
        margin: 2,
        top:'85%',
        position: 'absolute'
    },


});

export default AddItem;
