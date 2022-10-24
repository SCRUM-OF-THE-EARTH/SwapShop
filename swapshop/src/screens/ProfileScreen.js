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
import Trade_List from '../components/Trade_List.js';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
DropDownPicker.setListMode("SCROLLVIEW");

const ProfileScreen = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loaded, setLoaded] = useState(false);
    const [tagMenuOpen, setTagMenuOpen] = useState(false);
    const [tagValues, setTagValues] = useState(null);
    const [tags, setTags] = useState([]);
    const [interests, setInterests] = useState([]);
    const [activeTags, setActiveTags] = useState([]);
    const [image, setImage] = useState(null);
    const [id, setID] = useState(null);

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
        console.log("Interest:", tempInterests);
        setTags(tempTags);
        setInterests(tempInterests);
        setActiveTags(tempInterests);
        setID(login_user.getID())
        setLoaded(true);
    }, [isFocused]);

    if (loaded) {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.welcome}>{login_user.getUsername()}</Text>
            <View style={styles.container}>
                <View style={styles.imageContainer} >
                {image && <Image source={{uri:image}} style={styles.image}/>}
                </View>

                <View style = {styles.details}>

                    <View style={styles.data_container}>
                        <Image
                            source={require("../../assets/user.png")}
                            style={styles.imageDetail}
                        />
                        <Text style={styles.data_field}>{login_user.getFullName()}</Text>
                    </View>

                    <View style={styles.data_container}>
                        <Image
                            source={require("../../assets/email.png")}
                            style={styles.imageDetail}
                        />
                        <Text style={styles.data_field}>{login_user.getEmail()}</Text>
                    </View>


                    <Text style={styles.label}>My interests: </Text>

                    <View style={styles.drop}>
                        <DropDownPicker
                            open={tagMenuOpen}
                            searchable={true}
                            multiple={true}
                            min={0}
                            max={5}
                            mode="BADGE"
                            placeholder="add an interest"
                            value={interests}
                            items={tags}
                            setOpen={setTagMenuOpen}
                            setValue={setInterests}
                            setItems={setTags}
                            itemKey="key"
                            // onChangeValue={(value) => {
                            //     setInterests(updateInterest(value, setTagValues, interests, setTags, tags));
                            //     setActiveTags(loadInterests(interests, setInterests, loadInterests, setActiveTags, tags, setTags));
                            // }}
                            onChangeValue={(value) => {
                                if (activeTags.length > value.length) {
                                    let difference = activeTags.filter(x => !value.includes(x));
                                    console.log("difference: ", difference);
                                    removeInterest(difference[0]).then(() => {
                                        setActiveTags(value);
                                    })
                                } else {
                                    let difference = value.filter(x => !activeTags.includes(x));
                                    console.log("difference:", difference);
                                    addInterest(difference[0]).then(() => {
                                        setActiveTags(value);
                                    })
                                }
                            }}
                            containerStyle={styles.interests}
                            style={styles.interests}
                        />
                    </View>
                </View>

                {/* <View style = {styles.tags} >{activeTags}</View> */}

                <Text style={styles.label}>My Items:</Text>

            { (id != null) ?
                <Trade_List
                    available={true}
                    sold={true}
                    id={id}   
                    navigation={navigation}
                    edit={true}
                /> : null }


                
            </View>
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

async function addInterest(tag) {
    let tagId =  tag.id;
    let userId = login_user.getID();
    await communicator.makeRequestByCommand("add-interest", [userId, tagId]);
    let interests = login_user.getInterests();
    interests.push(tagId);
}

async function removeInterest(tag) {
    let tagId = tag.id;
    let userId = login_user.getID();
    await communicator.makeRequestByCommand('remove-interest', [userId, tagId]);
    let interests = login_user.getInterests();

    let newInterests = interests.filter(x => x != tagId)
    console.log("setting filtered interests:", newInterests);
    login_user.setInterests(newInterests);
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



function loadInterests(interest, setInterests, loadInterests, setActiveTags, tags, setTags) {
    let tempInterestComps = [];
    interest.forEach(t => {
        tempInterestComps.push(
            <View style={styles.tag_container} key={t.id}><Text>{t.name}</Text><TouchableOpacity  style={styles.close} onPress={() => {
                setInterests(removeInterest(t, interest, tags, setTags));
                setActiveTags(loadInterests(interest, setInterests, loadInterests, setActiveTags, tags, setTags));
            }}><Icon size={20} name="close-circle-outline" /></TouchableOpacity></View>
        );
    })

    return tempInterestComps;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: windowHeight - 130,
        // paddingBottom: 
    },
    interests: {
        zIndex: 9,
        marginVertical: 10
    },
    imageContainer: {
        alignItems: 'center',
        // flex: 1,
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
        // paddingTop: 40,
        // paddingBottom: 100,
        // marginBottom: 80,
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
        // flex: 1,
        // justifyContent: 'center',
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
    imageDetail:{
        height: 40,
        width: 40,
        justifyContent: 'center'
    },
    button:{

        // marginTop: 20,
        // marginBottom: -50,
        // marginHorizontal:100,
        // marginLeft:120,
        padding: 20,


    },
    image:{
        height: 150,
        width: 150,
        // alignItems: "center",
        transform:[
            {translateY:-75} 
        ],
        // //overlayColor: "gray",
        borderRadius:100,
        // borderColor:"white",
    },
    mainContainer: {
        backgroundColor: "#3CB371",
        height: "100%"
    }


})

export default ProfileScreen;