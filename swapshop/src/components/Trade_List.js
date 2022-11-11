import { StyleSheet, ScrollView, Text} from 'react-native';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../helpers/init"
import { user_accounts_item_list } from "../helpers/init";
import { Tag } from "../classes/Tag.js";
import { Trade_Item } from '../classes/Trade_Item';
import { ItemBlock } from '../components/ItemBlock';

// the trade item list is a list of item blocks based on the trade items used in the app

//initialtradeItem is a function used as a call back for the item list to load a json object into a trade object
//
function initialiseTradeItem(item, navigation) {
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

// iniitialise is used to select the specified items from the database  based f the parameters set 
// by the component
function initialise(available, sold, id, search, navigation) {

    let promises = [];

    if (available) { // selects the show all the available items
        trade_items_list.searchTerm = search;
        promises.push(trade_items_list.fetchItems());
    }
    
    if (sold) { // selects to show all the sold items
        sold_trade_items_list.searchTerm = search;
        promises.push(sold_trade_items_list.fetchItems());
    }


    return Promise.all(promises).then(async () => {
        loadItems(available, sold, id, navigation);
    });
}

// loadItems is used to load a itme from an object into a GUI component
function loadItems(available, sold, id, navigation) {
    let tempItems = [];

        if (available) { // loading the available items
            
            trade_items_list.items = [];
            trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item, navigation);   
            });

            trade_items_list.getItems().forEach((item) => {
                if (id == null || item.getOwner().getID() == id) {
                    tempItems.push(<ItemBlock key={`${item.id}-itemBlock`} item={item} navigation={navigation}/>);
                }
            })
        }

        if (sold) { // loading the sold items 
            sold_trade_items_list.items = [];
            sold_trade_items_list.loadItems((item) => {
                return initialiseTradeItem(item, navigation);
            });
            

            sold_trade_items_list.getItems().forEach((item) => {
                if (id == null || item.getOwner().getID() == id) {
                    tempItems.push(<ItemBlock key={`${item.id}-itemBlock`} item={item} navigation={navigation}/>);
                }
            })
        }
} 

const Trade_List = ({sold, available, searchTerm, tags, id, sortIndex, navigation, scrolling}) => {

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]); // Items t be displayed in the scroll view
    const [loaded, setLoaded] = useState(false);    // the loaded state of the app


    // sort and filter is used to sort the data bny user selected sort
    // and filter the data by tags nd search term
    const sortAndFilter = () => {
            let tempItems = [];
            if (available) { // if selected to show available items then sort them 
                trade_items_list.searchTerm = searchTerm;
                trade_items_list.index = sortIndex;
                let filtered = trade_items_list.filterByTags(tags);
                if (id != null) {
                    filtered = trade_items_list.filterByOwnerId(id);
                }
                filtered.forEach(item => {
                    tempItems.push(<ItemBlock key={`${item.id}-itemBlock`} item={item} navigation={navigation}/>);
                })
            };
            if (sold) { //  id selected to show itmes that have been sold
                sold_trade_items_list.searchTerm = searchTerm;
                sold_trade_items_list.index = sortIndex;
                let filtered = sold_trade_items_list.filterByTags(tags);
                if (id != null) {
                    filtered = sold_trade_items_list.filterByOwnerId(id);
                }
                filtered.forEach(item => {
                    tempItems.push(<ItemBlock key={`${item.id}-itemBlock`} item={item} navigation={navigation}/>);
                })
            };
            setDisplayItems(tempItems); 
    }

    useEffect(() => { // loading the items initially when the item is in focus
        trade_items_list.index = null;
        sold_trade_items_list.index = null;
        initialise(available, sold, id, searchTerm, navigation).then(() => {
            setLoaded(true);
            sortAndFilter();
        })
        
    }, [isFocused]);

    useEffect(() => { // relaoding the items when a parmarter such as the search term is changed

        if (loaded) {
            sortAndFilter()  
        }
    }, [searchTerm, tags, sortIndex, loaded])

    if (displayItems.length >0 ) { // displaying the trade item blocks if there are any to show
        return (<ScrollView scrollEnabled={scrolling} nestedScrollEnabled={true} style={styles.center}>{displayItems}</ScrollView>);
    }
    
    return (<Text style={styles.nullContainer}>(Nothing to show)</Text>); // display a message if there are none to show
    
}

// styles for the Trade_list
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
    },
    nullContainer: {
        textAlign: 'center',
        flex:1, 
        textAlignVertical:'center',
        color: 'gray'
    }
})

export default Trade_List;