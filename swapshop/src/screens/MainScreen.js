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

export const trade_items_list = new Item_List("fetch-trade-items");
export const user_accounts_item_list = new Item_List("fetch-user-accounts");
let displayItems = [];

// export default function forgotPasswordScreen() {

const MainScreen = ({navigation}) =>{
    const isFocused = useIsFocused();
    const [email, setEmail] = useState('');
    const [displayItems, setDisplayItems] = useState('');

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
                console.log(Owner)
                let trade_Item = new Trade_Item(item);
                if (Owner != false) {
                    trade_Item.setOwner(Owner);
                }
                return trade_Item;
            });
        }
    }, [])

    useEffect(() => {
        setDisplayItems('')
        setDisplayItems(LoadBlocks(''));
    }, [isFocused])

    let screen = (<View style={styles.container}>
        <View style={styles.search_Bar}>
            <TextInput 
                style={styles.TextInput} 
                placeholderTextColor="#3CB371" 
                placeholder="search" 
                onChangeText={(searchTerm) => setDisplayItems(LoadBlocks(searchTerm))}
            />
        </View>
        <ScrollView style={styles.center}>{displayItems}</ScrollView>
        <View style={styles.addItemBtn}>
            <Button color="#2E8B57" title='post a new item' onPress={() => navigation.navigate('addItemScreen')}/>
        </View>
        </View>);

    return screen;
}

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

    //   inputView :{
    
    //     padding: 10,
        
    
    //   },

});

export default MainScreen;
