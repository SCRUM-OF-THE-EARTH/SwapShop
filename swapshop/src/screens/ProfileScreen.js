import {StyleSheet, View, Text, Image,Button} from 'react-native';
import React, { useState, useEffect } from 'react';
import Tab from '../components/Tab.js';
import { login_user } from '../classes/User_Account';
import { useIsFocused } from "@react-navigation/native";
import { tags_list, trade_items_list } from "./MainScreen.js";
import DropDownPicker from 'react-native-dropdown-picker';
import { communicator } from '../classes/Communicator.js';
import { LightSpeedOutLeft, set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loaded, setLoaded] = useState(false);
    const [tagMenuOpen, setTagMenuOpen] = useState(false);
    const [tagValues, setTagValues] = useState(null);
    const [tags, setTags] = useState([]);
    const [interests, setInterests] = useState([]);
    const [activeTags, setActiveTags] = useState([]);
    const [image, setImage] = useState(null);

    const pickImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,

        });
        console.log(result);
        if(!result.cancelled){
            setImage(result.uri);
            communicator.makePostRequestForImage([result], login_user.getID(), 'profile');  
            reloadPhoto(); 
        }
    };

    useEffect(() => {
        let tempTags = tags_list.getTags();
        let tempInterests = [];

        login_user.getInterests().forEach(tag_id => {
            let t = tags_list.findByID(tag_id);
            tempTags.forEach((a, index) => {
                if (a.value.id == tag_id) {
                    tempTags.splice(index, 1);
                    return;
                }
            })
            tempInterests.push(t);
        });

        setImage(login_user.getPhoto());


        setTags(tempTags);
        setInterests(tempInterests);
        setActiveTags(loadInterests(tempInterests, setInterests, loadInterests, setActiveTags, tags, setTags));
        setLoaded(true);
    }, [isFocused]);

    if (loaded) {
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>{login_user.getUsername()}</Text>
                {image && <Image source={{uri:image}} style={styles.image}/>}

                {/*<View style = {styles.add}>*/}
                {/*    <Button style = {styles.add}*/}
                {/*            title="+" onPress={pickImage}*/}
                {/*            color="rgba(0, 0,0, 0)"*/}

                {/*    />*/}


                {/*</View>*/}


                <View style = {styles.button}>
                    <Button
                        title = "edit profile" onPress={pickImage}
                        color = "#299617"

                    />

                </View>






                <View style = {styles.details}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.data_field}>{login_user.getFullName()}</Text>
                    <Text style={styles.data_field}>{login_user.getEmail()}</Text>


                    <Text style={styles.label2}>My interests</Text>
                    <DropDownPicker
                        open={tagMenuOpen}
                        searchable={true}
                        placeholder="add an interest"
                        value={tagValues}
                        items={tags}
                        setOpen={setTagMenuOpen}
                        setValue={setTagValues}
                        setItems={setTags}
                        onChangeValue={(value) => {
                            setInterests(updateInterest(value, setTagValues, interests, setTags, tags));
                            setActiveTags(loadInterests(interests, setInterests, loadInterests, setActiveTags, tags, setTags));
                        }}
                    />
                </View>

                <Image
                    source={require("../../assets/user.png")}
                    style={styles.imageP}
                />

                <Image
                    source={require("../../assets/email.png")}
                    style={styles.imageE}
                />

                <View style = {styles.tags}>{activeTags}</View>




                <Tab nav={navigation} activeTab="profile" />
            </View>
        )
    }

}

async function reloadPhoto() {
    let new_profile = await communicator.makeRequestByCommand('fetch-profile-photo', [login_user.getID()]);
    if (new_profile['photo'] == login_user.getPhoto()) {
        setTimeout(reloadPhoto, 200);   
    } else {
        login_user.setPhoto(new_profile['photo']);
        console.log("new photo set");
        console.log(login_user)
    }
}

function updateInterest(tag, setTagValues, interests, setTags, tags) {

    let tempInterests = interests;
    if (tag == null) {
        return tempInterests;
    }

    let tagId = tag["id"];
    let userId = login_user.getID();

    communicator.makeRequestByCommand("add-interest", [userId, tagId]);

    tags.forEach((t, index) => {
        if (t.value.id == tagId) {
            tags.splice(index, 1);
            return;
        }
    });
    tempInterests.push(tag);
    let updatedUserInterests = [];
    tempInterests.forEach(t => {
        updatedUserInterests.push(t.getID());
    })

    login_user.setInterests(updatedUserInterests);
    setTagValues(null);
    setTags(tags);

    return tempInterests;
}

function removeInterest(tag, interest, tags, setTags) {
    let tagId = tag.getID();
    let userId = login_user.getID();
    let addTag;

    let newInterests = [];

    interest.forEach((i, index) => {
        if (i.getID() == tagId) {
            addTag = i;
            interest.splice(index, 1);
        } else {
            newInterests.push(i.getID());
        }
    });

    communicator.makeRequestByCommand('remove-interest', [userId, tagId]);

    tags.push(addTag.getTagValue());

    setTags(tags);
    login_user.setInterests(newInterests);

    return interest;

}

function loadInterests(interest, setInterests, loadInterests, setActiveTags, tags, setTags) {
    let tempInterestComps = [];
    interest.forEach(t => {
        tempInterestComps.push(
            <View style={styles.tag_container} key={t.getID()}><Text>{t.getName()}</Text><TouchableOpacity  style={styles.close} onPress={() => {
                setInterests(removeInterest(t, interest, tags, setTags));
                setActiveTags(loadInterests(interest, setInterests, loadInterests, setActiveTags, tags, setTags));
            }}><Icon size={20} name="close-circle-outline" /></TouchableOpacity></View>
        );
    })

    return tempInterestComps;
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    details:{
        marginHorizontal: 30,
        marginLeft: 50,
        marginTop: -30,
        marginBottom: 20,
    },
    welcome:{
        paddingTop: 40,
        paddingBottom: 100,
        marginBottom: 80,
        alignItems:"center",
        fontSize: 40,
        backgroundColor: "#299617",
        // borderRadius: ,

        color: 'white',
        fontWeight:"700",
        textAlign:"center",


    },
    tags:{
        marginVertical: 20,
        marginHorizontal: 20,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 175,

    },
    data_field: {
        marginLeft: 5,
        color: "gray",
        fontSize: 15,
        //marginBottom: 100,
        marginTop: 30,

        // fontWeight: '400',
        // textDecorationLine:"underline"


    },
    label: {
        paddingTop: 10,
        fontSize: 16,
        color: 'red',
        marginBottom: 40,
        marginTop: 5,
    },
    tag_container: {
        display: 'flex',
        flexDirection:'row',
        backgroundColor: '#299617',
        //backgroundColor: '#32CD32',
        borderRadius: 20,
        paddingLeft: 15,
        paddingVertical: 5,
        margin: 5,
        color: "white",
        justifyContent: 'center',
        marginTop:-25,
        marginBottom:40,


    },
    close: {
        // padding: 5,
        paddingLeft: 10,
        paddingRight:5,
        justifyContent:'center'
    },
    imageP:{
        height: 40,
        width: 40,
        marginLeft: 10,
        marginTop: -215,
        marginBottom: 430,

    },
    imageE:{
        height: 30,
        width: 30,
        marginLeft: 15,
        marginTop: -410,
        // marginBottom: -65,

    },
    label2:{   //this is the text for "My interests"
        paddingTop: 10,
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
        textAlign:"center",
        marginBottom:10,



    },
    button:{

        marginTop: 20,
        marginBottom: -50,
        marginHorizontal:100,
        marginLeft:120,


    },
    image:{
        height: 150,
        width: 150,
        alignItems: "center",
        marginTop: -150,
        marginLeft: 110,
        marginBottom: -10,
        //overlayColor: "gray",
        borderRadius:100,
        borderColor:"white",
        // flex: 1,
    },
    add:{

        marginHorizontal:140,
        marginTop:-30,
        //borderRadius:0,
        marginLeft: 160,
        // backgroundColor:'transparent'

    }



})

export default ProfileScreen;