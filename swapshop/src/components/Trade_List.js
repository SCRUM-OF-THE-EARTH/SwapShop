import { StyleSheet, ScrollView, Text} from 'react-native';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { sold_trade_items_list, trade_items_list } from "../helpers/init"
import { user_accounts_item_list } from "../helpers/init";
import { Tag } from "../classes/Tag.js";
import { Trade_Item } from '../classes/Trade_Item';
import { ItemBlock } from '../components/ItemBlock';

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

function initialise(available, sold, id, search, navigation) {

    let promises = [];

    if (available) {
        trade_items_list.searchTerm = search;
        promises.push(trade_items_list.fetchItems());
    }
    
    if (sold) {
        sold_trade_items_list.searchTerm = search;
        promises.push(sold_trade_items_list.fetchItems());
    }

    return Promise.all(promises).then(async () => {
        loadItems(available, sold, id, navigation);
    });
}

function loadItems(available, sold, id, navigation) {
    let tempItems = [];

        if (available) {
            
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

        if (sold) {
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

const Trade_List = ({sold, available, searchTerm, tags, id, sortIndex, navigation}) => {

    const isFocused = useIsFocused();
    const [displayItems, setDisplayItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const sortAndFilter = () => {
            let tempItems = [];
            if (available) {
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
            if (sold) {
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

    useEffect(() => {
        trade_items_list.index = null;
        sold_trade_items_list.index = null;
        initialise(available, sold, id, searchTerm, navigation).then(() => {
            setLoaded(true);
            sortAndFilter();
        })
        
    }, [isFocused]);

    useEffect(() => {

        if (loaded) {
            sortAndFilter()  
        }
    }, [searchTerm, tags, sortIndex, loaded])

    if (displayItems.length >0 ) {
        return (<ScrollView nestedScrollEnabled={true} style={styles.center}>{displayItems}</ScrollView>);
    }
    
    return (<Text style={styles.nullContainer}>(Nothing to show)</Text>);
    
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
    },
    nullContainer: {
        textAlign: 'center',
        flex:1, 
        textAlignVertical:'center',
        color: 'gray'
    }
})

export default Trade_List;