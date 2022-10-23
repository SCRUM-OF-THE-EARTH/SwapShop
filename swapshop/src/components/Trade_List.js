import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../screens/MainScreen";
import { user_accounts_item_list } from "../screens/MainScreen";
import { Trade_item_list } from "../classes/Item_List";
import { Tag } from "../classes/Tag.js";
import { Trade_Item } from '../classes/Trade_Item';
import { ItemBlock } from '../components/ItemBlock';

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

    if (global_available) {
        trade_items_list.searchTerm = global_search;
        promises.push(trade_items_list.fetchItems());
    }
    
    if (global_sold) {
        sold_trade_items_list.searchTerm = global_search;
        promises.push(sold_trade_items_list.fetchItems());
    }

    Promise.all(promises).then(async () => {
        let imagePromises = [];
        if (global_available) {
            imagePromises.push(trade_items_list.fetchImages());
            
        }
        if (global_sold) {
            imagePromises.push(sold_trade_items_list.fetchImages());
        }
        Promise.all(imagePromises).then(() => {
            loadItems(setDisplayItems);
        })
        
    });
}

async function loadItems(setDisplayItems) {
    let tempItems = [];

    console.log("fetched ITems: ", trade_items_list);
        if (global_available) {
            
            trade_items_list.items = [];
            trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);   
            });

            trade_items_list.getItems().forEach((item) => {
                if (global_id == null || item.getOwner().getID() == global_id) {
                    tempItems.push(ItemBlock(item));
                }
            })
        }

        if (global_sold) {
            sold_trade_items_list.items = [];
            sold_trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);
            });
            

            sold_trade_items_list.getItems().forEach((item) => {
                if (global_id == null || item.getOwner().getID() == global_id) {
                    tempItems.push(ItemBlock(item));
                }
            })
        }

        setDisplayItems(tempItems);
} 

const Trade_List = ({sold, available, searchTerm, tags, id, sortIndex, navigation}) => {

    global_sold = sold ? true : false;
    global_available = available ? true : false;
    global_id = id ? id : null;
    gNavigation = navigation;

    console.log("Global_sold:", global_sold);
    console.log("Global available:", global_available);
    console.log("Global Id:", global_id);
    console.log("id is: ", id);
    console.log("Global searchTerm", global_search);
    console.log("Global tags", global_tags);

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        initialise(setDisplayItems);
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
            console.log("filtered results",trade_items_list.filterByTags(tags));
            console.log("tags passed to Trade list", tags, tags.length)
            let filtered = trade_items_list.filterByTags(tags);
            filtered.forEach(item => {
                if (id == null || id == item.getOwner().getID()){
                    tempItems.push(ItemBlock(item));
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
    },
    container: {
        borderRadius: 10,
        width: "100%",
        display: 'flex',
        padding: 5,
        backgroundColor: "#F5F5F5",
        marginVertical: 5,   
    },
    header: {
        fontSize: 25,
        fontWeight: '300',
        color: "#3CB371",
        paddingRight: 20,
        paddingLeft: 20,
    },
    innerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        
    },
    wrappedText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight: 10
    },
    green: {
        color: "#3CB371",
    },
    exchange_tag_container: {
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
    exchange_tag: {
        margin: 2,
        borderWidth: 1,
        borderColor: "#2E8B57",
        color: "#2E8B57",
        borderRadius: 10,
        paddingHorizontal: 10
    }
})

export default Trade_List;