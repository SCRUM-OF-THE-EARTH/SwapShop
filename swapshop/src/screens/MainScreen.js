import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Item_List } from '../classes/Item_List';
import { Trade_Item } from '../classes/Trade_Item';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-screens';
import { useIsFocused } from "@react-navigation/native";
import { User_Account } from '../classes/User_Account';
import { set } from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';

export const trade_items_list = new Item_List("fetch-trade-items");
export const user_accounts_item_list = new Item_List("fetch-user-accounts");
let displayItems = [];

// this is the main page
// this is the page the user is taken to after logging in
// the search bar and displayed items are handled here

const MainScreen = ({navigation}) =>{
    const isFocused = useIsFocused(); // check if the main screen is active on screen
    const [displayItems, setDisplayItems] = useState(''); // the list of trade item's GUI components
    
    // declare and initialise state variables for the sorting drop down menu
    const [sortMenuOpen, setSortMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [sortValue, setSortValue] = useState(null);
    const [sortItems, setSortItems] = useState([ // set the items in the sorting drop down menu
        {label: "Latest post", value: 0},
        {label: "Price: High to Low", value: 1},
        {label: "Price: Low to High", value: 2},
        {label: "Name: A to Z", value: 3},
        {label: "Name: Z to A", value: 4},
    ]); 

    const [tagMenuOpen, setTagMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [tagValues, setTagValues] = useState([]);
    const [tags, setTags] = useState([]);


    // this function is run when a tracked value is changed
    // specifivally it is used to fetch and reload the list 
    // when the page is loaded
    useEffect(() => {
        if (!user_accounts_item_list.loaded){
            user_accounts_item_list.loadItems((item) => {
                let tempUser = new User_Account();
                tempUser.setEmail(item["email"])
                .setFisrtName(item["fname"])
                .setLastName(item["lname"])
                .setID(item["id"])
                .setUsername(item["username"]);
                return tempUser;
            });
        }

        if (!trade_items_list.loaded){
            console.log("making use of useEffect")
            trade_items_list.loadItems((item) => {
                let Owner = user_accounts_item_list.findByID(item["owner_id"]);
                console.log("the found owner is: ", Owner, item)
                let trade_Item = new Trade_Item(item);
                if (Owner != false) {
                    trade_Item.setOwner(Owner);
                }
                return trade_Item;
            });
        }
    }, [])

    // this is used to refresh the list of items on the main screen when the
    // changes between this screen adn another screen or vice versa
    useEffect(() => {
        setDisplayItems('')
        setDisplayItems(LoadBlocks(''));
    }, [isFocused])

    // this is called when the sorting menu's open status is changed
    // if the sorting menu has been opened then it makes sure that the other menus on the page
    // are closed to prevent overlap
    useEffect(() => {
        if (sortMenuOpen == true) {
            setTagMenuOpen(false);
        }
    }, [sortMenuOpen]);

    // this is called when the tag menu's open status is changed
    // if the tags menu has been opened then it makes sure that the other menus on the page
    // are closed to prevent overlap
    useEffect(() => {
        if (tagMenuOpen == true) {
            setSortMenuOpen(false);
        }
    }, [tagMenuOpen]);
    // this is the main page GUI component
    let screen = (<View style={styles.container}>
        <View style={styles.search_Bar}>
            <TextInput 
                style={styles.TextInput} 
                placeholderTextColor="#3CB371" 
                placeholder="search" 
                onChangeText={(searchTerm) => setDisplayItems(LoadBlocks(searchTerm))}
            />
            <DropDownPicker
                open={sortMenuOpen}
                value={sortValue}
                items={sortItems}
                setOpen={setSortMenuOpen}
                setValue={setSortValue}
                setItems={setSortItems}
            />

            <DropDownPicker
                open={tagMenuOpen}
                multiple={true}
                min={0}
                max={5}
                value={tagValues}
                items={tags}
                setOpen={setTagMenuOpen}
                setValue={setTagValues}
                setItems={setTags}
            />
        </View>
        <ScrollView style={styles.center}>{displayItems}</ScrollView>
        <View style={styles.addItemBtn}>
            <Button color="#2E8B57" title='post a new item' onPress={() => navigation.navigate('addItemScreen')}/>
        </View>
        </View>);

    return screen;
}

// th LoadBlocks function is used to filter thr list of items by the search term and load them into the GUI componen
// it takes in a search term (string)
// and sets the value of displayItems
// and returns the list of filtered rendered GUI items
function LoadBlocks(searchTerm) {
    console.log(searchTerm);
    let Items = trade_items_list.searchItems(searchTerm);
    let tempArray = [];
    Items.forEach((item) => {
        tempArray.push(item.createItemBlock());
    });
    console.log(tempArray);
    return tempArray;
}


// the styles of the home page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    center: {
        width:'90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        marginVertical:10
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
        color:"gray",
        textAlign:'center',
        alignSelf:'center',
        backgroundColor:"#F5F5F5",
        borderRadius:50,
        width:"90%",
      },
});

export default MainScreen;
