import { Button, TextInput, View, ScrollView, StyleSheet, Text, Image } from "react-native"
import {useEffect, useState} from 'react';
import { login_user, communicator, tags_list } from '../helpers/init';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from "@react-navigation/native";

// This is the screen for creating a new trade item


const AddItem = ({navigation, route}) => {

    let { item } = route.params;

    const isFocused = useIsFocused(); 

    const [name, onNameChange] = useState(''); // the name of the new item
    const [description, onDescChange] = useState(''); // the description of the new item
    const [value, onValueChange] = useState(''); // the float value of the new item
    const [errorMessage, onChangeError] = useState(''); // the error message displayed
    const [image, setImage] = useState(null); //the uploaded image.
    const [imageList, setImgaeList] = useState(''); // the item the poster wants in exchange

    const [itemTagsMenuOpen, setitemTagsMenuOpen] = useState(false);
    const [itemTagValues, setItemTagValues] = useState([]);
    const [itemTags, setItemTags] = useState([]);

    const [tagMenuOpen, setTagMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [tagValues, setTagValues] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        let allTags = tags_list.getTags();
        setTags(allTags);

        setItemTags(allTags);

        if (item ) {
            let tempTags = [];
            let tempExcTags = [];

            allTags.forEach(a => {
                item.getTags().forEach(tag => {
                    if (a.value.id == tag.getID()) {
                        tempTags.push(a.value);
                        return;
                    }
                });

                item.getExchangeTags().forEach(tag => {
                    if (a.value.id == tag.getID()) {
                        tempExcTags.push(a.value);
                        return;
                    }   
                })
            })
            setItemTagValues(tempTags);
            setTagValues(tempExcTags);


            onNameChange(item.getName());
            onDescChange(item.getDescription());
            onValueChange(item.getValue());
            let tempImages = [];
            item.getImages().forEach((image, index) => {
                tempImages.push(<Image style={{position:'relative', height: 200, margin: 20}} key={index} source={{
                    uri: image
                }}/>);
            })

            setImage(tempImages)
        }

        

    }, [isFocused]);

    const pickImage = async ({navigate}) => {

        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 0.2,
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
            for (let i = 0; i < result.selected.length; i++) {
                let uri = result.selected[i].uri;
                tempImageList.push(result.selected[i]);
                let item = <Image style={{position:'relative', height: 200, margin: 20}} key={i} source={{
                    uri: uri
                }}/>;
                temp.push(item);
            }
            setImage(temp);
            setImgaeList(tempImageList);
        }
        }) //well get the log if the process in unsuccessful so we know where the error is:

        

        
    };

    const takePicture = async () => {

        await Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ])
            ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.2,
                base64: true,  
            }).then((result) => {
                if (!result.selected) {
                    let t = {"cancelled": result.cancelled, "selected" : [result]};
                    result = t;
                }
                if (!result.cancelled) {
                let temp = [];
                let tempImageList = [];
                for (let i = 0; i < result.selected.length; i++) {
                    let uri = result.selected[i].uri;
                    tempImageList.push(result.selected[i]);
                    let item = <Image style={{position:'relative', height: 200, margin: 20}} key={i} source={{
                        uri: uri
                    }}/>;
                    temp.push(item);
                }
                setImage(temp);
                setImgaeList(tempImageList);
            }
            })
    }

    // the React GUI component
    return (

        <View style={styles.container}>
            
            <Text style={styles.header}>{item ? "Update an item" : "Post a new item to trade"}</Text>
            <DropDownPicker
                addCustomItem={true}
                containerStyle={styles.tagMenu}
                open={itemTagsMenuOpen}
                searchable={true}
                placeholder="tags for this item"
                multiple={true}
                min={0}
                max={5}
                mode="BADGE"
                itemKey="key"
                value={itemTagValues}
                items={itemTags}
                setOpen={setitemTagsMenuOpen}
                setValue={setItemTagValues}
                setItems={setItemTags}
            />


            <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>
            <TextInput style={styles.TextInput} placeholder="name of item"
                       onChangeText={(name) => onNameChange(name)} value={name}/>
            <TextInput style={[styles.TextInput, {paddingVertical: 20}]} type="textarea" placeholder="description"
                       multiline={true} onChangeText={(description) => onDescChange(description)} value={description}/>
            <TextInput style={styles.TextInput} placeholder="estimate for value of item"
                    onChangeText={(value) => onValueChange(value)} value={value}/>

            <DropDownPicker
                addCustomItem={true}
                containerStyle={styles.tagMenu}
                open={tagMenuOpen}
                searchable={true}
                placeholder="Add tags for items wanted in exchange"
                multiple={true}
                min={0}
                max={5}
                mode="BADGE"
                itemKey="key"
                value={tagValues}
                items={tags}
                setOpen={setTagMenuOpen}
                setValue={setTagValues}
                setItems={setTags}
            />


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

            { item ? 
                <Text style={styles.addItemBtn} onPress={() => AddNewItem(name, description, value, tagValues, onChangeError, navigation, imageList, itemTagValues, true, item)}>Update</Text> :
                <Text style={styles.addItemBtn} onPress={() => AddNewItem(name, description, value, tagValues, onChangeError, navigation, imageList, itemTagValues, false)}>Post</Text>
            }
            

        </View>
    );

};




// addNewItem is used to pass the name, description and value to the the trade item class
// to create a new trade item which is then added to the list of trade items
// if the item is successfully created the app will return to the home page
// if not it will display an error
async function AddNewItem(name, description, value, tags, setError, navigation, image, itemTags, update, item) {
    if (name == "" || description == "" || value == "" ) {
        setError("Please fill in all the fields");
        return;
    }

    if (update) {
        await communicator.makeRequestByCommand("update-trade-item", [item.getID(),name,description, value]);

        tags.forEach(async tag => {
            let tagIn = false;
            let foundIndex = 0;
            item.getExchange().forEach((iTag, index) => {
                if (tag.id == iTag.getID()) {
                    tagIn = true;
                    foundIndex = index
                    return;
                }
            })

            if (!tagIn) {
                await communicator.makeRequestByCommand('add-item-tag', [item.getID(), tag.id, '1']); 
            } else {
                let temp = item.getExchange();
                temp.splice(foundIndex, 1);
                item.exchange = temp;
            }
        });

        itemTags.forEach(async tag => {
            let tagIn = false;
            let foundIndex = 0;
            item.getTags().forEach((iTag, index) => {
                if (tag.id == iTag.getID()) {
                    tagIn = true;
                    foundIndex = index
                    return;
                }
            })

            if (!tagIn) {
                await communicator.makeRequestByCommand('add-item-tag', [item.getID(), tag.id, '0']); 
            } else {
                let temp = item.getTags();
                temp.splice(foundIndex, 1);
                item.exchange = temp;
            }
        })

        item.getExchange().forEach(async tag => {
            await communicator.makeRequestByCommand('delete-item-tag', [item.getID(), tag.id])
        })

        item.getTags().forEach(async tag => {
            await communicator.makeRequestByCommand('delete-item-tag', [item.getID(), tag.id])
        })

        navigation.navigate("MainScreen");
        return;
        
    }

    await itemTags.forEach(async (tag, index) => {
        if (typeof tag.id == 'undefined') {
            tag = tag.toLowerCase();
            communicator.makeRequestByCommand("add-Tag", [tag]).then(newTag => {
                let addTag = tags_list.addTag(newTag);
                itemTags.splice(index, 1, addTag);
            })
            
        } 
    })

    await tags.forEach(async (tag, index) => {
        if (typeof tag.id == 'undefined') {
            tag = tag.toLowerCase();
            let newTag = await communicator.makeRequestByCommand("add-Tag", [tag]);
            let addTag = tags_list.addTag(newTag);
            tags.splice(index, 1, addTag);
        }
    });


    let owner_id = login_user.getID();
    
    communicator.makeRequestByCommand('add-trade-item', [name,description, value, owner_id]).then(async (trade_item) => {
        let item_id = trade_item['id'];
        await itemTags.forEach(async tag => {
            await communicator.makeRequestByCommand('add-item-tag', [item_id, tag.id, '0']); 
        })
        await tags.forEach(async tag => {
            await communicator.makeRequestByCommand('add-item-tag', [item_id, tag.id, '1']);
        })

        if (image != "") {
            await communicator.makePostRequestForImage(image, item_id, "trade");
        }
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

    tagMenu: {
        color: "gray",
        alignSelf:"center",
        margin: 5,
        width: "90%",
        zIndex: 5,
        position: "relative"
    }
});

export default AddItem;
