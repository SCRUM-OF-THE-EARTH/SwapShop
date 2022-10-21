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

export const trade_items_list = new Trade_item_list();
export const user_accounts_item_list = new Item_List("fetch-user-accounts");
export const tags_list = new Tag_list();

// this is the main page
// this is the page the user is taken to after logging in
// the search bar and displayed items are handled here

const MainScreen = ({navigation}) =>{
    const isFocused = useIsFocused(); // check if the main screen is active on screen
    const [displayItems, setDisplayItems] = useState(''); // the list of trade item's GUI components
    const [loaded, setLoaded] = useState(false);
    
    const [tagMenuOpen, setTagMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [tagValues, setTagValues] = useState([]);
    const [tags, setTags] = useState([]);
    const theme = useContext(themeContext);

    // this function is run when a tracked value is changed
    // specifivally it is used to fetch and reload the list 
    // when the page is loaded
    useEffect(async () => {
        let promises = [];
        trade_items_list.json_items = false;
        trade_items_list.items = []
        user_accounts_item_list.json_items = false;
        user_accounts_item_list.items = [];
        tags_list.json_items = false;
        tags_list.items = [];

        promises.push(trade_items_list.fetchItems());
        promises.push(user_accounts_item_list.fetchItems())
        promises.push(tags_list.fetchItems());

        Promise.all(promises).then(async () => {
            user_accounts_item_list.loadItems((item) => {
                let tempUser = new User_Account();
                tempUser.setEmail(item["email"])
                .setFisrtName(item["fname"])
                .setLastName(item["lname"])
                .setID(item["id"])
                .setUsername(item["username"])
                .setInterests(item["tags"]);
                return tempUser;
            });

            tags_list.loadItems((item) => {
                let tag = new Tag(item);
                return tag;
            })

            setTags(tags_list.getTags());

            trade_items_list.loadItems((item) => {
                let Owner = user_accounts_item_list.findByID(item["owner_id"]);

                let trade_Item = new Trade_Item(item, navigation);
                item["tags"].forEach((json_tag) => {
                    let tempTag = new Tag(json_tag);
                    if (tempTag.exchange == 1) {
                        trade_Item.addExchangeTag(tempTag);
                    } else {
                        trade_Item.addTag(tempTag);
                    }
                       
                })

                if (Owner != false) {
                    trade_Item.setOwner(Owner);
                }
                return trade_Item;
            });

            await trade_items_list.fetchImages();
            setLoaded(true);
        });
    }, []);

    // this is used to refresh the list of items on the main screen when the
    // changes between this screen adn another screen or vice versa
    useEffect(() => {
        setDisplayItems('')
        setDisplayItems(LoadBlocks(''));
    }, [isFocused, loaded])


    let screen = (<View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.search_Bar, { backgroundColor: theme.mainItem }]}>
            <View style={{flexDirection: 'row'}}>
                <TextInput 
                    style={styles.TextInput} 
                    placeholderTextColor="#3CB371" 
                    placeholder="search" 
                    onChangeText={(searchTerm) => setDisplayItems(LoadBlocks(searchTerm))}
                />
                <View style={styles.sortMenu}>
                    <SortBar
                        data={trade_items_list}
                        setItemsFunc={setDisplayItems}
                        load={loadSorted}
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
                onChangeValue={(value) => setDisplayItems(filterByTag(value))}
            />
        </View>

        <ScrollView style={[styles.center, {backgroundColor: theme.background}]}>{loaded ? displayItems : null}</ScrollView>
        <Tab style={{ position: 'absolute', top: '50', backgroundColor: theme.background }} nav={navigation} activeTab="home"/>
        </View>);
    
        return screen;
    
    
}

// th LoadBlocks function is used to filter thr list of items by the search term and load them into the GUI componen
// it takes in a search term (string)
// and sets the value of displayItems
// and returns the list of filtered rendered GUI items
function LoadBlocks(searchTerm) {
    trade_items_list.searchItems(searchTerm);
    return loadSorted(trade_items_list.filteredResults);
}

function loadSorted(items) {
    let tempArray = [];
    items.forEach((item) => {
        tempArray.push(item.createItemBlock());
    });

    return tempArray;
}

function filterByTag(tags) {

    trade_items_list.filterByTags(tags);
    return loadSorted(trade_items_list.filteredResults);
}

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
        shadowColor: '#3CB371',
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
