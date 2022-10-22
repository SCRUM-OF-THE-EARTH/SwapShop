import { StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../screens/MainScreen";
import { user_accounts_item_list } from "../screens/MainScreen";
import { Trade_item_list } from "../classes/Item_List";
import { ScrollView } from "react-native";
import { Trade_Item } from '../classes/Trade_Item';

let global_sold;
let global_available;
let global_id;
let global_search ="";
let global_tags= [];

function initialiseTradeItem(item) {
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
}

function initialise(setDisplayItems) {

    let promises = [];
    let tempItems = [];

    if (global_available) {
        trade_items_list = new Trade_item_list(false);
        trade_items_list.searchTerm = global_search;
        promises.push(trade_items_list.fetchItems());
    }
    
    if (global_sold) {
        sold_trade_list_items = new Trade_item_list(true);
        sold_trade_items_list.searchTerm = global_search;
        promises.push(trade_items_list.fetchItems());
    }

    Promise.all(promises).then(async () => {

        if (global_available) {
            
            trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);   
            });

            trade_items_list.fetchImages();

            trade_items_list.filterByTags(tags)
            trade_items_list.forEach((item) => {
                if (global_id == null || item.getOwner().getID() == id) {
                    tempItems.push(item.createItemBlock());
                }
            })
        }

        if (global_sold) {
            sold_trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);
            });
            sold_trade_items_list.fetchImages();
            sold_trade_items_list.filterByTags(tags);

            sold_trade_items_list.forEach((item) => {
                if (global_id == null || item.getOwner().getID() == id) {
                    tempItems.push(item.createItemBlock());
                }
            })
        }

        setDisplayItems(tempItems);
    });
}


const Trade_List = ({sold = false, available = false, searchTerm = "", tags = [], id = null, loaded = false, sortIndex = 0}) => {

    global_sold = sold;
    global_available = available;
    global_id = id;
    global_search = searchTerm;
    global_tags = tags;

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]);

    useEffect(() => {
        setDisplayItems([]);
        if (loaded) {
            initialise(setDisplayItems, tags);
        }
    
    }, [isFocused, loaded]);

    return (
        <ScrollView style={styles.center}>{displayItems != [] ? displayItems : null}</ScrollView>
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