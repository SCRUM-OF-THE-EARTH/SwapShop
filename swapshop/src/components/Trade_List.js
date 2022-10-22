import { StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../screens/MainScreen";
import { user_accounts_item_list } from "../screens/MainScreen";
import { Trade_item_list } from "../classes/Item_List";
import { Tag } from "../classes/Tag.js";
import { ScrollView } from "react-native";
import { Trade_Item } from '../classes/Trade_Item';

let global_sold;
let global_available;
let global_id;
let global_search ="";
let global_tags= [];
let gNavigation;

function initialiseTradeItem(item) {
    let Owner = user_accounts_item_list.findByID(item["owner_id"]);

    let trade_Item = new Trade_Item(item, gNavigation);
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
}

function initialise(setDisplayItems) {

    let promises = [];
    let tempItems = [];

    if (global_available) {
        trade_items_list.searchTerm = global_search;
        promises.push(trade_items_list.fetchItems());
    }
    
    if (global_sold) {
        sold_trade_items_list.searchTerm = global_search;
        promises.push(trade_items_list.fetchItems());
    }

    Promise.all(promises).then(async () => {

        console.log("fetched ITems: ", trade_items_list);
        if (global_available) {
            
            trade_items_list.items = [];
            trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);   
            });

            trade_items_list.fetchImages();

            trade_items_list.getItems().forEach((item) => {
                if (global_id == null || item.getOwner().getID() == global_id) {
                    tempItems.push(item.createItemBlock());
                }
            })
        }

        if (global_sold) {
            sold_trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);
            });
            sold_trade_items_list.fetchImages();

            sold_trade_items_list.forEach((item) => {
                if (global_id == null || item.getOwner().getID() == global_id) {
                    tempItems.push(item.createItemBlock());
                }
            })
        }

        setDisplayItems(tempItems);
    });
}


const Trade_List = ({sold, available, searchTerm, tags, id, loaded, sortIndex, navigation}) => {

    global_sold = sold ? true : false;
    global_available = available ? true : false;
    global_id = id ? id : null;
    global_search = searchTerm
    global_tags = tags ? tags : [];
    gNavigation = navigation

    console.log("Global_sold:", global_sold);
    console.log("Global available:", global_available);
    console.log("Global Id:", global_id);
    console.log("Global searchTerm", global_search);
    console.log("Global tags", global_tags);

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]);

    useEffect(() => {
        setDisplayItems([]);
        initialise(setDisplayItems, tags);
    }, []);

    useEffect(() => {
        console.log("I sense a change")
    }, [searchTerm, tags, sortIndex])

    return (
        <ScrollView style={styles.center}>{displayItems}</ScrollView>
    )
    
}

const styles = StyleSheet.create({
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
})

export default Trade_List;