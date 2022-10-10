import { Button, TextInput, View, ScrollView, StyleSheet, Text, Image } from "react-native"
import {useState} from 'react';
import Slideshow from 'react-native-image-slider-show';
import {login_user} from './SignInScreen.js';
import { trade_items_list } from "./MainScreen.js";
import * as ImagePicker from 'expo-image-picker';
import { communicator } from "../classes/Communicator.js";

// This is the screen for creating a new trade item
//  export default function MainImage() {


const AddItem = ({navigation}) => {

    const [name, onNameChange] = useState(''); // the name of the new item
    const [description, onDescChange] = useState(''); // the description of the new item
    const [value, onValueChange] = useState(''); // the float value of the new item
    const [errorMessage, onChangeError] = useState(''); // the error message displayed
    const [image, setImage] = useState(null); //the uploaded image.
    const [imageList, setImgaeList] = useState('');
    const [exchange, setExchange] = useState(''); // the item the poster wants in exchange


    const pickImage = async ({navigate}) => {
        //the uploaded image.
        //uploaded image contents
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        })
        .then((result) => {
            if (!result.selected) {
                let t = {"cancelled": result.cancelled, "selected" : [result]};
                result = t;
            }
            if (!result.cancelled) {
            let temp = [];
            let tempImageList = [];
            console.log("selected: ", result['selected']);
            for (let i = 0; i < result.selected.length; i++) {
                let uri = result.selected[i].uri;
                // uri = uri.replace('file://', "");
                console.log(uri);
                tempImageList.push(result.selected[i]);
                let item = <Image style={{position:'relative', height: 200, margin: 20}} key={i} source={{
                    uri: uri
                }}/>;
                temp.push(item);
            }
            setImage(temp);
            setImgaeList(tempImageList);
        }
        }) //well get the log if the process in unsuccessful so we know where the error is:)

        

        
    };

    const takePicture = async () => {
        // the taken image
        //upload image contents
        let results = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,  
        }).then((result) => {
            if (!result.selected) {
                let t = {"cancelled": result.cancelled, "selected" : [result]};
                result = t;
            }
            if (!result.cancelled) {
            let temp = [];
            console.log("selected: ", result['selected']);
            for (let i = 0; i < result.selected.length; i++) {
                let uri = result.selected[i].uri;
                // uri = uri.replace('file://', "");
                console.log(uri);
                let item = <Image style={{position:'relative', height: 200, margin: 20}} key={i} source={{
                    uri: uri
                }}/>;
                temp.push(item);
            }
            setImage(temp);
        }
        })
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

            <ScrollView style={{alignContent:'center', alignSelf:'center', marginBottom: 150, width: '100%'}}>
                {/* {image && <Image source={{uri: image.uri}} style={{position:'relative', width: 300, height: 200}}/>} */}
                {image}
            </ScrollView>

            <Text style={styles.addItemBtn} onPress={() => AddNewItem(name, description, value, exchange, onChangeError, navigation, imageList)}>Post</Text>

        </View>
    );

};




// addNewItem is used to pass the name, description and value to the the trade item class
// to create a new trade item which is then added to the list of trade items
// if the item is successfully created the app will return to the home page
// if not it will display an error
function AddNewItem(name, description, value, exchange, setError, navigation, image) {
    if (name == "" || description == "" || value == "") {
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

        let item_id = trade_items_list.getItems()[trade_items_list.getItems().length -1].getID();
        console.log("item id is: ", item_id)

        if (image != "") {
            communicator.makePostRequestForImage(image, item_id);
        }
        
        console.log(res);
        navigation.navigate('MainScreen');
    });

    

    // console.log("Image is: ", image);
    // console.log("image name: ");
    
    // console.log(type);

    

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
