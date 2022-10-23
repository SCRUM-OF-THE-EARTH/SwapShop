import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { Item_List, Tag_list, Trade_item_list  } from '../classes/Item_List';
import { Trade_Item } from '../classes/Trade_Item';
//import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { User_Account } from '../classes/User_Account';
import { Tag } from '../classes/Tag';
import SortBar from '../components/SortBar';
import DropDownPicker from 'react-native-dropdown-picker';
import Tab from '../components/Tab';
import themeContext from '../components/themeContext';
import Trade_List from '../components/Trade_List';

export const trade_items_list = new Trade_item_list(false);
export const sold_trade_items_list = new Trade_item_list(true);
export const user_accounts_item_list = new Item_List('fetch-user-accounts');
export const tags_list = new Tag_list();

// this is the main page
// this is the page the user is taken to after logging in
// the search bar and displayed items are handled here


async function initialise(setLoaded, setTags) {
    user_accounts_item_list.json_items = [];
    await user_accounts_item_list.fetchItems();
    user_accounts_item_list.loadItems(item => {
        return initialiseAccount(item);
    })

    tags_list.json_item = [];
    await tags_list.fetchItems();
    tags_list.loadItems((item) => {
        return new Tag(item);
    })
    console.log(tags_list);

        console.log("tags: ", tags_list);
    setLoaded(true);
    setTags(tags_list.getTags())
}

function initialiseAccount(item) {
    let tempUser = new User_Account();
    console.log("setting user account: ", item)
    tempUser.setEmail(item["email"])
    .setFisrtName(item["fname"])
    .setLastName(item["lname"])
    .setID(item["id"])
    .setUsername(item["username"])
    .setInterests(item["tags"])
    .setPhoto(item["photo"]);
    return tempUser; 
}



const MainScreen = ({navigation}) =>{
    const isFocused = useIsFocused(); // check if the main screen is active on screen
    const [loaded, setLoaded] = useState(false);
    
    const [tagMenuOpen, setTagMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [tagValues, setTagValues] = useState([]);
    const [tags, setTags] = useState([]);
    const [sortIndex, setSortIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useContext(themeContext);

    // this function is run when a tracked value is changed
    // specifivally it is used to fetch and reload the list 
    // when the page is loaded
    useEffect(() => {
        initialise(setLoaded, setTags);
    }, [isFocused]);

    // this is used to refresh the list of items on the main screen when the
    // changes between this screen adn another screen or vice versa

    let screen = (<View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.search_Bar}>
            <View style={{flexDirection: 'row'}}>
                <TextInput 
                    style={styles.TextInput} 
                    placeholderTextColor="#3CB371" 
                    placeholder="search" 
                    onChangeText={(value => setSearchTerm(value))}
                />
                <View style={styles.sortMenu}>
                    <SortBar
                        data={trade_items_list}
                        setIndex={setSortIndex}
                     />
                </View>
            </View>

            <DropDownPicker
                style={styles.tagMenu}
                open={tagMenuOpen}
                searchable={true}
                placeholder="filter by tag"
                multiple={true}
                min={0}
                max={5}
                mode="BADGE"
                value={tagValues}
                items={tags}
                setOpen={setTagMenuOpen}
                setValue={setTagValues}
                setItems={setTags}
            />
        </View>

        {loaded ? 
            <Trade_List
            available={true}
            sold={false}
            searchTerm={searchTerm}
            sortIndex={sortIndex}
            navigation={navigation}
            tags={tagValues}
        /> : <ScrollView style={styles.center}></ScrollView>}
        

        <Tab style={{position: 'absolute', top: '50'}} nav={navigation} activeTab="home"/>
        </View>);
    
        return screen;
    
    
}

// th LoadBlocks function is used to filter thr list of items by the search term and load them into the GUI componen
// it takes in a search term (string)
// and sets the value of displayItems
// and returns the list of filtered rendered GUI items


// function loadSorted(items) {
//     let tempArray = [];
//     items.forEach((item) => {
//         tempArray.push(item.createItemBlock());
//     });

//     return tempArray;
// }

// function filterByTag(tags) {

//     trade_items_list.filterByTags(tags);
//     return loadSorted(trade_items_list.filteredResults);
// }

// the styles of the home page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: 'white',
    },
    center: {
        width:'90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        marginTop:10,
        marginTop: 0,
        marginBottom: 60,
        zIndex: -5,
        // height: '40%'
    },
    addItemBtn:{
        width: "70%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        backgroundColor:"#2E8B57",
        margin: 2,
      },
      search_Bar: {
        width: '100%',
        padding: 20,
        paddingTop: 50,
        backgroundColor:"#3CB371",
        borderRadius: 5,
      },

      TextInput:{
        padding: 5,
        paddingHorizontal:20,
        color:"gray",
        alignSelf:'center',
        backgroundColor:"#F5F5F5",
        borderRadius:50,
        width: '65%',
        marginHorizontal: 10,
      },
      sortMenu: {
        borderColor: 'red',
        width: "30%",
        zIndex: 10
    },
    tagMenu: {
        zIndex: 9,
        marginVertical: 5
    }
});

export default MainScreen;
