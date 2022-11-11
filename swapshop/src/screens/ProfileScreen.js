import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect, useContext } from 'react';
import Tab from '../components/Tab.js';
import { login_user, tags_list, communicator } from '../helpers/init';
import { useIsFocused } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import Trade_List from '../components/Trade_List.js';
import { Dimensions } from 'react-native';
import themeContext from '../components/themeContext';


const windowHeight = Dimensions.get('window').height;
DropDownPicker.setListMode("SCROLLVIEW");

const ProfileScreen = ({ navigation }) => {
    const theme = useContext(themeContext); // the theme
    const isFocused = useIsFocused(); // the focused flag for the component
    const [loaded, setLoaded] = useState(false); // the loaded status of the component
    const [tagMenuOpen, setTagMenuOpen] = useState(false); // the open status of the tag menu
    const [tags, setTags] = useState([]); // the list of tags to be displayed in the tag drop down menu
    const [interests, setInterests] = useState([]); // the list of user interests in tags
    const [activeTags, setActiveTags] = useState([]); // the list of selected user interests
    const [image, setImage] = useState(null); // the profile image of the user
    const [id, setID] = useState(null); // the id of the active user object

// pick image is used to open the users gallery and retireve an image they select
    const pickImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 0.2,

        });
        if(!result.cancelled){
            setImage(result.uri);
            communicator.makePostRequestForImage([result], login_user.getID(), 'profile');
            reloadPhoto();
        }
    };

    useEffect(() => { // reload the components data when it is in focus
        let tempTags = tags_list.getTags();
        let tempInterests = [];
        setInterests([]);
        setActiveTags([]);

        login_user.getInterests().forEach(tag_id => {
            tempTags.forEach((a) => {
                if (a.value.id == tag_id) {
                    tempInterests.push(a.value);
                    return;
                }
            })

        });

        setImage(login_user.getPhoto());
        setTags(tempTags);
        setInterests(tempInterests);
        setActiveTags(tempInterests);
        setID(login_user.getID())
        setLoaded(true);
    }, [isFocused]);


        // if the profile has been loaded display it
    if (loaded) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: theme.profileColor }]}>
                <Text style={styles.welcome}>{login_user.getUsername()}</Text>
                <View style={[styles.container, { backgroundColor: theme.profSecColor }]}>
                    <View style={styles.imageContainer} >
                        {image && <Image source={{uri:image}} style={styles.image}/>}
                        <TouchableOpacity onPress={() => {
                            pickImage();
                        }} style={styles.editIcon}><Icon size={40} name="brush-outline"></Icon></TouchableOpacity>
                    </View>

                    <View style = {styles.details}>

                        <View style={styles.data_container}>
                            <Image
                                source={require("../../assets/user.png")}
                                style={styles.imageDetailU}
                            />
                            <Text style={[styles.data_field, { color: theme.details }]}>{login_user.getFullName()}</Text>
                        </View>

                        <View style={styles.data_container}>
                            <Image
                                source={require("../../assets/email.png")}
                                style={styles.imageDetailE}
                            />
                            <Text style={[styles.data_field, { color: theme.details }]}>{login_user.getEmail()}</Text>
                        </View>


                        <Text style={[styles.label, { color: theme.color }]}>My interests: </Text>

                        <View style={styles.drop}>
                            <DropDownPicker
                                style={{ backgroundColor: theme.inputColor }}
                                open={tagMenuOpen}
                                searchable={true}
                                multiple={true}
                                min={0}
                                max={5}
                                mode="BADGE"
                                listMode='MODAL'
                                placeholder="add an interest"
                                value={interests}
                                items={tags}
                                setOpen={setTagMenuOpen}
                                setValue={setInterests}
                                setItems={setTags}
                                itemKey="key"
                                onChangeValue={(value) => {
                                    if (activeTags.length > value.length) {
                                        let difference = activeTags.filter(x => !value.includes(x));
                                        removeInterest(difference[0]).then(() => {
                                            setActiveTags(value);
                                        })
                                    } else {
                                        let difference = value.filter(x => !activeTags.includes(x));
                                        addInterest(difference[0]).then(() => {
                                            console.log("tag being logged in drop down",difference[0]);
                                            setActiveTags(value);
                                        })
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <Text style={[styles.label, { color: theme.color }]}>My Items:</Text>

                    { (id != null) ?
                        <Trade_List
                            available={true}
                            sold={true}
                            id={id}
                            navigation={navigation}
                            edit={true}
                            searchTerm=''
                            tags={[]}
                            sortIndex={0}
                        /> : null }



                </View>
                <Tab nav={navigation} activeTab="profile" />
            </View>
        )
    }

}

// the reload photo is used to wait for a newly selected profile image ot be loaded and them refresh the page with the new image
async function reloadPhoto() {
    let new_profile = await communicator.makeRequestByCommand('fetch-profile-photo', [login_user.getID()]);
    if (new_profile['photo'] == login_user.getPhoto()) {
        setTimeout(reloadPhoto, 200);
    } else {
        login_user.setPhoto(new_profile['photo']);
    }
}

// add Interest is used to save a new interest the uesr adds
async function addInterest(tag) {
    if (typeof(tag) == 'undefined'){
        return;
    }
    let tagId =  tag.id;

    let userId = login_user.getID();
    await communicator.makeRequestByCommand("add-interest", [userId, tagId]);
    let interests = login_user.getInterests();
    interests.push(tagId);
}

// remoove interest is used to remove an interest the user deselects 
async function removeInterest(tag) {
    console.log("tag in removeInterest:",tag)
    let tagId = tag.id;

    let userId = login_user.getID();
    await communicator.makeRequestByCommand('remove-interest', [userId, tagId]);
    let interests = login_user.getInterests();

    let newInterests = interests.filter(x => x != tagId)
    login_user.setInterests(newInterests);
}

// teh stles for the profile screen
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: windowHeight - 130,
    },
    interests: {
        zIndex: 9,
        marginVertical: 10
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: -75,
        justifyContent: 'center'
    },
    data_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome:{
        paddingTop: 20,
        paddingBottom: 80,
        alignItems:"center",
        fontSize: 40,
        color: 'white',
        fontWeight:"700",
        textAlign:"center",
    },
    details: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    tags:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    data_field: {
        color: "gray",
        fontSize: 15,
        width: 'auto',
        padding: 10,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        color: "#3CB371",
        padding: 10,
        fontWeight: '300'
    },
    tag_container: {
        display: 'flex',
        flexDirection:'row',
        backgroundColor: '#A3E0BF',
        borderRadius: 10,
        paddingLeft: 15,
        paddingVertical: 5,
        margin: 5,
        color: "white",
        justifyContent: 'center'
    },
    close: {
        paddingLeft: 10,
        paddingRight:5,
        justifyContent:'center'
    },
    imageDetailU:{
        height: 40,
        width: 40,

        marginStart:-150,




    },
    imageDetailE:{
        height: 35,
        width: 35,
        marginStart:-125,



    },
    button:{
        padding: 20,


    },
    image:{
        height: 150,
        width: 150,
        transform:[
            {translateY:-75}
        ],
        borderRadius:100,
    },
    mainContainer: {
        height: "100%"
    },
    editIcon: {
        borderRadius: 50,
        padding: 5,
        backgroundColor: "#EBEBEA",
        transform: [
            {translateY: -125},
            {translateX: 60}
        ]
    }

})

export default ProfileScreen;