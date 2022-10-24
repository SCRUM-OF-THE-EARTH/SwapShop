import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../screens/MainScreen";
import { user_accounts_item_list } from "../screens/MainScreen";
import { Trade_item_list } from "../classes/Item_List";
import { Tag } from "../classes/Tag.js";
import { Trade_Item } from '../classes/Trade_Item';
import { ItemBlock } from '../components/ItemBlock';

function initialiseTradeItem(item, navigation) {
    let Owner = user_accounts_item_list.findByID(item["owner_id"]);

    let trade_Item = new Trade_Item(item, navigation);
    console.log("item tags:", trade_Item.tags);
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

function initialise(setDisplayItems, available, sold, id, search, navigation) {

    let promises = [];

    if (available) {
        trade_items_list.searchTerm = search;
        promises.push(trade_items_list.fetchItems());
    }
    
    if (sold) {
        sold_trade_items_list.searchTerm = search;
        promises.push(sold_trade_items_list.fetchItems());
    }

    Promise.all(promises).then(async () => {
        let imagePromises = [];
        if (available) {
            imagePromises.push(trade_items_list.fetchImages());
            
        }
        if (sold) {
            imagePromises.push(sold_trade_items_list.fetchImages());
        }
        Promise.all(imagePromises).then(() => {
            loadItems(setDisplayItems, available, sold, id, navigation);
        })
        
    });
}

async function loadItems(setDisplayItems, available, sold, id, navigation) {
    let tempItems = [];

    console.log("fetched ITems: ", trade_items_list);
        if (available) {
            
            trade_items_list.items = [];
            trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item, navigation);   
            });

            trade_items_list.getItems().forEach((item) => {
                if (id == null || item.getOwner().getID() == id) {
                    tempItems.push(<ItemBlock item={item}/>);
                }
            })
        }

        if (sold) {
            sold_trade_items_list.items = [];
            sold_trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item, navigation);
            });
            

            sold_trade_items_list.getItems().forEach((item) => {
                if (id == null || item.getOwner().getID() == id) {
                    tempItems.push(<ItemBlock item={item}/>);
                }
            })
        }

        setDisplayItems(tempItems);
} 

const Trade_List = ({sold, available, searchTerm, tags, id, sortIndex, navigation}) => {

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [ListIDs, setListID] = useState(id);

    useEffect(() => {
        initialise(setDisplayItems, available, sold, id, searchTerm, navigation);
        setLoaded(true);
    }, [isFocused]);

    useEffect(() => {

        if (!loaded) {
            return;
        }
        
        console.log("I sense a change");
        let tempItems = [];
        if (displayItems.length > 0 && available) {
            trade_items_list.searchTerm = searchTerm;
            trade_items_list.index = sortIndex;
            let filtered = trade_items_list.filterByTags(tags);
            filtered.forEach(item => {
                if (id == null || id == item.getOwner().getID()){
                    tempItems.push(<ItemBlock item={item}/>);
                }
                
            })
        };

        console.log("temp ITems are:", tempItems);
        setDisplayItems(tempItems);
    }, [searchTerm, tags, sortIndex, loaded])

    return (
        <ScrollView style={styles.center}>{displayItems}</ScrollView>
    )
    
}

const styles = StyleSheet.create({
    center: {
        width:'100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        marginTop: 0,
        marginBottom: 60,
        zIndex: -5,
        paddingHorizontal: 10
        // height: '40%'
    }
})

export default Trade_List;