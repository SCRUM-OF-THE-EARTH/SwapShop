import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Tab from '../components/Tab.js';
import { login_user } from '../classes/User_Account';
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
        
        setTags(tempTags);
        setActiveTags(loadInterests(tempInterests, setInterests, loadInterests, setActiveTags, tags, setTags));
        setLoaded(true);
    }, [isFocused]);

    if (loaded) {
        return (
            <View style={styles.container}>

                <Text>{login_user.getFullName()}</Text>
                <Text>{login_user.getUsername()}</Text>
                <Text>{login_user.getEmail()}</Text>

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

                <View>{activeTags}</View>

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

    setTagValues(null);
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

    return interest;
    
}

function loadInterests(interest, setInterests, loadInterests, setActiveTags, tags, setTags) {
    let tempInterestComps = [];
    interest.forEach(t => {
        tempInterestComps.push(
            <View key={t.getID()}><Text>{t.getName()}</Text><TouchableOpacity onPress={() => {
                setInterests(removeInterest(t, interest, tags, setTags));
                setActiveTags(loadInterests(interest, setInterests, loadInterests, setActiveTags, tags, setTags));
            }}><Icon name="close-circle-outline" /></TouchableOpacity></View>
        );
    })

    return tempInterestComps;
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})

export default ProfileScreen;