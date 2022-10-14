import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Tab from '../components/Tab.js';
import { login_user } from './SignInScreen.js';
import { useIsFocused } from "@react-navigation/native";
import { tags_list, trade_items_list } from "./MainScreen.js";
import DropDownPicker from 'react-native-dropdown-picker';
import { communicator } from '../classes/Communicator.js';
import { LightSpeedOutLeft, set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loaded, setLoaded] = useState(false);
    const [tagMenuOpen, setTagMenuOpen] = useState(false);
    const [tagValues, setTagValues] = useState(null);
    const [tags, setTags] = useState([]);
    const [interests, setInterests] = useState([]);
    const [activeTags, setActiveTags] = useState([]);

    useEffect(() => {
        let tempTags = tags_list.getTags();
        let tempInterests = [];

        console.log(login_user.getInterests());
        login_user.getInterests().forEach(tag_id => {
            console.log(tag_id);
            let t = tags_list.findByID(tag_id);
            tempTags.forEach((a, index) => {
                console.log("inactiveTag check:",a);
                console.log(a.value.id);
                if (a.value.id == tag_id) {
                    tempTags.splice(index, 1);
                    return;
                }
            })
            tempInterests.push(t);
            console.log(t);
            if (t != null) {
                console.log(t.getName());
            }
        });
        
        setTags(tempTags);
        setActiveTags(loadInterests(tempInterests, setInterests, loadInterests, setActiveTags, tags, setTags));
        setLoaded(true);
    }, [isFocused]);

    if (loaded) {
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>
                  My profile
                </Text>


                <View style = {styles.details}>
                    <Text style={styles.label}>full names:</Text>
                    <Text style={styles.data_field}>{login_user.getFullName()}</Text>
                    <Text style={styles.label}>username: </Text>
                    <Text style={styles.data_field}>{login_user.getUsername()}</Text>
                    <Text style={styles.label}>email address:</Text>
                    <Text style={styles.data_field}>{login_user.getEmail()}</Text>

                    <Text style={styles.label}>My interest:</Text>
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
                <View style = {styles.tags}>{activeTags}</View>

                <Tab nav={navigation} activeTab="profile" />
            </View>
        )
    }

}

function updateInterest(tag, setTagValues, interests, setTags, tags) {

    let tempInterests = interests;
    if (tag == null) {
        return tempInterests;
    }

    console.log(tag);
    console.log(tags);
    let tagId = tag["id"];
    console.log(tagId);
    let userId = login_user.getID();

    console.log(tempInterests);

    communicator.makeRequestByCommand("add-interest", [userId, tagId]);

    tags.forEach((t, index) => {
        if (t.value.id == tagId) {
            tags.splice(index, 1);
            return;
        }
    });

    console.log("tags post splice: ", tags);

    tempInterests.push(tag);

    console.log(tempInterests);
    setTagValues(null);
    console.log(tags);
    setTags(tags);

    return tempInterests;
}

function removeInterest(tag, interest, tags, setTags) {
    let tagId = tag.getID();
    let userId = login_user.getID();
    let addTag;
    
    interest.forEach((i, index) => {
        if (i.getID() == tagId) {
            addTag = i;
            interest.splice(index, 1);
            return;
        }
    });

    communicator.makeRequestByCommand('remove-interest', [userId, tagId]);

    tags.push(addTag.getTagValue());

    setTags(tags);

    console.log(tag, interest);

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
        marginHorizontal: 90,
    },
    welcome:{
        paddingTop: 40,
        paddingBottom: 10,
        marginBottom: 20,
        alignItems:"center",
        fontSize: 40,
        backgroundColor: "#3CB371",
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
        justifyContent: 'center'

    },
    data_field: {
        marginLeft: 20,
        color: "#3CB371",
        fontSize: 22,
        fontWeight: '400'
    },
    label: {
        paddingTop: 10,
        fontSize: 16,
        color: 'gray'
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
        // padding: 5,
        paddingLeft: 10,
        paddingRight:5,
        justifyContent:'center'
    }

})

export default ProfileScreen;