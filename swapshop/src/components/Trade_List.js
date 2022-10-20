import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../screens/MainScreen";
import { user_accounts_item_list } from "../screens/MainScreen";
import { Trade_item_list } from "../classes/Item_List";

let global_sold;
let global_available;
let global_id;

function initialiseAccount(item) {
    let tempUser = new User_Account();
    tempUser.setEmail(item["email"])
    .setFisrtName(item["fname"])
    .setLastName(item["lname"])
    .setID(item["id"])
    .setUsername(item["username"])
    .setInterests(item["tags"])
    .setPhotot(item['photo']);
    return tempUser; 
}

function initialiseTradeItem(item, index) {
    let Owner = user_accounts_item_list.findByID(item["owner_id"]);

    let trade_Item = new Trade_Item(item, navigation);
    item["tags"].forEach((json_tag, index) => {
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

function initialise(setLoaded) {

    let promises = [];

    if (global_available) {
        trade_items_list = new Trade_item_list(false);
        promises.push(trade_items_list.fetchItems());
        
    }
    
    if (global_sold) {
        sold_trade_list_items = new Trade_item_list(true);
        promises.push(trade_items_list.fetchItems());
        sold_trade_items_list.fetchImages();
        sold_trade_items_list.forEach((item) => {
            if (global_id == null || item.getOwner().getID() == id)
            tempItems.push(item.createItemBlock());
        })
    }
    // let promises = [];
    // trade_items_list.json_items = false;
    // trade_items_list.items = []
    // user_accounts_item_list.json_items = false;
    // user_accounts_item_list.items = [];

    

    Promise.all(promises).then(async () => {

        if (global_available) {
            trade_items_list.fetchImages();
            
            trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item);   
            });

            trade_items_list.forEach((item) => {
                if (global_id == null || item.getOwner().getID() == id) {
                    tempItems.push(item.createItemBlock());
                }
            })
        }
        tags_list.loadItems((item) => {
            return new Tag(item);
        })

        

        sold_trade_list_items.loadItems((item) => {
            return initialiseTradeItem(item);
        })

        await trade_items_list.fetchImages();
        setLoaded(true);
    });
}

function LoadBlocks(searchTerm) {
    trade_items_list.searchItems(searchTerm);
    return loadSorted(trade_items_list.filteredResults);
}

const Trade_List = ({sold, available, searchTerm, tags, id = null}) => {

    global_sold = sold;
    global_available = available;
    global_id = id;

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]);

    useEffect(() => {
        let tempItems = [];

        if (available) {
            
        }

        if (sold) {
            
        }

        initialise(setLoaded);

    }, [isFocused]);

    if (displayItems != []) {
        return (
            <ScrollView style={styles.center}>{displayItems}</ScrollView>
        )
    } else {
        return null;
    }
    
}

export default Trade_List;