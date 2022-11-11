import { Button, TextInput, View, ScrollView, StyleSheet, Text, Image } from "react-native"
import {useEffect, useState, useContext} from 'react';
import { login_user, communicator, tags_list } from '../helpers/init';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from "@react-navigation/native";
import themeContext from '../components/themeContext';
// This is the screen for creating a new trade item


const AddItem = ({navigation, route}) => {

    let { item } = route.params;
    let theme = useContext(themeContext);

    const isFocused = useIsFocused(); 

    const [name, onNameChange] = useState(''); // the name of the new item
    const [description, onDescChange] = useState(''); // the description of the new item
    const [value, onValueChange] = useState(''); // the float value of the new item
    const [errorMessage, onChangeError] = useState(''); // the error message displayed
    const [image, setImage] = useState(null); //the uploaded image.
    const [imageList, setImgaeList] = useState(''); // the list of images objects used to update the database

    const [itemTagsMenuOpen, setitemTagsMenuOpen] = useState(false); // the open state of the a tagsMenu
    const [itemTagValues, setItemTagValues] = useState([]); // the values for the tags
    const [itemTags, setItemTags] = useState([]); // the items displayed in the tags drop down for the new item

    const [tagMenuOpen, setTagMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [tagValues, setTagValues] = useState([]); // the values of the wanted in exchange tags
    const [tags, setTags] = useState([]); // the tags to be displayed for the wanted in exchange drop down


    useEffect(() => { // reload the cmponents data when this component is in focus
        let allTags = tags_list.getTags(); // get the tags list
        setTags(allTags);

        setItemTags(allTags);

        if (item ) { // if an item hs been passed to the component to be edited then load the item data into the add item page
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


    //  check required fields is used to validate the user input.
    //  if there is an issue the app will display an appropriate error to the user
    const checkRequiredFields = () => {
        if (name == "" || description == "" || value == "" ) {
            onChangeError("Please fill in all the fields");
            return false;
        }
        if (isNaN(value)) {
            onChangeError("value should be given in rands");
            return false;
        }
        return true;
    }

    // addNewItem is used to create a new trade item which is then added to the list of trade items
    // if the item is successfully created the app will return to the home page
    // if not it will display an error
    const AddNewItem = async () => {
        if (!checkRequiredFields()) {
            return;
        }

        await itemTagValues.forEach(async (tag, index) => {
            if (typeof tag.id == 'undefined') {
                tag = tag.toLowerCase();
                communicator.makeRequestByCommand("add-Tag", [tag]).then(newTag => {
                    let addTag = tags_list.addTag(newTag);
                    itemTagValues.splice(index, 1, addTag);
                })
                
            } 
        })

        await tagValues.forEach(async (tag, index) => {
            if (typeof tag.id == 'undefined') {
                tag = tag.toLowerCase();
                let newTag = await communicator.makeRequestByCommand("add-Tag", [tag]);
                let addTag = tags_list.addTag(newTag);
                tagValues.splice(index, 1, addTag);
            }
        });


        let owner_id = login_user.getID();
        
        communicator.makeRequestByCommand('add-trade-item', [name,description, value, owner_id]).then(async (trade_item) => {
            let item_id = trade_item['id'];
            await itemTagValues.forEach(async tag => {
                await communicator.makeRequestByCommand('add-item-tag', [item_id, tag.id, '0']); 
            })
            await tagValues.forEach(async tag => {
                await communicator.makeRequestByCommand('add-item-tag', [item_id, tag.id, '1']);
            })

            if (imageList != "") {
                console.log("Item Id is:", item_id);
                await communicator.makePostRequestForImage(imageList, item_id, "trade");
            }
            navigation.navigate('MainScreen');
        })

            

            
    }

    //update item is used to update an item that has been passed to the component
    // if the item was successfully updated then the app returns to the homescreen
    // else the component will display an error to the user 
    const UpdateItem = async () => {
        if (!checkRequiredFields()) {
            return;
        }

        await communicator.makeRequestByCommand("update-trade-item", [item.getID(),name,description, value]);

        tagValues.forEach(async tag => {
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

        itemTagValues.forEach(async tag => {
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
                item.tags = temp;
            }
        })

        item.getExchange().forEach(async tag => {
            await communicator.makeRequestByCommand('delete-item-tag', [item.getID(), tag.id])
        })

        item.getTags().forEach(async tag => {
            await communicator.makeRequestByCommand('delete-item-tag', [item.getID(), tag.id])
        });

        if (imageList != "") {
            let item_id = item.getID();
            console.log("Item Id is:", item_id);
            await communicator.makePostRequestForImage(imageList, item_id, "trade");
        }

        navigation.navigate("MainScreen");
        return;
    }

    const pickImage = async ({navigate}) => { // pickImage is used to open the user's  gallery and retireive an image/images 

        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

    const takePicture = async () => { // take Picture is used to open the user's camera and select a photo they take through the app

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

        <View style={[styles.container, { backgroundColor: theme.background }]}>

            <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>

                <DropDownPicker
                    addCustomItem={true}
                    open={itemTagsMenuOpen}
                    searchable={true}
                    placeholder="tags for this item"
                    multiple={true}
                    min={0}
                    max={5}
                    mode="BADGE"
                    itemKey="key"
                    listMode="SCROLLVIEW"
                    style={{ backgroundColor: theme.inputColor, borderColor: 'gray', marginBottom: 5}}
                    placeholderStyle={{color: 'gray'}}
                    containerStyle={{paddingHorizontal: 20,  alignSelf:'center' }}
                    dropDownContainerStyle={{alignSelf:'center', backgroundColor: theme.inputColor, borderColor: 'gray'}}
                    value={itemTagValues}
                    items={itemTags}
                    setOpen={setitemTagsMenuOpen}
                    setValue={setItemTagValues}
                    setItems={setItemTags}
                />


            
            <TextInput style={[styles.TextInput, { backgroundColor: theme.inputColor }]} placeholder="name of item"
                       onChangeText={(name) => onNameChange(name)} value={name}/>
            <TextInput style={[styles.TextInput, { paddingVertical: 20 }, { backgroundColor: theme.inputColor }]} type="textarea" placeholder="description"
                       multiline={true} onChangeText={(description) => onDescChange(description)} value={description}/>
            <TextInput style={[styles.TextInput, { backgroundColor: theme.inputColor }]} placeholder="estimate for value of item"
                    onChangeText={(value) => onValueChange(value)} value={value}/>

            <DropDownPicker
                style={{ backgroundColor: theme.inputColor, borderColor: 'gray', marginTop: 5}}
                containerStyle={{paddingHorizontal: 20,  alignSelf:'center' }}
                dropDownContainerStyle={{alignSelf:'center', backgroundColor: theme.inputColor, borderColor: 'gray'}}
                searchContainerStyle={{borderBottomColor: '#D6D6D6'}}
                searchTextInputStyle={{backgroundColor: "#FDFDFD"}}
                placeholderStyle={{color: 'gray'}}
                listMode="SCROLLVIEW"
                addCustomItem={true}
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
                zIndex={100}
            />


            <View style={styles.buttonContainer}>
            <View style={styles.addImageButton}>
                <Text
                    style={styles.imageButton}
                    onPress={pickImage}>upload image</Text>
            </View>
            <Text style={{alignSelf:'center'}}>or</Text>
            <View style={styles.addImageButton}> 
                <Text 
                style={styles.imageButton}
                onPress={takePicture}
                >take a photo</Text>

            </View>
            </View>
            {/*{image && <Image source={{uri: image}} style={{width: 300, height: 200, marginLeft:30,marginTop: 400, marginBottom: 10}}/>}*/}

            <ScrollView style={{alignContent:'center', alignSelf:'center', marginBottom: 90, width: '100%'}}>
                {/* {image && <Image source={{uri: image.uri}} style={{position:'relative', width: 300, height: 200}}/>} */}
                {image}
            </ScrollView>

            { item ? 
                <Text style={styles.addItemBtn} onPress={() => UpdateItem()}>Update</Text> :
                <Text style={styles.addItemBtn} onPress={() => AddNewItem()}>Post</Text>
            }
            

        </View>
    );

};






// the styles for the add items screen
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        position: 'relative',
        height:'100%',
    },
    imageButton: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 5,
        color:'white',
        textAlign:'center',
        alignSelf: 'center',
        backgroundColor: "#3CB371",
        margin: 2,
    },
    header: {
        fontWeight: '400',
        fontSize: 25,
        textAlign: 'center',
        color: '#3CB371'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 10,
    },
    TextInput: {
        padding: 10,
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
        top:'90%',
        position: 'absolute'
    },

    tagMenu: {
        color: "gray",
        alignSelf:"center",
        margin: 5,
        width: "90%",
        zIndex: 5,
        position: "relative"
    },
    dropContainer: {
        width: '100%'
    }
});

export default AddItem;
